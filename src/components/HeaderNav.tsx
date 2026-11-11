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
  LayoutGrid,
  MapPin,
  QrCode,
  Phone,
  Send,
  BookOpen,
} from "lucide-react";

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  icon: typeof Cloud;
  category?: string;
}

interface NavMenuConfig {
  id: string;
  label: string;
  href: string;
  items: DropdownItem[];
}

const NAV_MENUS: NavMenuConfig[] = [
  {
    id: "talleres",
    label: "Talleres",
    href: "/#eventos",
    items: [
      {
        title: "Todos los Talleres",
        description: "Agenda abierta 2026.",
        href: "/?cat=todos#eventos",
        icon: LayoutGrid,
        category: "todos",
      },
      {
        title: "Docker & K8s",
        description: "Microservicios en cloud.",
        href: "/eventos/taller-microservicios-docker-kubernetes",
        icon: Cloud,
      },
      {
        title: "Seguridad OWASP",
        description: "Blindaje de APIs Node.js.",
        href: "/eventos/masterclass-seguridad-apis-nodejs-owasp",
        icon: ShieldCheck,
      },
      {
        title: "Agentes IA",
        description: "Flujos autónomos MCP.",
        href: "/eventos/conferencia-agentes-ia-ingenieria-software",
        icon: Cpu,
      },
    ],
  },
  {
    id: "temarios",
    label: "Temarios",
    href: "/#metodologia",
    items: [
      {
        title: "Metodología",
        description: "Ruta en 4 fases QR.",
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
        title: "Facilitador",
        description: "Perfil Ing. Alex Martínez.",
        href: "/#docente",
        icon: Terminal,
      },
      {
        title: "Preguntas FAQ",
        description: "Registro, QR y pagos.",
        href: "/#faq",
        icon: HelpCircle,
      },
    ],
  },
  {
    id: "docente",
    label: "Docente",
    href: "/docente",
    items: [
      {
        title: "Perfil",
        description: "Trayectoria e impacto.",
        href: "/docente#perfil",
        icon: Terminal,
      },
      {
        title: "Principios",
        description: "Metodología hands-on.",
        href: "/docente#principios",
        icon: BookOpen,
      },
      {
        title: "Certificaciones",
        description: "Respaldo internacional.",
        href: "/docente#certificaciones",
        icon: Award,
      },
      {
        title: "Sus Talleres",
        description: "Próximas sesiones en vivo.",
        href: "/docente#talleres-docente",
        icon: GraduationCap,
      },
    ],
  },
  {
    id: "certificados",
    label: "Certificados",
    href: "/verificar",
    items: [
      {
        title: "Validar Folio",
        description: "Consulta por código QR.",
        href: "/verificar",
        icon: QrCode,
      },
      {
        title: "Acreditación",
        description: "Cómo se emite el certificado.",
        href: "/#metodologia",
        icon: Award,
      },
      {
        title: "Soporte QR",
        description: "Consultas de validación.",
        href: "/contacto#formulario",
        icon: HelpCircle,
      },
    ],
  },
  {
    id: "contacto",
    label: "Contacto",
    href: "/contacto",
    items: [
      {
        title: "Canales",
        description: "WhatsApp y correo oficial.",
        href: "/contacto#canales",
        icon: Phone,
      },
      {
        title: "Sedes & Horario",
        description: "Presencial y streaming HD.",
        href: "/contacto#sedes",
        icon: MapPin,
      },
      {
        title: "Formulario",
        description: "Enviar requerimiento.",
        href: "/contacto#formulario",
        icon: Send,
      },
    ],
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
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
      <div
        className="relative w-64 rounded-2xl border border-slate-700 p-2 shadow-2xl"
        style={{ backgroundColor: "#0d1424" }}
      >
        {/* Top Centered Pointer Caret */}
        <span
          aria-hidden="true"
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-slate-700"
          style={{ backgroundColor: "#0d1424" }}
        />

        <div className="flex flex-col gap-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => onItemClick(item.category)}
                className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-800/80 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors">
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-bold text-white text-[13px] leading-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
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

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleSelectCategory = (catId: string) => {
    setOpenMenuId(null);
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
    setOpenMenuId(null);
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
          {NAV_MENUS.map((menu) => {
            const isOpen = openMenuId === menu.id;
            return (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => setOpenMenuId(menu.id)}
                onMouseLeave={() => setOpenMenuId(null)}
              >
                <Link
                  href={menu.href}
                  onClick={() => setOpenMenuId(null)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full border transition-all ${
                    isOpen
                      ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                      : "border-transparent hover:bg-slate-800 hover:text-cyan-400"
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
                    }`}
                  />
                </Link>

                {isOpen && (
                  <DropdownPanel
                    items={menu.items}
                    onItemClick={handleDropdownItemClick}
                  />
                )}
              </div>
            );
          })}
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
            type="button"
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
              <span>Temarios</span>
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
