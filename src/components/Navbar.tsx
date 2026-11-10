import Link from "next/link";
import {
  Terminal,
  ChevronDown,
  ArrowRight,
  Lock,
} from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-2xl bg-[#701121] flex items-center justify-center shadow-md shadow-rose-950/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6 text-white font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900">
                DEVCON
              </span>
              <span className="font-black text-xl tracking-tight text-[#701121]">
                WORKSHOPS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:block font-semibold">
              Ingeniería de Sistemas & Cloud
            </p>
          </div>
        </Link>

        {/* Center Navigation Pills (Matching Screenshot 3) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/90 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Link
            href="/#eventos"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#701121] hover:shadow-xs transition-all"
          >
            <span>Talleres</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </Link>

          <Link
            href="/#eventos"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#701121] hover:shadow-xs transition-all"
          >
            <span>Temarios</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </Link>

          <Link
            href="/#docente"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#701121] hover:shadow-xs transition-all"
          >
            <span>Docente</span>
          </Link>

          <Link
            href="/verificar"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#701121] hover:shadow-xs transition-all"
          >
            <span>Certificados</span>
          </Link>

          <Link
            href="#contacto"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#701121] hover:shadow-xs transition-all"
          >
            <span>Contacto</span>
          </Link>
        </nav>

        {/* Right CTA Action Buttons (Crimson & Gold matching Screenshot 3) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Button 1: Crimson Pill (Iniciar Sesión / Portal Admin) */}
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#701121] hover:bg-[#580b18] text-white text-xs font-black tracking-wider uppercase transition-all shadow-md shadow-rose-900/20 hover:scale-[1.02]"
          >
            <Lock className="w-3.5 h-3.5 text-rose-200" />
            <span>Iniciar Sesión</span>
          </Link>

          {/* Button 2: Gold Pill (Inscribirme) */}
          <Link
            href="/#eventos"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#c29b38] hover:bg-[#a6822c] text-white text-xs font-black tracking-wider uppercase transition-all shadow-md shadow-amber-600/25 hover:scale-[1.02]"
          >
            <span>Inscribirme</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
