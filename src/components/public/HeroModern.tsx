"use client";

import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Star,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Tv,
} from "lucide-react";
import { ConferenceCarousel } from "./ConferenceCarousel";

export function HeroModern() {
  return (
    <div className="relative bg-[#fcfcfd] text-slate-900 overflow-hidden lg:min-h-[calc(100vh-80px)] flex flex-col justify-between pt-6 lg:pt-10">
      {/* Background Tech Circuit Grid (Light and crisp matching reference) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-circuit-light"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 10 L 40 10 L 60 30 L 110 30"
              fill="none"
              stroke="#701121"
              strokeWidth="1.2"
            />
            <circle cx="10" cy="10" r="3" fill="#701121" />
            <circle cx="110" cy="30" r="3" fill="#701121" />
            <path
              d="M 30 70 L 60 70 L 80 90 L 110 90"
              fill="none"
              stroke="#c29b38"
              strokeWidth="1.2"
            />
            <circle cx="30" cy="70" r="2.5" fill="#c29b38" />
            <circle cx="110" cy="90" r="2.5" fill="#c29b38" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-circuit-light)" />
      </svg>

      {/* Hero Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#701121] text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#701121]" />
              <span>Capacitación Técnica Avanzada 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-[1.08]">
              La ingeniería{" "}
              <span className="block text-slate-900">
                que tu futuro{" "}
                <span className="relative inline-block text-[#701121]">
                  necesita
                  {/* Hand-drawn golden brush underline matching Tech Home reference */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3.5 text-[#c29b38] pointer-events-none"
                    viewBox="0 0 250 20"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 3 14 C 60 6, 170 8, 245 12 C 180 17, 70 19, 3 14 Z"
                      fill="#c29b38"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              <strong className="text-slate-900 font-bold">DevCon Workshops</strong> es el instituto especializado en arquitectura distribuida, microservicios, seguridad en APIs y cloud computing para ingenieros de software.
            </p>

            {/* Action Buttons (Gold & Crimson matching Tech Home design) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#eventos"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#c29b38] hover:bg-[#a6822c] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/25 hover:scale-[1.02] cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Ver Talleres Disponibles</span>
              </a>

              <Link
                href="/verificar"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#701121] hover:bg-[#580b18] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-950/20 hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Verificar Certificados</span>
              </Link>
            </div>

            {/* Social Proof / Stars bar */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold">
                +500 ESTUDIANTES E INGENIEROS CONFÍAN EN DEVCON WORKSHOPS
              </span>
            </div>
          </div>

          {/* Right Column: Prominent Academic Conference Image Keynote Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient subtle glow behind container */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-rose-500/10 via-amber-500/10 to-slate-500/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            {/* Showcase Container */}
            <div className="relative w-full rounded-3xl bg-white border border-slate-200/90 p-3 shadow-2xl group">
              {/* Device Window Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-3 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-600 font-mono truncate font-semibold">
                  auditorio-central.ingenieria.edu.bo
                </span>
                <span className="text-[10px] text-[#701121] font-bold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  CONFERENCIA MAGISTRAL
                </span>
              </div>

              {/* Main Academic Conference Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-conference.jpg"
                  alt="Conferencia Magistral Académica de Ingeniería de Sistemas y Arquitectura Cloud"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                {/* Floating Top-Right Live Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-rose-500/40 text-rose-300 text-xs font-mono font-semibold flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>En Vivo: 350+ Asistentes</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                      <Tv className="w-4 h-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">Auditorio de Ingeniería de Sistemas</p>
                      <p className="text-[10px] text-slate-400 font-mono">Microservicios • Kubernetes • OWASP Top 10</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acreditado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ribbon Carousel (Passes 1-by-1 with official logos) */}
      <ConferenceCarousel />
    </div>
  );
}
