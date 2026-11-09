"use server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function validateAndCheckinTicket(rawPayload: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado. Inicia sesión como administrador." };
  }

  try {
    let ticketCode = rawPayload.trim();
    let qrHash: string | undefined = undefined;

    // Si el QR contiene un JSON { code, hash }
    if (rawPayload.startsWith("{") && rawPayload.endsWith("}")) {
      try {
        const parsed = JSON.parse(rawPayload);
        ticketCode = parsed.code;
        qrHash = parsed.hash;
      } catch {
        // Fallback a texto crudo
      }
    }

    const ticket = await prisma.ticket.findFirst({
      where: {
        OR: [
          { ticketCode },
          ...(qrHash ? [{ qrHash }] : []),
          { qrHash: rawPayload.trim() },
        ],
      },
      include: {
        registration: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!ticket) {
      return { success: false, message: "Ticket no encontrado o código inválido." };
    }

    const { registration } = ticket;

    // Si ya fue acreditado previamente
    if (registration.status === "ATTENDED") {
      return {
        success: false,
        alreadyAttended: true,
        message: "¡Atención! Este ticket ya fue utilizado previamente para ingresar.",
        attendeeName: registration.attendeeName,
        eventTitle: registration.event.title,
        attendedAt: registration.attendedAt,
        ticketCode: ticket.ticketCode,
      };
    }

    // Acreditar asistencia
    const now = new Date();
    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        status: "ATTENDED",
        attendedAt: now,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/asistentes");
    revalidatePath(`/tickets/${ticket.ticketCode}`);

    return {
      success: true,
      message: "¡Acreditación confirmada exitosamente!",
      attendeeName: registration.attendeeName,
      eventTitle: registration.event.title,
      attendedAt: now,
      ticketCode: ticket.ticketCode,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Error al procesar el check-in.",
    };
  }
}

export async function manualCheckin(registrationId: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  try {
    const reg = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: "ATTENDED",
        attendedAt: new Date(),
      },
    });

    revalidatePath("/admin/asistentes");
    return { success: true, message: `Asistencia marcada para ${reg.attendeeName}` };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error al marcar asistencia." };
  }
}

export async function approvePayment(registrationId: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.payment.updateMany({
        where: { registrationId },
        data: {
          status: "APPROVED",
          verifiedAt: new Date(),
        },
      });

      await tx.registration.update({
        where: { id: registrationId },
        data: {
          status: "CONFIRMED",
        },
      });
    });

    revalidatePath("/admin");
    revalidatePath("/admin/asistentes");

    return { success: true, message: "Pago aprobado y ticket activado." };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error al aprobar pago." };
  }
}

export async function issueCertificate(registrationId: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  try {
    const reg = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        certificate: true,
        event: true,
      },
    });

    if (!reg) {
      return { success: false, message: "Registro no encontrado." };
    }

    if (reg.status !== "ATTENDED") {
      return {
        success: false,
        message: "Solo los participantes que asistieron (ATTENDED) pueden recibir certificado.",
      };
    }

    if (reg.certificate) {
      return {
        success: true,
        message: "El certificado ya fue emitido previamente.",
        certificateCode: reg.certificate.certificateCode,
      };
    }

    // Generar código de certificado único
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const certificateCode = `CERT-2026-ENG-${randomHex}`;

    const cert = await prisma.certificate.create({
      data: {
        registrationId: reg.id,
        certificateCode,
      },
    });

    revalidatePath("/admin/certificados");
    revalidatePath("/admin/asistentes");
    revalidatePath(`/verificar/${certificateCode}`);

    return {
      success: true,
      message: "Certificado generado exitosamente.",
      certificateCode: cert.certificateCode,
    };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error al emitir certificado." };
  }
}

export async function createNewEvent(formData: FormData) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  try {
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string).toLowerCase().trim();
    const description = formData.get("description") as string;
    const syllabus = formData.get("syllabus") as string;
    const requirements = formData.get("requirements") as string;
    const eventType = (formData.get("eventType") as string) || "WORKSHOP";
    const modality = (formData.get("modality") as string) || "VIRTUAL";
    const locationOrUrl = formData.get("locationOrUrl") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);
    const maxCapacity = parseInt(formData.get("maxCapacity") as string, 10);
    const price = parseFloat((formData.get("price") as string) || "0");
    const academicHours = parseInt((formData.get("academicHours") as string) || "4", 10);

    const newEvent = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        syllabus,
        requirements,
        eventType,
        modality,
        locationOrUrl,
        startDate,
        endDate,
        maxCapacity,
        price,
        academicHours,
        speakerId: session.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/eventos");

    return { success: true, eventSlug: newEvent.slug };
  } catch (err: any) {
    return { success: false, message: err?.message || "Error al crear evento." };
  }
}
