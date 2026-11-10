import Link from "next/link";
import {
  Terminal,
  ChevronDown,
  User,
  ShieldCheck,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-white">
                DEVCON
              </span>
              <span className="font-black text-xl tracking-tight text-cyan-400">
                WORKSHOPS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block">
              Ingeniería de Sistemas & Cloud
            </p>
          </div>
        </Link>

        {/* Center Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <Link
            href="/#eventos"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-colors"
          >
            <span>Talleres</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/#eventos"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-colors"
          >
            <span>Temarios</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/#docente"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-colors"
          >
            <span>Docente</span>
          </Link>

          <Link
            href="/verificar"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-colors"
          >
            <span>Certificados</span>
          </Link>

          <Link
            href="#contacto"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-colors"
          >
            <span>Contacto</span>
          </Link>
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Button 1: Slate Tech Pill (Portal Admin) */}
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Iniciar Sesión</span>
          </Link>

          {/* Button 2: Electric Cyan-Blue Pill (Inscribirme) */}
          <Link
            href="/#eventos"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <span>Inscribirme</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
