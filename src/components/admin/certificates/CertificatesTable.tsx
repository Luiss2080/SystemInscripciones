"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
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
  AdminSelect,
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
  Clock,
  User,
  Sparkles,
  Filter,
  Mail,
  Printer,
  QrCode,
  Hash,
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
    slug?: string;
    eventType?: string;
    startDate?: Date | string;
    speaker?: { fullName: string } | null;
  };
  certificate: {
    certificateCode: string;
    issuedAt: Date | string;
  } | null;
}

interface CertificatesTableProps {
  initialRecords: CertificateRecord[];
  userRole?: string;
}

export function CertificatesTable({ initialRecords, userRole = "ADMIN" }: CertificatesTableProps) {
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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalQrUrl, setModalQrUrl] = useState<string>("");
  const [copiedFolio, setCopiedFolio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (selectedRecord?.certificate?.certificateCode) {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const verifyUrl = `${origin}/verificar/${selectedRecord.certificate.certificateCode}`;
      QRCode.toDataURL(verifyUrl, {
        width: 220,
        margin: 1.5,
        color: {
          dark: "#050b18",
          light: "#ffffff",
        },
      })
        .then((url) => {
          if (isMounted) setModalQrUrl(url);
        })
        .catch((err) => console.error("Error generating QR:", err));
    } else {
      Promise.resolve().then(() => {
        if (isMounted) setModalQrUrl("");
      });
    }
    return () => {
      isMounted = false;
    };
  }, [selectedRecord]);

  const handleCopyFolioModal = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFolio(true);
    setTimeout(() => setCopiedFolio(false), 2000);
  };

  const handleCopyLinkModal = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/verificar/${code}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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
  const query = searchTerm.toLowerCase().trim();
  const filteredRecords = records
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

  // Pagination calculation
  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

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
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Main Table Card Tray */}
      <div className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
        {/* Tray Header */}
        <AdminTrayHeader
          icon={Award}
          title={
            userRole === "SPEAKER"
              ? "CERTIFICADOS DE MI CÁTEDRA"
              : userRole === "STAFF"
              ? "PADRÓN DE CERTIFICADOS & FOLIOS"
              : "BANDEJA DE CERTIFICADOS & ACREDITACIONES"
          }
          subtitle={
            userRole === "SPEAKER"
              ? "> FOLIOS Y CERTIFICACIONES EMITIDAS PARA TUS ALUMNOS"
              : userRole === "STAFF"
              ? "> CONSULTA Y VERIFICACIÓN DE FOLIOS EN TIEMPO REAL"
              : "> CONTROL OFICIAL DE FOLIOS CRIPTOGRÁFICOS EN TIEMPO REAL"
          }
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
                title="Actualizar listado de certificados"
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
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 font-mono font-black text-cyan-300 text-xs shadow-xs">
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
                            <p className="text-[10px] font-mono text-slate-400 pl-0.5">
                              Emitido: {formatShortDate(r.certificate!.issuedAt)}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-400 font-bold px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-800/60">
                              <Clock className="w-3 h-3" />
                              <span>Listo para emitir</span>
                            </span>
                            <p className="text-[10px] font-mono text-slate-400 pl-0.5">
                              Asistencia acreditada
                            </p>
                          </div>
                        )}
                      </td>

                      {/* Participante */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5 min-w-[200px]">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 border border-cyan-500/30 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm shadow-cyan-950/40">
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
                        <span className="text-white font-bold block leading-snug line-clamp-1 group-hover:text-cyan-300 transition-colors">
                          {r.event.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                          Folio Ref: {r.id.slice(0, 8)}...
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
                            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* 2. Emit button if pending */}
                          {!hasCert && (
                            userRole === "STAFF" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span>Por Docente</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleIssue(r.id)}
                                disabled={issuingId === r.id}
                                title="Emitir certificado oficial con folio único"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                              >
                                {issuingId === r.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Sparkles className="w-3.5 h-3.5" />
                                )}
                                <span>Emitir Folio</span>
                              </button>
                            )
                          )}

                          {/* 3. Verify Public Link if issued */}
                          {hasCert && (
                            <Link
                              href={`/verificar/${r.certificate!.certificateCode}`}
                              target="_blank"
                              title="Verificar diploma digital en portal público"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-bold transition-all shadow-xs"
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
        subtitle={
          selectedRecord?.certificate?.certificateCode
            ? `Folio Oficial: ${selectedRecord.certificate.certificateCode} • Registrado en PostgreSQL`
            : "Acreditación confirmada • Pendiente de emisión de folio"
        }
        icon={Award}
        maxWidth="max-w-3xl"
        footer={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              {selectedRecord?.certificate && (
                <>
                  <Link
                    href={`/verificar/${selectedRecord.certificate.certificateCode}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver en Verificador Público</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleCopyLinkModal(selectedRecord.certificate!.certificateCode)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Enlace Copiado" : "Copiar Enlace"}</span>
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center justify-end gap-2">
              {selectedRecord?.certificate && (
                <Link
                  href={`/verificar/${selectedRecord.certificate.certificateCode}`}
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Diploma</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        }
      >
        {selectedRecord && (
          <div className="space-y-4">
            {/* Header Diploma Preview Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1426] via-[#080e1c] to-[#040813] border-2 border-cyan-500/30 relative overflow-hidden shadow-2xl space-y-5">
              {/* Decorative Corner Glows */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Credential Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-extrabold block">
                      DEVCON WORKSHOPS • SISTEMA DE CERTIFICACIÓN
                    </span>
                    <span className="text-xs font-bold text-white">
                      Acreditación Académica de Ingeniería
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {userRole === "SPEAKER" && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-700/60 inline-flex items-center gap-1">
                      Docente Responsable
                    </span>
                  )}
                  {userRole === "STAFF" && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-950/80 text-teal-300 border border-teal-700/60 inline-flex items-center gap-1">
                      Auditoría Operativa
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 hidden sm:inline-flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    <span>SHA-256</span>
                  </span>
                  <AdminBadge
                    variant={selectedRecord.certificate ? "approved" : "pending_payment"}
                    label={selectedRecord.certificate ? "OFICIAL & VÁLIDO" : "PENDIENTE"}
                  />
                </div>
              </div>

              {/* Student Identity & Diploma Text */}
              <div className="space-y-1.5 relative z-10">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                  Otorgado formalmente en reconocimiento a:
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200">
                  {selectedRecord.attendeeName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-300">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedRecord.attendeeEmail}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Asistencia Presencial Verificada</span>
                  </span>
                </div>
              </div>

              {/* Course Title and Hours */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-2 relative z-10">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  Por haber completado y acreditado el programa de alta especialización:
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-white">
                  {selectedRecord.event.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <span>
                    Carga Académica:{" "}
                    <strong className="text-cyan-300">
                      {selectedRecord.event.academicHours} Horas Curriculares
                    </strong>
                  </span>
                  <span>
                    Cátedra / Docente:{" "}
                    <strong className="text-white">
                      {selectedRecord.event.speaker?.fullName || "Ingeniería de Sistemas DevCon"}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Lower Section: Security Metadata + Real QR Code */}
              {selectedRecord.certificate ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80 relative z-10">
                  {/* Left 2 Cols: Folio Code and Cryptographic Log */}
                  <div className="sm:col-span-2 space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                          Folio Criptográfico Inmutable
                        </span>
                        <span className="text-sm font-mono font-black text-white tracking-wider">
                          {selectedRecord.certificate.certificateCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyFolioModal(selectedRecord.certificate!.certificateCode)}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 hover:text-white hover:bg-cyan-900 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {copiedFolio ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedFolio ? "Copiado" : "Copiar Folio"}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/70 space-y-1.5 text-xs font-mono text-slate-400">
                      <div className="flex items-center justify-between">
                        <span>Emisión Oficial:</span>
                        <strong className="text-slate-200">
                          {new Date(selectedRecord.certificate.issuedAt).toLocaleString("es-ES")}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Check-in en Puerta:</span>
                        <strong className="text-slate-200">
                          {selectedRecord.attendedAt
                            ? new Date(selectedRecord.attendedAt).toLocaleString("es-ES")
                            : "Asistencia verificada"}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3 text-cyan-400" />
                          <span>Seguridad:</span>
                        </span>
                        <span className="text-cyan-400 font-bold">
                          Verificado Criptográficamente en PostgreSQL
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Col: Visual QR Code Card */}
                  <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
                    {modalQrUrl ? (
                      <div className="p-1.5 bg-white rounded-lg shadow-lg mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={modalQrUrl}
                          alt={`QR ${selectedRecord.certificate.certificateCode}`}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-slate-900 flex items-center justify-center mb-2">
                        <QrCode className="w-8 h-8 text-slate-600 animate-pulse" />
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider font-bold">
                      Escaneo de Validez
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      Verificación Pública QR
                    </span>
                  </div>
                </div>
              ) : (
                /* Immediate Issue Banner */
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Participante Elegible para Certificación Inmediata</span>
                    </span>
                    <p className="text-xs text-amber-400/80 leading-relaxed">
                      {userRole === "STAFF"
                        ? "El participante cuenta con asistencia validada en puerta (ATTENDED). La emisión del folio criptográfico oficial corresponde al Docente titular o Administrador."
                        : "El participante ya cuenta con asistencia confirmada al taller. Puedes generar su folio criptográfico e inscribirlo en PostgreSQL ahora mismo."}
                    </p>
                  </div>
                  {userRole === "STAFF" ? (
                    <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-amber-800/60 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Emisión por Docente</span>
                    </span>
                  ) : (
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
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20 shrink-0"
                    >
                      {issuingId === selectedRecord.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Award className="w-4 h-4" />
                      )}
                      <span>Emitir Certificado Ahora</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </AdminModal>

      {/* Modal de Filtros de Certificados */}
      <AdminModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtros de Certificados Digitales"
        subtitle="Refina el listado por estado de emisión y criterios de ordenación"
        icon={Filter}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Estado de Emisión del Certificado
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "ALL" as const, label: "Todos" },
                { id: "ISSUED" as const, label: "Emitidos" },
                { id: "PENDING" as const, label: "Pendientes" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setFilterMode(m.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    filterMode === m.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {m.label}
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
                { label: "Más Recientes (asistencia acreditada)", value: "recent" },
                { label: "Nombre del Participante (A - Z)", value: "name_asc" },
                { label: "Nombre del Participante (Z - A)", value: "name_desc" },
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
