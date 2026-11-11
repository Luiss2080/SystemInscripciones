import { prisma } from "@/lib/db/prisma";
import { createEventSchema } from "@/lib/validations/event";
import type { CreateEventResult } from "@/types/actions";

/**
 * Validates event payload via Zod and creates a workshop/conference in PostgreSQL.
 */
export async function createEventService(
  speakerId: string,
  formData: FormData
): Promise<CreateEventResult> {
  const parsed = createEventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    syllabus: formData.get("syllabus") ?? "",
    requirements: formData.get("requirements") ?? "",
    eventType: formData.get("eventType") || "WORKSHOP",
    modality: formData.get("modality") || "VIRTUAL",
    locationOrUrl: formData.get("locationOrUrl") ?? "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    maxCapacity: formData.get("maxCapacity"),
    price: formData.get("price") || "0",
    academicHours: formData.get("academicHours") || "4",
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      message: firstIssue?.message || "Datos inválidos para crear el taller.",
    };
  }

  try {
    const data = parsed.data;
    const newEvent = await prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        syllabus: data.syllabus,
        requirements: data.requirements,
        eventType: data.eventType,
        modality: data.modality,
        locationOrUrl: data.locationOrUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        maxCapacity: data.maxCapacity,
        price: data.price,
        academicHours: data.academicHours,
        speakerId,
      },
    });

    return { success: true, eventSlug: newEvent.slug };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al crear evento.";
    return { success: false, message };
  }
}
