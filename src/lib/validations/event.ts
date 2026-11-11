import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "El slug debe tener al menos 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
  description: z.string().trim().min(10, "La descripción debe tener al menos 10 caracteres"),
  syllabus: z.string().optional().default(""),
  requirements: z.string().optional().default(""),
  eventType: z.enum(["WORKSHOP", "CONFERENCE", "BOOTCAMP"]).default("WORKSHOP"),
  modality: z.enum(["VIRTUAL", "PRESENTIAL", "HYBRID"]).default("VIRTUAL"),
  locationOrUrl: z.string().optional().default(""),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  maxCapacity: z.coerce.number().int().min(1, "El aforo mínimo es 1 cupo"),
  price: z.coerce.number().min(0).default(0),
  academicHours: z.coerce.number().int().min(1).default(4),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
