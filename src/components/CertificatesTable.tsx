"use client";

import { useState } from "react";
import { issueCertificate } from "@/actions/admin";
import {
  Award,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Search,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface CertificatesTableProps {
  initialRecords: {
    id: string;
    attendeeName: string;
    attendeeEmail: string;
    attendedAt: Date | string | null;
    event: {
      title: string;
      academicHours: number;
    };
    certificate: {
      certificateCode: string;
      issuedAt: Date | string;
    } | null;
  }[];
}

export function CertificatesTable({ initialRecords }: CertificatesTableProps) {
  const [records, setRecords] = useState(initialRecords);
  const [issuingId, setIssuingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"ALL" | "ISSUED" | "PENDING">("ALL");

  const handleIssue = async (registrationId: string) => {
    setIssuingId(registrationId);
    try {
      const res = await issueCertificate(registrationId);
      if (res.success && res.certificateCode) {
        setRecords((prev) =>
          prev.map((r) =>
            r.id === registrationId
              ? {
                  ...r,
                  certificate: {
                    certificateCode: res.certificateCode!,
                    issuedAt: new Date(),
                  },
                }
              : r
          )
        );
      }
    } finally {
      setIssuingId(null);
    }
  };

  const issuedCount = records.filter((r) => r.certificate !== null).length;
  const pendingCount = records.length - issuedCount;

  const filteredRecords = records.filter((r) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      r.attendeeName.toLowerCase().includes(query) ||
      r.attendeeEmail.toLowerCase().includes(query) ||
      r.event.title.toLowerCase().includes(query) ||
      (r.certificate?.certificateCode.toLowerCase().includes(query) ?? false);

    const matchesFilter =
      filterMode === "ALL"
        ? true
        : filterMode === "ISSUED"
        ? r.certificate !== null
        : r.certificate === null;

    return matchesSearch && matchesFilter;
  });

  const filterTabs = [
    { id: "ALL" as const, label: "Elegibles", count: records.length },
    { id: "ISSUED" as const, label: "Emitidos", count: issuedCount },
    { id: "PENDING" as const, label: "Pendientes", count: pendingCount },
  ];

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => {
              const active = filterMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterMode(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      active ? "bg-slate-950/20 text-slate-950" : "bg-slate-950 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar participante o folio..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
              <tr>
                <th className="py-3 px-3">Participante Acreditado</th>
                <th className="py-3 px-3">Taller / Conferencia</th>
                <th className="py-3 px-3">Carga Horaria</th>
                <th className="py-3 px-3">Código Oficial</th>
                <th className="py-3 px-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-xs text-slate-500">
                    {records.length === 0
                      ? "No hay asistentes acreditados aún. Realiza el check-in primero."
                      : "No se encontraron certificados con los filtros aplicados."}
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const initial = r.attendeeName.trim().charAt(0).toUpperCase() || "C";
                  return (
                    <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs font-black text-cyan-400 shrink-0">
                            {initial}
                          </div>
                          <div>
                            <p className="font-bold text-white text-xs sm:text-sm">
                              {r.attendeeName}
                            </p>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {r.attendeeEmail}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[220px] truncate text-xs text-slate-300 font-medium">
                        {r.event.title}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-cyan-400">
                          <Clock className="w-3 h-3" />
                          <span>{r.event.academicHours}h</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {r.certificate ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/50 font-mono text-[11px] font-bold text-emerald-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{r.certificate.certificateCode}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-500">
                            Pendiente de emisión
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        {r.certificate ? (
                          <Link
                            href={`/verificar/${r.certificate.certificateCode}`}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-[11px] font-bold uppercase tracking-wider transition-all"
                          >
                            <span>Ver Ficha</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleIssue(r.id)}
                            disabled={issuingId === r.id}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-[11px] uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
                          >
                            {issuingId === r.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Award className="w-3.5 h-3.5" />
                            )}
                            <span>Emitir</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
