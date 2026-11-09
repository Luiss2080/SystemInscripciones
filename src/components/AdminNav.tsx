"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/actions/auth";
import {
  LayoutDashboard,
  QrCode,
  Calendar,
  Users,
  Award,
  LogOut,
} from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Métricas", icon: LayoutDashboard, exact: true },
    { href: "/admin/checkin", label: "Escáner QR", icon: QrCode },
    { href: "/admin/eventos", label: "Eventos", icon: Calendar },
    { href: "/admin/asistentes", label: "Asistentes", icon: Users },
    { href: "/admin/certificados", label: "Certificados", icon: Award },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900 border border-slate-800 mb-8">
      <div className="flex flex-wrap items-center gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors ml-auto cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
}

