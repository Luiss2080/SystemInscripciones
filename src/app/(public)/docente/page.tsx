import Link from "next/link";
import FondoTech from "@/components/shared/FondoTech";
import { prisma } from "@/lib/db/prisma";
import {
  Terminal,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Cloud,
  Cpu,
  Globe,
  Clock,
  Users,
  Check,
  Code2,
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
    take: 6,
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
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      tag: "Cloud Architecture",
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      year: "2023 - 2026",
      detail: "Orquestación, networking avanzado, seguridad de clústeres y deployments Zero-Downtime.",
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      tag: "Kubernetes & DevOps",
    },
    {
      title: "OWASP Certified Security Practitioner",
      issuer: "OWASP Global",
      year: "2023 - 2026",
      detail: "Blindaje de APIs REST/GraphQL, mitigación de vulnerabilidades críticas y ethical hacking.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      tag: "Cybersecurity & APIs",
    },
    {
      title: "Postgrado en Seguridad Informática & Redes",
      issuer: "Facultad de Ingeniería de Sistemas",
      year: "Mención de Excelencia",
      detail: "Criptografía aplicada, autenticación Zero-Trust y análisis forense digital.",
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      tag: "Postgrado Oficial",
    },
  ];

  const pillars = [
    {
      title: "Cero Diapositivas Pasivas",
      desc: "Todas las clases se desarrollan en la terminal, el IDE y clústeres en vivo. Cada línea de código se explica y despliega en tiempo real.",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Estándares de la Industria",
      desc: "Clean Architecture, Domain-Driven Design (DDD), pruebas automatizadas y contenedores Docker con escaneos de vulnerabilidades.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Código Fuente en Repositorios",
      desc: "Acceso perpetuo al código fuente, scripts de despliegue de Terraform/K8s y documentación técnica en GitHub para cada asistente.",
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Certificación con Hash Verificable",
      desc: "Garantía de respaldo técnico con código criptográfico único que cualquier empresa o institución puede validar en nuestra plataforma.",
      icon: <Award className="w-5 h-5 text-cyan-400" />,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-68px)] bg-[#030712] text-white overflow-hidden py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Cyber Tech Circuit Grid with Moving Accent Dots */}
      <FondoTech id="docente-page" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Profile Hero Card with Photo & Credentials */}
        <div
          id="perfil"
          className="scroll-mt-24 bg-[#0b0e14]/95 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Accompanied Photo Banner & Meta */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/60 relative group bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-engineering.jpg"
                    alt="Ing. Alex Martínez"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-black">
                      ING. ALEX MARTÍNEZ
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contactar Docente</span>
                </a>

                <Link
                  href="/#eventos"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95"
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
        <div id="principios" className="scroll-mt-24 space-y-6">
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
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  {p.icon}
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
        <div id="certificaciones" className="scroll-mt-24 space-y-6">
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
                    {cert.icon}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40">
                    {cert.year}
                  </span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {cert.tag}
                </span>
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

        {/* Section: Upcoming Workshops (ALL WITH ACCOMPANIED IMAGES) */}
        {events.length > 0 && (
          <div id="talleres-docente" className="scroll-mt-24 space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 block mb-2">
                CATÁLOGO ACTIVO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Próximos Talleres Dictados por el Docente
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
                Sesiones prácticas intensivas en vivo con laboratorios en la nube y emisión de certificados digitales con validación QR.
              </p>
            </div>

            {/* Grid of Workshop Cards Accompanied by Rich Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {events.map((ev) => {
                // Determine image based on slug with strictly distinct non-repeating visuals
                let itemImage = "/images/card-clean-architecture.jpg";
                let subBadge = "ARQUITECTURA DE SOFTWARE";
                let IconComponent = Terminal;
                let checkpoints = ["Clean Architecture", "Domain-Driven Design", "Pase QR"];

                if (ev.slug.includes("docker") || ev.slug.includes("microservicios") || ev.slug.includes("k8s")) {
                  itemImage = "/images/card-docker-k8s.jpg";
                  subBadge = "MICROSERVICIOS & KUBERNETES";
                  IconComponent = Cloud;
                  checkpoints = ["Docker & K8s", "Multi-Stage Labs", "Certificado QR"];
                } else if (ev.slug.includes("owasp") || ev.slug.includes("seguridad")) {
                  itemImage = "/images/card-owasp-security.jpg";
                  subBadge = "SEGURIDAD OFENSIVA & OWASP";
                  IconComponent = ShieldCheck;
                  checkpoints = ["Ethical Hacking", "Checklist OWASP", "Certificado Oficial"];
                } else if (ev.slug.includes("ia") || ev.slug.includes("agentes")) {
                  itemImage = "/images/card-ai-agents.jpg";
                  subBadge = "MODEL CONTEXT PROTOCOL & IA";
                  IconComponent = Cpu;
                  checkpoints = ["Agentes MCP", "Bases Vectoriales", "Pase QR Oficial"];
                }

                return (
                  <div
                    key={ev.id}
                    className="bg-[#0b0e14] border border-slate-800/80 rounded-3xl p-5 shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Banner Image with Floating Icon OUTSIDE overflow-hidden (ENCIMA DE TODO) */}
                      <div className="relative mb-7">
                        {/* Clipped Image Container */}
                        <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={itemImage}
                            alt={ev.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                          {/* Top-Left Category Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                              {ev.eventType === "WORKSHOP" ? "TALLER PRÁCTICO" : "CONFERENCIA"}
                            </span>
                          </div>

                          {/* Top-Right Status Badge */}
                          <div className="absolute top-3 right-3 z-10">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-mono font-bold">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                              <span>EN VIVO</span>
                            </span>
                          </div>
                        </div>

                        {/* Floating Centered Icon: ENCIMA DE TODO (z-30, 100% visible, not clipped) */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 font-bold z-30 ring-4 ring-[#0b0e14]">
                          <IconComponent className="w-6 h-6 text-slate-950" />
                        </div>
                      </div>

                      {/* Sub-badge Pill */}
                      <div className="flex justify-center mt-3 mb-2.5">
                        <span className="inline-block px-3 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                          {subBadge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-black text-white text-center mb-2.5 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2 px-1">
                        {ev.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-400 text-center leading-relaxed font-medium mb-5 line-clamp-3 px-2">
                        {ev.description}
                      </p>

                      {/* Feature Matrix (3 Mini Blocks) */}
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center">
                          <Globe className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                            MODALIDAD
                          </span>
                          <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate w-full">
                            {ev.modality === "VIRTUAL" ? "Virtual" : "Híbrido"}
                          </span>
                        </div>

                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                            DURACIÓN
                          </span>
                          <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate w-full">
                            {ev.academicHours} Horas
                          </span>
                        </div>

                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center">
                          <Users className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                            CUPOS
                          </span>
                          <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate w-full">
                            {ev.maxCapacity || 50} Cupos
                          </span>
                        </div>
                      </div>

                      {/* Checkmarks Checklist */}
                      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-[11px] text-slate-300 font-medium">
                        {checkpoints.map((chk, i) => (
                          <div key={i} className="inline-flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
                            <span>{chk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Price & Dual Buttons */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="text-left">
                        <span className="text-[9px] font-mono font-bold uppercase text-slate-500 block">
                          PRESUPUESTO
                        </span>
                        <span className="text-sm sm:text-base font-black text-cyan-300 font-mono">
                          {Number(ev.price) === 0 ? "Gratuito" : `${Number(ev.price).toFixed(2)} ${ev.currency}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/59171234567?text=Hola,%20quisiera%20consultar%20sobre%20el%20taller:%20${encodeURIComponent(
                            ev.title
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-bold text-[11px] uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                        >
                          <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          <span>WHATSAPP</span>
                        </a>

                        {/* Inscribirme Button */}
                        <Link
                          href={`/eventos/${ev.slug}`}
                          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95"
                        >
                          <span>INSCRIBIRME</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Solicitar Propuesta In-House</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/verificar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95"
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
