"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { manualCheckin } from "@/actions/admin/checkin";
import { approvePayment } from "@/actions/admin/registrations";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import { formatShortTime } from "@/lib/utils/format";
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  Loader2,
  ExternalLink,
  CreditCard,
  Check,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface AttendeesTableProps {
  initialAttendees: {
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
  }[];
  events: {
    id: string;
    title: string;
  }[];
}

export function AttendeesTable({ initialAttendees, events }: AttendeesTableProps) {
  const [attendees, setAttendees] = useState(initialAttendees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");
  const [checkingInId, setCheckingInId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const counts = {
    ALL: attendees.length,
    CONFIRMED: attendees.filter((a) => a.status === "CONFIRMED").length,
    ATTENDED: attendees.filter((a) => a.status === "ATTENDED").length,
    PENDING_PAYMENT: attendees.filter((a) => a.status === "PENDING_PAYMENT").length,
  };

  const filteredAttendees = attendees.filter((a) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      a.attendeeName.toLowerCase().includes(query) ||
      a.attendeeEmail.toLowerCase().includes(query) ||
      a.event.title.toLowerCase().includes(query) ||
      (a.ticket?.ticketCode.toLowerCase().includes(query) ?? false);

    const matchesStatus = statusFilter === "ALL" ? true : a.status === statusFilter;
    const matchesEvent = eventFilter === "ALL" ? true : a.event.id === eventFilter;
    return matchesSearch && matchesStatus && matchesEvent;
  });

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
        showToast(res.message || "Asistencia acreditada.");
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
        showToast(res.message || "Pago aprobado correctamente.");
      }
    } finally {
      setApprovingId(null);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Nombre",
      "Email",
      "Telefono",
      "Ocupacion",
      "Organizacion",
      "Evento",
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
  };

  const filterTabs = [
    { id: "ALL", label: "Todos", count: counts.ALL },
    { id: "CONFIRMED", label: "Confirmados", count: counts.CONFIRMED },
    { id: "ATTENDED", label: "Asistieron", count: counts.ATTENDED },
    { id: "PENDING_PAYMENT", label: "Pago Pendiente", count: counts.PENDING_PAYMENT },
  ];

  return (
    <div className="space-y-3.5">
      {/* Compact Animated Toolbar */}
      <MotionFadeIn delay={0.05} className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-3.5 shadow-xl backdrop-blur-md space-y-2.5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2.5">
          {/* Animated Status Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-950/70 p-1 rounded-full border border-slate-800/80">
            {filterTabs.map((tab) => {
              const active = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`relative px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1.5 z-10 ${
                    active
                      ? "text-slate-950 font-extrabold"
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="attendees-filter-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-cyan-500 shadow-md shadow-cyan-500/20 -z-10"
                    />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono ${
                      active ? "bg-slate-950/20 text-slate-950" : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search + Dynamic Workshop Filter + CSV */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 xl:max-w-xl justify-end">
            <div className="relative sm:w-52">
              <Filter className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                aria-label="Filtrar por taller"
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs truncate"
              >
                <option value="ALL">Todos los programas ({events.length})</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar nombre, email o ticket..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
              />
            </div>

            <button
              type="button"
              onClick={exportToCSV}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-500/50 text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>CSV ({filteredAttendees.length})</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {actionFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{actionFeedback}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionFadeIn>

      {/* Compact Animated Data Table */}
      <MotionFadeIn delay={0.1} className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
              <tr>
                <th className="py-2.5 px-2.5">Asistente</th>
                <th className="py-2.5 px-2.5">Programa</th>
                <th className="py-2.5 px-2.5">Perfil / Org</th>
                <th className="py-2.5 px-2.5">Ticket QR</th>
                <th className="py-2.5 px-2.5">Estado</th>
                <th className="py-2.5 px-2.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-slate-500">
                    No se encontraron asistentes con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((a) => {
                  const initial = a.attendeeName.trim().charAt(0).toUpperCase() || "A";
                  return (
                    <tr key={a.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-2.5 px-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[11px] font-black text-cyan-400 shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs truncate">
                              {a.attendeeName}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                              <span className="truncate max-w-[165px]">{a.attendeeEmail}</span>
                              <span>•</span>
                              <span>{a.attendeePhone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-2.5 max-w-[190px] truncate text-xs text-slate-300 font-medium">
                        {a.event.title}
                      </td>
                      <td className="py-2.5 px-2.5 text-[11px] text-slate-400">
                        <p className="text-slate-200 font-medium truncate max-w-[150px]">
                          {a.attendeeOccupation}
                        </p>
                        {a.attendeeOrganization && (
                          <span className="text-[10px] text-slate-500 block truncate max-w-[150px]">
                            {a.attendeeOrganization}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-2.5">
                        {a.ticket ? (
                          <Link
                            href={`/tickets/${a.ticket.ticketCode}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 font-mono text-[10px] font-bold text-cyan-400 transition-colors"
                          >
                            <span>{a.ticket.ticketCode}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        ) : (
                          <span className="text-[10px] text-slate-600 font-mono">Sin ticket</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2.5">
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            a.status === "ATTENDED"
                              ? "bg-cyan-950 text-cyan-300 border border-cyan-700/60"
                              : a.status === "CONFIRMED"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-700/60"
                              : "bg-amber-950 text-amber-300 border border-amber-700/60"
                          }`}
                        >
                          {a.status === "ATTENDED" ? (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                              <span>Asistió</span>
                            </>
                          ) : a.status === "CONFIRMED" ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span>Confirmado</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-2.5 h-2.5 text-amber-400" />
                              <span>Pendiente</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 text-right">
                        {a.status === "PENDING_PAYMENT" ? (
                          <button
                            type="button"
                            onClick={() => handleApprovePayment(a.id)}
                            disabled={approvingId === a.id}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1 disabled:opacity-50"
                          >
                            {approvingId === a.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CreditCard className="w-3 h-3" />
                            )}
                            <span>Aprobar Pago</span>
                          </button>
                        ) : a.status === "CONFIRMED" ? (
                          <button
                            type="button"
                            onClick={() => handleManualCheckin(a.id)}
                            disabled={checkingInId === a.id}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1 disabled:opacity-50"
                          >
                            {checkingInId === a.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            <span>Acreditar</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                            {a.attendedAt ? `${formatShortTime(a.attendedAt)} UTC` : "Acreditado"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </MotionFadeIn>
    </div>
  );
}
