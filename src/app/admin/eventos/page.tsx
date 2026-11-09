import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";
import Link from "next/link";
import { PlusCircle, Calendar, Users, Award, ExternalLink } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

export default async function AdminEventsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const events = await prisma.event.findMany({
    where: { deletedAt: null },
    orderBy: { startDate: "asc" },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AdminNav />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">
            Gestión Académica
          </span>
          <h1 className="text-3xl font-extrabold text-slate-100">
            Talleres y Conferencias
          </h1>
        </div>

        <Link
          href="/admin/eventos/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Programar Nuevo Taller</span>
        </Link>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Título del Taller</th>
                <th className="py-3 px-3">Tipo / Modalidad</th>
                <th className="py-3 px-3">Fecha</th>
                <th className="py-3 px-3">Aforo</th>
                <th className="py-3 px-3">Inversión</th>
                <th className="py-3 px-3">Estado</th>
                <th className="py-3 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map((event) => {
                const available = Math.max(0, event.maxCapacity - event._count.registrations);
                return (
                  <tr key={event.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-3 font-semibold text-slate-100 max-w-xs">
                      {event.title}
                    </td>
                    <td className="py-4 px-3 text-xs">
                      <span className="text-slate-300 font-medium block">
                        {event.eventType}
                      </span>
                      <span className="text-slate-500">{event.modality}</span>
                    </td>
                    <td className="py-4 px-3 text-xs text-slate-300">
                      {new Date(event.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-3 font-mono text-xs">
                      <strong className="text-cyan-400">{event._count.registrations}</strong> /{" "}
                      {event.maxCapacity}
                    </td>
                    <td className="py-4 px-3 font-mono text-xs text-slate-200">
                      {formatCurrency(Number(event.price), event.currency)}
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          event.status === "OPEN"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : "bg-rose-950 text-rose-300 border border-rose-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <Link
                        href={`/eventos/${event.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        <span>Ver Landing</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
