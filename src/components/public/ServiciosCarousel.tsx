"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Globe,
  Clock,
  Users,
} from "lucide-react";

export interface ServicioItem {
  id: string;
  badge: string;
  status: string;
  subBadge: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  modality: string;
  academicHours: string;
  seats: string;
  checkpoints: string[];
  priceLabel: string;
  slug?: string;
  whatsappMessage?: string;
}

interface ServiciosCarouselProps {
  items: ServicioItem[];
}

export default function ServiciosCarousel({ items }: ServiciosCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  // If there are 3 or fewer items, no need to paginate on desktop
  const total = items.length;
  const itemsPerPage = 3;

  const next = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  // Get current visible window (wrap around)
  const visibleItems = [];
  for (let i = 0; i < Math.min(itemsPerPage, total); i++) {
    const idx = (startIndex + i) % total;
    visibleItems.push(items[idx]);
  }

  return (
    <div className="relative w-full">
      {/* Side Navigation Arrow Left */}
      {total > 3 && (
        <button
          onClick={prev}
          aria-label="Anterior"
          className="hidden md:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-800/50 hover:border-cyan-400 items-center justify-center transition-all z-20 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {visibleItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="bg-[#0b0e14] border border-slate-800/80 rounded-3xl p-5 shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-1"
          >
            <div>
              {/* Top Banner Image with Badges */}
              <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top-Left Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    {item.badge}
                  </span>
                </div>

                {/* Top-Right Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Floating Centered Icon on Image Junction */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 font-bold z-10">
                  {item.icon}
                </div>
              </div>

              {/* Sub-badge Pill */}
              <div className="flex justify-center mt-3 mb-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                  {item.subBadge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-black text-white text-center mb-2.5 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2 px-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-400 text-center leading-relaxed font-medium mb-6 line-clamp-3 px-2">
                {item.description}
              </p>

              {/* Feature Matrix (3 Mini Blocks matching reference screenshot) */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                    MODALIDAD
                  </span>
                  <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate w-full">
                    {item.modality}
                  </span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                    CERTIFICACIÓN
                  </span>
                  <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate w-full">
                    {item.academicHours}
                  </span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center">
                  <Users className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                    CUPOS
                  </span>
                  <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate w-full">
                    {item.seats}
                  </span>
                </div>
              </div>

              {/* Checkmarks Checklist */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 text-[11px] text-slate-300 font-medium">
                {item.checkpoints.map((chk, i) => (
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
                  {item.priceLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* WhatsApp Button styled cleanly in tech aesthetic */}
                <a
                  href={`https://wa.me/59171234567?text=Hola,%20quisiera%20consultar%20sobre%20el%20taller:%20${encodeURIComponent(
                    item.title
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

                {/* Consultar / Inscribirme Button with Website Primary Cyan Styling */}
                <Link
                  href={item.slug ? `/eventos/${item.slug}` : "/#eventos"}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>CONSULTAR</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side Navigation Arrow Right */}
      {total > 3 && (
        <button
          onClick={next}
          aria-label="Siguiente"
          className="hidden md:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-800/50 hover:border-cyan-400 items-center justify-center transition-all z-20 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Pagination Dots (Cyan Indicator matching website palette) */}
      <div className="flex items-center justify-center gap-2 mt-10">
        {Array.from({ length: Math.ceil(total / 1) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i % total)}
            aria-label={`Página ${i + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              startIndex === i
                ? "w-7 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]"
                : "w-2 h-2 rounded-full bg-slate-800 hover:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
