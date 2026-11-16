import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { AttendeesTable } from "@/components/admin/attendees/AttendeesTable";
import { AdminPageHeader } from "@/components/admin/ui";
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

  const [attendees, events, approvedPayments] = await Promise.all([
    prisma.registration.findMany({
      where: regFilter,
      orderBy: { createdAt: "desc" },
      include: {
        event: { select: { id: true, title: true } },
        ticket: { select: { ticketCode: true } },
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

  const confirmedCount = attendees.filter((a) => a.status === "CONFIRMED").length;
  const attendedCount = attendees.filter((a) => a.status === "ATTENDED").length;
  const pendingCount = attendees.filter((a) => a.status === "PENDING_PAYMENT").length;
  const revenueTotal = Number(approvedPayments._sum.amount ?? 0);

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

      {/* Fila Adicional de Estadísticas de Padrón */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Total Inscritos</span>
            <strong className="text-xl font-black text-white font-mono tabular-nums">{attendees.length}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Confirmados</span>
            <strong className="text-xl font-black text-emerald-400 font-mono tabular-nums">{confirmedCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Acreditados QR</span>
            <strong className="text-xl font-black text-cyan-300 font-mono tabular-nums">{attendedCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Pendientes Pago</span>
            <strong className="text-xl font-black text-amber-300 font-mono tabular-nums">{pendingCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3 col-span-2 sm:col-span-1">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Caja Aprobada</span>
            <strong className="text-xl font-black text-emerald-300 font-mono tabular-nums">{formatRevenue(revenueTotal)}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Standardized Table & Filter Section */}
      <AttendeesTable initialAttendees={attendees} events={events} />
    </div>
  );
}
