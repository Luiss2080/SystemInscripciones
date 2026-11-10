"use client";

import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
} from "lucide-react";

export function HeroModern() {
  const ribbonCards = [
    {
      num: "01",
      title: "TALLER DOCKER & K8S",
      loc: "VIRTUAL EN VIVO",
      rating: "5.0 / 5.0",
      hours: "6 HRS",
      tag: "HANDS-ON",
      slug: "taller-microservicios-docker-kubernetes",
    },
    {
      num: "02",
      title: "MASTERCLASS OWASP",
      loc: "MODALIDAD HÍBRIDA",
      rating: "4.9 / 5.0",
      hours: "8 HRS",
      tag: "SEGURIDAD",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
    },
    {
      num: "03",
      title: "AGENTES DE IA & MCP",
      loc: "CONFERENCIA VIRTUAL",
      rating: "5.0 / 5.0",
      hours: "4 HRS",
      tag: "INNOVACIÓN",
      slug: "conferencia-agentes-ia-ingenieria-software",
    },
    {
      num: "04",
      title: "ARQUITECTURA CLOUD",
      loc: "LABORATORIOS AWS & GCP",
      rating: "5.0 / 5.0",
      hours: "10 HRS",
      tag: "ENTERPRISE",
      slug: "taller-microservicios-docker-kubernetes",
    },
    {
      num: "05",
      title: "CI/CD & DEVOPS",
      loc: "GITHUB ACTIONS",
      rating: "4.9 / 5.0",
      hours: "6 HRS",
      tag: "PIPELINES",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
    },
  ];

  return (
    <div className="relative bg-slate-950 text-slate-100 overflow-hidden pt-8 md:pt-14">
      {/* Background neon glow spots */}
      <div className="tech-glow-cyan top-12 left-1/4 w-[500px] h-[350px]" />
      <div className="tech-glow-blue top-24 right-10 w-[550px] h-[400px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Capacitación Técnica Avanzada 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              La ingeniería{" "}
              <span className="block text-slate-100">
                que tu futuro{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  necesita
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              <strong className="text-slate-200 font-semibold">DevCon Workshops</strong> es la plataforma de especialización práctica en arquitectura distribuida, microservicios y ciberseguridad para ingenieros de sistemas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#eventos"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02] cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-slate-950" />
                <span>Ver Talleres Disponibles</span>
              </a>

              <Link
                href="/verificar"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Verificar Certificados</span>
              </Link>
            </div>

            {/* Social Proof / Stars bar */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
                +500 ESTUDIANTES E INGENIEROS CONFÍAN EN NUESTROS TALLERES
              </span>
            </div>
          </div>

          {/* Right Column: Featured Image with Glassmorphism Bezel (Replaces the 3 card reels) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient halo glow behind image */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

            {/* Image Showcase Container */}
            <div className="relative w-full rounded-3xl bg-slate-900/80 border border-slate-700/80 p-3 shadow-2xl backdrop-blur-xl group">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono truncate">
                  architecture-lab.k8s.local
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  LIVE SESSION
                </span>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-engineering.jpg"
                  alt="Laboratorio de Arquitectura Cloud e Ingeniería de Sistemas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                {/* Floating Top-Right Live Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Nodos Activos: 100%</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">Laboratorios Hands-on</p>
                      <p className="text-[10px] text-slate-400 font-mono">Microservicios • Kubernetes • OWASP</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Acreditado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ribbon Carousel (High-tech Slate & Cyan styling) */}
      <div className="w-full bg-slate-900/90 border-t border-slate-800 py-4 px-4 sm:px-6 relative shadow-inner backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Scroll left button */}
          <button
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white shrink-0 hidden md:block cursor-pointer transition-colors"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Carousel Cards Track */}
          <div className="flex items-center gap-4 overflow-x-auto py-1 scrollbar-none w-full">
            {ribbonCards.map((card, i) => (
              <div
                key={i}
                className="shrink-0 w-64 bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-400">
                    <span className="font-bold text-cyan-400">{card.num} TALLER</span>
                    <span className="text-slate-400 font-medium">{card.hours}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mb-1 group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{card.rating}</span>
                    <span>•</span>
                    <span className="truncate">{card.loc}</span>
                  </div>
                </div>

                <Link
                  href={`/eventos/${card.slug}`}
                  className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500 border border-slate-800 hover:border-cyan-400 text-slate-200 hover:text-slate-950 text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <span>VER DETALLES</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll right button */}
          <button
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white shrink-0 hidden md:block cursor-pointer transition-colors"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
