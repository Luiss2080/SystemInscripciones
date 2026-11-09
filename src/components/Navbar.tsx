import Link from "next/link";
import { Terminal, ShieldCheck, Calendar, Lock } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
              <span>DevCon & Workshops</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                SysEng
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Ingeniería de Sistemas & Arquitectura Cloud
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/#eventos"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Talleres y Charlas</span>
          </Link>

          <Link
            href="/verificar"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Verificar Certificado</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 ml-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Portal Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
