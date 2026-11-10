import { prisma } from "@/lib/prisma";
import { EventCatalog } from "@/components/EventCatalog";
import { Preloader } from "@/components/public/Preloader";
import { HeroModern } from "@/components/public/HeroModern";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Award,
  Users,
  Code2,
  CheckCircle2,
  Sparkles,
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

  return (
    <div className="relative bg-slate-950 text-slate-100 overflow-hidden">
      {/* Preloader with circular progress and terminal logs */}
      <Preloader />

      {/* Modern Hero section with floating Reels and bottom ribbon */}
      <HeroModern />

      {/* Facilitator / Speaker Bio Section */}
      <section id="docente" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-4 md:col-span-2 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 text-xs font-semibold">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Facilitador & Docente Principal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ing. Alex Martínez
              </h2>
              <p className="text-cyan-400 font-mono text-sm font-semibold">
                Systems Engineer • Cloud Solutions Architect • Cybersecurity Consultant
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
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
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center shadow-xl">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-4xl text-slate-950 shadow-2xl shadow-cyan-500/20 mb-4">
                AM
              </div>
              <span className="font-extrabold text-white text-lg">Sesiones Hands-On</span>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Aprende creando arquitecturas que escalan en entornos reales de producción.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cursos 100% Prácticos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Catalog Section */}
      <section id="eventos" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-2">
              Agenda Académica 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Talleres y Conferencias Disponibles
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Selecciona un taller para revisar el temario completo, requisitos previos e inscribirte directamente con pase QR.
          </p>
        </div>

        <EventCatalog initialEvents={events} />
      </section>
    </div>
  );
}
