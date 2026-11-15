import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { AttendeesTable } from "@/components/admin/attendees/AttendeesTable";
import { AdminPageHeader } from "@/components/admin/ui";
import { formatRevenue } from "@/lib/utils/format";
import { Users } from "lucide-react";

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
            : "PADRÓN EN VIVO • POSTGRESQL 18"
        }
        title={isSpeaker ? "Padrón de Mis Alumnos y" : "Asistentes y"}
        accentTitle={isSpeaker ? "Asistencias" : "Control de Pagos"}
        description={
          isSpeaker
            ? "Listado oficial de participantes inscritos en tus talleres asignados: seguimiento de asistencia, datos de contacto y acreditación."
            : "Filtra por taller o estado, aprueba comprobantes de pago, acredita asistencia mediante QR y gestiona el padrón oficial de participantes."
        }
        actions={
          <div className="flex flex-wrap items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0 shadow-sm">
            <div>
              <span className="text-slate-400 block text-[9px]">TOTAL</span>
              <strong className="text-white font-black tabular-nums">{attendees.length}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">CONF.</span>
              <strong className="text-emerald-300 font-black tabular-nums">{confirmedCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">ASIST.</span>
              <strong className="text-cyan-400 font-black tabular-nums">{attendedCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">PEND.</span>
              <strong className="text-amber-300 font-black tabular-nums">{pendingCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">CAJA APROBADA</span>
              <strong className="text-emerald-300 font-black tabular-nums">
                {formatRevenue(revenueTotal)}
              </strong>
            </div>
          </div>
        }
      />

      {/* Main Standardized Table & Filter Section */}
      <AttendeesTable initialAttendees={attendees} events={events} />
    </div>
  );
}
