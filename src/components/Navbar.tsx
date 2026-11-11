"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ChevronDown,
  ArrowRight,
  Lock,
  Menu,
  X,
  Cloud,
  ShieldCheck,
  Cpu,
  Layers,
  GraduationCap,
  Award,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [talleresOpen, setTalleresOpen] = useState(false);
  const [temariosOpen, setTemariosOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-md shadow-lg shadow-black/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-md shadow-cyan-950/40 group-hover:scale-105 group-hover:border-cyan-500/60 transition-all">
            <Terminal className="w-5 h-5 text-cyan-400 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                DevCon
              </span>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-cyan-400">
                Workshops
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                SYSENG
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block font-medium">
              Ingeniería de Sistemas & Arquitectura Cloud
            </p>
          </div>
        </Link>

        {/* Center Navigation Pills (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 text-xs font-semibold tracking-wider text-slate-300 relative">
          {/* Dropdown: Talleres */}
          <div
            className="relative"
            onMouseEnter={() => setTalleresOpen(true)}
            onMouseLeave={() => setTalleresOpen(false)}
          >
            <button
              onClick={() => setTalleresOpen(!talleresOpen)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <span>Talleres</span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                  talleresOpen ? "rotate-180 text-cyan-400" : ""
                }`}
              />
            </button>

            {talleresOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-slate-950 border border-slate-800 p-2 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1">
                <Link
                  href="/#eventos"
                  onClick={() => setTalleresOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 text-xs font-medium transition-colors"
                >
                  <Cloud className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Microservicios & Cloud</p>
                    <p className="text-[10px] text-slate-400 font-mono">Docker, Kubernetes & AWS</p>
                  </div>
                </Link>

                <Link
                  href="/#eventos"
                  onClick={() => setTalleresOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 text-xs font-medium transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Seguridad & OWASP</p>
                    <p className="text-[10px] text-slate-400 font-mono">Blindaje de APIs & Auth</p>
                  </div>
                </Link>

                <Link
                  href="/#eventos"
                  onClick={() => setTalleresOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 text-xs font-medium transition-colors"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Agentes IA & MCP</p>
                    <p className="text-[10px] text-slate-400 font-mono">Automatización con LLMs</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown: Temarios */}
          <div
            className="relative"
            onMouseEnter={() => setTemariosOpen(true)}
            onMouseLeave={() => setTemariosOpen(false)}
          >
            <button
              onClick={() => setTemariosOpen(!temariosOpen)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <span>Temarios</span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                  temariosOpen ? "rotate-180 text-cyan-400" : ""
                }`}
              />
            </button>

            {temariosOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-slate-950 border border-slate-800 p-2 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1">
                <Link
                  href="/#metodologia"
                  onClick={() => setTemariosOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 text-xs font-medium transition-colors"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Metodología Hands-On</p>
                    <p className="text-[10px] text-slate-400 font-mono">Laboratorios 100% prácticos</p>
                  </div>
                </Link>

                <Link
                  href="/#tech-stack"
                  onClick={() => setTemariosOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 text-xs font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Stack de Producción</p>
                    <p className="text-[10px] text-slate-400 font-mono">Herramientas corporativas</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/docente"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-all"
          >
            <span>Docente</span>
          </Link>

          <Link
            href="/verificar"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-all"
          >
            <span>Certificados</span>
          </Link>

          <Link
            href="/contacto"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-all"
          >
            <span>Contacto</span>
          </Link>
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Button 1: Dark Glass Pill (Portal Admin) */}
          <Link
            href="/admin/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold tracking-wider transition-all shadow-sm hover:border-cyan-500/50"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Portal Admin</span>
          </Link>

          {/* Button 2: Vibrant Cyan Pill (Inscribirme) */}
          <Link
            href="/#eventos"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold tracking-wider uppercase transition-all shadow-md shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <span>Inscribirme</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menú"
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#030712]/98 backdrop-blur-2xl px-4 py-5 space-y-3">
          <div className="flex flex-col gap-1 text-sm font-semibold text-slate-300">
            <Link
              href="/#eventos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900 hover:text-cyan-400"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Talleres & Conferencias</span>
            </Link>

            <Link
              href="/#metodologia"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900 hover:text-cyan-400"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Ruta de Certificación</span>
            </Link>

            <Link
              href="/#docente"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900 hover:text-cyan-400"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Facilitador Principal</span>
            </Link>

            <Link
              href="/verificar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900 hover:text-cyan-400"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Verificar Certificado Digital</span>
            </Link>

            <Link
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900 hover:text-cyan-400"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Contacto & Sedes</span>
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-cyan-400 mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>Acceso Administrativo</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
