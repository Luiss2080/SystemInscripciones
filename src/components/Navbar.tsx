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

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  icon: typeof Cloud;
  category?: string;
}

const TALLERES_ITEMS: DropdownItem[] = [
  {
    title: "Docker & K8s",
    description: "Microservicios en producción.",
    href: "/eventos/taller-microservicios-docker-kubernetes",
    icon: Cloud,
  },
  {
    title: "Seguridad OWASP",
    description: "Auditoría y blindaje de APIs.",
    href: "/eventos/masterclass-seguridad-apis-nodejs-owasp",
    icon: ShieldCheck,
  },
  {
    title: "Agentes IA",
    description: "Flujos autónomos con MCP.",
    href: "/eventos/conferencia-agentes-ia-ingenieria-software",
    icon: Cpu,
  },
  {
    title: "Arquitectura",
    description: "Sistemas escalables y DDD.",
    href: "/?cat=arquitectura#eventos",
    icon: Layers,
    category: "arquitectura",
  },
  {
    title: "DevOps CI/CD",
    description: "Pipelines y entrega GitOps.",
    href: "/?cat=devops#eventos",
    icon: GitBranch,
    category: "devops",
  },
  {
    title: "Ver Catálogo",
    description: "Todos los talleres activos.",
    href: "/?cat=todos#eventos",
    icon: LayoutGrid,
    category: "todos",
  },
];

const TEMARIOS_ITEMS: DropdownItem[] = [
  {
    title: "Catálogo",
    description: "Próximos talleres y cupos.",
    href: "/#eventos",
    icon: GraduationCap,
  },
  {
    title: "Metodología",
    description: "Ruta práctica en 4 fases QR.",
    href: "/#metodologia",
    icon: Layers,
  },
  {
    title: "Tech Stack",
    description: "Herramientas de producción.",
    href: "/#tech-stack",
    icon: Code2,
  },
  {
    title: "Docente",
    description: "Perfil del Ing. Alex Martínez.",
    href: "/#docente",
    icon: Terminal,
  },
  {
    title: "Preguntas FAQ",
    description: "Dudas de registro y pagos.",
    href: "/#faq",
    icon: HelpCircle,
  },
  {
    title: "Certificados",
    description: "Validación pública oficial.",
    href: "/verificar",
    icon: Award,
  },
];

function DropdownPanel({
  items,
  onItemClick,
}: {
  items: DropdownItem[];
  onItemClick: (category?: string) => void;
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3.5 z-50">
      <div className="relative w-[275px] rounded-2xl bg-[#0b0e14] border border-slate-700/80 p-3 shadow-[0_22px_55px_rgba(0,0,0,0.85)]">
        {/* Centered Top Caret Pointer */}
        <span
          aria-hidden="true"
          className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-[#0b0e14] border-t border-l border-slate-700/80"
        />
        <div className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => onItemClick(item.category)}
                className="flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-900/90 border border-transparent hover:border-cyan-500/25 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/12 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors">
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-bold text-white text-[13px] leading-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [talleresOpen, setTalleresOpen] = useState(false);
  const [temariosOpen, setTemariosOpen] = useState(false);

  const handleSelectCategory = (catId: string) => {
    setTalleresOpen(false);
    setTemariosOpen(false);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-workshop-category", { detail: catId })
      );
    }
  };

  const handleDropdownItemClick = (category?: string) => {
    if (category) {
      handleSelectCategory(category);
      return;
    }
    setTalleresOpen(false);
    setTemariosOpen(false);
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
          {/* Dropdown: Talleres */}
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
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                talleresOpen
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`}
            >
              <span>Talleres</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  talleresOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
                }`}
              />
            </button>

            {talleresOpen && (
              <DropdownPanel
                items={TALLERES_ITEMS}
                onItemClick={handleDropdownItemClick}
              />
            )}
          </div>

          {/* Dropdown: Temarios */}
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
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                temariosOpen
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`}
            >
              <span>Temarios</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  temariosOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
                }`}
              />
            </button>

            {temariosOpen && (
              <DropdownPanel
                items={TEMARIOS_ITEMS}
                onItemClick={handleDropdownItemClick}
              />
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
