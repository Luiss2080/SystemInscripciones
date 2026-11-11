"use client";

import Link from "next/link";
import { Cloud, Cpu, ExternalLink, ShieldCheck, Terminal, Users } from "lucide-react";
import type { PublicEventDTO } from "@/types/events";
import { formatCurrency } from "@/lib/utils/format";

interface ConferenceCarouselProps {
  events: PublicEventDTO[];
}

function getWorkshopIcon(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("docker") || s.includes("k8s") || s.includes("microservicios")) {
    return (
      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
        <Cloud className="w-5 h-5 text-cyan-400" />
      </div>
    );
  }
  if (s.includes("owasp") || s.includes("seguridad")) {
    return (
      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-5 h-5 text-rose-400" />
      </div>
    );
  }
  if (s.includes("ia") || s.includes("agentes") || s.includes("mcp")) {
    return (
      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center shrink-0">
        <Cpu className="w-5 h-5 text-violet-400" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
      <Terminal className="w-5 h-5 text-cyan-400" />
    </div>
  );
}

export function ConferenceCarousel({ events }: ConferenceCarouselProps) {
  if (events.length === 0) {
    return null;
  }

  // Ensure smooth seamless loop even with few DB records
  const minTrackItems = events.length < 4 ? [...events, ...events, ...events] : events;
  const duplicatedWorkshops = [...minTrackItems, ...minTrackItems];

  return (
    <div className="w-full bg-[#030712]/90 border-t border-slate-800/80 py-3 relative shadow-2xl backdrop-blur-md overflow-hidden select-none">
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent z-10 pointer-events-none" />

      <div className="w-full overflow-hidden flex items-center">
        <div className="animate-marquee-smooth flex items-stretch gap-3 sm:gap-4 py-1">
          {duplicatedWorkshops.map((ev, idx) => {
            const available = Math.max(0, ev.maxCapacity - ev.registrationsCount);
            const itemNum = String((idx % events.length) + 1).padStart(2, "0");

            return (
              <div
                key={`${ev.id}-${idx}`}
                className="shrink-0 w-[285px] sm:w-[300px] bg-slate-950/95 text-slate-100 rounded-xl p-3 shadow-lg border border-slate-800/80 hover:border-cyan-500/80 hover:shadow-cyan-950/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  {getWorkshopIcon(ev.slug)}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[9px] font-mono mb-0.5">
                      <span className="font-extrabold text-cyan-400 tracking-wider uppercase">
                        {itemNum} {ev.eventType}
                      </span>
                      <span className="text-slate-400 font-semibold">
                        {ev.academicHours} HRS
                      </span>
                    </div>

                    <h4 className="text-[12px] font-bold text-white tracking-tight truncate leading-tight group-hover:text-cyan-300 transition-colors">
                      {ev.title}
                    </h4>

                    <p className="text-[10px] text-slate-400 truncate font-mono">
                      {ev.modality} • {formatCurrency(ev.price, ev.currency)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[10px] mb-2">
                  <div className="flex items-center gap-1 text-slate-300 font-mono text-[10px]">
                    <Users className="w-3 h-3 text-cyan-400" />
                    <span>
                      {available}/{ev.maxCapacity} cupos libres
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                      ev.status === "OPEN" && available > 0
                        ? "text-cyan-400 bg-cyan-950/80 border-cyan-800/60"
                        : "text-rose-300 bg-rose-950/80 border-rose-800/60"
                    }`}
                  >
                    {ev.status === "OPEN" && available > 0 ? "ABIERTO" : ev.status}
                  </span>
                </div>

                <Link
                  href={`/eventos/${ev.slug}`}
                  className="w-full py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1 shadow-md shadow-cyan-950/30 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <span>VER DETALLES</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
