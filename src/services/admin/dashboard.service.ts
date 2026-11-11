import { prisma } from "@/lib/db/prisma";

const ACTIVE_REGISTRATION_STATUSES = ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"];

/**
 * Fetches live operational metrics, recent registrations, and active workshops
 * from PostgreSQL for the admin dashboard.
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
    approvedPaymentsAgg,
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
    prisma.payment.aggregate({
      where: { status: "APPROVED" },
      _sum: { amount: true },
    }),
    prisma.registration.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        event: { select: { title: true, slug: true } },
        ticket: { select: { ticketCode: true } },
      },
    }),
    prisma.event.findMany({
      where: { deletedAt: null },
      orderBy: { startDate: "asc" },
      take: 3,
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

  return {
    totalEvents,
    openEvents,
    totalRegistrations,
    confirmedCount,
    totalAttended,
    pendingPaymentsCount,
    totalCertificates,
    approvedRevenue,
    totalCapacity,
    totalOccupiedSeats,
    recentRegistrations,
    activeWorkshops,
  };
}

/**
 * Fetches recent ATTENDED check-in entries from PostgreSQL for live scanner audit logs.
 */
export async function getRecentCheckinLogs(limit = 6) {
  const rows = await prisma.registration.findMany({
    where: {
      deletedAt: null,
      status: "ATTENDED",
      attendedAt: { not: null },
    },
    orderBy: { attendedAt: "desc" },
    take: limit,
    include: {
      ticket: { select: { ticketCode: true } },
    },
  });

  return rows
    .filter((r) => Boolean(r.ticket?.ticketCode))
    .map((r) => ({
      code: r.ticket!.ticketCode,
      name: r.attendeeName,
      status: "ATTENDED" as const,
      time: new Date(r.attendedAt!).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
}
