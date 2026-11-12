import { prisma } from "@/lib/db/prisma";
import { formatShortTime } from "@/lib/utils/format";

const ACTIVE_REGISTRATION_STATUSES = ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"];

/**
 * Fetches live operational metrics, recent registrations, pipeline breakdown,
 * and active workshops from PostgreSQL for the admin dashboard.
 */
export async function getAdminDashboardData() {
  const [
    totalEvents,
    openEvents,
    totalRegistrations,
    confirmedCount,
    totalAttended,
    pendingPaymentsCount,
    totalCertificates,
    pendingCertificatesCount,
    approvedPaymentsAgg,
    pendingPaymentsAgg,
    recentRegistrations,
    activeWorkshops,
    allActiveEventsCapacity,
  ] = await Promise.all([
    prisma.event.count({ where: { deletedAt: null } }),
    prisma.event.count({ where: { deletedAt: null, status: "OPEN" } }),
    prisma.registration.count({ where: { deletedAt: null } }),
    prisma.registration.count({ where: { deletedAt: null, status: "CONFIRMED" } }),
    prisma.registration.count({ where: { deletedAt: null, status: "ATTENDED" } }),
    prisma.registration.count({ where: { deletedAt: null, status: "PENDING_PAYMENT" } }),
    prisma.certificate.count(),
    prisma.registration.count({
      where: {
        deletedAt: null,
        status: "ATTENDED",
        certificate: { is: null },
      },
    }),
    prisma.payment.aggregate({
      where: { status: "APPROVED" },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: { status: "PENDING" },
      _sum: { amount: true },
    }),
    prisma.registration.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 7,
      include: {
        event: { select: { title: true, slug: true } },
        ticket: { select: { ticketCode: true } },
      },
    }),
    prisma.event.findMany({
      where: { deletedAt: null },
      orderBy: { startDate: "asc" },
      take: 5,
      include: {
        _count: {
          select: {
            registrations: {
              where: { status: { in: ACTIVE_REGISTRATION_STATUSES } },
            },
          },
        },
      },
    }),
    prisma.event.findMany({
      where: { deletedAt: null },
      select: {
        maxCapacity: true,
        _count: {
          select: {
            registrations: {
              where: { status: { in: ACTIVE_REGISTRATION_STATUSES } },
            },
          },
        },
      },
    }),
  ]);

  const totalCapacity = allActiveEventsCapacity.reduce(
    (sum, ev) => sum + ev.maxCapacity,
    0
  );
  const totalOccupiedSeats = allActiveEventsCapacity.reduce(
    (sum, ev) => sum + ev._count.registrations,
    0
  );
  const approvedRevenue = Number(approvedPaymentsAgg._sum.amount ?? 0);
  const pendingRevenue = Number(pendingPaymentsAgg._sum.amount ?? 0);

  return {
    totalEvents,
    openEvents,
    totalRegistrations,
    confirmedCount,
    totalAttended,
    pendingPaymentsCount,
    totalCertificates,
    pendingCertificatesCount,
    approvedRevenue,
    pendingRevenue,
    totalCapacity,
    totalOccupiedSeats,
    recentRegistrations,
    activeWorkshops,
  };
}

/**
 * Fetches recent ATTENDED check-in entries from PostgreSQL for live scanner audit logs.
 */
export async function getRecentCheckinLogs(limit = 8) {
  const rows = await prisma.registration.findMany({
    where: {
      deletedAt: null,
      status: "ATTENDED",
      attendedAt: { not: null },
    },
    orderBy: { attendedAt: "desc" },
    take: limit,
    include: {
      event: { select: { title: true } },
      ticket: { select: { ticketCode: true } },
    },
  });

  return rows
    .filter((r) => Boolean(r.ticket?.ticketCode))
    .map((r) => ({
      code: r.ticket!.ticketCode,
      name: r.attendeeName,
      eventTitle: r.event.title,
      status: "ATTENDED" as const,
      time: formatShortTime(r.attendedAt!),
    }));
}

/**
 * Fetches CONFIRMED attendees waiting at access control so staff can scan or click to validate.
 */
export async function getPendingCheckinQueue(limit = 6) {
  const rows = await prisma.registration.findMany({
    where: {
      deletedAt: null,
      status: "CONFIRMED",
      ticket: { isNot: null },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      event: { select: { title: true } },
      ticket: { select: { ticketCode: true } },
    },
  });

  return rows
    .filter((r) => Boolean(r.ticket?.ticketCode))
    .map((r) => ({
      ticketCode: r.ticket!.ticketCode,
      attendeeName: r.attendeeName,
      eventTitle: r.event.title,
    }));
}
