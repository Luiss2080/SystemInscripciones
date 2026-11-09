"use client";

import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
  ShieldCheck,
  Code2,
  VolumeX,
  Heart,
  MessageSquare,
  Zap,
  CheckCircle2,
} from "lucide-react";

export function HeroModern() {
  const ribbonCards = [
    {
      num: "01",
      title: "TALLER DOCKER & K8S",
      loc: "VIRTUAL EN VIVO",
      rating: "4.9 / 5.0",
      hours: "6 HRS",
      slug: "taller-microservicios-docker-kubernetes",
    },
    {
      num: "02",
      title: "MASTERCLASS OWASP",
      loc: "MODALIDAD HÍBRIDA",
      rating: "5.0 / 5.0",
      hours: "8 HRS",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
    },
    {
      num: "03",
      title: "AGENTES DE IA & MCP",
      loc: "CONFERENCIA VIRTUAL",
      rating: "4.9 / 5.0",
      hours: "4 HRS",
      slug: "conferencia-agentes-ia-ingenieria-software",
    },
    {
      num: "04",
      title: "ARQUITECTURA CLOUD",
      loc: "LABORATORIOS AWS & GCP",
      rating: "5.0 / 5.0",
      hours: "10 HRS",
      slug: "taller-microservicios-docker-kubernetes",
    },
    {
      num: "05",
      title: "CI/CD PIPELINES",
      loc: "GITHUB ACTIONS",
      rating: "4.8 / 5.0",
      hours: "6 HRS",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
    },
  ];

  return (
    <div className="relative bg-slate-950 text-slate-100 overflow-hidden pt-8 md:pt-14">
      {/* Background HUD circuit graphics */}
      <div className="absolute top-10 left-6 w-52 h-52 border border-slate-800 rounded-full flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-36 h-36 border border-rose-500/30 rounded-full flex items-center justify-center">
          <div className="w-20 h-20 border border-amber-500/20 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content, Headlines & Action Pills) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              La ingeniería{" "}
              <span className="block text-slate-100">
                que tu futuro{" "}
                <span className="relative inline-block text-rose-500">
                  necesita
                  {/* Organic brush underline effect like in Image 2 */}
                  <span className="absolute left-0 -bottom-2 w-full h-2.5 bg-amber-500/80 rounded-full -rotate-1 pointer-events-none" />
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              <strong className="text-white font-semibold">DevCon Workshops</strong> es el centro de especialización práctica en arquitectura distribuida, cloud native y seguridad para ingenieros de sistemas, diseñado para acelerar tu carrera e impulsar proyectos reales.
            </p>

            {/* Action Buttons (Gold & Deep Crimson Pills) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#eventos"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/40 hover:scale-[1.02]"
              >
                <GraduationCap className="w-4 h-4 text-slate-950" />
                <span>Ver Talleres</span>
              </a>

              <Link
                href="/verificar"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-rose-900 hover:bg-rose-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-950/50 hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4 text-rose-300" />
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
                +500 ESTUDIANTES E INGENIEROS CONFÍAN EN DEVCON WORKSHOPS
              </span>
            </div>
          </div>

          {/* Right Column: 3 Floating Mobile Reels Showcase (Exact replica of Image 2) */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[440px]">
            {/* Reel Card 1 (Left tilt) */}
            <div className="w-52 h-96 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl p-3 flex flex-col justify-between transform -rotate-6 -mr-8 z-10 opacity-80 hover:opacity-100 hover:scale-105 transition-all">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  NUEVO
                </span>
                <VolumeX className="w-3.5 h-3.5" />
              </div>

              {/* Lab Visual representation */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left my-auto space-y-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <h4 className="text-xs font-bold text-white leading-snug">
                  Docker & Kubernetes
                </h4>
                <p className="text-[10px] text-slate-400">
                  Despliegue multi-contenedor con rolling updates.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> 84
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Hands-on
                </span>
              </div>
            </div>

            {/* Reel Card 2 (Center, prominent, straight, higher z-index) */}
            <div className="w-60 h-[420px] rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-black border-2 border-rose-600/70 shadow-2xl shadow-rose-950/40 p-4 flex flex-col justify-between z-20 hover:scale-[1.03] transition-all">
              {/* Top tag */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-900 text-white font-extrabold text-[10px] uppercase tracking-wider">
                  EN VIVO
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  DevCon Lab
                </span>
              </div>

              {/* Central text & icon graphic */}
              <div className="text-center space-y-3 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-rose-950/60">
                  <Terminal className="w-8 h-8 text-slate-950 font-bold" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                    CAPACITACIÓN REAL
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">
                    APRENDIZAJE PRÁCTICO
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Código de producción</span>
                </div>
              </div>

              {/* Bottom stats bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1 text-slate-300 font-semibold">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> 142
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> 36
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                  <Zap className="w-4 h-4" /> 100%
                </span>
              </div>
            </div>

            {/* Reel Card 3 (Right tilt) */}
            <div className="w-52 h-96 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl p-3 flex flex-col justify-between transform rotate-6 -ml-8 z-10 opacity-80 hover:opacity-100 hover:scale-105 transition-all">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  MASTERCLASS
                </span>
                <VolumeX className="w-3.5 h-3.5" />
              </div>

              {/* Lab Visual representation */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left my-auto space-y-2">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h4 className="text-xs font-bold text-white leading-snug">
                  Seguridad OWASP APIs
                </h4>
                <p className="text-[10px] text-slate-400">
                  Ethical hacking y blindaje contra vulnerabilidades.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> 98
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Hardening
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ribbon Carousel (Exact deep crimson strip format from Image 2) */}
      <div className="w-full bg-rose-950 border-t-2 border-rose-800 py-4 px-4 sm:px-6 relative shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Scroll left button */}
          <button
            className="p-2 rounded-full bg-rose-900 hover:bg-rose-800 text-white shrink-0 hidden md:block cursor-pointer transition-colors"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Carousel Cards Track */}
          <div className="flex items-center gap-4 overflow-x-auto py-1 scrollbar-none w-full">
            {ribbonCards.map((card, i) => (
              <div
                key={i}
                className="shrink-0 w-64 bg-slate-950 border border-rose-800/80 rounded-2xl p-3.5 text-left flex flex-col justify-between hover:border-amber-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-400">
                    <span className="font-bold text-amber-400">{card.num} TALLER</span>
                    <span>{card.hours}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mb-1">
                    {card.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{card.rating}</span>
                    <span>•</span>
                    <span className="truncate">{card.loc}</span>
                  </div>
                </div>

                <Link
                  href={`/eventos/${card.slug}`}
                  className="w-full py-1.5 rounded-lg bg-rose-900 hover:bg-rose-800 text-white text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <span>VER DETALLES</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll right button */}
          <button
            className="p-2 rounded-full bg-rose-900 hover:bg-rose-800 text-white shrink-0 hidden md:block cursor-pointer transition-colors"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
