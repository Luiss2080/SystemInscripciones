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
      />

      {/* Fila Adicional de Estadísticas de Usuarios */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Total Cuentas</span>
            <strong className="text-xl font-black text-white font-mono tabular-nums">{users.length}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Administradores</span>
            <strong className="text-xl font-black text-cyan-400 font-mono tabular-nums">{adminCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Docentes / Ponentes</span>
            <strong className="text-xl font-black text-indigo-400 font-mono tabular-nums">{speakerCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400 shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Operadores Staff</span>
            <strong className="text-xl font-black text-emerald-400 font-mono tabular-nums">{staffCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Standardized Table & Filter Section */}
      <UsersTable initialUsers={users} />
    </div>
  );
}
