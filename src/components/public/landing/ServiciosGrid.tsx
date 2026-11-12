"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FondoTech from "@/components/shared/FondoTech";
import ServiciosCarousel, { type ServicioItem } from "./ServiciosCarousel";
import { getWorkshopMedia } from "@/lib/utils/workshop-media";
import { formatCurrency } from "@/lib/utils/format";
import type { PublicEventDTO } from "@/types/events";
import { Terminal, ShieldCheck, Cpu, Cloud } from "lucide-react";

interface ServiciosGridProps {
  initialEvents?: PublicEventDTO[];
}

export const CATEGORIES = [
  { id: "todos", label: "TODOS" },
  { id: "WORKSHOP", label: "TALLERES" },
  { id: "CONFERENCE", label: "CONFERENCIAS" },
  { id: "VIRTUAL", label: "VIRTUALES" },
  { id: "HYBRID_PRESENTIAL", label: "PRESENCIAL / HÍBRIDO" },
  { id: "FREE", label: "GRATUITOS" },
];

function getIconAndCheckpoints(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("docker") || normalized.includes("k8s") || normalized.includes("microservicios")) {
    return {
      icon: <Cloud className="w-6 h-6 text-slate-950" />,
      checkpoints: ["Docker & K8s", "Multi-Stage Labs", "Certificado QR"],
    };
  }
  if (normalized.includes("owasp") || normalized.includes("seguridad")) {
    return {
      icon: <ShieldCheck className="w-6 h-6 text-slate-950" />,
      checkpoints: ["Ethical Hacking", "Checklist OWASP", "Certificado QR"],
    };
  }
  if (normalized.includes("ia") || normalized.includes("agentes") || normalized.includes("mcp")) {
    return {
      icon: <Cpu className="w-6 h-6 text-slate-950" />,
      checkpoints: ["Agentes MCP", "Arquitectura IA", "Pase QR Oficial"],
    };
  }
  return {
    icon: <Terminal className="w-6 h-6 text-slate-950" />,
    checkpoints: ["Lab en Vivo", "Código Fuente", "Certificado QR"],
  };
}

function formatModalityLabel(modality: string): string {
  if (modality === "VIRTUAL") return "Virtual en Vivo";
  if (modality === "PRESENTIAL") return "Presencial";
  return "Híbrido";
}

export default function ServiciosGrid({ initialEvents = [] }: ServiciosGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("cat");
    if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const matchesCategory = (ev: PublicEventDTO, catId: string): boolean => {
    switch (catId) {
      case "WORKSHOP":
        return ev.eventType === "WORKSHOP";
      case "CONFERENCE":
        return ev.eventType === "CONFERENCE";
      case "VIRTUAL":
        return ev.modality === "VIRTUAL";
      case "HYBRID_PRESENTIAL":
        return ev.modality === "HYBRID" || ev.modality === "PRESENTIAL";
      case "FREE":
        return Number(ev.price) === 0;
      default:
        return true;
    }
  };

  const filteredEvents = initialEvents.filter((ev) => matchesCategory(ev, activeCategory));

  const mappedItems: ServicioItem[] = filteredEvents.map((ev, index) => {
    const media = getWorkshopMedia(ev.slug, index);
    const { icon, checkpoints } = getIconAndCheckpoints(ev.slug);
    const remainingSeats = Math.max(0, ev.maxCapacity - ev.registrationsCount);

    return {
      id: ev.id,
      badge:
        ev.eventType === "CONFERENCE"
          ? "CONFERENCIA"
          : ev.eventType === "BOOTCAMP"
          ? "BOOTCAMP"
          : "TALLER PRÁCTICO",
      status: ev.status,
      subBadge: media.categoryLabel,
      title: ev.title,
      description: ev.description,
      image: media.image,
      icon,
      modality: formatModalityLabel(ev.modality),
      academicHours: `${ev.academicHours} Horas`,
      seats: `${remainingSeats}/${ev.maxCapacity} libres`,
      checkpoints,
      priceLabel: formatCurrency(ev.price, ev.currency),
      slug: ev.slug,
    };
  });

  return (
    <section
      id="eventos"
      className="py-16 sm:py-20 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="talleres" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-white">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            CATÁLOGO OFICIAL • POSTGRESQL EN VIVO ({initialEvents.length})
          </span>
        </div>

        <div className="text-center mb-7 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Capacitaciones que{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              impulsan tu perfil
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            Filtra los talleres y conferencias registrados en tiempo real, revisa sus cupos disponibles y emite tu pase QR oficial.
          </p>
        </div>

        {/* Dynamic Filter Pills with Animated Spring Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
          {CATEGORIES.map((cat) => {
            const count = initialEvents.filter((ev) => matchesCategory(ev, cat.id)).length;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 z-10 ${
                  active
                    ? "text-slate-950"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="public-cat-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_4px_20px_rgba(6,182,212,0.35)] -z-10"
                  />
                )}
                <span>{cat.label}</span>
                <span className="font-mono text-[10px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full">
          <ServiciosCarousel items={mappedItems} key={activeCategory} />
        </div>
      </div>
    </section>
  );
}
