import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { getAdminDashboardData } from "@/services/admin/dashboard.service";
import { getWorkshopMedia } from "@/lib/utils/workshop-media";
import { formatCurrency } from "@/lib/utils/format";
import {
  Calendar,
  Users,
  CheckCircle2,
  Award,
  QrCode,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  Activity,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const data = await getAdminDashboardData();

  const attendanceRate =
    data.totalRegistrations > 0
      ? Math.round((data.totalAttended / data.totalRegistrations) * 100)
      : 0;

  const seatOccupancyRate =
    data.totalCapacity > 0
      ? Math.round((data.totalOccupiedSeats / data.totalCapacity) * 100)
      : 0;

  const certificationRate =
    data.totalAttended > 0
      ? Math.round((data.totalCertificates / data.totalAttended) * 100)
      : 0;

  const kpiCards = [
    {
      label: "Talleres Activos",
      value: `${data.openEvents}/${data.totalEvents}`,
      sub: `${data.totalOccupiedSeats}/${data.totalCapacity} cupos ocupados (${seatOccupancyRate}%)`,
      icon: Calendar,
      progress: data.totalEvents > 0 ? Math.round((data.openEvents / data.totalEvents) * 100) : 0,
      badge: "CATÁLOGO",
    },
    {
      label: "Inscritos Totales",
      value: data.totalRegistrations,
      sub: `${data.confirmedCount} confirmados • ${data.pendingPaymentsCount} pendientes`,
      icon: Users,
      progress: seatOccupancyRate,
      badge: "REGISTROS",
    },
    {
      label: "Tasa de Asistencia",
      value: `${attendanceRate}%`,
      sub: `${data.totalAttended} acreditados con QR`,
      icon: CheckCircle2,
      progress: attendanceRate,
      badge: "CHECK-IN",
    },
    {
      label: "Certificados & Caja",
      value: data.totalCertificates,
      sub: `${certificationRate}% emitidos • ${formatCurrency(data.approvedRevenue)}`,
      icon: Award,
      progress: certificationRate,
      badge: "OFICIALES",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cyber Welcome Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>PANEL DE CONTROL OPERATIVO</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Bienvenido,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {session.fullName}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Datos sincronizados en tiempo real con PostgreSQL 18: cupos, acreditación QR y certificaciones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/checkin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
            >
              <QrCode className="w-4 h-4 stroke-[2.5]" />
              <span>Escanear QR</span>
            </Link>

            <Link
              href="/admin/eventos/nuevo"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>Nuevo Taller</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Equal-Height KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="group h-full relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                      {kpi.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {kpi.label}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center group-hover:bg-cyan-500 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                  </div>
                </div>

                <div className="text-3xl font-black font-mono text-white tracking-tight">
                  {kpi.value}
                </div>

                <p className="text-[11px] text-slate-400 mt-1 mb-4 font-medium min-h-[18px]">
                  {kpi.sub}
                </p>
              </div>

              <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${Math.max(4, kpi.progress)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Equal-Height Split Workspace: Left (8 cols) + Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Recent Registrations Table (Matched Height) */}
        <div className="lg:col-span-8 h-full rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span>Inscripciones Recientes</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-[10px] font-mono text-cyan-400">
                    {data.recentRegistrations.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Últimos participantes con ticket emitido en PostgreSQL
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                  {data.confirmedCount} confirmados • {data.totalAttended} asistieron
                </span>
                <Link
                  href="/admin/asistentes"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <span>Ver Todos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                  <tr>
                    <th className="py-3 px-3">Participante</th>
                    <th className="py-3 px-3">Taller / Conferencia</th>
                    <th className="py-3 px-3">Ticket</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.recentRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-xs text-slate-500">
                        No hay inscripciones registradas todavía.
                      </td>
                    </tr>
                  ) : (
                    data.recentRegistrations.map((reg) => {
                      const initial = reg.attendeeName.trim().charAt(0).toUpperCase() || "A";
                      return (
                        <tr key={reg.id} className="hover:bg-slate-900/50 transition-colors group">
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs font-black text-cyan-400 shrink-0">
                                {initial}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-white text-xs sm:text-sm truncate">
                                  {reg.attendeeName}
                                </p>
                                <span className="text-[11px] text-slate-400 font-mono block truncate">
                                  {reg.attendeeEmail}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 max-w-[210px] truncate text-xs text-slate-300 font-medium">
                            {reg.event.title}
                          </td>
                          <td className="py-3.5 px-3">
                            {reg.ticket?.ticketCode ? (
                              <Link
                                href={`/tickets/${reg.ticket.ticketCode}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 font-mono text-[11px] font-bold text-cyan-400 transition-colors"
                              >
                                <span>{reg.ticket.ticketCode}</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            ) : (
                              <span className="text-xs text-slate-500 font-mono">S/T</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
                                reg.status === "ATTENDED"
                                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700/60"
                                  : reg.status === "CONFIRMED"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-700/60"
                                  : "bg-amber-950 text-amber-300 border border-amber-700/60"
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-[11px] font-mono text-slate-400 whitespace-nowrap">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Operational DB Footer Bar matching Right Column Bottom */}
          <div className="pt-4 mt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">Ocupación Global</span>
              <span className="text-xs font-mono font-black text-cyan-400">
                {data.totalOccupiedSeats}/{data.totalCapacity} ({seatOccupancyRate}%)
              </span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">Pagos Pendientes</span>
              <span className="text-xs font-mono font-black text-amber-300">
                {data.pendingPaymentsCount} registros
              </span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">Ingresos Aprobados</span>
              <span className="text-xs font-mono font-black text-emerald-300">
                {formatCurrency(data.approvedRevenue)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Active Workshops Visual Snapshot (Matched Height) */}
        <div className="lg:col-span-4 h-full rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                  AGENDA ACTIVA
                </span>
                <h2 className="text-lg font-extrabold text-white">
                  Próximos Talleres
                </h2>
              </div>
              <Link
                href="/admin/eventos"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Gestionar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {data.activeWorkshops.length === 0 ? (
                <p className="text-xs text-slate-500 py-8 text-center">
                  Aún no hay talleres activos programados.
                </p>
              ) : (
                data.activeWorkshops.map((ev, idx) => {
                  const media = getWorkshopMedia(ev.slug, idx);
                  const occupancy =
                    ev.maxCapacity > 0
                      ? Math.min(100, Math.round((ev._count.registrations / ev.maxCapacity) * 100))
                      : 0;

                  return (
                    <Link
                      key={ev.id}
                      href={`/eventos/${ev.slug}`}
                      target="_blank"
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
                    >
                      <div className="w-16 h-14 rounded-xl overflow-hidden border border-slate-800 shrink-0 relative bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.image}
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                          {ev.title}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                          <span>{new Date(ev.startDate).toLocaleDateString()}</span>
                          <span className="text-cyan-400 font-bold">
                            {ev._count.registrations}/{ev.maxCapacity} cupos
                          </span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-slate-950 mt-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${Math.max(4, occupancy)}%` }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2.5">
            <Link
              href="/admin/asistentes"
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold text-slate-200 transition-all"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Asistentes</span>
            </Link>
            <Link
              href="/admin/certificados"
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold text-slate-200 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certificados</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
