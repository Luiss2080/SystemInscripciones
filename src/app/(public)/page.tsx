import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ServiciosGrid from "@/components/public/ServiciosGrid";
import { Preloader } from "@/components/public/Preloader";
import { HeroModern } from "@/components/public/HeroModern";
import FondoTech from "@/components/public/FondoTech";
import MetodologiaSection from "@/components/public/MetodologiaSection";
import TechStackSection from "@/components/public/TechStackSection";
import FaqSection from "@/components/public/FaqSection";
import CtaBanner from "@/components/public/CtaBanner";
import {
  Terminal,
  Sparkles,
  ArrowRight,
  Award,
  ShieldCheck,
  Cloud,
  Check,
} from "lucide-react";

export default async function HomePage() {
  const events = await prisma.event.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      startDate: "asc",
    },
    include: {
      _count: {
        select: {
          registrations: {
            where: {
              status: { in: ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"] },
            },
          },
        },
      },
    },
  });

  const serializedEvents = events.map((event) => ({
    ...event,
    price: Number(event.price),
    startDate: event.startDate.toISOString(),
    endDate: event.endDate ? event.endDate.toISOString() : null,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
    deletedAt: event.deletedAt ? event.deletedAt.toISOString() : null,
  }));

  return (
    <div className="relative bg-[#030712] text-slate-100 overflow-hidden">
      {/* Preloader with circular progress and terminal logs */}
      <Preloader />

      {/* Modern Hero section with academic conference image and compact 1-by-1 logo carousel */}
      <HeroModern />

      {/* Talleres & Servicios Section (Dynamic categories, carousel cards, and official Cyber Cyan palette) */}
      <ServiciosGrid initialEvents={serializedEvents} />

      {/* Metodología & Ruta de Aprendizaje 4 Steps */}
      <MetodologiaSection />

      {/* Tech Stack & Herramientas de Producción */}
      <TechStackSection />

      {/* Facilitator / Speaker Bio Section with Unified Background & Modern Cards */}
      <section id="docente" className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800/80">
        <FondoTech id="docente" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          {/* Section Header Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
              FACILITADOR & ARQUITECTO PRINCIPAL
            </span>
          </div>

          {/* Section Title */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Aprende directamente con un ingeniero en{" "}
              <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                producción real
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
              Trayectoria comprobada liderando arquitecturas cloud de alta escala, blindaje de APIs críticas y mentoría práctica enfocada en el mundo laboral.
            </p>
          </div>

          {/* Two-Column Executive Profile & Showcase Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Detailed Credentials & Experience */}
            <div className="lg:col-span-7 bg-[#0b0e14] border border-slate-800/80 rounded-3xl p-7 sm:p-10 shadow-2xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Perfil Técnico & Especialización</span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Ing. Alex Martínez
                  </h3>
                  <p className="text-cyan-400 font-mono text-xs sm:text-sm font-bold mt-1.5">
                    Systems Engineer • Cloud Solutions Architect • Cybersecurity Consultant
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Con más de 10 años de experiencia diseñando arquitecturas distribuidas de alta disponibilidad, migrando sistemas monolíticos a microservicios elásticos con Docker y Kubernetes, y automatizando pipelines CI/CD para entornos financieros y corporativos.
                </p>

                {/* 3 Verified Credentials Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-2.5">
                      <Cloud className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h4 className="text-xs font-black text-white leading-snug">
                      AWS Architect Pro
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      Infraestructura multi-región y Cloud Native
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-2.5">
                      <Award className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h4 className="text-xs font-black text-white leading-snug">
                      Kubernetes CKA
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      Orquestación elástica y Zero-Downtime
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-2.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h4 className="text-xs font-black text-white leading-snug">
                      OWASP Practitioner
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      Seguridad ofensiva y blindaje de APIs
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2.5">
                    STACK ENSEÑADO EN PRODUCCIÓN
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Kubernetes",
                      "Docker",
                      "Microservicios",
                      "Next.js 16",
                      "PostgreSQL 18",
                      "OWASP Top 10",
                      "AI Agents & MCP",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-slate-300 hover:border-cyan-700 hover:text-cyan-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Highlights Bar */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
                    <span>Código en vivo</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
                    <span>Repositorios GitHub</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
                    <span>Mentoría directa</span>
                  </span>
                </div>

                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>SOLICITAR CAPACITACIÓN IN-HOUSE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Card matching Modern Workshop Card System */}
            <div className="lg:col-span-5 bg-[#0b0e14] border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group relative">
              <div>
                {/* Top Photo Banner with Floating Icon OUTSIDE overflow-hidden (ENCIMA DE TODO) */}
                <div className="relative mb-8">
                  <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-engineering.jpg"
                      alt="Ing. Alex Martínez - Facilitador Principal"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Top-Left Role Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                        DOCENTE PRINCIPAL
                      </span>
                    </div>

                    {/* Top-Right Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-mono font-bold">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                        <span>+500 ALUMNOS</span>
                      </span>
                    </div>
                  </div>

                  {/* Floating Centered Icon: ENCIMA DE TODO (z-30, not clipped) */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 font-bold z-30 ring-4 ring-[#0b0e14]">
                    <Sparkles className="w-6 h-6 text-slate-950 stroke-[2.2]" />
                  </div>
                </div>

                {/* Centered Identity */}
                <div className="text-center mt-2 space-y-1.5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    SESIONES 100% PRÁCTICAS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Ing. Alex Martínez
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-medium">
                    Aprende creando arquitecturas reales que escalan sin fallos en entornos productivos.
                  </p>
                </div>

                {/* 3 Mini Metric Blocks */}
                <div className="grid grid-cols-3 gap-2 my-6">
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                      EXPERIENCIA
                    </span>
                    <span className="text-xs font-black text-cyan-400 block mt-0.5">
                      10+ Años
                    </span>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                      CALIFICACIÓN
                    </span>
                    <span className="text-xs font-black text-cyan-400 block mt-0.5">
                      4.9 / 5.0
                    </span>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                      FORMATO
                    </span>
                    <span className="text-xs font-black text-cyan-400 block mt-0.5">
                      Hands-On
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2.5">
                <a
                  href="https://wa.me/59171234567?text=Hola%20Ing.%20Alex%20Martínez,%20quisiera%20consultar%20sobre%20sus%20talleres."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-bold text-[11px] uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WHATSAPP</span>
                </a>

                <Link
                  href="/docente"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>VER TRAYECTORIA</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes (FAQ) Accordion */}
      <FaqSection />

      {/* Pre-Footer Quick CTA Banner */}
      <CtaBanner />
    </div>
  );
}
