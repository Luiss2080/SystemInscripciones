import { Terminal } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-slate-100 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none translate-y-32" />

      {/* Cyber Reticle Circuit Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="root-loading-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="1.5" fill="#06b6d4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#root-loading-grid)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        {/* Animated Brand Emblem with Pulsing Cyber Rings */}
        <div className="relative mb-6">
          {/* Outer Pulsing Ring */}
          <div className="absolute -inset-4 rounded-3xl bg-cyan-500/20 blur-md animate-pulse" />
          <div className="absolute -inset-2 rounded-2xl border border-cyan-500/30 animate-ping opacity-30" />

          {/* Logo Box */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-950 via-[#070e1b] to-slate-950 border-2 border-cyan-400/80 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <Terminal className="w-8 h-8 text-cyan-400 stroke-[2.2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-[10px] font-mono font-bold text-cyan-300 tracking-widest uppercase">
            <span>DevCon Engineering Suite</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            DevCon <span className="text-cyan-400">Workshops</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Plataforma de Capacitación & Certificación Profesional
          </p>
        </div>

        {/* High-Tech Animated Loading Bar */}
        <div className="w-full max-w-xs space-y-2">
          <div className="relative h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-cyan-400 to-blue-500 w-1/2 rounded-full animate-[shimmer_1.6s_ease-in-out_infinite]" />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-0.5">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Sincronizando...</span>
            </span>
            <span className="tracking-widest uppercase text-slate-400">v2.6 Producción</span>
          </div>
        </div>
      </div>
    </div>
  );
}
