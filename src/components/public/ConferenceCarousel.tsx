"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
} from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardStep, setCardStep] = useState(340);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Docker whale container emblem */}
          <rect width="48" height="48" rx="12" fill="#0284c7" fillOpacity="0.14" />
          <path
            d="M13 25h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-10-5h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-5-5h4v4h-4z"
            fill="#0284c7"
          />
          <path
            d="M37 25c-.4-2.5-2.2-4.2-4.5-4.5-.4-1.2-1.3-2.1-2.5-2.5V17h-2v1.2c-1.2.4-2.1 1.3-2.5 2.5h-15c-.6 0-1 .4-1 1v7c0 4.4 3.6 8 8 8h12c5 0 9-4 9-9 0-.9-.2-1.8-.5-2.7h.5z"
            stroke="#0369a1"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="34" cy="26" r="1.5" fill="#0284c7" />
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Security Shield OWASP */}
          <rect width="48" height="48" rx="12" fill="#be123c" fillOpacity="0.14" />
          <path
            d="M24 10l12 5v9c0 8-5 13-12 16-7-3-12-8-12-16v-9l12-5z"
            fill="#be123c"
            fillOpacity="0.22"
            stroke="#be123c"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M24 18v7m0 4h.01M21 26h6"
            stroke="#881337"
            strokeWidth="2.2"
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AI Neural Chip / MCP Protocol */}
          <rect width="48" height="48" rx="12" fill="#7c3aed" fillOpacity="0.14" />
          <rect
            x="15"
            y="15"
            width="18"
            height="18"
            rx="4"
            fill="#7c3aed"
            fillOpacity="0.25"
            stroke="#7c3aed"
            strokeWidth="2"
          />
          <circle cx="24" cy="24" r="3.5" fill="#6d28d9" />
          <path
            d="M24 9v6m0 18v6M9 24h6m18 0h6M17 9v3m14-3v3M17 36v3m14-3v3M9 17h3m-3 14h3M36 17h3m-3 14h3"
            stroke="#7c3aed"
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Nodes AWS/GCP */}
          <rect width="48" height="48" rx="12" fill="#ea580c" fillOpacity="0.14" />
          <path
            d="M17 31a7 7 0 01-1-13.9 10 10 0 0119.5-2.2A7.5 7.5 0 0133 31H17z"
            fill="#ea580c"
            fillOpacity="0.22"
            stroke="#c2410c"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="23" r="2.5" fill="#ea580c" />
          <path d="M19 28l5-5 5 5" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" />
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Git Branch / Pipeline Loop */}
          <rect width="48" height="48" rx="12" fill="#059669" fillOpacity="0.14" />
          <circle cx="16" cy="16" r="3.5" stroke="#059669" strokeWidth="2.2" />
          <circle cx="16" cy="32" r="3.5" stroke="#059669" strokeWidth="2.2" />
          <circle cx="32" cy="24" r="3.5" stroke="#059669" strokeWidth="2.2" fill="#059669" fillOpacity="0.3" />
          <path
            d="M16 19.5v9M16 22c3 0 7 1 12.5 2"
            stroke="#047857"
            strokeWidth="2.2"
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Onion Domain Architecture */}
          <rect width="48" height="48" rx="12" fill="#0d9488" fillOpacity="0.14" />
          <path
            d="M24 11l13 7.5v15L24 41l-13-7.5v-15L24 11z"
            stroke="#0d9488"
            strokeWidth="2"
            fill="#0d9488"
            fillOpacity="0.18"
          />
          <circle cx="24" cy="26" r="4" fill="#0f766e" />
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Event Stream / Kafka node cluster */}
          <rect width="48" height="48" rx="12" fill="#d97706" fillOpacity="0.14" />
          <circle cx="24" cy="15" r="4" fill="#d97706" />
          <circle cx="15" cy="30" r="4" fill="#d97706" />
          <circle cx="33" cy="30" r="4" fill="#d97706" />
          <path
            d="M24 19v12m-6 0h12M18 28l4-10m4 10l-4-10"
            stroke="#b45309"
            strokeWidth="2"
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
          className="w-9 h-9 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Database High Performance */}
          <rect width="48" height="48" rx="12" fill="#4338ca" fillOpacity="0.14" />
          <ellipse cx="24" cy="14" rx="13" ry="5" fill="#4338ca" fillOpacity="0.25" stroke="#4338ca" strokeWidth="2" />
          <path d="M11 14v10c0 2.8 5.8 5 13 5s13-2.2 13-5V14" stroke="#4338ca" strokeWidth="2" />
          <path d="M11 24v10c0 2.8 5.8 5 13 5s13-2.2 13-5V24" stroke="#4338ca" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const total = workshops.length;

  // Measure card width + gap dynamically to ensure exact 1-by-1 step without any cut cards
  useEffect(() => {
    const updateStep = () => {
      if (firstCardRef.current) {
        // card width + gap (gap is 24px on sm+, 16px on mobile)
        const isMobile = window.innerWidth < 640;
        const gap = isMobile ? 16 : 24;
        setCardStep(firstCardRef.current.offsetWidth + gap);
      }
    };

    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide advance 1-by-1 every 3.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  return (
    <div
      className="w-full bg-[#701121] py-5 px-2 sm:px-6 relative shadow-2xl overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full width container with side arrows and edge-to-edge content */}
      <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-2 sm:gap-4 relative px-1 sm:px-4">
        {/* Navigation Arrow Left (Slides strictly 1-by-1) */}
        <button
          onClick={prevSlide}
          aria-label="Taller anterior"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#701121] hover:bg-slate-100 shadow-xl border border-white/60 flex items-center justify-center shrink-0 cursor-pointer transition-all hover:scale-110 active:scale-95 z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Carousel Viewport (Clips overflowing cards) */}
        <div className="overflow-hidden w-full py-2">
          {/* The Track: smoothly translates by exactly cardStep * currentIndex */}
          <div
            className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6 will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * cardStep}px)`,
            }}
          >
            {workshops.map((ws, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={idx}
                  ref={idx === 0 ? firstCardRef : null}
                  className={`shrink-0 w-[285px] sm:w-[330px] bg-white text-slate-800 rounded-2xl p-4 shadow-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "ring-2 ring-[#c29b38] border-[#c29b38] shadow-amber-950/20 scale-[1.01]"
                      : "border-slate-100 hover:border-slate-300"
                  }`}
                >
                  {/* Top: Squircle Logo on left + Titles on right */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Official Workshop Logo Container */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 shrink-0 shadow-xs">
                      {ws.logo}
                    </div>

                    {/* Metadata Header */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                        <span className="font-extrabold text-[#701121] tracking-wider uppercase">
                          {ws.num} {ws.type}
                        </span>
                        <span className="text-slate-500 font-semibold">{ws.hours}</span>
                      </div>

                      <h4 className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight leading-tight truncate">
                        {ws.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {ws.modality}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars & Green Badge */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px] mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="font-bold text-slate-800 ml-1 font-mono text-[10px]">
                        {ws.rating}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {ws.badge}
                    </span>
                  </div>

                  {/* Burgundy Details Button matching Tech Home reference */}
                  <Link
                    href={`/eventos/${ws.slug}`}
                    className="w-full py-2.5 rounded-xl bg-[#701121] hover:bg-[#851628] text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>VER DETALLES</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrow Right (Slides strictly 1-by-1) */}
        <button
          onClick={nextSlide}
          aria-label="Taller siguiente"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#701121] hover:bg-slate-100 shadow-xl border border-white/60 flex items-center justify-center shrink-0 cursor-pointer transition-all hover:scale-110 active:scale-95 z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Progress Dots below cards (Interactive & advance 1-by-1) */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {workshops.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === currentIndex
                ? "w-7 bg-[#c29b38]"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
