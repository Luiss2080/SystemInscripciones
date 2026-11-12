"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { issueCertificate } from "@/actions/admin/registrations";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import { formatShortDate } from "@/lib/utils/format";
import {
  Award,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Search,
  Clock,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface CertificatesTableProps {
  initialRecords: {
    id: string;
    attendeeName: string;
    attendeeEmail: string;
    attendedAt: Date | string | null;
    event: {
      id: string;
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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"ALL" | "ISSUED" | "PENDING">("ALL");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

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
                    issuedAt: new Date().toISOString(),
                  },
                }
              : r
          )
        );
        setFeedbackMsg(`Certificado emitido: ${res.certificateCode}`);
        setTimeout(() => setFeedbackMsg(null), 4000);
      }
    } finally {
      setIssuingId(null);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // Clipboard blocked or unavailable
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
    <div className="space-y-3.5">
      {/* Compact Animated Filter Toolbar */}
      <MotionFadeIn delay={0.05} className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-3.5 shadow-xl backdrop-blur-md space-y-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1 bg-slate-950/70 p-1 rounded-full border border-slate-800/80">
            {filterTabs.map((tab) => {
              const active = filterMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterMode(tab.id)}
                  className={`relative px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1.5 z-10 ${
                    active
                      ? "text-slate-950 font-extrabold"
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cert-filter-pill"
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

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar participante, taller o folio..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>
        </div>

        <AnimatePresence>
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{feedbackMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionFadeIn>

      {/* Compact Certificates Table */}
      <MotionFadeIn delay={0.1} className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
              <tr>
                <th className="py-2.5 px-2.5">Participante Acreditado</th>
                <th className="py-2.5 px-2.5">Programa</th>
                <th className="py-2.5 px-2.5">Horas</th>
                <th className="py-2.5 px-2.5">Folio Oficial</th>
                <th className="py-2.5 px-2.5">Emisión</th>
                <th className="py-2.5 px-2.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-slate-500">
                    {records.length === 0
                      ? "No hay asistentes acreditados aún. Realiza el check-in primero."
                      : "No se encontraron certificados con los filtros aplicados."}
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const initial = r.attendeeName.trim().charAt(0).toUpperCase() || "C";
                  const code = r.certificate?.certificateCode;
                  return (
                    <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-2.5 px-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[11px] font-black text-cyan-400 shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs truncate">
                              {r.attendeeName}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono truncate block max-w-[175px]">
                              {r.attendeeEmail}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-2.5 max-w-[200px] truncate text-xs text-slate-300 font-medium">
                        {r.event.title}
                      </td>
                      <td className="py-2.5 px-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-cyan-400">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{r.event.academicHours}h</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5">
                        {code ? (
                          <div className="inline-flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-700/50 font-mono text-[10px] font-bold text-emerald-300">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>{code}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(code)}
                              title="Copiar folio"
                              className="p-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                            >
                              {copiedCode === code ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-950/50 border border-amber-700/40 px-2 py-0.5 rounded-full">
                            Pendiente emisión
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-2.5 text-[10px] font-mono text-slate-400 whitespace-nowrap">
                        {r.certificate
                          ? formatShortDate(r.certificate.issuedAt)
                          : r.attendedAt
                          ? `Asist. ${formatShortDate(r.attendedAt)}`
                          : "—"}
                      </td>
                      <td className="py-2.5 px-2.5 text-right">
                        {code ? (
                          <Link
                            href={`/verificar/${code}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider transition-all"
                          >
                            <span>Ver Ficha</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleIssue(r.id)}
                            disabled={issuingId === r.id}
                            className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-[10px] uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer inline-flex items-center gap-1"
                          >
                            {issuingId === r.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Award className="w-3 h-3" />
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
      </MotionFadeIn>
    </div>
  );
}
