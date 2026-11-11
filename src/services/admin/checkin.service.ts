import { prisma } from "@/lib/db/prisma";
import type { CheckinActionResult } from "@/types/actions";

/**
 * Validates a scanned QR JSON/string payload or manual ticket code and marks attendance.
 */
export async function validateAndCheckinService(
  rawPayload: string
): Promise<CheckinActionResult> {
  try {
    let ticketCode = rawPayload.trim();
    let qrHash: string | undefined = undefined;

    if (rawPayload.startsWith("{") && rawPayload.endsWith("}")) {
      try {
        const parsed = JSON.parse(rawPayload) as { code?: string; hash?: string };
        ticketCode = parsed.code ?? ticketCode;
        qrHash = parsed.hash;
      } catch {
        // Fallback to raw text lookup
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

    const now = new Date();
    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        status: "ATTENDED",
        attendedAt: now,
      },
    });

    return {
      success: true,
      message: "¡Acreditación confirmada exitosamente!",
      attendeeName: registration.attendeeName,
      eventTitle: registration.event.title,
      attendedAt: now,
      ticketCode: ticket.ticketCode,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Error al procesar el check-in.";
    return {
      success: false,
      message,
    };
  }
}

/**
 * Manually marks a registration as ATTENDED from the attendees roster.
 */
export async function manualCheckinService(registrationId: string) {
  try {
    const reg = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: "ATTENDED",
        attendedAt: new Date(),
      },
    });

    return { success: true, message: `Asistencia marcada para ${reg.attendeeName}` };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Error al marcar asistencia.";
    return { success: false, message };
  }
}
