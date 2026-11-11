"use client";

import { useState, useEffect } from "react";
import FondoTech from "./FondoTech";
import ServiciosCarousel, { ServicioItem } from "./ServiciosCarousel";
import {
  Terminal,
  ShieldCheck,
  Cpu,
  Cloud,
  FileCode,
  Laptop,
} from "lucide-react";

interface ServiciosGridProps {
  initialEvents?: any[];
}

export const CATEGORIES = [
  { id: "todos", label: "TODOS" },
  { id: "arquitectura", label: "ARQUITECTURA" },
  { id: "seguridad", label: "SEGURIDAD" },
  { id: "ia", label: "IA & AGENTES" },
  { id: "devops", label: "DEVOPS CI/CD" },
  { id: "software", label: "A MEDIDA" },
];

export default function ServiciosGrid({ initialEvents = [] }: ServiciosGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("cat");
    if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
      setActiveCategory(catParam);
    }

    const handleCategoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && CATEGORIES.some((c) => c.id === customEvent.detail)) {
        setActiveCategory(customEvent.detail);
      }
    };

    window.addEventListener("select-workshop-category", handleCategoryEvent);
    return () => {
      window.removeEventListener("select-workshop-category", handleCategoryEvent);
    };
  }, []);

  // Map real database events if present, each with its own distinct non-repeating image
  const mappedDbEvents: ServicioItem[] = initialEvents.map((ev, index) => {
    let itemImage = "/images/card-clean-architecture.jpg";
    let subBadge = "CAPACITACIÓN TÉCNICA";
    let IconComponent = <Terminal className="w-6 h-6 text-slate-950" />;
    let checkpoints = ["Lab en Vivo", "Código Fuente", "Certificado QR"];

    if (ev.slug.includes("docker") || ev.slug.includes("microservicios") || ev.slug.includes("k8s")) {
      itemImage = "/images/card-docker-k8s.jpg";
      subBadge = "MICROSERVICIOS & KUBERNETES";
      IconComponent = <Cloud className="w-6 h-6 text-slate-950" />;
      checkpoints = ["Docker & K8s", "Multi-Stage Labs", "Certificado QR"];
    } else if (ev.slug.includes("owasp") || ev.slug.includes("seguridad")) {
      itemImage = "/images/card-owasp-security.jpg";
      subBadge = "SEGURIDAD OFENSIVA & OWASP";
      IconComponent = <ShieldCheck className="w-6 h-6 text-slate-950" />;
      checkpoints = ["Ethical Hacking", "Checklist OWASP", "Certificado Oficial"];
    } else if (ev.slug.includes("ia") || ev.slug.includes("agentes")) {
      itemImage = "/images/card-ai-agents.jpg";
      subBadge = "MODEL CONTEXT PROTOCOL & IA";
      IconComponent = <Cpu className="w-6 h-6 text-slate-950" />;
      checkpoints = ["Agentes MCP", "Bases Vectoriales", "Pase QR Oficial"];
    } else {
      itemImage = "/images/card-clean-architecture.jpg";
      subBadge = "ARQUITECTURA DE SOFTWARE";
      IconComponent = <FileCode className="w-6 h-6 text-slate-950" />;
      checkpoints = ["Clean Architecture", "Domain-Driven Design", "Pase Oficial"];
    }

    return {
      id: ev.id || `db-ev-${index}`,
      badge: ev.eventType === "WORKSHOP" ? "TALLER PRÁCTICO" : "CONFERENCIA",
      status: "ACTIVO",
      subBadge,
      title: ev.title,
      description: ev.description,
      image: itemImage,
      icon: IconComponent,
      modality: ev.modality === "VIRTUAL" ? "Virtual en Vivo" : "Modalidad Híbrida",
      academicHours: `${ev.academicHours} Horas`,
      seats: `${ev.maxCapacity || 50} Cupos`,
      checkpoints,
      priceLabel: Number(ev.price) === 0 ? "Gratuito" : `${Number(ev.price).toFixed(2)} ${ev.currency || "BOB"}`,
      slug: ev.slug,
    };
  });

  // Default items with strictly distinct, non-repeating images for every card
  const defaultItems: Record<string, ServicioItem[]> = {
    todos: [
      {
        id: "ws-docker",
        badge: "TALLER PRÁCTICO",
        status: "ACTIVO",
        subBadge: "MICROSERVICIOS",
        title: "Arquitectura de Microservicios con Docker y Kubernetes",
        description:
          "Diseño, desacoplamiento y orquestación con Docker, Services, Deployments en K8s y pipelines de integración continua en entornos de producción.",
        image: "/images/card-docker-k8s.jpg",
        icon: <Cloud className="w-6 h-6 text-slate-950" />,
        modality: "Virtual en Vivo",
        academicHours: "6 Horas",
        seats: "35 Cupos",
        checkpoints: ["Lab en Vivo", "Código Fuente", "Pase QR Oficial"],
        priceLabel: "Gratuito",
        slug: "taller-microservicios-docker-kubernetes",
      },
      {
        id: "ws-owasp",
        badge: "MASTERCLASS",
        status: "ACTIVO",
        subBadge: "RIGOR DE SEGURIDAD",
        title: "Seguridad Ofensiva y Endurecimiento OWASP Top 10 en APIs",
        description:
          "Simula ataques éticos y blinda vulnerabilidades críticas en arquitecturas Backend: SQLi, BOLA, JWT HttpOnly, Rate Limiting y CORS estricto.",
        image: "/images/card-owasp-security.jpg",
        icon: <ShieldCheck className="w-6 h-6 text-slate-950" />,
        modality: "Híbrido",
        academicHours: "8 Horas",
        seats: "50 Cupos",
        checkpoints: ["Ethical Hacking", "Checklist OWASP", "Certificación"],
        priceLabel: "60.00 BOB",
        slug: "masterclass-seguridad-apis-nodejs-owasp",
      },
      {
        id: "ws-ai",
        badge: "CONFERENCIA",
        status: "ACTIVO",
        subBadge: "MODEL CONTEXT PROTOCOL",
        title: "La Revolución de los Agentes de IA en la Ingeniería",
        description:
          "Cómo la IA agéntica, los modelos locales y el Model Context Protocol (MCP) redefinen el desarrollo de software y el testing automatizado.",
        image: "/images/card-ai-agents.jpg",
        icon: <Cpu className="w-6 h-6 text-slate-950" />,
        modality: "Virtual en Vivo",
        academicHours: "4 Horas",
        seats: "250 Cupos",
        checkpoints: ["Agentes MCP", "Bases Vectoriales", "Pase QR"],
        priceLabel: "Gratuito",
        slug: "conferencia-agentes-ia-ingenieria-software",
      },
      {
        id: "ws-cicd",
        badge: "TALLER AVANZADO",
        status: "ACTIVO",
        subBadge: "DEVOPS & GITOPS",
        title: "Pipelines Automatizados con GitHub Actions y Terraform",
        description:
          "Aprende infraestructura como código, validaciones estáticas de seguridad y despliegues Zero-Downtime a clústeres multi-región.",
        image: "/images/card-clean-architecture.jpg",
        icon: <Terminal className="w-6 h-6 text-slate-950" />,
        modality: "Laboratorios Cloud",
        academicHours: "6 Horas",
        seats: "40 Cupos",
        checkpoints: ["Scripts CI/CD", "Terraform Cloud", "Certificado"],
        priceLabel: "80.00 BOB",
        slug: "masterclass-seguridad-apis-nodejs-owasp",
      },
    ],
    arquitectura: [
      {
        id: "ws-docker-k8s",
        badge: "TALLER PRÁCTICO",
        status: "ACTIVO",
        subBadge: "MICROSERVICIOS & K8S",
        title: "Arquitectura de Microservicios con Docker y Kubernetes",
        description:
          "Diseño, desacoplamiento y orquestación con Docker, Services, Deployments en K8s y pipelines de integración continua.",
        image: "/images/card-docker-k8s.jpg",
        icon: <Cloud className="w-6 h-6 text-slate-950" />,
        modality: "Virtual en Vivo",
        academicHours: "6 Horas",
        seats: "35 Cupos",
        checkpoints: ["Lab en Vivo", "Multi-Stage Docker", "Certificado QR"],
        priceLabel: "Gratuito",
        slug: "taller-microservicios-docker-kubernetes",
      },
      {
        id: "ws-ddd",
        badge: "MASTERCLASS",
        status: "ACTIVO",
        subBadge: "CLEAN ARCHITECTURE",
        title: "Clean Architecture & Domain-Driven Design (DDD) en Node/Go",
        description:
          "Implementación de arquitectura hexagonal, entidades ricas, repositorios y puertos desacoplados para sistemas de alta complejidad.",
        image: "/images/card-clean-architecture.jpg",
        icon: <FileCode className="w-6 h-6 text-slate-950" />,
        modality: "Virtual",
        academicHours: "8 Horas",
        seats: "30 Cupos",
        checkpoints: ["Arquitectura Hexagonal", "Testing Unitario", "Repositorios"],
        priceLabel: "100.00 BOB",
        slug: "taller-microservicios-docker-kubernetes",
      },
      {
        id: "ws-kafka",
        badge: "BOOTCAMP",
        status: "ACTIVO",
        subBadge: "EVENT-DRIVEN",
        title: "Sistemas Distribuidos y Event-Driven con Apache Kafka",
        description:
          "Procesamiento asíncrono de streams, particionamiento de eventos, consistencia eventual y tolerancia a caídas de brokers.",
        image: "/images/card-ai-agents.jpg",
        icon: <Laptop className="w-6 h-6 text-slate-950" />,
        modality: "Virtual en Vivo",
        academicHours: "10 Horas",
        seats: "25 Cupos",
        checkpoints: ["Brokers Kafka", "Consistencia Eventual", "Labs"],
        priceLabel: "120.00 BOB",
        slug: "taller-microservicios-docker-kubernetes",
      },
    ],
    seguridad: [
      {
        id: "ws-owasp-sec",
        badge: "MASTERCLASS",
        status: "ACTIVO",
        subBadge: "SEGURIDAD OFENSIVA",
        title: "Seguridad Ofensiva y Endurecimiento OWASP Top 10 en APIs",
        description:
          "Simulación de inyecciones, blindaje de cabeceras CSP, mitigación de ataques BOLA y rate limiting distribuido con Redis.",
        image: "/images/card-owasp-security.jpg",
        icon: <ShieldCheck className="w-6 h-6 text-slate-950" />,
        modality: "Híbrido",
        academicHours: "8 Horas",
        seats: "50 Cupos",
        checkpoints: ["Ethical Hacking", "Checklist OWASP", "Certificación"],
        priceLabel: "60.00 BOB",
        slug: "masterclass-seguridad-apis-nodejs-owasp",
      },
      {
        id: "ws-auth",
        badge: "WORKSHOP",
        status: "ACTIVO",
        subBadge: "AUTENTICACIÓN ZERO-TRUST",
        title: "Autenticación Robusta: JWT, HttpOnly Cookies, RBAC & OAuth2",
        description:
          "Aprende a diseñar esquemas de autenticación invulnerables contra robo de tokens por XSS y suplantación de identidad en microservicios.",
        image: "/images/card-clean-architecture.jpg",
        icon: <ShieldCheck className="w-6 h-6 text-slate-950" />,
        modality: "Virtual",
        academicHours: "6 Horas",
        seats: "45 Cupos",
        checkpoints: ["OAuth2 Flow", "HttpOnly Cookies", "RBAC estricto"],
        priceLabel: "70.00 BOB",
        slug: "masterclass-seguridad-apis-nodejs-owasp",
      },
    ],
    ia: [
      {
        id: "ws-ai-agents",
        badge: "CONFERENCIA",
        status: "ACTIVO",
        subBadge: "MODEL CONTEXT PROTOCOL",
        title: "La Revolución de los Agentes de IA en la Ingeniería",
        description:
          "Aprende cómo orquestar agentes inteligentes usando MCP para consultar bases de datos PostgreSQL y automatizar tareas de DevOps.",
        image: "/images/card-ai-agents.jpg",
        icon: <Cpu className="w-6 h-6 text-slate-950" />,
        modality: "Virtual en Vivo",
        academicHours: "4 Horas",
        seats: "250 Cupos",
        checkpoints: ["Agentes MCP", "Bases Vectoriales", "Pase QR"],
        priceLabel: "Gratuito",
        slug: "conferencia-agentes-ia-ingenieria-software",
      },
      {
        id: "ws-llm-rag",
        badge: "BOOTCAMP",
        status: "ACTIVO",
        subBadge: "RAG & VECTOR SEARCH",
        title: "Construcción de Sistemas RAG sobre Documentación de Código",
        description:
          "Pipelines de embeddings con LangChain, PostgreSQL pgvector y búsqueda semántica para asistentes técnicos corporativos.",
        image: "/images/card-clean-architecture.jpg",
        icon: <Cpu className="w-6 h-6 text-slate-950" />,
        modality: "Laboratorios en Vivo",
        academicHours: "8 Horas",
        seats: "35 Cupos",
        checkpoints: ["pgvector", "LangChain", "Embeddings"],
        priceLabel: "90.00 BOB",
        slug: "conferencia-agentes-ia-ingenieria-software",
      },
    ],
    devops: [
      {
        id: "ws-devops-cicd",
        badge: "TALLER PRÁCTICO",
        status: "ACTIVO",
        subBadge: "CI/CD & GITHUB ACTIONS",
        title: "CI/CD Automatizado: De Git Commit a Kubernetes Cluster",
        description:
          "Automatiza tests unitarios, construcción de imágenes Docker escaneadas con Trivy y despliegue continuo con ArgoCD.",
        image: "/images/card-docker-k8s.jpg",
        icon: <Terminal className="w-6 h-6 text-slate-950" />,
        modality: "Laboratorios Cloud",
        academicHours: "6 Horas",
        seats: "40 Cupos",
        checkpoints: ["GitHub Actions", "ArgoCD", "Certificado QR"],
        priceLabel: "80.00 BOB",
        slug: "masterclass-seguridad-apis-nodejs-owasp",
      },
    ],
    software: [
      {
        id: "ws-software-arch",
        badge: "CONSULTORÍA & LAB",
        status: "ACTIVO",
        subBadge: "DESARROLLO A MEDIDA",
        title: "Auditoría de Rendimiento y Refactorización de Monolitos a Microservicios",
        description:
          "Estrategias Strangler Fig, profiling de memoria en Node.js, optimización de queries SQL complejas y alta disponibilidad.",
        image: "/images/card-clean-architecture.jpg",
        icon: <FileCode className="w-6 h-6 text-slate-950" />,
        modality: "A Medida / Remoto",
        academicHours: "12 Horas",
        seats: "20 Cupos",
        checkpoints: ["Strangler Fig", "Profiling DB", "Certificado Oficial"],
        priceLabel: "A conversar",
        slug: "taller-microservicios-docker-kubernetes",
      },
    ],
  };

  // If in 'todos' category and we have real database events, display them first
  const currentItems =
    activeCategory === "todos" && mappedDbEvents.length > 0
      ? mappedDbEvents
      : defaultItems[activeCategory] || defaultItems.todos;

  return (
    <section
      id="eventos"
      className="py-16 sm:py-20 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="talleres" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-white">
        {/* Badge Superior */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            NUESTROS SERVICIOS & TALLERES
          </span>
        </div>

        {/* Título y Subtítulo estilo Hero */}
        <div className="text-center mb-7 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Soluciones que{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              impulsan tu futuro
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-cyan-500/70 opacity-90"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            Elegí la categoría que mejor se acerque a tu necesidad. Cada taller muestra temario práctico, requisitos y condiciones que revisamos antes de definir el alcance y emitir tu certificación digital.
          </p>
        </div>

        {/* Categorías (Tabs en píldoras con active Cyan) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_4px_20px_rgba(6,182,212,0.35)] scale-105 border-transparent font-black"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Renderizado dinámico del carrusel por categoría */}
        <div className="relative w-full">
          <ServiciosCarousel items={currentItems} key={activeCategory} />
        </div>
      </div>
    </section>
  );
}
