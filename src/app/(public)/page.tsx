import { prisma } from "@/lib/prisma";
import { EventCatalog } from "@/components/EventCatalog";
import { Preloader } from "@/components/public/Preloader";
import { HeroModern } from "@/components/public/HeroModern";
import {
  Terminal,
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

      {/* Modern Hero section with academic conference image and compact 1-by-1 logo carousel */}
      <HeroModern />

      {/* Facilitator / Speaker Bio Section */}
      <section id="docente" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-cyan-950/30 via-slate-900/60 to-slate-950 border border-cyan-800/40 text-white text-center shadow-xl">
              <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-black text-4xl text-cyan-400 shadow-2xl mb-4">
                AM
              </div>
              <span className="font-extrabold text-white text-lg">Sesiones Hands-On</span>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Aprende creando arquitecturas que escalan en entornos reales de producción.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs text-cyan-400 font-bold">
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
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-cyan-400 block mb-2">
              Agenda Académica 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
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
