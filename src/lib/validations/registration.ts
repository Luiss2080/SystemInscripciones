import { z } from "zod";

export const registrationSchema = z.object({
  eventId: z.string().uuid("ID de evento inválido"),
  attendeeName: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(100, "Nombre demasiado largo"),
  attendeeEmail: z
    .string()
    .email("Ingresa un correo electrónico válido")
    .toLowerCase()
    .trim(),
  attendeePhone: z
    .string()
    .min(7, "Ingresa un número telefónico o WhatsApp válido")
    .max(25, "Número demasiado largo"),
  attendeeOccupation: z
    .string()
    .min(2, "Especifica tu rol u ocupación (ej. Estudiante, Desarrollador)")
    .max(80),
  attendeeOrganization: z
    .string()
    .max(100, "Nombre de institución demasiado largo")
    .optional()
    .or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
