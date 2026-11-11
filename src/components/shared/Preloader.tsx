"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("devcon_preloaded");
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    const logMessages = [
      "> [ OK ] Inicializando plataforma académica de ingeniería v2.4.0",
      "> [ OK ] Cargando catálogo de talleres y conferencias especializadas",
      "> [ OK ] Conectando servidor de bases de datos PostgreSQL de cursos y alumnos...",
      "> [ OK ] Verificando módulos de certificación y validación QR",
      "> [ OK ] Entorno listo para capacitación técnica de alto rendimiento",
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 400);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("devcon_preloaded", "true");
          }, 900);
          return 100;
        }

        if (prev === 15) setLogs((l) => [...l, logMessages[0]]);
        if (prev === 38) setLogs((l) => [...l, logMessages[1]]);
        if (prev === 65) setLogs((l) => [...l, logMessages[2]]);
        if (prev === 85) setLogs((l) => [...l, logMessages[3]]);

        return prev + 2;
      });
    }, 24);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-slate-100 transition-opacity duration-500 overflow-hidden ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Circuit lines HUD background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="preloader-circuit"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 10 L 40 10 L 60 30 L 110 30"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.2"
            />
            <circle cx="10" cy="10" r="3" fill="#06b6d4" />
            <circle cx="110" cy="30" r="3" fill="#06b6d4" />
            <path
              d="M 30 70 L 60 70 L 80 90 L 110 90"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.2"
            />
            <circle cx="30" cy="70" r="2.5" fill="#3b82f6" />
            <circle cx="110" cy="90" r="2.5" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#preloader-circuit)" />
      </svg>

      {/* Background Reticle Targets */}
      <div className="absolute top-1/4 left-10 w-48 h-48 border border-cyan-500/20 rounded-full flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 border border-blue-500/20 rounded-full" />
      </div>
      <div className="absolute bottom-1/4 right-10 w-56 h-56 border border-blue-500/20 rounded-full flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 border border-cyan-500/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-xl w-full px-6 flex flex-col items-center text-center">
        {/* Welcome Tag */}
        <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold mb-2">
          BIENVENIDO A
        </span>

        {/* Brand Main Title */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2">
          DEVCON <span className="text-cyan-400">WORKSHOPS</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed font-medium">
          Plataforma de capacitación técnica, talleres especializados en ingeniería de sistemas y certificación profesional.
        </p>

        {/* Circular Percentage Loader */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="#1e293b"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="#06b6d4"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-200"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black font-mono text-cyan-400">
              {progress}%
            </span>
          </div>
        </div>

        {/* Terminal Box */}
        <div className="w-full bg-[#090d16] border border-slate-800 rounded-2xl p-4 sm:p-5 text-left font-mono text-[11px] sm:text-xs text-cyan-400 shadow-2xl space-y-2 h-36 overflow-hidden flex flex-col justify-end">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 leading-tight">
              <span className="text-cyan-400 shrink-0">&gt;</span>
              <span className="text-slate-200">{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Status text */}
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 mt-6 font-bold">
          CARGANDO CATÁLOGO DE INGENIERÍA...
        </span>
      </div>
    </div>
  );
}
