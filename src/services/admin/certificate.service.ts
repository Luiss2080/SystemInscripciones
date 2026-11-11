import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";
import type { CertificateIssueResult } from "@/types/actions";

/**
 * Issues a unique public verification certificate for an ATTENDED participant.
 */
export async function issueCertificateService(
  registrationId: string
): Promise<CertificateIssueResult> {
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
        message:
          "Solo los participantes que asistieron (ATTENDED) pueden recibir certificado.",
      };
    }

    if (reg.certificate) {
      return {
        success: true,
        message: "El certificado ya fue emitido previamente.",
        certificateCode: reg.certificate.certificateCode,
      };
    }

    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const certificateCode = `CERT-2026-ENG-${randomHex}`;

    const cert = await prisma.certificate.create({
      data: {
        registrationId: reg.id,
        certificateCode,
      },
    });

    return {
      success: true,
      message: "Certificado generado exitosamente.",
      certificateCode: cert.certificateCode,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Error al emitir certificado.";
    return { success: false, message };
  }
}

