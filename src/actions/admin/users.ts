"use server";

import { prisma } from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/jwt";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateUserRole(userId: string, newRole: string) {
  const session = await getAdminSession();
  if (!session || session.role !== "ADMIN") {
    return { success: false, message: "Acceso no autorizado. Se requiere rol ADMIN." };
  }

  const validRoles = ["ADMIN", "SPEAKER", "STAFF"];
  if (!validRoles.includes(newRole)) {
    return { success: false, message: "Rol inválido especificado." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/usuarios");
    revalidatePath("/admin");
    return { success: true, message: `Rol actualizado a ${newRole} correctamente.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al actualizar rol.";
    return { success: false, message };
  }
}

export async function createNewUser(formData: FormData) {
  const session = await getAdminSession();
  if (!session || session.role !== "ADMIN") {
    return { success: false, message: "Acceso no autorizado. Se requiere rol ADMIN." };
  }

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const fullName = (formData.get("fullName") as string)?.trim();
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "STAFF";

  if (!email || !fullName || !password) {
    return { success: false, message: "Todos los campos obligatorios deben completarse." };
  }

  const validRoles = ["ADMIN", "SPEAKER", "STAFF"];
  if (!validRoles.includes(role)) {
    return { success: false, message: "Rol inválido especificado." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, message: "Ya existe un usuario con este correo electrónico." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        fullName,
        passwordHash,
        role,
      },
    });

    revalidatePath("/admin/usuarios");
    return { success: true, message: `Usuario ${fullName} creado con rol ${role}.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al crear usuario.";
    return { success: false, message };
  }
}
