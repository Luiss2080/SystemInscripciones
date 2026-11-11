"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/jwt";
import { createEventService } from "@/services/admin/event.service";

export async function createNewEvent(formData: FormData) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Acceso no autorizado." };
  }

  const result = await createEventService(session.id, formData);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/admin/eventos");
  }

  return result;
}

