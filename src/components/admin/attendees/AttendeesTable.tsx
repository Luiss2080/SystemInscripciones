"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { manualCheckin } from "@/actions/admin/checkin";
import { approvePayment } from "@/actions/admin/registrations";
import { formatShortTime, formatShortDate } from "@/lib/utils/format";
import {
  AdminFilterBar,
  AdminTrayHeader,
  AdminStatusTabs,
  AdminPagination,
  AdminEmptyState,
  AdminBadge,
  AdminModal,
  getStatusBadgeVariant,
} from "@/components/admin/ui";
import {
  Users,
  Download,
  RotateCcw,
  Eye,
  CheckCircle2,
  Loader2,
  ExternalLink,
  CreditCard,
  Check,
  Phone,
  Building,
  Briefcase,
  Ticket,
  Calendar,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface AttendeeRecord {
  id: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  attendeeOccupation: string;
  attendeeOrganization: string | null;
  status: string;
  attendedAt: Date | string | null;
  createdAt: Date | string;
  event: {
    id: string;
    title: string;
  };
  ticket: {
    ticketCode: string;
  } | null;
}

interface AttendeesTableProps {
  initialAttendees: AttendeeRecord[];
  events: {
    id: string;
    title: string;
  }[];
}

export function AttendeesTable({ initialAttendees, events }: AttendeesTableProps) {
  const router = useRouter();
  const [attendees, setAttendees] = useState<AttendeeRecord[]>(initialAttendees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Loading states
  const [checkingInId, setCheckingInId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Selected attendee for details modal
  const [selectedAttendee, setSelectedAttendee] = useState<AttendeeRecord | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleManualCheckin = async (id: string) => {
    setCheckingInId(id);
    try {
      const res = await manualCheckin(id);
      if (res.success) {
        setAttendees((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, status: "ATTENDED", attendedAt: new Date().toISOString() }
              : item
          )
        );
        showToast(res.message || "Asistencia acreditada con éxito.");
      } else {
        showToast(res.message || "Error al acreditar asistencia.");
      }
    } finally {
      setCheckingInId(null);
    }
  };

  const handleApprovePayment = async (id: string) => {
    setApprovingId(id);
    try {
      const res = await approvePayment(id);
      if (res.success) {
        setAttendees((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "CONFIRMED" } : item
          )
        );
        showToast(res.message || "Pago aprobado. Ticket generado.");
      } else {
        showToast(res.message || "Error al aprobar pago.");
      }
    } finally {
      setApprovingId(null);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Nombre",
      "Email",
      "Telefono",
      "Ocupacion",
      "Organizacion",
      "Programa / Taller",
      "Ticket",
      "Estado",
      "Fecha Registro",
    ];

    const rows = filteredAttendees.map((a) => [
      `"${a.id}"`,
      `"${a.attendeeName}"`,
      `"${a.attendeeEmail}"`,
      `"${a.attendeePhone}"`,
      `"${a.attendeeOccupation}"`,
      `"${a.attendeeOrganization || ""}"`,
      `"${a.event.title}"`,
      `"${a.ticket?.ticketCode || ""}"`,
      `"${a.status}"`,
      `"${new Date(a.createdAt).toISOString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `asistentes_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exportados ${filteredAttendees.length} registros a CSV.`);
  };

  // Filter and Sort Pipeline
  const query = searchTerm.toLowerCase().trim();
  const filteredAttendees = attendees
    .filter((a) => {
      const matchesSearch =
        query === "" ||
        a.attendeeName.toLowerCase().includes(query) ||
        a.attendeeEmail.toLowerCase().includes(query) ||
        a.attendeePhone.toLowerCase().includes(query) ||
        a.event.title.toLowerCase().includes(query) ||
        (a.ticket?.ticketCode.toLowerCase().includes(query) ?? false);

      const matchesStatus =
        statusFilter === "ALL" ? true : a.status === statusFilter;
      const matchesEvent =
        eventFilter === "ALL" ? true : a.event.id === eventFilter;

      return matchesSearch && matchesStatus && matchesEvent;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "name_asc") {
        return a.attendeeName.localeCompare(b.attendeeName);
      }
      if (sortBy === "name_desc") {
        return b.attendeeName.localeCompare(a.attendeeName);
      }
      return 0;
    });

  // Pagination calculation
  const totalItems = filteredAttendees.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAttendees = filteredAttendees.slice(startIndex, startIndex + pageSize);

  // Counts for tabs
  const tabCounts = {
    ALL: attendees.length,
    CONFIRMED: attendees.filter((a) => a.status === "CONFIRMED").length,
    ATTENDED: attendees.filter((a) => a.status === "ATTENDED").length,
    PENDING_PAYMENT: attendees.filter((a) => a.status === "PENDING_PAYMENT").length,
  };

  const statusTabs = [
    { id: "ALL", label: "Todos los Asistentes", count: tabCounts.ALL },
    { id: "CONFIRMED", label: "Confirmados", count: tabCounts.CONFIRMED },
    { id: "ATTENDED", label: "Asistieron (Check-in)", count: tabCounts.ATTENDED },
    { id: "PENDING_PAYMENT", label: "Pendientes Pago", count: tabCounts.PENDING_PAYMENT },
  ];

  const isFiltered =
    searchTerm !== "" || statusFilter !== "ALL" || eventFilter !== "ALL";

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setEventFilter("ALL");
    setSortBy("recent");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Feedback Toast */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-xl bg-cyan-950/90 border border-cyan-800/80 text-cyan-300 text-xs font-mono font-bold flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{actionFeedback}</span>
            </div>
            <button
              onClick={() => setActionFeedback(null)}
              className="text-cyan-400 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standardized Filter & Search Bar */}
      <AdminFilterBar
        title="FILTRAR ASISTENTES & PAGOS"
        searchValue={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Buscar por código #TCK, nombre, email o cédula..."
        filters={[
          {
            id: "event",
            label: "Taller",
            value: eventFilter,
            onChange: (val) => {
              setEventFilter(val);
              setCurrentPage(1);
            },
            options: [
              { label: "Todos los Talleres", value: "ALL" },
              ...events.map((e) => ({ label: e.title, value: e.id })),
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
          { label: "Más Antiguos", value: "oldest" },
          { label: "Nombre (A - Z)", value: "name_asc" },
          { label: "Nombre (Z - A)", value: "name_desc" },
        ]}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Main Table Card Tray */}
      <div className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
        {/* Tray Header */}
        <AdminTrayHeader
          icon={Users}
          title="BANDEJA DE ASISTENTES & PEDIDOS"
          subtitle="> CONSULTA, AUDITORÍA Y ACREDITACIÓN EN TIEMPO REAL"
          totalCount={filteredAttendees.length}
          countLabel="REGISTROS"
          actions={
            <div className="flex items-center gap-2">
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
                title="Actualizar listado de asistentes"
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

        {/* Status Filter Tabs with Animated Spring Indicator */}
        <AdminStatusTabs
          tabs={statusTabs}
          activeTab={statusFilter}
          onChange={(tab) => {
            setStatusFilter(tab);
            setCurrentPage(1);
          }}
          layoutId="attendees-status-pill"
        />

        {/* Data Table */}
        <div className="overflow-x-auto">
          {filteredAttendees.length === 0 ? (
            <AdminEmptyState
              title="No se encontraron asistentes"
              description="No hay participantes registrados que coincidan con la búsqueda o el filtro seleccionado."
              action={isFiltered ? { label: "Restablecer Filtros", onClick: handleResetFilters } : undefined}
            />
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Ticket className="w-3 h-3 text-cyan-400" />
                      <span>Ticket & Registro</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span>Asistente & Contacto</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>Programa / Taller</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold text-center">Estado</th>
                  <th className="py-3 px-4 font-bold text-center">Asistencia QR</th>
                  <th className="py-3 px-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedAttendees.map((attendee) => {
                  const initial = attendee.attendeeName.trim().charAt(0).toUpperCase() || "A";
                  const isPendingPay = attendee.status === "PENDING_PAYMENT";
                  const isAttended = attendee.status === "ATTENDED";
                  const isConfirmed = attendee.status === "CONFIRMED";

                  return (
                    <tr
                      key={attendee.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Ticket & Fecha */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {attendee.ticket ? (
                            <Link
                              href={`/tickets/${attendee.ticket.ticketCode}`}
                              target="_blank"
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 font-mono font-bold text-[11px] text-cyan-300 hover:text-white hover:border-cyan-400 transition-all shadow-xs"
                            >
                              <span>{attendee.ticket.ticketCode}</span>
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </Link>
                          ) : (
                            <span className="font-mono text-slate-500 text-[11px] px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800">
                              Sin ticket
                            </span>
                          )}
                          <div className="text-[10px] font-mono text-slate-400 pl-0.5">
                            {formatShortDate(attendee.createdAt)}
                          </div>
                        </div>
                      </td>

                      {/* Asistente */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5 min-w-[200px]">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 border border-cyan-500/30 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm shadow-cyan-950/40">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate group-hover:text-cyan-300 transition-colors">
                              {attendee.attendeeName}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate font-mono">
                              {attendee.attendeeEmail}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Evento */}
                      <td className="py-3 px-4 max-w-xs">
                        <span className="text-white font-bold block leading-snug line-clamp-1 group-hover:text-cyan-300 transition-colors">
                          {attendee.event.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                          {attendee.attendeeOccupation}
                          {attendee.attendeeOrganization ? ` • ${attendee.attendeeOrganization}` : ""}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <AdminBadge
                          variant={getStatusBadgeVariant(attendee.status)}
                          label={
                            isConfirmed
                              ? "CONFIRMADO"
                              : isAttended
                              ? "ASISTIÓ (QR)"
                              : isPendingPay
                              ? "PENDIENTE PAGO"
                              : attendee.status
                          }
                          pulse={isPendingPay}
                        />
                      </td>

                      {/* Check-in QR timestamp */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {attendee.attendedAt ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-[11px] font-mono text-cyan-300 font-bold">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                            <span>{formatShortTime(attendee.attendedAt)}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 font-mono text-[11px]">
                            Pendiente
                          </span>
                        )}
                      </td>

                      {/* Standardized Actions Column */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* 1. View Details (Eye Modal) */}
                          <button
                            type="button"
                            onClick={() => setSelectedAttendee(attendee)}
                            title="Ver detalles completos del participante"
                            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* 2. Primary Action Button */}
                          {isPendingPay && (
                            <button
                              type="button"
                              onClick={() => handleApprovePayment(attendee.id)}
                              disabled={approvingId === attendee.id}
                              title="Aprobar pago y emitir ticket QR"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-xs"
                            >
                              {approvingId === attendee.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CreditCard className="w-3 h-3 text-amber-400" />
                              )}
                              <span>Aprobar</span>
                            </button>
                          )}

                          {isConfirmed && (
                            <button
                              type="button"
                              onClick={() => handleManualCheckin(attendee.id)}
                              disabled={checkingInId === attendee.id}
                              title="Acreditar ingreso manual (Check-in)"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                            >
                              {checkingInId === attendee.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3 text-cyan-400" />
                              )}
                              <span>Check-in</span>
                            </button>
                          )}

                          {isAttended && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-[10px] font-mono font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Acreditado</span>
                            </span>
                          )}

                          {/* 3. Ticket Link */}
                          {attendee.ticket && (
                            <Link
                              href={`/tickets/${attendee.ticket.ticketCode}`}
                              target="_blank"
                              title="Ver credencial de acceso digital"
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
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
          itemLabel="asistentes registrados"
        />
      </div>

      {/* Standardized Attendee Detail Modal */}
      <AdminModal
        isOpen={selectedAttendee !== null}
        onClose={() => setSelectedAttendee(null)}
        title="Ficha Oficial del Participante"
        subtitle={`Registro ID: ${selectedAttendee?.id || ""}`}
        icon={Users}
        footer={
          <div className="flex items-center justify-between w-full">
            <div>
              {selectedAttendee?.ticket && (
                <Link
                  href={`/tickets/${selectedAttendee.ticket.ticketCode}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline font-mono font-bold"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Ver Ticket Digital #{selectedAttendee.ticket.ticketCode}</span>
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedAttendee(null)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              Cerrar Ficha
            </button>
          </div>
        }
      >
        {selectedAttendee && (
          <div className="space-y-4">
            {/* Header info */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white font-bold text-sm flex items-center justify-center">
                  {selectedAttendee.attendeeName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {selectedAttendee.attendeeName}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedAttendee.attendeeEmail}
                  </p>
                </div>
              </div>
              <AdminBadge
                variant={getStatusBadgeVariant(selectedAttendee.status)}
                label={selectedAttendee.status}
              />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>Teléfono / WhatsApp</span>
                </span>
                <p className="text-white font-mono font-bold">
                  {selectedAttendee.attendeePhone || "No especificado"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-cyan-400" />
                  <span>Ocupación / Rol</span>
                </span>
                <p className="text-white font-medium">
                  {selectedAttendee.attendeeOccupation}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-cyan-400" />
                  <span>Organización / Universidad</span>
                </span>
                <p className="text-white font-medium">
                  {selectedAttendee.attendeeOrganization || "Independiente"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>Fecha de Inscripción</span>
                </span>
                <p className="text-white font-mono">
                  {new Date(selectedAttendee.createdAt).toLocaleString("es-ES")}
                </p>
              </div>
            </div>

            {/* Event Info */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Programa Académico Asignado
              </span>
              <p className="text-sm font-bold text-cyan-300">
                {selectedAttendee.event.title}
              </p>
            </div>

            {/* Check-in status note */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Estado de Acreditación QR:</span>
              {selectedAttendee.attendedAt ? (
                <span className="text-cyan-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{new Date(selectedAttendee.attendedAt).toLocaleString("es-ES")}</span>
                </span>
              ) : (
                <span className="text-amber-400 font-mono font-bold">
                  Pendiente de ingreso al evento
                </span>
              )}
            </div>
          </div>
        )}
      </AdminModal>

      {/* Modal de Filtros Avanzados */}
      <AdminModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtros del Padrón de Asistentes"
        subtitle="Configura los criterios de búsqueda y refinamiento de registros"
        icon={Filter}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Taller o Programa
            </label>
            <select
              value={eventFilter}
              onChange={(e) => {
                setEventFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="ALL">Todos los Talleres</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Estado de la Inscripción
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "ALL", label: "Todos los Estados" },
                { id: "CONFIRMED", label: "Confirmados" },
                { id: "ATTENDED", label: "Acreditados QR" },
                { id: "PENDING_PAYMENT", label: "Pendientes Pago" },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setStatusFilter(st.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    statusFilter === st.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span>{st.label}</span>
                  {statusFilter === st.id && (
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
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="recent">Más Recientes (por fecha de inscripción)</option>
              <option value="oldest">Más Antiguos (por fecha de inscripción)</option>
              <option value="name_asc">Nombre del Participante (A - Z)</option>
              <option value="name_desc">Nombre del Participante (Z - A)</option>
            </select>
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
