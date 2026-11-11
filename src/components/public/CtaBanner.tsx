import Link from "next/link";
import FondoTech from "./FondoTech";
import {
  GraduationCap,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#030712] border-t border-slate-800/80">
      <FondoTech id="cta" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-cyan-800/50 shadow-2xl overflow-hidden backdrop-blur-md text-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Capacitación Continua para Ingenieros</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-3xl mx-auto mb-6 leading-tight tracking-tight">
            ¿Listo para llevar tu ingeniería de software al{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              siguiente nivel
            </span>
            ?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Asegura tu cupo en tiempo real, asiste a laboratorios prácticos en vivo con arquitecturas reales y obtén tu acreditación digital con verificación pública inmediata.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#eventos"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02] cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>Ver Talleres Disponibles</span>
            </a>

            <Link
              href="/verificar"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Validar Certificado Digital</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

