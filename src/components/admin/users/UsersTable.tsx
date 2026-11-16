"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { updateUserRole, createNewUser } from "@/actions/admin/users";
import { formatShortDate } from "@/lib/utils/format";
import {
  AdminFilterBar,
  AdminTrayHeader,
  AdminStatusTabs,
  AdminPagination,
  AdminEmptyState,
  AdminBadge,
  AdminModal,
  AdminSelect,
} from "@/components/admin/ui";
import {
  Users,
  Shield,
  Download,
  RotateCcw,
  Eye,
  CheckCircle2,
  Loader2,
  PlusCircle,
  Filter,
} from "lucide-react";

export interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: Date | string;
  _count: {
    events: number;
  };
}

interface UsersTableProps {
  initialUsers: UserRecord[];
}

const ROLE_PERMISSIONS: Record<string, { desc: string; color: string; badge: string }> = {
  ADMIN: {
    desc: "Control total: CRUD de talleres, aprobación de pagos, emisión de certificados y gestión de usuarios.",
    color: "from-cyan-600 to-blue-600",
    badge: "ADMIN",
  },
  SPEAKER: {
    desc: "Gestión docente: Temarios, recursos, padrón de alumnos asignados y seguimiento académico.",
    color: "from-indigo-600 to-purple-600",
    badge: "SPEAKER",
  },
  STAFF: {
    desc: "Operaciones de campo: Escáner QR, acreditación manual en puerta y monitoreo de aforo en vivo.",
    color: "from-emerald-600 to-teal-600",
    badge: "STAFF",
  },
};

