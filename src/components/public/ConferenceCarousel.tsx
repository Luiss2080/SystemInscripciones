"use client";

import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";

interface CarouselWorkshop {
  num: string;
  type: string;
  title: string;
  category: string;
  modality: string;
  hours: string;
  rating: string;
  slug: string;
  badge: string;
  logo: React.ReactNode;
}

export function ConferenceCarousel() {
  const workshops: CarouselWorkshop[] = [
    {
      num: "01",
      type: "TALLER PRÁCTICO",
      title: "DOCKER & KUBERNETES",
      category: "Contenedores & Orquestación",
      modality: "VIRTUAL EN VIVO",
      hours: "6 HRS",
      rating: "5.0 / 5.0",
      badge: "ALIANZA 100%",
      slug: "taller-microservicios-docker-kubernetes",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#0284c7" fillOpacity="0.2" />
          <path
            d="M13 25h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-10-5h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-5-5h4v4h-4z"
            fill="#38bdf8"
          />
          <path
            d="M37 25c-.4-2.5-2.2-4.2-4.5-4.5-.4-1.2-1.3-2.1-2.5-2.5V17h-2v1.2c-1.2.4-2.1 1.3-2.5 2.5h-15c-.6 0-1 .4-1 1v7c0 4.4 3.6 8 8 8h12c5 0 9-4 9-9 0-.9-.2-1.8-.5-2.7h.5z"
            stroke="#0ea5e9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="34" cy="26" r="1.5" fill="#38bdf8" />
        </svg>
      ),
    },
    {
      num: "02",
      type: "MASTERCLASS",
      title: "SEGURIDAD OWASP TOP 10",
      category: "Ethical Hacking & APIs",
      modality: "MODALIDAD HÍBRIDA",
      hours: "8 HRS",
      rating: "4.9 / 5.0",
      badge: "ALIANZA 100%",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#e11d48" fillOpacity="0.2" />
          <path
            d="M24 10l12 5v9c0 8-5 13-12 16-7-3-12-8-12-16v-9l12-5z"
            fill="#e11d48"
            fillOpacity="0.25"
            stroke="#fb7185"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M24 18v7m0 4h.01M21 26h6"
            stroke="#fda4af"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      num: "03",
      type: "CONFERENCIA",
      title: "AGENTES DE IA & MCP",
      category: "Model Context Protocol",
      modality: "CONFERENCIA VIRTUAL",
      hours: "4 HRS",
      rating: "5.0 / 5.0",
      badge: "ALIANZA 100%",
      slug: "conferencia-agentes-ia-ingenieria-software",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#8b5cf6" fillOpacity="0.2" />
          <rect
            x="15"
            y="15"
            width="18"
            height="18"
            rx="4"
            fill="#8b5cf6"
            fillOpacity="0.3"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <circle cx="24" cy="24" r="3" fill="#c4b5fd" />
          <path
            d="M24 9v6m0 18v6M9 24h6m18 0h6M17 9v3m14-3v3M17 36v3m14-3v3M9 17h3m-3 14h3M36 17h3m-3 14h3"
            stroke="#a78bfa"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      num: "04",
      type: "BOOTCAMP",
      title: "ARQUITECTURA CLOUD",
      category: "AWS & GCP Multi-Region",
      modality: "LABS EN TIEMPO REAL",
      hours: "10 HRS",
      rating: "5.0 / 5.0",
      badge: "ALIANZA 100%",
      slug: "taller-microservicios-docker-kubernetes",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#f97316" fillOpacity="0.2" />
          <path
            d="M17 31a7 7 0 01-1-13.9 10 10 0 0119.5-2.2A7.5 7.5 0 0133 31H17z"
            fill="#f97316"
            fillOpacity="0.25"
            stroke="#fb923c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="23" r="2.5" fill="#fdba74" />
          <path d="M19 28l5-5 5 5" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "05",
      type: "TALLER AVANZADO",
      title: "CI/CD & GITHUB ACTIONS",
      category: "DevOps & GitOps Pipelines",
      modality: "LABORATORIOS CLOUD",
      hours: "6 HRS",
      rating: "4.9 / 5.0",
      badge: "ALIANZA 100%",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#10b981" fillOpacity="0.2" />
          <circle cx="16" cy="16" r="3.5" stroke="#34d399" strokeWidth="2" />
          <circle cx="16" cy="32" r="3.5" stroke="#34d399" strokeWidth="2" />
          <circle cx="32" cy="24" r="3.5" stroke="#34d399" strokeWidth="2" fill="#34d399" fillOpacity="0.4" />
          <path
            d="M16 19.5v9M16 22c3 0 7 1 12.5 2"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      num: "06",
      type: "MASTERCLASS",
      title: "CLEAN ARCHITECTURE & DDD",
      category: "Domain-Driven Design",
      modality: "AUDITORIO MAGISTRAL",
      hours: "8 HRS",
      rating: "5.0 / 5.0",
      badge: "ALIANZA 100%",
      slug: "conferencia-agentes-ia-ingenieria-software",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#14b8a6" fillOpacity="0.2" />
          <path
            d="M24 11l13 7.5v15L24 41l-13-7.5v-15L24 11z"
            stroke="#2dd4bf"
            strokeWidth="2"
            fill="#14b8a6"
            fillOpacity="0.2"
          />
          <circle cx="24" cy="26" r="3.5" fill="#5eead4" />
        </svg>
      ),
    },
    {
      num: "07",
      type: "TALLER PRÁCTICO",
      title: "APACHE KAFKA & EDA",
      category: "Event-Driven Microservices",
      modality: "VIRTUAL EN VIVO",
      hours: "8 HRS",
      rating: "5.0 / 5.0",
      badge: "ALIANZA 100%",
      slug: "taller-microservicios-docker-kubernetes",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#f59e0b" fillOpacity="0.2" />
          <circle cx="24" cy="15" r="3.5" fill="#fbbf24" />
          <circle cx="15" cy="30" r="3.5" fill="#fbbf24" />
          <circle cx="33" cy="30" r="3.5" fill="#fbbf24" />
          <path
            d="M24 19v12m-6 0h12M18 28l4-10m4 10l-4-10"
            stroke="#fde68a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      num: "08",
      type: "MASTERCLASS",
      title: "POSTGRESQL 18 HIGH PERF",
      category: "DB Tuning & Indexación",
      modality: "LABS EN VIVO",
      hours: "6 HRS",
      rating: "4.9 / 5.0",
      badge: "ALIANZA 100%",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="10" fill="#6366f1" fillOpacity="0.2" />
          <ellipse cx="24" cy="14" rx="12" ry="4.5" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.8" />
          <path d="M12 14v10c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V14" stroke="#818cf8" strokeWidth="1.8" />
          <path d="M12 24v10c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V24" stroke="#818cf8" strokeWidth="1.8" />
        </svg>
      ),
    },
  ];

  // We duplicate the list to provide seamless infinite scroll without cuts
  const duplicatedWorkshops = [...workshops, ...workshops];

  return (
    <div className="w-full bg-slate-900/90 border-t border-slate-800/90 py-3 relative shadow-2xl backdrop-blur-md overflow-hidden select-none">
      {/* Subtle edge fade overlays for infinite seamless blend */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track: passes automatically, pauses on hover, zero arrows */}
      <div className="w-full overflow-hidden flex items-center">
        <div className="animate-marquee-smooth flex items-center gap-3 sm:gap-4 py-1">
          {duplicatedWorkshops.map((ws, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[275px] sm:w-[295px] bg-slate-950/95 text-slate-100 rounded-xl p-3 shadow-lg border border-slate-800/80 hover:border-cyan-500/80 hover:shadow-cyan-950/50 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top: Compact Squircle Logo + Metadata */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-xs group-hover:border-cyan-500/40 transition-colors">
                  {ws.logo}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[9px] font-mono mb-0.5">
                    <span className="font-extrabold text-cyan-400 tracking-wider uppercase">
                      {ws.num} {ws.type}
                    </span>
                    <span className="text-slate-500 font-semibold">{ws.hours}</span>
                  </div>

                  <h4 className="text-[12px] font-bold text-white tracking-tight truncate leading-tight group-hover:text-cyan-300 transition-colors">
                    {ws.title}
                  </h4>

                  <p className="text-[10px] text-slate-400 truncate">
                    {ws.modality}
                  </p>
                </div>
              </div>

              {/* Rating Stars & Badge */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[10px] mb-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-slate-300 ml-1 font-mono text-[9px]">
                    {ws.rating}
                  </span>
                </div>

                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  {ws.badge}
                </span>
              </div>

              {/* Compact Cyan Details Button */}
              <Link
                href={`/eventos/${ws.slug}`}
                className="w-full py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1 shadow-md shadow-cyan-950/30 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <span>VER DETALLES</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
