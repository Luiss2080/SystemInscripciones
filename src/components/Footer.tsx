import { Terminal, ShieldCheck, Mail, Globe, Share2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-bold text-slate-200 text-lg">
              Plataforma de Capacitación Técnica
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Talleres prácticos, masterclasses de seguridad y conferencias de alta ingeniería dictadas por el{" "}
            <span className="text-slate-200 font-medium">Ing. Alex Martínez</span>. Formando a la próxima generación de ingenieros en arquitectura distribuida, cloud native y desarrollo seguro.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title="GitHub"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title="LinkedIn"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="mailto:contacto@ingeniero.tech"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title="Contacto"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-sm mb-3 uppercase tracking-wider">
            Navegación Rápida
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#eventos" className="hover:text-cyan-400 transition-colors">
                Próximos Talleres
              </Link>
            </li>
            <li>
              <Link href="/verificar" className="hover:text-cyan-400 transition-colors">
                Verificador de Certificados
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-cyan-400 transition-colors">
                Acceso Organizador
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-sm mb-3 uppercase tracking-wider">
            Seguridad & Validación
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tickets con firma QR única</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certificados verificables online</span>
            </li>
            <li className="text-xs text-slate-500 pt-2">
              Construido con Next.js 16, PostgreSQL & Spec-Driven Development.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© 2026 Ing. Alex Martínez - Todos los derechos reservados.</p>
        <p className="font-mono text-slate-400">
          Powered by Clean Architecture & Spec-Driven Development (SDD)
        </p>
      </div>
    </footer>
  );
}
