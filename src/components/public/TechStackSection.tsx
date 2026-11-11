import FondoTech from "./FondoTech";
import {
  Cloud,
  Server,
  ShieldCheck,
  Cpu,
  Terminal,
  Database,
  GitBranch,
  Lock,
} from "lucide-react";

export default function TechStackSection() {
  const categories = [
    {
      category: "CLOUD & CONTENEDORES",
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      title: "Orquestación y Despliegue Cloud Native",
      description:
        "Contenerización con Docker, empaquetado multi-stage, orquestación con Kubernetes y clústeres elásticos con alta disponibilidad.",
      tools: ["Docker", "Kubernetes", "AWS / GCP", "Nginx", "Helm"],
    },
    {
      category: "ARQUITECTURA & BACKEND",
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      title: "Clean Architecture & Domain-Driven Design",
      description:
        "Desacoplamiento con puertos y adaptadores, patrones de mensajería asíncrona con Kafka/RabbitMQ y tipado estricto con TypeScript y Go.",
      tools: ["Next.js 16", "TypeScript", "PostgreSQL 18", "Prisma", "Go"],
    },
    {
      category: "SEGURIDAD & ZERO-TRUST",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: "Endurecimiento OWASP & Ciberseguridad",
      description:
        "Blindaje estricto de APIs contra ataques BOLA, inyecciones SQL, robo de sesiones con JWT HttpOnly y mitigación DDoS con Redis.",
      tools: ["OWASP Top 10", "JWT HttpOnly", "Redis", "CORS Estricto", "Zod DTOs"],
    },
    {
      category: "IA AGÉNTICA & DEVOPS",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
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

        {/* 4 Tech Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-7 shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-md shadow-cyan-950/40 group-hover:scale-105 group-hover:border-cyan-500/60 transition-transform">
                    {cat.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                      {cat.category}
                    </span>
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Tools Badges */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-800 transition-colors"
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

