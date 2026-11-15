import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { AdminPageHeader } from "@/components/admin/ui";
import { Shield, Users, UserCheck, GraduationCap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Only ADMIN can access user management
  if (session.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const speakerCount = users.filter((u) => u.role === "SPEAKER").length;
  const staffCount = users.filter((u) => u.role === "STAFF").length;

  return (
    <div className="space-y-5">
      {/* Standard Module Header */}
      <AdminPageHeader
        icon={Shield}
        badgeText="SEGURIDAD Y CONTROL DE ACCESO • GESTIÓN RBAC"
        title="Gestión de Usuarios y"
        accentTitle="Roles del Sistema"
        description="Administración centralizada de identidades, privilegios de acceso y asignaciones docentes en el ecosistema de talleres y conferencias."
        actions={
          <div className="flex flex-wrap items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0 shadow-sm">
            <div>
              <span className="text-slate-400 block text-[9px]">TOTAL CUENTAS</span>
              <strong className="text-white font-black tabular-nums">{users.length}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">ADMINS</span>
              <strong className="text-cyan-400 font-black tabular-nums">{adminCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">DOCENTES</span>
              <strong className="text-indigo-400 font-black tabular-nums">{speakerCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">STAFF PUERTA</span>
              <strong className="text-emerald-400 font-black tabular-nums">{staffCount}</strong>
            </div>
          </div>
        }
      />

      {/* Main Standardized Table & Filter Section */}
      <UsersTable initialUsers={users} />
    </div>
  );
}
