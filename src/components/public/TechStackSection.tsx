import FondoTech from "./FondoTech";
import {
  Cloud,
  Server,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export default function TechStackSection() {
  const categories = [
    {
      category: "CLOUD & CONTENEDORES",
      badge: "CLOUD NATIVE",
      status: "KUBERNETES & DOCKER",
      image: "/images/card-docker-k8s.jpg",
      icon: <Cloud className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Orquestación y Despliegue Cloud Native",
      description:
        "Contenerización con Docker, empaquetado multi-stage, orquestación con Kubernetes y clústeres elásticos con alta disponibilidad.",
      tools: ["Docker", "Kubernetes", "AWS / GCP", "Nginx", "Helm"],
    },
    {
      category: "ARQUITECTURA & BACKEND",
      badge: "CLEAN CODE",
      status: "ENTERPRISE PATTERNS",
      image: "/images/card-clean-architecture.jpg",
      icon: <Server className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Clean Architecture & Domain-Driven Design",
      description:
        "Desacoplamiento con puertos y adaptadores, patrones de mensajería asíncrona con Kafka/RabbitMQ y tipado estricto con TypeScript y Go.",
      tools: ["Next.js 16", "TypeScript", "PostgreSQL 18", "Prisma", "Go"],
    },
    {
      category: "SEGURIDAD & ZERO-TRUST",
      badge: "CIBERSEGURIDAD",
      status: "OWASP TOP 10",
      image: "/images/card-owasp-security.jpg",
      icon: <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Endurecimiento OWASP & Ciberseguridad",
      description:
        "Blindaje estricto de APIs contra ataques BOLA, inyecciones SQL, robo de sesiones con JWT HttpOnly y mitigación DDoS con Redis.",
      tools: ["OWASP Top 10", "JWT HttpOnly", "Redis", "CORS Estricto", "Zod DTOs"],
    },
    {
      category: "IA AGÉNTICA & DEVOPS",
      badge: "AGENTIC AI",
      status: "MCP & AUTOMATION",
      image: "/images/card-ai-agents.jpg",
      icon: <Cpu className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Model Context Protocol & CI/CD",
      description:
        "Integración de agentes de inteligencia artificial con bases de datos vía servidores MCP y pipelines automatizados con GitHub Actions.",
      tools: ["Model Context Protocol", "LangChain", "pgvector", "GitHub Actions", "Terraform"],
    },
  ];

  return (
    <section
      id="tech-stack"
      className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="techstack" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        {/* Section Header Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            ECOSISTEMA DE PRODUCCIÓN
          </span>
        </div>

        {/* Section Title */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Herramientas y tecnologías que dominan el{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              mercado laboral
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            No enseñamos teoría abstracta. Entrenamos a ingenieros de software con el conjunto exacto de herramientas que exigen las empresas tecnológicas globales.
          </p>
        </div>

        {/* 4 Tech Pillars Cards Grid with Cover Images and Floating Icons (ENCIMA DE TODO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#0b0e14] border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div>
                {/* Top Image Banner with Floating Icon (ENCIMA DE TODO) */}
                <div className="relative mb-7">
                  <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Top-Right Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-mono font-bold">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                        <span>{cat.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Floating Centered Icon: ENCIMA DE TODO (z-30, not clipped) */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 font-bold z-30 ring-4 ring-[#0b0e14]">
                    {cat.icon}
                  </div>
                </div>

                {/* Sub-badge Pill */}
                <div className="flex justify-center mt-3 mb-2.5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    {cat.category}
                  </span>
                </div>

                {/* Title (Centered) */}
                <h3 className="text-xl sm:text-2xl font-black text-white text-center mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
                  {cat.title}
                </h3>

                {/* Description (Centered) */}
                <p className="text-xs sm:text-sm text-slate-400 text-center leading-relaxed font-medium mb-6 px-2">
                  {cat.description}
                </p>
              </div>

              {/* Tools Badges (Centered) */}
              <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-800 transition-colors shadow-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
