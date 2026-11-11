import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getWorkshopMedia } from "@/lib/utils/workshop-media";
import Link from "next/link";
import {
  PlusCircle,
  Calendar,
  Users,
  Clock,
  Globe,
  ExternalLink,
  Layers,
  Award,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

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

  const openCount = events.filter((e) => e.status === "OPEN").length;
  const totalOccupied = events.reduce((acc, e) => acc + e._count.registrations, 0);

  return (
    <div className="space-y-6">
      {/* Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>GESTIÓN ACADÉMICA • CATÁLOGO</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Talleres y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Conferencias
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Administra aforos, precios, horarios y acceso directo a las landing públicas de cada capacitación.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">ABIERTOS</span>
                <strong className="text-cyan-400 font-black">
                  {openCount}/{events.length}
                </strong>
              </div>
              <div className="w-px h-7 bg-slate-800" />
              <div>
                <span className="text-slate-400 block text-[10px]">INSCRITOS</span>
                <strong className="text-white font-black">{totalOccupied}</strong>
              </div>
            </div>

            <Link
              href="/admin/eventos/nuevo"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Programar Taller</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Workshop Cards Grid with Distinct Images */}
      {events.length === 0 ? (
        <div className="rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-12 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">No hay talleres programados aún.</p>
          <Link
            href="/admin/eventos/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-extrabold uppercase"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Crear Primer Taller</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => {
            const media = getWorkshopMedia(event.slug, idx);
            const available = Math.max(0, event.maxCapacity - event._count.registrations);
            const fillPct =
              event.maxCapacity > 0
                ? Math.min(100, Math.round((event._count.registrations / event.maxCapacity) * 100))
                : 0;
            const priceLabel =
              Number(event.price) === 0
                ? "Gratuito"
                : formatCurrency(Number(event.price), event.currency);

            return (
              <div
                key={event.id}
                className="group relative bg-[#0b0e14]/95 border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col shadow-xl backdrop-blur-md hover:border-cyan-500/50 transition-all"
              >
                {/* Cover Banner + Floating Top Icon */}
                <div className="relative h-44 w-full bg-slate-950">
                  <div className="absolute inset-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media.image}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-slate-950/35 to-transparent" />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow-md">
                      {event.eventType}
                    </span>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase border ${
                        event.status === "OPEN"
                          ? "bg-emerald-950/90 text-emerald-300 border-emerald-600/50"
                          : "bg-rose-950/90 text-rose-300 border-rose-600/50"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  {/* Elevated Center Floating Icon */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-4 ring-[#0b0e14]">
                    <Award className="w-5 h-5 text-slate-950" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 pt-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="text-center space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                      {media.categoryLabel}
                    </span>
                    <h2 className="text-base font-extrabold text-white leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {event.title}
                    </h2>
                  </div>

                  {/* 3 Meta Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
                      <Globe className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-slate-200 block truncate">
                        {event.modality}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-1" />
                      <span className="text-[10px] font-mono font-bold text-slate-200 block">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-1" />
                      <span className="text-[10px] font-mono font-bold text-slate-200 block">
                        {event.academicHours}h
                      </span>
                    </div>
                  </div>

                  {/* Capacity & Investment */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        Aforo:{" "}
                        <strong className="text-cyan-400 font-mono">
                          {event._count.registrations}/{event.maxCapacity}
                        </strong>{" "}
                        ({available} libres)
                      </span>
                      <span className="font-mono font-black text-white text-xs">
                        {priceLabel}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: `${Math.max(5, fillPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <Link
                      href={`/eventos/${event.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 font-extrabold text-[11px] uppercase tracking-wider transition-all"
                    >
                      <span>Ver Landing</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/admin/asistentes"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-cyan-500/40 font-bold text-[11px] uppercase tracking-wider transition-all"
                    >
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Asistentes</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
