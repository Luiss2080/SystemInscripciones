import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { signAdminToken } from "@/lib/auth/jwt";

export interface AuthServiceResult {
  success: boolean;
  message?: string;
  token?: string;
}

/**
 * Verifies administrator credentials against PostgreSQL and issues a signed JWT token.
 */
export async function authenticateAdminService(
  rawEmail: string | null | undefined,
  password: string | null | undefined
): Promise<AuthServiceResult> {
  const email = rawEmail?.trim().toLowerCase();

  if (!email || !password) {
    return { success: false, message: "Ingresa tu correo y contraseña." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Credenciales de administrador incorrectas." };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { success: false, message: "Credenciales de administrador incorrectas." };
    }

    const token = signAdminToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { success: true, token };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al autenticar.";
    return { success: false, message };
  }
}

