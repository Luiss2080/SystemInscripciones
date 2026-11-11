import Link from "next/link";
import FondoTech from "@/components/public/FondoTech";
import { prisma } from "@/lib/prisma";
import {
  Terminal,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Facilitador Principal | Ing. Alex Martínez | DevCon Workshops",
  description:
    "Perfil profesional, trayectoria académica, especializaciones y temarios dictados por el Ing. Alex Martínez.",
};

export default async function DocentePage() {
  const events = await prisma.event.findMany({
    where: {
      deletedAt: null,
      status: { not: "DRAFT" },
    },
    take: 4,
    orderBy: {
      startDate: "asc",
    },
  });

  const certifications = [
    {
      title: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      year: "2024 - 2027",
      detail: "Diseño de infraestructuras distribuidas, alta disponibilidad y arquitecturas multi-región.",
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      year: "2023 - 2026",
      detail: "Orquestación, networking avanzado, seguridad de clústeres y deployments Zero-Downtime.",
    },
    {
      title: "OWASP Certified Security Practitioner",
      issuer: "OWASP Global",
      year: "2023 - 2026",
      detail: "Blindaje de APIs REST/GraphQL, mitigación de vulnerabilidades críticas y ethical hacking.",
    },
    {
      title: "Postgrado en Seguridad Informática & Redes",
      issuer: "Facultad de Ingeniería de Sistemas",
      year: "Mención de Excelencia",
      detail: "Criptografía aplicada, autenticación Zero-Trust y análisis forense digital.",
    },
  ];

  const pillars = [
    {
      title: "Cero Diapositivas Pasivas",
      desc: "Todas las clases se desarrollan en la terminal, el IDE y clústeres en vivo. Cada línea de código se explica y despliega en tiempo real.",
    },
    {
      title: "Estándares de la Industria",
      desc: "Clean Architecture, Domain-Driven Design (DDD), pruebas automatizadas y contenedores Docker con escaneos de vulnerabilidades.",
    },
    {
      title: "Código Fuente en Repositorios",
      desc: "Acceso perpetuo al código fuente, scripts de despliegue de Terraform/K8s y documentación técnica en GitHub para cada asistente.",
    },
    {
      title: "Certificación con Hash Verificable",
      desc: "Garantía de respaldo técnico con código criptográfico único que cualquier empresa o institución puede validar en nuestra plataforma.",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-68px)] bg-[#030712] text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Cyber Tech Circuit Grid with Moving Accent Dots */}
      <FondoTech id="docente-page" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Profile Hero Card */}
        <div className="bg-slate-900/85 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Avatar & Meta */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-cyan-400/10 border-2 border-cyan-500/40 flex items-center justify-center shadow-2xl shadow-cyan-950/60 p-2">
                  <div className="w-full h-full rounded-2xl bg-slate-950/90 flex flex-col items-center justify-center border border-cyan-800/40">
                    <span className="font-mono font-black text-5xl sm:text-6xl text-cyan-400 tracking-tighter">
                      AM
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1 font-bold">
                      ING. DE SISTEMAS
                    </span>
                  </div>
                </div>

                {/* Status Dot */}
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-300 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
                  <span>DOCENTE ACTIVO</span>
                </span>
              </div>

              <h2 className="text-2xl font-black text-white mt-2">Ing. Alex Martínez</h2>
              <p className="text-xs font-mono text-cyan-400 font-bold mt-0.5">
                La Paz / Santa Cruz • Bolivia
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <a
                  href="https://wa.me/59171234567?text=Hola%20Ing.%20Alex%20Martínez,%20quisiera%20consultar%20sobre%20capacitaciones."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contactar Docente</span>
                </a>

                <Link
                  href="/#eventos"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25"
                >
                  <span>Ver Talleres</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Bio & Core Experience */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Facilitador & Arquitecto de Software</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Construyendo ingenieros capaces de liderar en entornos de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  alta demanda técnica
                </span>
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Con más de una década de experiencia práctica diseñando, implementando y asegurando arquitecturas de software distribuidas. He liderado la migración de sistemas legados monolíticos a microservicios elásticos con Docker y Kubernetes, blindado APIs bajo el rigor del estándar OWASP Top 10 y automatizado pipelines de integración y entrega continua para compañías del sector financiero, tecnológico y gubernamental.
              </p>

              {/* 4 Stats Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-2xl font-black font-mono text-cyan-400 block">10+</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Años en Producción</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-2xl font-black font-mono text-cyan-400 block">+500</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Alumnos Certificados</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-2xl font-black font-mono text-cyan-400 block">4.9</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Satisfacción Media</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-2xl font-black font-mono text-cyan-400 block">100%</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Hands-On en Vivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Methodology & Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 block mb-2">
              PRINCIPIOS PEDAGÓGICOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cómo se aprende en las capacitaciones del Ing. Alex Martínez
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Certifications & Diplomas */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 block mb-2">
              RESPALDO PROFESIONAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Acreditaciones & Certificaciones Internacionales
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-sm">
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40">
                    {cert.year}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 font-bold mb-2">
                  {cert.issuer}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {cert.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Upcoming Workshops */}
        {events.length > 0 && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 block mb-2">
                CATÁLOGO ACTIVO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Próximos Talleres Dictados por el Docente
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-bold text-[10px] uppercase">
                        {ev.eventType === "WORKSHOP" ? "Taller Práctico" : "Conferencia"}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {new Date(ev.startDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4 font-medium">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {Number(ev.price) === 0 ? "Gratuito" : `${Number(ev.price).toFixed(2)} ${ev.currency}`}
                    </span>

                    <Link
                      href={`/eventos/${ev.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-black text-white hover:text-cyan-400 uppercase tracking-wider transition-colors"
                    >
                      <span>Inscribirme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In-House Corporate Training CTA */}
        <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-blue-950/60 border border-cyan-800/60 rounded-3xl p-8 sm:p-10 text-center shadow-2xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-950/50">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            ¿Buscas Capacitación Corporativa In-House para tu Equipo de TI?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed font-medium">
            Diseñamos programas a la medida para empresas de software, departamentos bancarios y universidades con foco en arquitecturas modernas, seguridad y CI/CD.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"
            >
              <span>Solicitar Propuesta In-House</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/verificar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Verificar Certificados</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
