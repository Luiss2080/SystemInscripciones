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
  ChevronDown,
  PlusCircle,
  Shield,
  Activity,
  Layers,
  GraduationCap,
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
  icon: typeof LayoutDashboard;
  items: NavItem[];
}

function getNavSectionsForRole(role: string): NavSection[] {
  if (role === "SPEAKER") {
    return [
      {
        title: "DOCENCIA",
        icon: GraduationCap,
        items: [
          { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
          { href: "/admin/eventos", label: "Mis Talleres", icon: Calendar },
        ],
      },
      {
        title: "ALUMNOS",
        icon: Users,
        items: [
          { href: "/admin/asistentes", label: "Mis Alumnos", icon: Users },
          { href: "/admin/certificados", label: "Certificados", icon: Award },
        ],
      },
      {
        title: "ENLACES",
        icon: ExternalLink,
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
        icon: QrCode,
        items: [
          { href: "/admin/checkin", label: "Escáner QR", icon: QrCode },
          { href: "/admin", label: "Métricas", icon: LayoutDashboard, exact: true },
        ],
      },
      {
        title: "ACREDITACIÓN",
        icon: Users,
        items: [
          { href: "/admin/asistentes", label: "Asistentes", icon: Users },
        ],
      },
      {
        title: "ENLACES",
        icon: ExternalLink,
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
      icon: Activity,
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
        { href: "/admin/checkin", label: "Escáner QR", icon: QrCode },
        { href: "/admin/eventos", label: "Talleres", icon: Calendar },
      ],
    },
    {
      title: "GESTIÓN",
      icon: Layers,
      items: [
        { href: "/admin/asistentes", label: "Asistentes", icon: Users },
        { href: "/admin/certificados", label: "Certificados", icon: Award },
      ],
    },
    {
      title: "SEGURIDAD",
      icon: Shield,
      items: [
        { href: "/admin/usuarios", label: "Usuarios", icon: Shield },
      ],
    },
    {
      title: "ENLACES",
      icon: ExternalLink,
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
  const navSections = getNavSectionsForRole(adminRole);

  // Collapsible state for animated sidebar categories (must be before any early return)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    OPERACIONES: true,
    GESTIÓN: true,
    SEGURIDAD: true,
    ENLACES: true,
    DOCENCIA: true,
    ALUMNOS: true,
    "CONTROL ACCESO": true,
    ACREDITACIÓN: true,
  });

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  // Auto-expand section if user navigates to an item within it
  useEffect(() => {
    navSections.forEach((section) => {
      const hasActive = section.items.some((item) =>
        item.exact ? pathname === item.href : pathname.startsWith(item.href)
      );
      if (hasActive) {
        setOpenSections((prev) => ({ ...prev, [section.title]: true }));
      }
    });
  }, [pathname, navSections]);

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
          section: "DOCENCIA",
          title: "Panel Académico",
          icon: Activity,
        };
      }
      if (adminRole === "STAFF") {
        return {
          section: "OPERACIONES",
          title: "Control Operativo",
          icon: Activity,
        };
      }
      return {
        section: "PANEL",
        title: "Dashboard General",
        icon: Activity,
      };
    }
    if (pathname.startsWith("/admin/checkin")) {
      return {
        section: "ACCESO",
        title: "Escáner QR & Check-in",
        icon: QrCode,
      };
    }
    if (pathname.startsWith("/admin/eventos/nuevo")) {
      return {
        section: "PROGRAMAS",
        title: "Nuevo Taller",
        icon: PlusCircle,
      };
    }
    if (pathname.startsWith("/admin/eventos")) {
      return {
        section: adminRole === "SPEAKER" ? "DOCENCIA" : "PROGRAMAS",
        title: adminRole === "SPEAKER" ? "Mis Talleres" : "Talleres & Eventos",
        icon: Calendar,
      };
    }
    if (pathname.startsWith("/admin/asistentes")) {
      return {
        section: adminRole === "SPEAKER" ? "ALUMNOS" : "REGISTROS",
        title: adminRole === "SPEAKER" ? "Mis Alumnos" : "Asistentes & Pagos",
        icon: Users,
      };
    }
    if (pathname.startsWith("/admin/certificados")) {
      return {
        section: "ACREDITACIÓN",
        title: "Certificados Digitales",
        icon: Award,
      };
    }
    if (pathname.startsWith("/admin/usuarios")) {
      return {
        section: "SEGURIDAD",
        title: "Usuarios & Roles",
        icon: Shield,
      };
    }
    return {
      section: "PANEL",
      title: "Consola de Operaciones",
      icon: LayoutDashboard,
    };
  };

  const activeInfo = getActiveTitle();
  const adminInitial = adminName.trim().charAt(0).toUpperCase() || "A";

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
      <div className="h-[72px] px-5 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-950/50">
        <Link
          href="/admin"
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className="flex items-center gap-3.5 group min-w-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/25 group-hover:scale-105 group-hover:shadow-cyan-500/40 transition-all shrink-0">
            <Terminal className="w-5 h-5 stroke-[2.5]" />
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

      {/* Navigation Sections with Collapsible Animated Categories */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navSections.map((section) => {
          const SectionIcon = section.icon;
          const isSectionOpen = openSections[section.title] ?? true;
          const hasActiveItem = section.items.some((item) =>
            item.exact ? pathname === item.href : pathname.startsWith(item.href)
          );

          return (
            <div key={section.title} className="space-y-1">
              {/* Collapsible Category Header Button */}
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all group cursor-pointer ${
                  hasActiveItem
                    ? "bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
                }`}
                aria-expanded={isSectionOpen}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <SectionIcon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      hasActiveItem ? "text-cyan-400" : "text-slate-500 group-hover:text-cyan-400"
                    }`}
                  />
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase truncate">
                    {section.title}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                    {section.items.length}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isSectionOpen ? 0 : -90 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                </motion.div>
              </button>

              {/* Animated Collapsible Sub-items */}
              <AnimatePresence initial={false}>
                {isSectionOpen && (
                  <motion.div
                    key={`section-content-${section.title}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden space-y-1 pl-1"
                  >
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
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap group ${
                            isActive
                              ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30 shadow-xs shadow-cyan-500/10"
                              : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                          }`}
                        >
                          <Icon
                            className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                              isActive
                                ? "text-cyan-400"
                                : "text-slate-400 group-hover:text-cyan-400"
                            }`}
                          />
                          <span className="truncate flex-1">{item.label}</span>
                          {item.external && (
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-60 shrink-0 ml-auto" />
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer User Card with comfortable padding */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/70 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between px-1.5 text-[10px] font-mono">
          <div className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistema en Línea</span>
          </div>
          <span className="text-slate-400 text-[9px] uppercase tracking-wider font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            Producción
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${roleMeta.avatarGrad} flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm`}>
              {adminInitial}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate max-w-[130px]">{adminName}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]" title={adminEmail}>
                {adminEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/15 transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
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
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 z-40 border-r border-slate-800/80 shadow-2xl">
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
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Consistent Top Header */}
        <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-md shadow-black/30">
          {/* Left: Mobile trigger & Rich Breadcrumb (never truncated) */}
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
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-950/70 text-cyan-400 border border-cyan-800/60 uppercase tracking-wider shrink-0 shadow-xs">
                {activeInfo.section}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline-block shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <activeInfo.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                  {activeInfo.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Live Clock, User Profile, Web & Logout */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live Clock (Client only) */}
            {currentTime && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{currentTime}</span>
              </div>
            )}

            {/* Contextual Action: only on Events list for Admin */}
            {pathname.startsWith("/admin/eventos") && pathname !== "/admin/eventos/nuevo" && adminRole === "ADMIN" && (
              <Link
                href="/admin/eventos/nuevo"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-black transition-all shadow-sm shadow-cyan-500/25"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Nuevo Taller</span>
              </Link>
            )}

            {/* User Profile Info Pill */}
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-xs">
              <div
                className={`w-7 h-7 rounded-lg bg-gradient-to-br ${roleMeta.avatarGrad} flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm`}
              >
                {adminInitial}
              </div>
              <div className="text-left leading-none">
                <span className="text-xs font-bold text-white block truncate max-w-[130px]">
                  {adminName}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 block mt-1 font-semibold">
                  {roleMeta.roleDesc}
                </span>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-800 hidden sm:block" />

            {/* Public Link */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-xs"
              title="Abrir Web Pública en nueva pestaña"
            >
              <span>Web</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>

            {/* Quick Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
              title="Cerrar sesión"
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
