import { prisma } from "@/lib/prisma";
import { EventCard } from "@/components/EventCard";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Award,
  Users,
  Code2,
  Sparkles,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// Server Component (RSC)
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

  return (
    <div className="relative overflow-hidden">
      {/* Background cyber ambient glow */}
      <div className="tech-glow top-0 left-1/4 w-[500px] h-[400px] bg-cyan-600/15" />
      <div className="tech-glow top-40 right-10 w-[600px] h-[500px] bg-blue-600/10" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-8 animate-pulse">
          <Sparkles className="w-4 h-4" />
          <span>Capacitación Técnica Avanzada 2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-5xl mx-auto leading-[1.1] mb-6">
          Domina la <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Ingeniería de Software</span> con talleres de nivel productivo
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Arquitectura de microservicios, seguridad en APIs, cloud computing y agentes de inteligencia artificial. Conviértete en el ingeniero que lidera equipos de tecnología.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#eventos"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 text-base"
          >
            <span>Ver Talleres Disponibles</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <Link
            href="/verificar"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-semibold transition-all text-base flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Validar Certificado</span>
          </Link>
        </div>

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border-slate-800">
            <Code2 className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-2xl font-bold font-mono text-slate-100">100%</div>
            <p className="text-xs text-slate-400">Práctico con laboratorios y código real</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 border-slate-800">
            <Award className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-2xl font-bold font-mono text-slate-100">Certificado</div>
            <p className="text-xs text-slate-400">Con código QR y validación oficial</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl font-bold font-mono text-slate-100">Acreditación QR</div>
            <p className="text-xs text-slate-400">Ticket digital inteligente con check-in</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 border-slate-800">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-2xl font-bold font-mono text-slate-100">Cupos Limitados</div>
            <p className="text-xs text-slate-400">Atención personalizada y Q&A en vivo</p>
          </div>
        </div>
      </section>

      {/* Speaker Info Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-3 md:col-span-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-xs font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Facilitador & Docente</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Ing. Alex Martínez
              </h2>
              <p className="text-cyan-400 font-mono text-sm">
                Systems Engineer • Cloud Solutions Architect • Cybersecurity Consultant
              </p>
              <p className="text-sm text-slate-400 leading-relaxed pt-2">
                Con más de 10 años de experiencia diseñando arquitecturas distribuidas de alta escala, pipelines de despliegue continuo y sistemas con tolerancia a fallos. Comprometido con la difusión de metodologías modernas de desarrollo guiado por especificaciones (SDD) y seguridad integral.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Kubernetes", "Docker", "Next.js", "PostgreSQL", "OWASP Top 10", "AI Agents"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-cyan-950/30 to-slate-900/40 border border-cyan-800/40 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-3xl text-slate-950 shadow-xl mb-3">
                AM
              </div>
              <span className="font-bold text-slate-200 text-base">Sesiones Hands-On</span>
              <p className="text-xs text-slate-400 mt-1">
                Aprende creando código que escala en entornos reales de producción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Catalog Section */}
      <section id="eventos" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-2">
              Agenda Académica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Talleres y Conferencias Disponibles
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Selecciona un evento para revisar el temario completo, requisitos previos e inscribirte directamente.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Cpu className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-200 mb-2">
              Próximamente nuevas fechas
            </h3>
            <p className="text-sm text-slate-400">
              Estamos preparando nuevos talleres y masterclasses. Regresa pronto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
