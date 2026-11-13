"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { issueCertificate } from "@/actions/admin/registrations";
import { formatShortDate } from "@/lib/utils/format";
import {
  AdminFilterBar,
  AdminTrayHeader,
  AdminStatusTabs,
  AdminPagination,
  AdminEmptyState,
  AdminBadge,
  AdminModal,
} from "@/components/admin/ui";
import {
  Award,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  CheckCircle2,
  Download,
  RotateCcw,
  Eye,
  Calendar,
  Clock,
  User,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CertificateRecord {
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
}

interface CertificatesTableProps {
  initialRecords: CertificateRecord[];
}

export function CertificatesTable({ initialRecords }: CertificatesTableProps) {
  const router = useRouter();
  const [records, setRecords] = useState<CertificateRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"ALL" | "ISSUED" | "PENDING">("ALL");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Operation states
  const [issuingId, setIssuingId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Selected certificate for preview modal
  const [selectedRecord, setSelectedRecord] = useState<CertificateRecord | null>(null);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

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
        showToast(`Certificado emitido con éxito: ${res.certificateCode}`);
      } else {
        showToast(res.message || "Error al emitir el certificado.");
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
      showToast(`Folio ${code} copiado al portapapeles.`);
    } catch {
      // Fallback
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const exportToCSV = () => {
    const headers = [
      "ID Registro",
      "Participante",
      "Email",
      "Programa",
      "Horas Academicas",
      "Estado Certificado",
      "Folio Unico",
      "Fecha Emision",
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.id}"`,
      `"${r.attendeeName}"`,
      `"${r.attendeeEmail}"`,
      `"${r.event.title}"`,
      `"${r.event.academicHours}"`,
      `"${r.certificate ? "EMITIDO" : "PENDIENTE"}"`,
      `"${r.certificate?.certificateCode || ""}"`,
      `"${r.certificate?.issuedAt ? new Date(r.certificate.issuedAt).toISOString() : ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `certificados_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exportados ${filteredRecords.length} registros de certificados.`);
  };

  // Pipeline Filter and Sort
  const filteredRecords = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return records
      .filter((r) => {
        const matchesSearch =
          query === "" ||
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
      })
      .sort((a, b) => {
        if (sortBy === "recent") {
          const aTime = a.certificate ? new Date(a.certificate.issuedAt).getTime() : 0;
          const bTime = b.certificate ? new Date(b.certificate.issuedAt).getTime() : 0;
          return bTime - aTime;
        }
        if (sortBy === "name_asc") {
          return a.attendeeName.localeCompare(b.attendeeName);
        }
        if (sortBy === "name_desc") {
          return b.attendeeName.localeCompare(a.attendeeName);
        }
        return 0;
      });
  }, [records, searchTerm, filterMode, sortBy]);

  // Pagination calculation
  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  // Counts for tabs
  const issuedCount = records.filter((r) => r.certificate !== null).length;
  const pendingCount = records.length - issuedCount;

  const statusTabs = [
    { id: "ALL", label: "Todos los Elegibles", count: records.length },
    { id: "ISSUED", label: "Emitidos con Folio", count: issuedCount },
    { id: "PENDING", label: "Pendientes de Emisión", count: pendingCount },
  ];

  const isFiltered = searchTerm !== "" || filterMode !== "ALL";

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterMode("ALL");
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
        title="FILTRAR CERTIFICADOS"
        searchValue={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Buscar por código #CERT, participante, email o taller..."
        sortValue={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
        sortOptions={[
          { label: "Más Recientes", value: "recent" },
          { label: "Nombre (A - Z)", value: "name_asc" },
          { label: "Nombre (Z - A)", value: "name_desc" },
        ]}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* Main Table Card Tray */}
      <div className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
        {/* Tray Header */}
        <AdminTrayHeader
          icon={Award}
          title="BANDEJA DE CERTIFICADOS & ACREDITACIONES"
          subtitle="> CONTROL OFICIAL DE FOLIOS CRIPTOGRÁFICOS EN TIEMPO REAL"
          totalCount={filteredRecords.length}
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
                title="Actualizar datos de PostgreSQL"
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

        {/* Status Tabs */}
        <AdminStatusTabs
          tabs={statusTabs}
          activeTab={filterMode}
          onChange={(tab) => {
            setFilterMode(tab as "ALL" | "ISSUED" | "PENDING");
            setCurrentPage(1);
          }}
          layoutId="cert-status-pill"
        />

        {/* Data Table */}
        <div className="overflow-x-auto">
          {filteredRecords.length === 0 ? (
            <AdminEmptyState
              icon={Award}
              title="No se encontraron certificados"
              description="No hay registros que coincidan con los criterios de búsqueda o el filtro de emisión aplicado."
              action={isFiltered ? { label: "Restablecer Filtros", onClick: handleResetFilters } : undefined}
            />
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span>Folio Oficial & Emisión</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3 text-cyan-400" />
                      <span>Participante Acreditado</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-cyan-400" />
                      <span>Programa Académico</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold text-center">Horas</th>
                  <th className="py-3 px-4 font-bold text-center">Estado</th>
                  <th className="py-3 px-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedRecords.map((r) => {
                  const hasCert = r.certificate !== null;
                  const initial = r.attendeeName.trim().charAt(0).toUpperCase() || "A";

                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Folio & Fecha */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {hasCert ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-black text-cyan-400 text-xs">
                                {r.certificate!.certificateCode}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyCode(r.certificate!.certificateCode)}
                                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                                title="Copiar folio al portapapeles"
                              >
                                {copiedCode === r.certificate!.certificateCode ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <p className="text-[10px] font-mono text-slate-400">
                              Emitido: {formatShortDate(r.certificate!.issuedAt)}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-400/90 font-bold">
                              <Clock className="w-3 h-3" />
                              <span>Pendiente de emisión</span>
                            </span>
                            <p className="text-[10px] font-mono text-slate-400">
                              Asistencia acreditada
                            </p>
                          </div>
                        )}
                      </td>

                      {/* Participante */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5 min-w-[200px]">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-700 to-blue-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-xs">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate group-hover:text-cyan-300 transition-colors">
                              {r.attendeeName}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate font-mono">
                              {r.attendeeEmail}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Programa */}
                      <td className="py-3 px-4 max-w-xs">
                        <span className="text-slate-300 font-medium line-clamp-1">
                          {r.event.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ID: {r.id.slice(0, 8)}...
                        </span>
                      </td>

                      {/* Horas */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 font-mono font-bold text-[11px]">
                          {r.event.academicHours} hrs
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <AdminBadge
                          variant={hasCert ? "approved" : "pending_payment"}
                          label={hasCert ? "EMITIDO OFICIAL" : "LISTO PARA EMITIR"}
                          pulse={!hasCert}
                        />
                      </td>

                      {/* Acciones */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* 1. Modal Preview (Eye Button) */}
                          <button
                            type="button"
                            onClick={() => setSelectedRecord(r)}
                            title="Previsualizar certificado digital"
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* 2. Emit button if pending */}
                          {!hasCert && (
                            <button
                              type="button"
                              onClick={() => handleIssue(r.id)}
                              disabled={issuingId === r.id}
                              title="Emitir certificado oficial con folio único"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                            >
                              {issuingId === r.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Sparkles className="w-3.5 h-3.5" />
                              )}
                              <span>Emitir Folio</span>
                            </button>
                          )}

                          {/* 3. Verify Public Link if issued */}
                          {hasCert && (
                            <Link
                              href={`/verificar/${r.certificate!.certificateCode}`}
                              target="_blank"
                              title="Verificar diploma digital en portal público"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700/80 hover:border-cyan-500/40 text-[11px] font-bold transition-all shadow-xs"
                            >
                              <span>Verificar</span>
                              <ExternalLink className="w-3 h-3" />
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
          itemLabel="certificados"
        />
      </div>

      {/* Standardized Certificate Preview Modal */}
      <AdminModal
        isOpen={selectedRecord !== null}
        onClose={() => setSelectedRecord(null)}
        title="Ficha Oficial de Certificación Digital"
        subtitle={selectedRecord?.certificate?.certificateCode || "Acreditación pendiente"}
        icon={Award}
        footer={
          <div className="flex items-center justify-between w-full">
            <div>
              {selectedRecord?.certificate && (
                <Link
                  href={`/verificar/${selectedRecord.certificate.certificateCode}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline font-mono font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Diploma en Verificador Público</span>
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedRecord(null)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              Cerrar Ficha
            </button>
          </div>
        }
      >
        {selectedRecord && (
          <div className="space-y-4">
            {/* Header Diploma Preview Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-800/60 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Certificación Académica de Ingeniería</span>
                </span>
                <AdminBadge
                  variant={selectedRecord.certificate ? "approved" : "pending_payment"}
                  label={selectedRecord.certificate ? "OFICIAL" : "PENDIENTE"}
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-white">
                  {selectedRecord.attendeeName}
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  {selectedRecord.event.title}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <span>Carga: {selectedRecord.event.academicHours} Horas Académicas</span>
                {selectedRecord.certificate && (
                  <span className="text-cyan-400 font-bold">
                    Folio: {selectedRecord.certificate.certificateCode}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions in Modal */}
            {!selectedRecord.certificate && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-amber-300">
                    Emisión Inmediata
                  </h5>
                  <p className="text-[11px] text-amber-400/80">
                    El participante ya tiene asistencia confirmada. Puedes generar el folio ahora.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await handleIssue(selectedRecord.id);
                    setSelectedRecord((prev) =>
                      prev
                        ? {
                            ...prev,
                            certificate: {
                              certificateCode: "EMITIDO",
                              issuedAt: new Date().toISOString(),
                            },
                          }
                        : null
                    );
                  }}
                  disabled={issuingId === selectedRecord.id}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {issuingId === selectedRecord.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Emitir</span>
                </button>
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
