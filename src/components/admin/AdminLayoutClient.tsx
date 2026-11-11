"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/actions/auth";
import FondoTech from "@/components/public/FondoTech";
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
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/checkin", label: "Escáner QR", icon: QrCode },
  { href: "/admin/eventos", label: "Talleres", icon: Calendar },
  { href: "/admin/asistentes", label: "Asistentes", icon: Users },
  { href: "/admin/certificados", label: "Certificados", icon: Award },
];

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col overflow-x-hidden">
      {/* Live Cyber Circuit Grid Background matching Public Site */}
      <FondoTech id="admin-shell" />

      {/* Top Cyber Command Header matching HeaderNav pill design */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-md shadow-lg shadow-black/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
          {/* Admin Brand Identity */}
          <Link href="/admin" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-md shadow-cyan-950/40 group-hover:scale-105 group-hover:border-cyan-500/60 transition-all">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  DevCon
                </span>
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-cyan-400">
                  Admin
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  SYSENG
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block">
                Control Operativo • Ing. Alex Martínez
              </p>
            </div>
          </Link>

          {/* Center Pill Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 text-xs font-semibold tracking-wider text-slate-300">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/25"
                      : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Pills */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-[10px] font-mono font-bold text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>EN LÍNEA</span>
            </span>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-bold transition-all"
            >
              <span>Web Pública</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú Admin"
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#030712]/98 backdrop-blur-2xl px-4 py-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
              {ADMIN_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-cyan-500/40"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Web Pública</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-slate-800/70 bg-[#030712]/80 py-4 px-6 text-center text-[11px] text-slate-500 font-mono">
        DevCon Admin • Arquitectura Limpia, PostgreSQL 18 & Spec-Driven Development (SDD)
      </footer>
    </div>
  );
}
