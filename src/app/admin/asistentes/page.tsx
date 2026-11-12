import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { AttendeesTable } from "@/components/admin/attendees/AttendeesTable";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import { formatRevenue } from "@/lib/utils/format";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAttendeesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [attendees, events, approvedPayments] = await Promise.all([
    prisma.registration.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: {
        event: { select: { id: true, title: true } },
        ticket: { select: { ticketCode: true } },
      },
    }),
    prisma.event.findMany({
      where: { deletedAt: null },
      orderBy: { startDate: "asc" },
      select: { id: true, title: true },
    }),
    prisma.payment.aggregate({
      where: { status: "APPROVED" },
      _sum: { amount: true },
    }),
  ]);

  const confirmedCount = attendees.filter((a) => a.status === "CONFIRMED").length;
  const attendedCount = attendees.filter((a) => a.status === "ATTENDED").length;
  const pendingCount = attendees.filter((a) => a.status === "PENDING_PAYMENT").length;
  const revenueTotal = Number(approvedPayments._sum.amount ?? 0);

  return (
    <div className="space-y-4">
      {/* Compact Command Banner */}
      <MotionFadeIn className="relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.18em] text-cyan-400">
              <Users className="w-3 h-3 text-cyan-400" />
              <span>PADRÓN EN VIVO • POSTGRESQL 18</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Asistentes y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Control de Pagos
              </span>
            </h1>

            <p className="text-xs text-slate-400 font-medium">
              Filtra por taller o estado, aprueba comprobantes, acredita asistencia y exporta el listado oficial a CSV.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0 self-start lg:self-auto">
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
              <span className="text-slate-400 block text-[9px]">CAJA</span>
              <strong className="text-emerald-300 font-black tabular-nums">
                {formatRevenue(revenueTotal)}
              </strong>
            </div>
          </div>
        </div>
      </MotionFadeIn>

      <AttendeesTable initialAttendees={attendees} events={events} />
    </div>
  );
}
