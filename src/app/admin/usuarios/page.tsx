import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui";
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
  const totalSpeakerEvents = users.reduce((acc, u) => acc + u._count.events, 0);

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

      {/* Fila Enriquecida de Estadísticas de Usuarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <AdminStatCard
          label="Cuentas Registradas"
          value={users.length}
          valueSuffix="activas"
          icon={Users}
          badge="RBAC ACTIVO"
          description="Identidades activas en base de datos"
          subDetail="3 roles de privilegio configurados"
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Superusuarios Admin"
          value={adminCount}
          valueSuffix="cuentas"
          icon={Shield}
          badge="ACCESO ROOT"
          description="Acceso total al sistema y finanzas"
          subDetail="Auditoría, configuración y seguridad"
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Docentes & Speakers"
          value={speakerCount}
          valueSuffix="instructores"
          icon={GraduationCap}
          badge="CÁTEDRA"
          description="Gestión académica de participantes"
          subDetail={`${totalSpeakerEvents} programas asignados en catálogo`}
          colorVariant="indigo"
        />

        <AdminStatCard
          label="Personal de Staff"
          value={staffCount}
          valueSuffix="operadores"
          icon={UserCheck}
          badge="LOGÍSTICA"
          description="Operaciones de campo y validación"
          subDetail="Escáner QR y control de acceso en puerta"
          colorVariant="emerald"
        />
      </div>

      {/* Main Standardized Table & Filter Section */}
      <UsersTable initialUsers={users} />
    </div>
  );
}
