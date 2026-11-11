"use client";

import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Tv,
  CheckCircle2,
  Users,
} from "lucide-react";
import { ConferenceCarousel } from "./ConferenceCarousel";
import FondoTech from "@/components/shared/FondoTech";
import { getWorkshopMedia } from "@/lib/utils/workshop-media";
import type { PublicEventDTO, PublicSiteStats } from "@/types/events";

interface HeroModernProps {
  events: PublicEventDTO[];
  stats: PublicSiteStats;
}

export function HeroModern({ events, stats }: HeroModernProps) {
  const featuredEvent = events[0];
  const featuredSeatsLeft = featuredEvent
    ? Math.max(0, featuredEvent.maxCapacity - featuredEvent.registrationsCount)
    : 0;
  const featuredImage = featuredEvent
    ? getWorkshopMedia(featuredEvent.slug, 0).image
    : "/images/hero-conference.jpg";

  return (
    <div className="relative bg-[#030712] text-slate-100 overflow-hidden min-h-[calc(100vh-68px)] flex flex-col justify-between">
      <FondoTech id="hero" />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-6 sm:py-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          {/* Left Column: Headlines & Live DB Proof */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agenda Técnica Activa • {stats.totalEvents} Capacitaciones</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black tracking-tight text-white leading-[1.12]">
              Domina la{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Ingeniería de Software
              </span>{" "}
              con talleres de nivel productivo
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              Arquitectura de microservicios, seguridad en APIs, cloud computing y agentes de inteligencia artificial. Inscripción en tiempo real con pase QR y certificación verificable.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#eventos"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02] cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-slate-950" />
                <span>Ver Talleres ({stats.totalEvents})</span>
              </a>

              <Link
                href="/verificar"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Validar Certificado</span>
              </Link>
            </div>

            {/* Real Database Live Telemetry Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>{stats.totalRegistrations} inscritos registrados</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{stats.totalAcademicHours}h académicas acumuladas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{stats.totalCertificates} certificados QR</span>
              </span>
            </div>
          </div>

          {/* Right Column: Live Featured DB Workshop Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-transparent rounded-2xl blur-xl opacity-70 pointer-events-none" />

            <div className="relative w-full max-w-lg rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-2xl group backdrop-blur-sm">
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-800/80 mb-2 text-xs font-mono text-slate-400 gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono truncate font-medium">
                  {featuredEvent ? `/eventos/${featuredEvent.slug}` : "agenda-oficial"}
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 shrink-0">
                  {featuredEvent?.eventType || "PROGRAMA"}
                </span>
              </div>

              <div className="relative aspect-[16/10] max-h-[250px] lg:max-h-[280px] w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImage}
                  alt={featuredEvent?.title || "Plataforma de Talleres Técnicos"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>
                    {featuredEvent
                      ? `${featuredSeatsLeft}/${featuredEvent.maxCapacity} Cupos Libres`
                      : "Agenda Activa"}
                  </span>
                </div>

                <Link
                  href={featuredEvent ? `/eventos/${featuredEvent.slug}` : "#eventos"}
                  className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-lg bg-slate-950/90 hover:bg-slate-950 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between gap-3 text-xs text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0">
                      <Tv className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-[11px] leading-tight truncate">
                        {featuredEvent?.title || "Catálogo de Capacitación Técnica"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        {featuredEvent
                          ? `${featuredEvent.modality} • ${featuredEvent.academicHours}h • ${featuredEvent.speakerName}`
                          : stats.leadSpeakerName}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{featuredEvent?.status || "OPEN"}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ribbon Carousel driven by PostgreSQL events */}
      <ConferenceCarousel events={events} />
    </div>
  );
}
