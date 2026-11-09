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
} from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-700 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6 text-white font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-white">
                DEVCON
              </span>
              <span className="font-black text-xl tracking-tight text-rose-500">
                WORKSHOPS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block">
              Ingeniería de Sistemas & Cloud
            </p>
          </div>
        </Link>

        {/* Center Navigation Pills (Exact format as Screenshot 2) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <Link
            href="/#eventos"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Talleres</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/#eventos"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Temarios</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/#docente"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Docente</span>
          </Link>

          <Link
            href="/verificar"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Certificados</span>
          </Link>

          <Link
            href="#contacto"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Contacto</span>
          </Link>
        </nav>

        {/* Right CTA Action Buttons (Exact dual button format from Image 2) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Button 1: Dark Crimson Pill (Iniciar Sesión Admin) */}
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-rose-950/40"
          >
            <User className="w-3.5 h-3.5 text-rose-300" />
            <span>Iniciar Sesión</span>
          </Link>

          {/* Button 2: Gold/Sand Pill (Inscribirme / Verificar) */}
          <Link
            href="/#eventos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-extrabold tracking-wider uppercase transition-all shadow-md shadow-amber-900/30 hover:scale-[1.02]"
          >
            <span>Inscribirme</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
