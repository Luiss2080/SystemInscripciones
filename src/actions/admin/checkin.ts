"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/jwt";
import {
  manualCheckinService,
  validateAndCheckinService,
} from "@/services/admin/checkin.service";

export async function validateAndCheckinTicket(rawPayload: string) {
  const session = await getAdminSession();
  if (!session) {
    return {
      success: false,
      message: "Acceso no autorizado. Inicia sesión como administrador.",
    };
  }

  const result = await validateAndCheckinService(rawPayload);

  if (result.success && result.ticketCode) {
    revalidatePath("/admin");
    revalidatePath("/admin/asistentes");
    revalidatePath(`/tickets/${result.ticketCode}`);
  }

  return result;
}

export async function manualCheckin(registrationId: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  const result = await manualCheckinService(registrationId);
  if (result.success) {
    revalidatePath("/admin/asistentes");
  }

  return result;
}

