"use server";

import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations/registration";
import crypto from "crypto";

export type ActionResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  ticketCode?: string;
  registrationId?: string;
};

export async function registerAttendee(formData: unknown): Promise<ActionResponse> {
  const result = registrationSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Por favor corrige los errores en el formulario.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {
    eventId,
    attendeeName,
    attendeeEmail,
    attendeePhone,
    attendeeOccupation,
    attendeeOrganization,
  } = result.data;

  try {
    const registration = await prisma.$transaction(async (tx) => {
      // 1. Obtener evento y verificar estado
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: {
          _count: {
            select: {
              registrations: {
                where: {
                  status: { in: ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"] },
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new Error("El evento seleccionado no existe o fue cancelado.");
      }

      if (event.status !== "OPEN") {
        throw new Error("Las inscripciones para este evento están cerradas.");
      }

      if (event._count.registrations >= event.maxCapacity) {
        // Auto-actualizar estado del evento a SOLD_OUT
        await tx.event.update({
          where: { id: eventId },
          data: { status: "SOLD_OUT" },
        });
        throw new Error("Lo sentimos, los cupos para este evento acaban de agotarse.");
      }

      // 2. Verificar duplicidad por email
      const existing = await tx.registration.findUnique({
        where: {
          eventId_attendeeEmail: {
            eventId,
            attendeeEmail,
          },
        },
        include: {
          ticket: true,
        },
      });

      if (existing) {
        if (existing.ticket) {
          throw new Error(
            `Ya te encuentras registrado en este evento. Tu código de ticket es ${existing.ticket.ticketCode}.`
          );
        }
        throw new Error("Ya te encuentras registrado en este evento con este correo.");
      }

      // 3. Generar Ticket Code y QR Hash Criptográfico
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const timestamp = Date.now().toString().slice(-4);
      const ticketCode = `TCK-${randomSuffix}-${timestamp}`;
      const qrHash = crypto.randomBytes(24).toString("hex");

      const isFree = Number(event.price) === 0;
      const initialStatus = isFree ? "CONFIRMED" : "PENDING_PAYMENT";

      // 4. Crear registro y ticket asociado
      const newReg = await tx.registration.create({
        data: {
          eventId,
          attendeeName,
          attendeeEmail,
          attendeePhone,
          attendeeOccupation,
          attendeeOrganization: attendeeOrganization || null,
          status: initialStatus,
          ticket: {
            create: {
              ticketCode,
              qrHash,
            },
          },
          ...(isFree
            ? {}
            : {
                payment: {
                  create: {
                    amount: event.price,
                    status: "PENDING",
                  },
                },
              }),
        },
        include: {
          ticket: true,
        },
      });

      // Si alcanzamos el cupo exacto, marcar como agotado
      if (event._count.registrations + 1 >= event.maxCapacity) {
        await tx.event.update({
          where: { id: eventId },
          data: { status: "SOLD_OUT" },
        });
      }

      return newReg;
    });

    return {
      success: true,
      message: "¡Inscripción confirmada con éxito!",
      ticketCode: registration.ticket?.ticketCode,
      registrationId: registration.id,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Ocurrió un error inesperado al procesar tu inscripción.",
    };
  }
}