export function UsersTable({ initialUsers }: UsersTableProps) {
  const router = useRouter();
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals & Operation States
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isUpdatingRoleId, setIsUpdatingRoleId] = useState<string | null>(null);
  const [isSubmittingNewUser, setIsSubmittingNewUser] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setIsUpdatingRoleId(userId);
    try {
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        showToast(res.message || "Rol actualizado exitosamente.");
        if (selectedUser?.id === userId) {
          setSelectedUser((prev) => (prev ? { ...prev, role: newRole } : null));
        }
      } else {
        showToast(res.message || "Error al actualizar rol.");
      }
    } finally {
      setIsUpdatingRoleId(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingNewUser(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await createNewUser(formData);
      if (res.success) {
        showToast(res.message || "Usuario registrado exitosamente.");
        setIsNewUserModalOpen(false);
        router.refresh();
      } else {
        showToast(res.message || "Error al crear usuario.");
      }
    } finally {
      setIsSubmittingNewUser(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Nombre Completo", "Email", "Rol", "Talleres Asignados", "Fecha Registro"];
    const rows = filteredUsers.map((u) => [
      `"${u.id}"`,
      `"${u.fullName}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u._count.events}"`,
      `"${new Date(u.createdAt).toISOString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `usuarios_roles_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exportados ${filteredUsers.length} usuarios a CSV.`);
  };

  // Filter & Sort Pipeline
  const query = searchTerm.toLowerCase().trim();
  const filteredUsers = users
    .filter((u) => {
      const matchesSearch =
        query === "" ||
        u.fullName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.role.toLowerCase().includes(query);

      const matchesRole = roleFilter === "ALL" ? true : u.role === roleFilter;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "name_asc") {
        return a.fullName.localeCompare(b.fullName);
      }
      if (sortBy === "events_desc") {
        return b._count.events - a._count.events;
      }
      return 0;
    });

  // Pagination calculation
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  // Tab counts
  const tabCounts = {
    ALL: users.length,
    ADMIN: users.filter((u) => u.role === "ADMIN").length,
    SPEAKER: users.filter((u) => u.role === "SPEAKER").length,
    STAFF: users.filter((u) => u.role === "STAFF").length,
  };

  const statusTabs = [
    { id: "ALL", label: "Todos los Usuarios", count: tabCounts.ALL },
    { id: "ADMIN", label: "Administradores", count: tabCounts.ADMIN },
    { id: "SPEAKER", label: "Docentes / Speakers", count: tabCounts.SPEAKER },
    { id: "STAFF", label: "Personal de Staff", count: tabCounts.STAFF },
  ];

  const isFiltered = searchTerm !== "" || roleFilter !== "ALL";

  const handleResetFilters = () => {
    setSearchTerm("");
    setRoleFilter("ALL");
    setSortBy("recent");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Feedback Toast */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-xl bg-cyan-950/90 border border-cyan-800/80 text-cyan-300 text-xs font-mono font-bold flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{feedbackMsg}</span>
            </div>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-cyan-400 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standardized Filter & Search Bar */}
      <AdminFilterBar
        title="FILTRAR USUARIOS & ROLES"
        searchValue={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Buscar por nombre, correo electrónico o rol asignado..."
        filters={[
          {
            id: "role",
            label: "Rol",
            value: roleFilter,
            onChange: (val) => {
              setRoleFilter(val);
              setCurrentPage(1);
            },
            options: [
              { label: "Todos los Roles", value: "ALL" },
              { label: "Administrador (ADMIN)", value: "ADMIN" },
              { label: "Docente / Speaker (SPEAKER)", value: "SPEAKER" },
              { label: "Personal de Staff (STAFF)", value: "STAFF" },
            ],
          },
        ]}
        sortValue={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
        sortOptions={[
          { label: "Más Recientes", value: "recent" },
          { label: "Nombre (A - Z)", value: "name_asc" },
          { label: "Mayor Cantidad de Talleres", value: "events_desc" },
        ]}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Main Table Card Tray */}
      <div className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
        {/* Tray Header */}
        <AdminTrayHeader
          icon={Shield}
          title="BANDEJA DE USUARIOS Y ROLES DEL SISTEMA"
          subtitle="> AUDITORÍA Y CONTROL DE ACCESO BASADO EN ROLES (RBAC)"
          totalCount={filteredUsers.length}
          countLabel="USUARIOS"
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsNewUserModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Nuevo Usuario</span>
              </button>

              <button
                type="button"
                onClick={exportToCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Exportar CSV</span>
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold transition-all cursor-pointer shadow-xs"
                title="Actualizar lista de usuarios"
              >
                <RotateCcw
                  className={`w-3.5 h-3.5 text-cyan-400 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          }
        />

        {/* Status Tabs with Animated Spring Indicator */}
        <AdminStatusTabs
          tabs={statusTabs}
          activeTab={roleFilter}
          onChange={(tab) => {
            setRoleFilter(tab);
            setCurrentPage(1);
          }}
          layoutId="users-role-pill"
        />

        {/* Data Table */}
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <AdminEmptyState
              icon={Users}
              title="No se encontraron usuarios"
              description="No hay cuentas de usuario que coincidan con la búsqueda o el filtro de rol aplicado."
              action={isFiltered ? { label: "Restablecer Filtros", onClick: handleResetFilters } : undefined}
            />
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span>Usuario & Identidad</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold text-center">Rol Asignado</th>
                  <th className="py-3 px-4 font-bold">Privilegios & Alcance</th>
                  <th className="py-3 px-4 font-bold text-center">Talleres</th>
                  <th className="py-3 px-4 font-bold text-center">Fecha Alta</th>
                  <th className="py-3 px-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedUsers.map((user) => {
                  const initial = user.fullName.trim().charAt(0).toUpperCase() || "U";
                  const roleConfig = ROLE_PERMISSIONS[user.role] || ROLE_PERMISSIONS.ADMIN;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Usuario */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5 min-w-[220px]">
                          <div
                            className={`w-8 h-8 rounded-xl bg-gradient-to-br ${roleConfig.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate group-hover:text-cyan-300 transition-colors">
                              {user.fullName}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate font-mono">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Rol */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <AdminBadge
                          variant={user.role === "ADMIN" ? "admin" : user.role === "SPEAKER" ? "speaker" : "staff"}
                          label={user.role}
                        />
                      </td>

                      {/* Privilegios */}
                      <td className="py-3 px-4 max-w-xs">
                        <span className="text-slate-300 font-medium line-clamp-1">
                          {roleConfig.desc}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ID: {user.id.slice(0, 8)}...
                        </span>
                      </td>

                      {/* Talleres a cargo */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-mono font-bold text-cyan-300 text-[11px]">
                          {user._count.events} cursos
                        </span>
                      </td>

                      {/* Fecha Alta */}
                      <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {formatShortDate(user.createdAt)}
                      </td>

                      {/* Acciones */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* 1. Modal Details */}
                          <button
                            type="button"
                            onClick={() => setSelectedUser(user)}
                            title="Ver ficha completa del usuario"
                            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* 2. Quick Role Switcher Dropdown */}
                          <div className="relative inline-block">
                            <select
                              value={user.role}
                              disabled={isUpdatingRoleId === user.id}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="appearance-none px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono font-bold text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer disabled:opacity-50 shadow-xs transition-colors"
                              title="Cambiar rol de usuario"
                            >
                              <option value="ADMIN" className="bg-slate-900 text-white">ADMIN</option>
                              <option value="SPEAKER" className="bg-slate-900 text-white">SPEAKER</option>
                              <option value="STAFF" className="bg-slate-900 text-white">STAFF</option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Standardized Pagination Bar */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemLabel="usuarios en base de datos"
        />
      </div>

      {/* Standardized User Detail Modal */}
      <AdminModal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        title="Ficha Oficial de Usuario y Permisos"
        subtitle={`ID: ${selectedUser?.id || ""}`}
        icon={Shield}
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Cambiar rol activo:</span>
              {selectedUser && (
                <div className="flex items-center gap-1">
                  {(["ADMIN", "SPEAKER", "STAFF"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      disabled={selectedUser.role === r || isUpdatingRoleId === selectedUser.id}
                      onClick={() => handleRoleChange(selectedUser.id, r)}
                      className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        selectedUser.role === r
                          ? "bg-cyan-500 text-slate-950 shadow-sm"
                          : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              Cerrar Ficha
            </button>
          </div>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {selectedUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    {selectedUser.fullName}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
              <AdminBadge
                variant={selectedUser.role === "ADMIN" ? "admin" : selectedUser.role === "SPEAKER" ? "speaker" : "staff"}
                label={selectedUser.role}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                Alcance y Privilegios del Rol
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {ROLE_PERMISSIONS[selectedUser.role]?.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Talleres / Eventos Asignados
                </span>
                <p className="text-white font-mono font-bold text-sm">
                  {selectedUser._count.events} cursos dictados
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Fecha de Registro en BD
                </span>
                <p className="text-white font-mono text-xs">
                  {new Date(selectedUser.createdAt).toLocaleString("es-ES")}
                </p>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Modal for Creating New User */}
      <AdminModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        title="Crear Nueva Cuenta de Usuario"
        subtitle="Asignación de privilegios y credenciales de acceso"
        icon={PlusCircle}
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-slate-300 uppercase">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Ej. Ing. Roberto Gómez"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-slate-300 uppercase">
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Ej. roberto.gomez@ingeniero.tech"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-slate-300 uppercase">
              Contraseña Temporal *
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Mínimo 8 caracteres"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-slate-300 uppercase">
              Rol del Sistema *
            </label>
            <select
              name="role"
              defaultValue="STAFF"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="ADMIN">ADMIN - Administrador General</option>
              <option value="SPEAKER">SPEAKER - Docente / Ponente</option>
              <option value="STAFF">STAFF - Control de Acceso & Logística</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewUserModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmittingNewUser}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              {isSubmittingNewUser ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span>Crear Cuenta</span>
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Modal de Filtros de Usuarios & Roles */}
      <AdminModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtros de Usuarios y Permisos"
        subtitle="Refina el padrón de cuentas administrativas por rol y orden"
        icon={Filter}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Rol del Sistema
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "ALL", label: "Todos los Roles" },
                { id: "ADMIN", label: "Administradores" },
                { id: "SPEAKER", label: "Docentes" },
                { id: "STAFF", label: "Staff Puerta" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRoleFilter(r.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    roleFilter === r.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span>{r.label}</span>
                  {roleFilter === r.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Criterio de Ordenamiento
            </label>
            <AdminSelect
              value={sortBy}
              onChange={(val) => {
                setSortBy(val);
                setCurrentPage(1);
              }}
              options={[
                { label: "Más Recientes (creación de cuenta)", value: "recent" },
                { label: "Nombre de Usuario (A - Z)", value: "name_asc" },
                { label: "Mayor Cantidad de Talleres", value: "events_desc" },
              ]}
              title="Criterio de Ordenamiento"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
