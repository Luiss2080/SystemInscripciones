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
  logo: React.ReactNode;
}

export function ConferenceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const workshops: CarouselWorkshop[] = [
    {
      num: "01",
      type: "TALLER PRÁCTICO",
      title: "TALLER DOCKER & K8S",
      category: "Contenedores & Kubernetes",
      modality: "VIRTUAL EN VIVO",
      hours: "6 HRS",
      rating: "5.0 / 5.0",
      slug: "taller-microservicios-docker-kubernetes",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Docker & K8s themed emblem */}
          <rect width="48" height="48" rx="12" fill="#0284c7" fillOpacity="0.12" />
          <path
            d="M14 26h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-10-5h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-5-5h4v4h-4z"
            fill="#0284c7"
          />
          <path
            d="M37 25c-.4-2.5-2.2-4.2-4.5-4.5-.4-1.2-1.3-2.1-2.5-2.5V17h-2v1.2c-1.2.4-2.1 1.3-2.5 2.5h-15c-.6 0-1 .4-1 1v7c0 4.4 3.6 8 8 8h12c5 0 9-4 9-9 0-.9-.2-1.8-.5-2.7h.5z"
            stroke="#0369a1"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="35" cy="27" r="1.5" fill="#0284c7" />
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
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Security Shield OWASP */}
          <rect width="48" height="48" rx="12" fill="#be123c" fillOpacity="0.12" />
          <path
            d="M24 10l12 5v9c0 8-5 13-12 16-7-3-12-8-12-16v-9l12-5z"
            fill="#be123c"
            fillOpacity="0.2"
            stroke="#be123c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M24 19v6m0 4h.01M21 27h6"
            stroke="#9f1239"
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
      slug: "conferencia-agentes-ia-ingenieria-software",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AI Neural Chip / Brain MCP */}
          <rect width="48" height="48" rx="12" fill="#7c3aed" fillOpacity="0.12" />
          <rect
            x="16"
            y="16"
            width="16"
            height="16"
            rx="4"
            fill="#7c3aed"
            fillOpacity="0.25"
            stroke="#7c3aed"
            strokeWidth="2"
          />
          <circle cx="24" cy="24" r="3" fill="#6d28d9" />
          <path
            d="M24 10v6m0 16v6M10 24h6m16 0h6M17 10v3m14-3v3M17 35v3m14-3v3M10 17h3m-3 14h3M35 17h3m-3 14h3"
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
      slug: "taller-microservicios-docker-kubernetes",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Nodes */}
          <rect width="48" height="48" rx="12" fill="#ea580c" fillOpacity="0.12" />
          <path
            d="M17 31a7 7 0 01-1-13.9 10 10 0 0119.5-2.2A7.5 7.5 0 0133 31H17z"
            fill="#ea580c"
            fillOpacity="0.2"
            stroke="#c2410c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="23" r="2.5" fill="#ea580c" />
          <path d="M19 28l5-5 5 5" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />
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
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Git Branch / Pipeline Loop */}
          <rect width="48" height="48" rx="12" fill="#059669" fillOpacity="0.12" />
          <circle cx="16" cy="16" r="3.5" stroke="#059669" strokeWidth="2" />
          <circle cx="16" cy="32" r="3.5" stroke="#059669" strokeWidth="2" />
          <circle cx="32" cy="24" r="3.5" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.3" />
          <path
            d="M16 19.5v9M16 22c3 0 7 1 12.5 2"
            stroke="#047857"
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
      slug: "conferencia-agentes-ia-ingenieria-software",
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Architecture */}
          <rect width="48" height="48" rx="12" fill="#0d9488" fillOpacity="0.12" />
          <path
            d="M24 11l13 7.5v15L24 41l-13-7.5v-15L24 11z"
            stroke="#0d9488"
            strokeWidth="1.8"
            fill="#0d9488"
            fillOpacity="0.15"
          />
          <circle cx="24" cy="26" r="4" fill="#0f766e" />
        </svg>
      ),
    },
  ];

  const total = workshops.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide advance 1-by-1 every 3.8s unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3800);
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
      className="w-full bg-gradient-to-r from-[#631018] via-[#7e141f] to-[#631018] border-y-2 border-[#4c0b11] py-5 px-3 sm:px-6 relative shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 relative">
        {/* Navigation Arrow Left (Slides 1 by 1) */}
        <button
          onClick={prevSlide}
          aria-label="Taller anterior"
          className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#7e141f] hover:text-[#520c13] shadow-md border border-white/50 shrink-0 cursor-pointer transition-all hover:scale-110 active:scale-95 z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden w-full py-1">
          {/* Track that translates 1-by-1 smoothly */}
          <div
            className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
            style={{
              transform: `translateX(-${currentIndex * 290}px)`,
            }}
          >
            {workshops.map((ws, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={idx}
                  className={`shrink-0 w-[275px] sm:w-[310px] bg-white text-slate-800 rounded-2xl p-4 shadow-xl border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "border-amber-400 ring-2 ring-amber-400/30 scale-[1.01]"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Top: Logo on the left, details on the right */}
                  <div className="flex items-start gap-3.5 mb-3">
                    {/* Official Workshop Logo Container */}
                    <div className="w-13 h-13 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                      {ws.logo}
                    </div>

                    {/* Metadata Header */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                        <span className="font-extrabold text-[#8b1524] tracking-wider uppercase">
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

                  {/* Stars and Rating */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="font-bold text-slate-700 ml-1 font-mono text-[10px]">
                        {ws.rating}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ALIANZA 100%
                    </span>
                  </div>

                  {/* Red/Crimson Details Button matching reference */}
                  <Link
                    href={`/eventos/${ws.slug}`}
                    className="w-full py-2 rounded-xl bg-[#8b1524] hover:bg-[#a11a2b] text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md shadow-[#8b1524]/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>VER DETALLES</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrow Right (Slides 1 by 1) */}
        <button
          onClick={nextSlide}
          aria-label="Taller siguiente"
          className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#7e141f] hover:text-[#520c13] shadow-md border border-white/50 shrink-0 cursor-pointer transition-all hover:scale-110 active:scale-95 z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Progress Dots: slide one-by-one */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {workshops.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === currentIndex
                ? "w-6 bg-amber-300"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

