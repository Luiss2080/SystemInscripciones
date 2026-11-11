"use client";

import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Star,
  Sparkles,
  Tv,
  CheckCircle2,
} from "lucide-react";
import { ConferenceCarousel } from "./ConferenceCarousel";
import FondoTech from "./FondoTech";

export function HeroModern() {
  return (
    <div className="relative bg-[#030712] text-slate-100 overflow-hidden h-[calc(100vh-68px)] max-h-[calc(100vh-68px)] flex flex-col justify-between">
      {/* Background Cyber Tech Circuit Grid with Moving Accent Dots */}
      <FondoTech id="hero" />

      {/* Middle Hero Content: Perfectly vertically centered and fitted for Fullscreen */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-0 py-2 sm:py-3 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Capacitación Técnica Avanzada 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black tracking-tight text-white leading-[1.12]">
              Domina la{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Ingeniería de Software
              </span>{" "}
              con talleres de nivel productivo
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed line-clamp-3">
              Arquitectura de microservicios, seguridad en APIs, cloud computing y agentes de inteligencia artificial. Conviértete en el ingeniero que lidera equipos de tecnología.
            </p>

            {/* Action Buttons (Original Cyan & Dark Glass) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#eventos"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02] cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-slate-950" />
                <span>Ver Talleres Disponibles</span>
              </a>

              <Link
                href="/verificar"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Validar Certificado</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-1 flex items-center gap-2.5 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                +500 ESTUDIANTES E INGENIEROS CONFÍAN EN DEVCON WORKSHOPS
              </span>
            </div>
          </div>

          {/* Right Column: Academic Conference Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient Cyan/Blue Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-transparent rounded-2xl blur-xl opacity-70 pointer-events-none" />

            {/* Showcase Container */}
            <div className="relative w-full max-w-lg rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-2xl group backdrop-blur-sm">
              {/* Window Header */}
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-800/80 mb-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono truncate font-medium">
                  auditorio-central.ingenieria.edu.bo
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  CONFERENCIA MAGISTRAL
                </span>
              </div>

              {/* Main Academic Conference Image */}
              <div className="relative aspect-[16/10] max-h-[250px] lg:max-h-[280px] w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-conference.jpg"
                  alt="Conferencia Magistral Académica de Ingeniería de Sistemas y Arquitectura Cloud"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-85" />

                {/* Floating Top-Right Live Badge */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>En Vivo: 350+ Asistentes</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center">
                      <Tv className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px] leading-tight">Auditorio de Ingeniería de Sistemas</p>
                      <p className="text-[9px] text-slate-400 font-mono">Microservicios • Kubernetes • OWASP Top 10</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>Acreditado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ribbon Carousel (Compact, Step-by-Step, Full Width) */}
      <ConferenceCarousel />
    </div>
  );
}
