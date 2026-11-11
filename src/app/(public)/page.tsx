import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ServiciosGrid from "@/components/public/ServiciosGrid";
import { Preloader } from "@/components/public/Preloader";
import { HeroModern } from "@/components/public/HeroModern";
import FondoTech from "@/components/public/FondoTech";
import MetodologiaSection from "@/components/public/MetodologiaSection";
import TechStackSection from "@/components/public/TechStackSection";
import StatsSection from "@/components/public/StatsSection";
import FaqSection from "@/components/public/FaqSection";
import CtaBanner from "@/components/public/CtaBanner";
import {
  Terminal,
  Sparkles,
  ArrowRight,
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

      {/* Impact Stats Metrics Banner */}
      <StatsSection />

      {/* Talleres & Servicios Section (Dynamic categories, carousel cards, and official Cyber Cyan palette) */}
      <ServiciosGrid initialEvents={serializedEvents} />

      {/* Metodología & Ruta de Aprendizaje 4 Steps */}
      <MetodologiaSection />

      {/* Tech Stack & Herramientas de Producción */}
      <TechStackSection />

      {/* Facilitator / Speaker Bio Section with Unified Background & Moving Dots */}
      <section id="docente" className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800/80">
        <FondoTech id="docente" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900/80 rounded-3xl p-8 sm:p-12 border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4 md:col-span-2 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Facilitador & Docente Principal</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Ing. Alex Martínez
                </h2>
                <p className="text-cyan-400 font-mono text-sm font-bold">
                  Systems Engineer • Cloud Solutions Architect • Cybersecurity Consultant
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Con más de 10 años de experiencia diseñando arquitecturas distribuidas de alta escala, contenerización con Docker/Kubernetes y pipelines de integración continua. Especializado en transferir conocimiento directamente aplicable al entorno laboral de producción.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Kubernetes",
                    "Docker",
                    "Microservicios",
                    "Next.js",
                    "PostgreSQL",
                    "OWASP Top 10",
                    "AI Agents & MCP",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 text-white text-center shadow-xl relative overflow-hidden group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl relative mb-4 bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-engineering.jpg"
                    alt="Ing. Alex Martínez"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </div>
                <span className="font-extrabold text-white text-lg">Ing. Alex Martínez</span>
                <p className="text-xs text-cyan-400 font-mono font-bold mt-0.5">
                  Facilitador Principal
                </p>
                <p className="text-xs text-slate-400 mt-2 max-w-xs">
                  Aprende creando arquitecturas que escalan en entornos reales de producción.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href="/docente"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Ver Trayectoria</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
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
