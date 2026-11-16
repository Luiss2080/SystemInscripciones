import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { AttendeesTable } from "@/components/admin/attendees/AttendeesTable";
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui";
import { formatRevenue } from "@/lib/utils/format";
import { Users, CheckCircle2, ShieldCheck, Clock, CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAttendeesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const isSpeaker = session.role === "SPEAKER";
  const isStaff = session.role === "STAFF";

  const regFilter = isSpeaker ? { deletedAt: null, event: { speakerId: session.id } } : { deletedAt: null };
  const eventFilter = isSpeaker ? { deletedAt: null, speakerId: session.id } : { deletedAt: null };
  const payFilter = isSpeaker
    ? { status: "APPROVED" as const, registration: { event: { speakerId: session.id } } }
    : { status: "APPROVED" as const };

  const [rawAttendees, events, approvedPayments] = await Promise.all([
    prisma.registration.findMany({
      where: regFilter,
      orderBy: { createdAt: "desc" },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            price: true,
            currency: true,
            modality: true,
            academicHours: true,
            startDate: true,
          },
        },
        ticket: { select: { ticketCode: true, qrHash: true } },
        payment: {
          select: {
            id: true,
            amount: true,
            proofFileUrl: true,
            status: true,
            verifiedAt: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.event.findMany({
      where: eventFilter,
      orderBy: { startDate: "asc" },
      select: { id: true, title: true },
    }),
    prisma.payment.aggregate({
      where: payFilter,
      _sum: { amount: true },
    }),
  ]);

  const attendees = rawAttendees.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    attendedAt: r.attendedAt ? r.attendedAt.toISOString() : null,
    event: {
      ...r.event,
      price: Number(r.event.price),
      startDate: r.event.startDate.toISOString(),
    },
    payment: r.payment
      ? {
          ...r.payment,
          amount: Number(r.payment.amount),
          verifiedAt: r.payment.verifiedAt ? r.payment.verifiedAt.toISOString() : null,
          createdAt: r.payment.createdAt.toISOString(),
        }
      : null,
  }));

  const confirmedCount = attendees.filter((a) => a.status === "CONFIRMED").length;
  const attendedCount = attendees.filter((a) => a.status === "ATTENDED").length;
  const pendingCount = attendees.filter((a) => a.status === "PENDING_PAYMENT").length;
  const revenueTotal = Number(approvedPayments._sum.amount ?? 0);

  const confirmedPct = attendees.length > 0
    ? Math.round(((confirmedCount + attendedCount) / attendees.length) * 100)
    : 0;
  const attendanceRate = confirmedCount + attendedCount > 0
    ? Math.round((attendedCount / (confirmedCount + attendedCount)) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {/* Standard Module Header */}
      <AdminPageHeader
        icon={Users}
        badgeText={
          isSpeaker
            ? `CÁTEDRA DOCENTE • ${attendees.length} ALUMNOS ASIGNADOS`
            : isStaff
            ? "ACREDITACIÓN EN PUERTA • PADRÓN GENERAL"
            : "PADRÓN OFICIAL • GESTIÓN DE PARTICIPANTES"
        }
        title={isSpeaker ? "Padrón de Mis Alumnos y" : "Asistentes y"}
        accentTitle={isSpeaker ? "Asistencias" : "Control de Pagos"}
        description={
          isSpeaker
            ? "Listado oficial de participantes inscritos en tus talleres asignados: seguimiento de asistencia, datos de contacto y acreditación."
            : "Filtra por taller o estado, aprueba comprobantes de pago, acredita asistencia mediante QR y gestiona el padrón oficial de participantes."
        }
      />

      {/* Fila Enriquecida de Estadísticas de Padrón */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <AdminStatCard
          label="Padrón Registrado"
          value={attendees.length}
          valueSuffix="alumnos"
          icon={Users}
          badge="INSCRIPCIONES"
          description="Participantes registrados en BD"
          subDetail={`${events.length} talleres con inscritos`}
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Pagos Confirmados"
          value={confirmedCount}
          valueSuffix="tickets"
          icon={CheckCircle2}
          badge="CONFIRMADOS"
          description="Inscripciones activas y acreditables"
          progress={confirmedPct}
          colorVariant="emerald"
        />

        <AdminStatCard
          label="Acreditados en Puerta"
          value={attendedCount}
          valueSuffix="en sala"
          icon={ShieldCheck}
          badge="CHECK-IN QR"
          description="Asistencia validada con escáner"
          progress={attendanceRate}
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Pendientes de Pago"
          value={pendingCount}
          valueSuffix="por revisar"
          icon={Clock}
          badge="EN COLA"
          description="Comprobantes pendientes de validación"
          subDetail="Requieren aprobación en bandeja"
          colorVariant="amber"
        />

        <AdminStatCard
          label="Caja Aprobada Neta"
          value={formatRevenue(revenueTotal)}
          icon={CreditCard}
          badge="CONCILIADO"
          description="Ingresos verificados en moneda BOB"
          subDetail="Depósitos y transferencias QR"
          colorVariant="emerald"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      {/* Main Standardized Table & Filter Section */}
      <AttendeesTable initialAttendees={attendees} events={events} userRole={session.role} />
    </div>
  );
}
