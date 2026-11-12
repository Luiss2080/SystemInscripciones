import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { getAdminDashboardData } from "@/services/admin/dashboard.service";
import { getWorkshopMedia } from "@/lib/utils/workshop-media";
import { formatCurrency, formatRevenue, formatShortDate } from "@/lib/utils/format";
import {
  MotionFadeIn,
  MotionStaggerItem,
  AnimatedProgressBar,
  AnimatedCounter,
} from "@/components/shared/MotionPrimitives";
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
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const data = await getAdminDashboardData();
  const shortAdminName = session.fullName.split(" - ")[0]?.trim() || session.fullName;

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

  const totalPipeline = Math.max(1, data.totalRegistrations);
  const confirmedPct = Math.round((data.confirmedCount / totalPipeline) * 100);
  const attendedPct = Math.round((data.totalAttended / totalPipeline) * 100);
  const pendingPayPct = Math.max(0, 100 - confirmedPct - attendedPct);

  const kpiCards = [
    {
      label: "Talleres Activos",
      numValue: data.openEvents,
      suffix: `/${data.totalEvents}`,
      sub: `${data.totalOccupiedSeats}/${data.totalCapacity} cupos (${seatOccupancyRate}%)`,
      icon: Calendar,
      progress: data.totalEvents > 0 ? Math.round((data.openEvents / data.totalEvents) * 100) : 0,
      badge: "CATÁLOGO",
    },
    {
      label: "Inscritos Totales",
      numValue: data.totalRegistrations,
      suffix: "",
      sub: `${data.confirmedCount} confirmados • ${data.pendingPaymentsCount} pendientes`,
      icon: Users,
      progress: seatOccupancyRate,
      badge: "REGISTROS",
    },
    {
      label: "Tasa de Asistencia",
      numValue: attendanceRate,
      suffix: "%",
      sub: `${data.totalAttended} acreditados con ticket QR`,
      icon: CheckCircle2,
      progress: attendanceRate,
      badge: "CHECK-IN",
    },
    {
      label: "Certificados & Caja",
      numValue: data.totalCertificates,
      suffix: "",
      sub: `${certificationRate}% emitidos • ${formatRevenue(data.approvedRevenue)}`,
      icon: Award,
      progress: certificationRate,
      badge: "OFICIALES",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Compact Command Strip */}
      <MotionFadeIn className="relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.18em] text-cyan-400">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>CONSOLA OPERATIVA • {data.totalEvents} EVENTOS EN BD</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Bienvenido,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {shortAdminName}
              </span>
            </h1>

            <p className="text-xs text-slate-400 font-medium">
              Monitoreo en vivo de inscripciones, recaudación, aforos QR y certificaciones en PostgreSQL 18.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/admin/checkin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Escanear QR</span>
            </Link>

            <Link
              href="/admin/eventos/nuevo"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nuevo Taller</span>
            </Link>

            <Link
              href="/admin/certificados"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{data.pendingCertificatesCount} por Emitir</span>
            </Link>
          </div>
        </div>
      </MotionFadeIn>

      {/* Compact Equal-Height Animated KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <MotionStaggerItem
              key={kpi.label}
              index={idx}
              className="group h-full relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 shadow-xl backdrop-blur-md hover:border-cyan-500/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                      {kpi.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {kpi.label}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center group-hover:bg-cyan-500 transition-colors shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                  </div>
                </div>

                <div className="text-2xl sm:text-[28px] font-black font-mono text-white tracking-tight tabular-nums leading-none">
                  <AnimatedCounter value={kpi.numValue} suffix={kpi.suffix} />
                </div>

                <p className="text-[11px] text-slate-400 mt-1.5 mb-3 font-medium min-h-[16px] truncate">
                  {kpi.sub}
                </p>
              </div>

              <AnimatedProgressBar percentage={kpi.progress} />
            </MotionStaggerItem>
          );
        })}
      </div>

      {/* Equal-Height Dense Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left: Compact Recent Registrations (7 cols) */}
        <MotionFadeIn
          delay={0.12}
          className="lg:col-span-7 h-full rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>Inscripciones Recientes</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-[10px] font-mono text-cyan-400">
                    {data.recentRegistrations.length} últimas
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Tickets generados en tiempo real desde PostgreSQL
                </p>
              </div>

              <Link
                href="/admin/asistentes"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-all"
              >
                <span>Padrón Completo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                  <tr>
                    <th className="py-2 px-2">Participante</th>
                    <th className="py-2 px-2">Programa</th>
                    <th className="py-2 px-2">Ticket</th>
                    <th className="py-2 px-2">Estado</th>
                    <th className="py-2 px-2 text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.recentRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-xs text-slate-500">
                        No hay inscripciones registradas todavía.
                      </td>
                    </tr>
                  ) : (
                    data.recentRegistrations.map((reg) => {
                      const initial = reg.attendeeName.trim().charAt(0).toUpperCase() || "A";
                      return (
                        <tr key={reg.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-2 px-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[11px] font-black text-cyan-400 shrink-0">
                                {initial}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-white text-xs truncate max-w-[140px]">
                                  {reg.attendeeName}
                                </p>
                                <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[140px]">
                                  {reg.attendeeEmail}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-2 max-w-[160px] truncate text-[11px] text-slate-300 font-medium">
                            {reg.event.title}
                          </td>
                          <td className="py-2 px-2">
                            {reg.ticket?.ticketCode ? (
                              <Link
                                href={`/tickets/${reg.ticket.ticketCode}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 font-mono text-[10px] font-bold text-cyan-400 transition-colors"
                              >
                                <span>{reg.ticket.ticketCode}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-mono">S/T</span>
                            )}
                          </td>
                          <td className="py-2 px-2">
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center ${
                                reg.status === "ATTENDED"
                                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700/60"
                                  : reg.status === "CONFIRMED"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-700/60"
                                  : "bg-amber-950 text-amber-300 border border-amber-700/60"
                              }`}
                            >
                              {reg.status === "PENDING_PAYMENT" ? "PENDIENTE" : reg.status}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right text-[10px] font-mono text-slate-400 whitespace-nowrap">
                            {formatShortDate(reg.createdAt)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom 4-Pill Live Operational Telemetry Footer */}
          <div className="pt-3 mt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="px-2.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Aforo Global</span>
              <span className="text-xs font-mono font-black text-cyan-400 tabular-nums">
                {data.totalOccupiedSeats}/{data.totalCapacity} ({seatOccupancyRate}%)
              </span>
            </div>
            <div className="px-2.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Pendientes Pago</span>
              <span className="text-xs font-mono font-black text-amber-300 tabular-nums">
                {data.pendingPaymentsCount} reg. ({formatRevenue(data.pendingRevenue)})
              </span>
            </div>
            <div className="px-2.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Certificados</span>
              <span className="text-xs font-mono font-black text-sky-300 tabular-nums">
                {data.totalCertificates} emit. • {data.pendingCertificatesCount} cola
              </span>
            </div>
            <div className="px-2.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Ingresos Caja</span>
              <span className="text-xs font-mono font-black text-emerald-300 tabular-nums">
                {formatRevenue(data.approvedRevenue)}
              </span>
            </div>
          </div>
        </MotionFadeIn>

        {/* Right: Operational Pipeline + Active Workshops (5 cols) */}
        <MotionFadeIn
          delay={0.18}
          className="lg:col-span-5 h-full rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-3"
        >
          <div className="space-y-3">
            {/* Live Pipeline Distribution Strip from DB */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Flujo de Registros en Vivo</span>
                </span>
                <span className="text-slate-400">{data.totalRegistrations} totales</span>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden flex border border-slate-800">
                <div
                  className="bg-cyan-400 h-full transition-all duration-700"
                  style={{ width: `${attendedPct}%` }}
                  title={`Asistieron: ${data.totalAttended}`}
                />
                <div
                  className="bg-emerald-400 h-full transition-all duration-700"
                  style={{ width: `${confirmedPct}%` }}
                  title={`Confirmados: ${data.confirmedCount}`}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-700"
                  style={{ width: `${pendingPayPct}%` }}
                  title={`Pago Pendiente: ${data.pendingPaymentsCount}`}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Asist. {data.totalAttended}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Conf. {data.confirmedCount}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Pend. {data.pendingPaymentsCount}
                </span>
              </div>
            </div>

            {/* Active Workshops List */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h2 className="text-base font-extrabold text-white">
                  Agenda Activa ({data.activeWorkshops.length})
                </h2>
              </div>
              <Link
                href="/admin/eventos"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {data.activeWorkshops.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">
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
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
                    >
                      <div className="w-14 h-11 rounded-lg overflow-hidden border border-slate-800 shrink-0 relative bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.image}
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                            {ev.title}
                          </p>
                          <span className="text-[10px] font-mono font-bold text-slate-300 shrink-0">
                            {formatCurrency(Number(ev.price), ev.currency)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-0.5 mb-1">
                          <span>{formatShortDate(ev.startDate)}</span>
                          <span className="text-cyan-400 font-bold tabular-nums">
                            {ev._count.registrations}/{ev.maxCapacity} cupos
                          </span>
                        </div>
                        <AnimatedProgressBar percentage={occupancy} className="h-1" />
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
            <Link
              href="/admin/asistentes"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold text-slate-200 transition-all"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Asistentes ({data.totalRegistrations})</span>
            </Link>
            <Link
              href="/admin/certificados"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold text-slate-200 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certificados ({data.totalCertificates})</span>
            </Link>
          </div>
        </MotionFadeIn>
      </div>
    </div>
  );
}
