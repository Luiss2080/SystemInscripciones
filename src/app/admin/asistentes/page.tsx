import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AttendeesTable } from "@/components/AttendeesTable";
import { Users } from "lucide-react";

export default async function AdminAttendeesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const attendees = await prisma.registration.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      event: { select: { id: true, title: true } },
      ticket: { select: { ticketCode: true } },
    },
  });

  return (
    <div className="space-y-6">
      {/* Compact Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>BASE DE DATOS DE INSCRITOS</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Asistentes y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Control de Pagos
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Filtra por estado, aprueba transferencias, realiza check-in manual o exporta el padrón oficial a CSV.
            </p>
          </div>
        </div>
      </div>

      <AttendeesTable initialAttendees={attendees} />
    </div>
  );
}
