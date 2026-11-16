"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { logoutAdmin } from "@/actions/auth/session";
import FondoTech from "@/components/shared/FondoTech";
import {
  LayoutDashboard,
  QrCode,
  Calendar,
  Users,
  Award,
  LogOut,
  Terminal,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Clock,
  ChevronRight,
  PlusCircle,
  Shield,
  Activity,
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminName?: string;
  adminEmail?: string;
  adminRole?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  external?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

function getNavSectionsForRole(role: string): NavSection[] {
  if (role === "SPEAKER") {
    return [
      {
        title: "DOCENCIA",
        items: [
          { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
          { href: "/admin/eventos", label: "Mis Talleres", icon: Calendar },
        ],
      },
      {
        title: "ALUMNOS",
        items: [
          { href: "/admin/asistentes", label: "Mis Alumnos", icon: Users },
          { href: "/admin/certificados", label: "Certificados", icon: Award },
        ],
      },
      {
        title: "ENLACES",
        items: [
          { href: "/", label: "Web Pública", icon: ExternalLink, external: true },
          { href: "/verificar", label: "Verificador QR", icon: ShieldCheck, external: true },
        ],
      },
    ];
  }

  if (role === "STAFF") {
    return [
      {
        title: "CONTROL ACCESO",
        items: [
          { href: "/admin/checkin", label: "Escáner QR", icon: QrCode },
          { href: "/admin", label: "Métricas", icon: LayoutDashboard, exact: true },
        ],
      },
      {
        title: "ACREDITACIÓN",
        items: [
          { href: "/admin/asistentes", label: "Asistentes", icon: Users },
        ],
      },
      {
        title: "ENLACES",
        items: [
          { href: "/verificar", label: "Verificador QR", icon: ShieldCheck, external: true },
          { href: "/", label: "Web Pública", icon: ExternalLink, external: true },
        ],
      },
    ];
  }

  // Default: ADMIN
  return [
    {
      title: "OPERACIONES",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
        { href: "/admin/checkin", label: "Escáner QR", icon: QrCode },
        { href: "/admin/eventos", label: "Talleres", icon: Calendar },
      ],
    },
    {
      title: "GESTIÓN",
      items: [
        { href: "/admin/asistentes", label: "Asistentes", icon: Users },
        { href: "/admin/certificados", label: "Certificados", icon: Award },
      ],
    },
    {
      title: "SEGURIDAD",
      items: [
        { href: "/admin/usuarios", label: "Usuarios", icon: Shield },
      ],
    },
    {
      title: "ENLACES",
      items: [
        { href: "/", label: "Web Pública", icon: ExternalLink, external: true },
        { href: "/verificar", label: "Verificador QR", icon: ShieldCheck, external: true },
      ],
    },
  ];
}

export function AdminLayoutClient({
  children,
  adminName = "Administrador",
  adminEmail = "admin@ingeniero.tech",
  adminRole = "ADMIN",
}: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Deterministic live clock on client only to prevent SSR hydration mismatches
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleString("es-ES", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  // Determine current active section title for top header breadcrumbs
  const getActiveTitle = () => {
    if (pathname === "/admin") {
      if (adminRole === "SPEAKER") {
        return {
          section: "PORTAL DOCENTE",
          title: "Panel Académico & Cátedra",
          icon: Activity,
        };
      }
      if (adminRole === "STAFF") {
        return {
          section: "CONTROL OPERATIVO",
          title: "Monitoreo de Acceso y Aforo",
          icon: Activity,
        };
      }
      return {
        section: "CONSOLA GENERAL",
        title: "Dashboard de Operaciones & Métricas",
        icon: Activity,
      };
    }
    if (pathname.startsWith("/admin/checkin")) {
      return {
        section: "CONTROL DE ACCESO",
        title: "Escáner y Validación de Tickets QR",
        icon: QrCode,
      };
    }
    if (pathname.startsWith("/admin/eventos/nuevo")) {
      return {
        section: "PROGRAMACIÓN ACADÉMICA",
        title: "Nuevo Taller o Conferencia",
        icon: PlusCircle,
      };
    }
    if (pathname.startsWith("/admin/eventos")) {
      return {
        section: adminRole === "SPEAKER" ? "CÁTEDRA ASIGNADA" : "CATÁLOGO OFICIAL",
        title: adminRole === "SPEAKER" ? "Mis Talleres y Conferencias" : "Gestión de Talleres & Conferencias",
        icon: Calendar,
      };
    }
    if (pathname.startsWith("/admin/asistentes")) {
      return {
        section: adminRole === "SPEAKER" ? "PADRÓN DOCENTE" : "PADRÓN OFICIAL",
        title: adminRole === "SPEAKER" ? "Padrón de Mis Alumnos Asignados" : "Asistentes y Control de Pagos",
        icon: Users,
      };
    }
    if (pathname.startsWith("/admin/certificados")) {
      return {
        section: "ACREDITACIÓN OFICIAL",
        title: "Certificados Digitales & Folios Criptográficos",
        icon: Award,
      };
    }
    if (pathname.startsWith("/admin/usuarios")) {
      return {
        section: "SEGURIDAD & ROLES",
        title: "Gestión de Usuarios y Accesos (RBAC)",
        icon: Shield,
      };
    }
    return {
      section: "PANEL DE CONTROL",
      title: "Consola de Operaciones",
      icon: LayoutDashboard,
    };
  };

  const activeInfo = getActiveTitle();
  const adminInitial = adminName.trim().charAt(0).toUpperCase() || "A";
  const navSections = getNavSectionsForRole(adminRole);

  const roleMeta = {
    ADMIN: {
      roleDesc: "Administrador General",
      avatarGrad: "from-cyan-600 to-blue-600",
    },
    SPEAKER: {
      roleDesc: "Docente / Ponente",
      avatarGrad: "from-indigo-600 to-purple-600",
    },
    STAFF: {
      roleDesc: "Personal de Logística",
      avatarGrad: "from-emerald-600 to-teal-600",
    },
  }[adminRole as "ADMIN" | "SPEAKER" | "STAFF"] || {
    roleDesc: "Usuario Autorizado",
    avatarGrad: "from-cyan-600 to-blue-600",
  };

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-[#070b12] text-slate-200 select-none">
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-950/40">
        <Link
          href="/admin"
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className="flex items-center gap-3 group min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/25 group-hover:scale-105 group-hover:shadow-cyan-500/40 transition-all shrink-0">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-sm tracking-tight text-white">DevCon</span>
              <span className="font-black text-sm tracking-tight text-cyan-400">Workshops</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider truncate mt-1">
              Sistema de Inscripciones & QR
            </p>
          </div>
        </Link>

        {isMobile && (
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections without scrollbar */}
      <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-3 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-0.5">
            <div className="px-2 py-0.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase block">
                {section.title}
              </span>
            </div>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                const linkProps = item.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : { onClick: () => isMobile && setMobileMenuOpen(false) };

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    {...linkProps}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap group ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30 shadow-xs shadow-cyan-500/10"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-400 group-hover:text-cyan-400"
                      }`}
                    />
                    <span className="truncate flex-1">{item.label}</span>
                    {item.external && (
                      <ExternalLink className="w-3 h-3 text-slate-400 opacity-60 shrink-0 ml-auto" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer User Card */}
      <div className="p-2.5 border-t border-slate-800/80 bg-slate-950/60 space-y-2 shrink-0">
        <div className="flex items-center justify-between px-1.5 text-[10px] font-mono">
          <div className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistema en Línea</span>
          </div>
          <span className="text-slate-400 text-[9px] uppercase tracking-wider">Producción</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${roleMeta.avatarGrad} flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm`}>
              {adminInitial}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{adminName}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate" title={adminEmail}>
                {adminEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex overflow-x-hidden">
      {/* Background Tech Network */}
      <FondoTech id="admin-shell" />

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-40 border-r border-slate-800/80 shadow-2xl">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 shadow-2xl border-r border-slate-800"
            >
              {renderSidebarContent(true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area (Offset by Sidebar on Desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Consistent Top Header */}
        <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 shadow-md shadow-black/30">
          {/* Left: Mobile trigger & Rich Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú lateral"
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800 uppercase tracking-wider shrink-0">
                {activeInfo.section}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline-block shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <activeInfo.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white truncate">
                  {activeInfo.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Live Clock, Contextual Quick Actions, Profile & Logout */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live Clock (Client only) */}
            {currentTime && (
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentTime}</span>
              </div>
            )}

            {/* Quick Contextual Action based on Role */}
            {(adminRole === "ADMIN" || adminRole === "STAFF") && (
              <Link
                href="/admin/checkin"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-800/60 hover:border-cyan-500/70 text-cyan-300 text-xs font-bold transition-all shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Escáner QR</span>
              </Link>
            )}

            {adminRole === "ADMIN" && (
              <Link
                href="/admin/eventos/nuevo"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-black transition-all shadow-sm shadow-cyan-500/25"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Nuevo Taller</span>
              </Link>
            )}

            {adminRole === "SPEAKER" && (
              <Link
                href="/admin/eventos"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 text-xs font-bold transition-all shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mis Cursos</span>
              </Link>
            )}

            <div className="w-px h-6 bg-slate-800 hidden sm:block" />

            {/* User Profile Info Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-xs">
              <div
                className={`w-7 h-7 rounded-lg bg-gradient-to-br ${roleMeta.avatarGrad} flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm`}
              >
                {adminInitial}
              </div>
              <div className="text-left leading-none">
                <span className="text-xs font-bold text-white block truncate max-w-[120px]">
                  {adminName}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 block mt-0.5">
                  {roleMeta.roleDesc}
                </span>
              </div>
            </div>

            {/* Public Link */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-xs"
              title="Abrir Web Pública en nueva pestaña"
            >
              <span>Web</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>

            {/* Quick Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 w-full max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-7 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
