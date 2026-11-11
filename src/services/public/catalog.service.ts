import { prisma } from "@/lib/db/prisma";
import type {
  PublicEventDTO,
  PublicNavEventDTO,
  PublicSiteStats,
} from "@/types/events";

const ACTIVE_REGISTRATION_STATUSES = ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"];

function formatSpeakerShortName(rawName?: string | null): string {
  if (!rawName) return "Ing. Alex Martínez";
  return rawName.split(" - ")[0].trim() || rawName;
}

/**
 * Loads public workshops/conferences and real operational metrics from PostgreSQL.
 */
export async function getPublicLandingData(): Promise<{
  events: PublicEventDTO[];
  stats: PublicSiteStats;
}> {
  const [rawEvents, totalRegistrations, totalAttended, totalCertificates, leadSpeaker] =
    await Promise.all([
      prisma.event.findMany({
        where: { deletedAt: null },
        orderBy: { startDate: "asc" },
        include: {
          speaker: { select: { fullName: true } },
          _count: {
            select: {
              registrations: {
                where: { status: { in: ACTIVE_REGISTRATION_STATUSES } },
              },
            },
          },
        },
      }),
      prisma.registration.count({
        where: { deletedAt: null, status: { in: ACTIVE_REGISTRATION_STATUSES } },
      }),
      prisma.registration.count({
        where: { deletedAt: null, status: "ATTENDED" },
      }),
      prisma.certificate.count(),
      prisma.user.findFirst({
        where: { deletedAt: null },
        orderBy: { createdAt: "asc" },
        select: { fullName: true, email: true },
      }),
    ]);

  const events: PublicEventDTO[] = rawEvents.map((ev) => ({
    id: ev.id,
    title: ev.title,
    slug: ev.slug,
    description: ev.description,
    eventType: ev.eventType,
    modality: ev.modality,
    locationOrUrl: ev.locationOrUrl,
    startDate: ev.startDate.toISOString(),
    endDate: ev.endDate ? ev.endDate.toISOString() : null,
    maxCapacity: ev.maxCapacity,
    price: Number(ev.price),
    currency: ev.currency,
    academicHours: ev.academicHours,
    status: ev.status,
    speakerName: formatSpeakerShortName(ev.speaker?.fullName ?? leadSpeaker?.fullName),
    registrationsCount: ev._count.registrations,
  }));

  const totalAcademicHours = events.reduce((sum, ev) => sum + ev.academicHours, 0);

  return {
    events,
    stats: {
      totalEvents: events.length,
      totalRegistrations,
      totalAttended,
      totalCertificates,
      totalAcademicHours,
      leadSpeakerName: formatSpeakerShortName(leadSpeaker?.fullName),
      leadSpeakerEmail: leadSpeaker?.email || "contacto@ingeniero.tech",
    },
  };
}

/**
 * Fetches upcoming events from PostgreSQL for public header dropdown navigation.
 */
export async function getPublicNavEvents(limit = 3): Promise<PublicNavEventDTO[]> {
  const rows = await prisma.event.findMany({
    where: { deletedAt: null },
    orderBy: { startDate: "asc" },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      eventType: true,
      modality: true,
      academicHours: true,
      maxCapacity: true,
      _count: {
        select: {
          registrations: {
            where: { status: { in: ACTIVE_REGISTRATION_STATUSES } },
          },
        },
      },
    },
  });

  return rows.map((ev) => ({
    id: ev.id,
    title: ev.title,
    slug: ev.slug,
    eventType: ev.eventType,
    modality: ev.modality,
    academicHours: ev.academicHours,
    maxCapacity: ev.maxCapacity,
    registrationsCount: ev._count.registrations,
  }));
}

