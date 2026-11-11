"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/jwt";
import { approvePaymentService } from "@/services/admin/payment.service";
import { issueCertificateService } from "@/services/admin/certificate.service";

export async function approvePayment(registrationId: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  const result = await approvePaymentService(registrationId);
  if (result.success) {
    revalidatePath("/admin");
    revalidatePath("/admin/asistentes");
  }

  return result;
}

export async function issueCertificate(registrationId: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  const result = await issueCertificateService(registrationId);
  if (result.success && result.certificateCode) {
    revalidatePath("/admin/certificados");
    revalidatePath("/admin/asistentes");
    revalidatePath(`/verificar/${result.certificateCode}`);
  }

  return result;
}
