import { prisma } from "@/lib/db/prisma";

/**
 * Approves a pending transfer payment and activates the attendee's registration.
 */
export async function approvePaymentService(registrationId: string) {
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

    return { success: true, message: "Pago aprobado y ticket activado." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al aprobar pago.";
    return { success: false, message };
  }
}
