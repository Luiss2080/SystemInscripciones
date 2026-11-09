"use client";

import { useState } from "react";
import { manualCheckin } from "@/actions/admin";
import {
  Search,
  Download,
  CheckCircle2,
  Ticket,
  Clock,
  Loader2,
  ExternalLink,
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
}

export function AttendeesTable({ initialAttendees }: AttendeesTableProps) {
  const [attendees, setAttendees] = useState(initialAttendees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [checkingInId, setCheckingInId] = useState<string | null>(null);

  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch =
      a.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.attendeeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.ticket?.ticketCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleManualCheckin = async (id: string) => {
    setCheckingInId(id);
    try {
      const res = await manualCheckin(id);
      if (res.success) {
        setAttendees((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, status: "ATTENDED", attendedAt: new Date() }
              : item
          )
        );
      }
    } finally {
      setCheckingInId(null);
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

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `asistentes_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search & Action bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, email, ticket..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="CONFIRMED">Confirmados</option>
            <option value="ATTENDED">Asistieron</option>
            <option value="PENDING_PAYMENT">Pendiente Pago</option>
          </select>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500 text-xs font-semibold transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Exportar CSV ({filteredAttendees.length})</span>
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl p-6 border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Asistente</th>
                <th className="py-3 px-3">Taller / Conferencia</th>
                <th className="py-3 px-3">Ocupación / Org</th>
                <th className="py-3 px-3">Ticket</th>
                <th className="py-3 px-3">Estado</th>
                <th className="py-3 px-3">Acción</th>
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
                filteredAttendees.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-slate-200">{a.attendeeName}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono">{a.attendeeEmail}</span>
                        <span>•</span>
                        <span>{a.attendeePhone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 max-w-xs truncate text-xs text-slate-300">
                      {a.event.title}
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-400">
                      <p className="text-slate-300">{a.attendeeOccupation}</p>
                      {a.attendeeOrganization && <span>{a.attendeeOrganization}</span>}
                    </td>
                    <td className="py-3.5 px-3">
                      {a.ticket ? (
                        <Link
                          href={`/tickets/${a.ticket.ticketCode}`}
                          target="_blank"
                          className="font-mono text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>{a.ticket.ticketCode}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-xs text-slate-600">Sin ticket</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          a.status === "ATTENDED"
                            ? "bg-purple-950 text-purple-300 border border-purple-800"
                            : a.status === "CONFIRMED"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {a.status === "ATTENDED"
                          ? "✓ Asistió"
                          : a.status === "CONFIRMED"
                          ? "● Confirmado"
                          : "⏳ Pago Pendiente"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      {a.status !== "ATTENDED" ? (
                        <button
                          onClick={() => handleManualCheckin(a.id)}
                          disabled={checkingInId === a.id}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
                        >
                          {checkingInId === a.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          <span>Check-in Manual</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">
                          {a.attendedAt
                            ? new Date(a.attendedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Acreditado"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
