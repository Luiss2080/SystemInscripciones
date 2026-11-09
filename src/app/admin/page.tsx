import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Calendar,
  Users,
  CheckCircle2,
  Award,
  QrCode,
  PlusCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // 1. Estadísticas agregadas
  const [
    totalEvents,
    totalRegistrations,
    totalAttended,
    totalCertificates,
    recentRegistrations,
  ] = await Promise.all([
    prisma.event.count({ where: { deletedAt: null } }),
    prisma.registration.count({ where: { deletedAt: null } }),
    prisma.registration.count({ where: { status: "ATTENDED" } }),
    prisma.certificate.count(),
    prisma.registration.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        event: { select: { title: true, slug: true } },
        ticket: { select: { ticketCode: true } },
      },
    }),
  ]);

  const attendanceRate =
    totalRegistrations > 0
      ? Math.round((totalAttended / totalRegistrations) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">
            Panel de Control
          </span>
          <h1 className="text-3xl font-extrabold text-slate-100">
            Bienvenido, {session.fullName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/checkin"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            <QrCode className="w-4 h-4" />
            <span>Escanear QR de Asistentes</span>
          </Link>
          <Link
            href="/admin/eventos/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500 text-sm font-semibold transition-all"
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>Crear Taller</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="glass-panel rounded-2xl p-5 border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase">Talleres Activos</span>
            <Calendar className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-100">{totalEvents}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Conferencias programadas</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase">Inscritos Totales</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-100">{totalRegistrations}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Tickets emitidos</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase">Tasa de Asistencia</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-100">{attendanceRate}%</div>
          <span className="text-[11px] text-slate-400 mt-1 block">{totalAttended} acreditados con QR</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase">Certificados</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-100">{totalCertificates}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Verificables en línea</span>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Inscripciones Recientes</h2>
            <p className="text-xs text-slate-400">Últimos participantes que generaron su ticket</p>
          </div>
          <Link
            href="/admin/asistentes"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Ver todos los asistentes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Participante</th>
                <th className="py-3 px-3">Taller / Conferencia</th>
                <th className="py-3 px-3">Ticket</th>
                <th className="py-3 px-3">Estado</th>
                <th className="py-3 px-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-slate-200">{reg.attendeeName}</p>
                    <span className="text-xs text-slate-500 font-mono">{reg.attendeeEmail}</span>
                  </td>
                  <td className="py-3.5 px-3 max-w-xs truncate text-slate-300">
                    {reg.event.title}
                  </td>
                  <td className="py-3.5 px-3">
                    <Link
                      href={`/tickets/${reg.ticket?.ticketCode}`}
                      target="_blank"
                      className="font-mono text-xs font-bold text-cyan-400 hover:underline"
                    >
                      {reg.ticket?.ticketCode || "S/T"}
                    </Link>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        reg.status === "ATTENDED"
                          ? "bg-purple-950 text-purple-300 border border-purple-800"
                          : reg.status === "CONFIRMED"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-400">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

