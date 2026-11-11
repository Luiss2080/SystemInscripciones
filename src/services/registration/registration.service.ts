import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";
import { registrationSchema } from "@/lib/validations/registration";
import type { ActionResponse } from "@/types/actions";

/**
 * Registers an attendee inside an ACID transaction, enforces capacity and duplicate rules,
 * and issues a signed QR ticket hash.
 */
export async function registerAttendeeService(formData: unknown): Promise<ActionResponse> {
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

      if (event.status === "SOLD_OUT" || event._count.registrations >= event.maxCapacity) {
        if (event.status !== "SOLD_OUT") {
          await tx.event.update({
            where: { id: eventId },
            data: { status: "SOLD_OUT" },
          });
        }
        throw new Error("Lo sentimos, los cupos para este evento están agotados.");
      }

      if (event.status !== "OPEN") {
        throw new Error("Las inscripciones para este evento están cerradas.");
      }

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

      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const timestamp = Date.now().toString().slice(-4);
      const ticketCode = `TCK-${randomSuffix}-${timestamp}`;
      const qrHash = crypto.randomBytes(24).toString("hex");

      const isFree = Number(event.price) === 0;
      const initialStatus = isFree ? "CONFIRMED" : "PENDING_PAYMENT";

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
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error inesperado al procesar tu inscripción.";
    return {
      success: false,
      message,
    };
  }
}
