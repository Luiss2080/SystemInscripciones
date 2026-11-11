"use server";

import { cookies } from "next/headers";
import { authenticateAdminService } from "@/services/auth/auth.service";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  const result = await authenticateAdminService(email, password);
  if (!result.success || !result.token) {
    return { success: false, message: result.message || "Error al autenticar." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

