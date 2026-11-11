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
  Code2,
  HelpCircle,
  MessageSquare,
  GitBranch,
  LayoutGrid,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [talleresOpen, setTalleresOpen] = useState(false);
  const [temariosOpen, setTemariosOpen] = useState(false);

  const handleSelectCategory = (catId: string) => {
    setTalleresOpen(false);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-workshop-category", { detail: catId })
      );
    }
  };

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
              Ingeniería de Sistemas & Cloud
            </p>
          </div>
        </Link>

        {/* Center Navigation Pills (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 text-xs font-semibold tracking-wider text-slate-300 relative">
          {/* Dropdown: Talleres (Centered Grid with Direct Links & Short Names) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setTalleresOpen(true);
              setTemariosOpen(false);
            }}
            onMouseLeave={() => setTalleresOpen(false)}
          >
            <button
              onClick={() => {
                setTalleresOpen(!talleresOpen);
                setTemariosOpen(false);
              }}
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                <div className="w-[330px] rounded-2xl bg-[#0b0e14]/98 border border-slate-800/90 p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                  <div className="text-center pb-2 mb-2 border-b border-slate-800/80">
                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
                      TALLERES & ESPECIALIDADES
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Link
                      href="/eventos/taller-microservicios-docker-kubernetes"
                      onClick={() => setTalleresOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Cloud className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Docker & K8s</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">6h • Virtual</p>
                    </Link>

                    <Link
                      href="/eventos/masterclass-seguridad-apis-nodejs-owasp"
                      onClick={() => setTalleresOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Seguridad</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">OWASP Top 10</p>
                    </Link>

                    <Link
                      href="/eventos/conferencia-agentes-ia-ingenieria-software"
                      onClick={() => setTalleresOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Cpu className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Agentes IA</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Conf. MCP</p>
                    </Link>

                    <Link
                      href="/?cat=arquitectura#eventos"
                      onClick={() => handleSelectCategory("arquitectura")}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Layers className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Arquitectura</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Cloud & DDD</p>
                    </Link>

                    <Link
                      href="/?cat=devops#eventos"
                      onClick={() => handleSelectCategory("devops")}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <GitBranch className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">DevOps</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">CI/CD GitOps</p>
                    </Link>

                    <Link
                      href="/?cat=todos#eventos"
                      onClick={() => handleSelectCategory("todos")}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <LayoutGrid className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Ver Todos</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Catálogo</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown: Secciones / Temarios (Centered Grid Routing Directly to Every Section) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setTemariosOpen(true);
              setTalleresOpen(false);
            }}
            onMouseLeave={() => setTemariosOpen(false)}
          >
            <button
              onClick={() => {
                setTemariosOpen(!temariosOpen);
                setTalleresOpen(false);
              }}
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                <div className="w-[330px] rounded-2xl bg-[#0b0e14]/98 border border-slate-800/90 p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                  <div className="text-center pb-2 mb-2 border-b border-slate-800/80">
                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
                      SECCIONES DEL PROGRAMA
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Link
                      href="/#eventos"
                      onClick={() => setTemariosOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <GraduationCap className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Catálogo</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Agenda 2026</p>
                    </Link>

                    <Link
                      href="/#metodologia"
                      onClick={() => setTemariosOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Layers className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Metodología</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">4 Fases QR</p>
                    </Link>

                    <Link
                      href="/#tech-stack"
                      onClick={() => setTemariosOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Code2 className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Tech Stack</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Herramientas</p>
                    </Link>

                    <Link
                      href="/#docente"
                      onClick={() => setTemariosOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Docente</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Facilitador</p>
                    </Link>

                    <Link
                      href="/#faq"
                      onClick={() => setTemariosOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <HelpCircle className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Preguntas</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">FAQ & Pagos</p>
                    </Link>

                    <Link
                      href="/verificar"
                      onClick={() => setTemariosOpen(false)}
                      className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Award className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <p className="font-bold text-white text-xs leading-tight">Certificados</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Validar QR</p>
                    </Link>
                  </div>
                </div>
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
          <Link
            href="/admin/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold tracking-wider transition-all shadow-sm hover:border-cyan-500/50"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Portal Admin</span>
          </Link>

          <Link
            href="/#eventos"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold tracking-wider uppercase transition-all shadow-md shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <span>Inscribirme</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menú"
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Compact, Short Names & Complete Section Targets) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#030712]/98 backdrop-blur-2xl px-4 py-4">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
            <Link
              href="/#eventos"
              onClick={() => handleSelectCategory("todos")}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Talleres</span>
            </Link>

            <Link
              href="/#metodologia"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Metodología</span>
            </Link>

            <Link
              href="/#tech-stack"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Tech Stack</span>
            </Link>

            <Link
              href="/docente"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Docente</span>
            </Link>

            <Link
              href="/verificar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Certificados</span>
            </Link>

            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Preguntas</span>
            </Link>

            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Contacto</span>
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-cyan-400"
            >
              <Lock className="w-4 h-4" />
              <span>Portal Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
