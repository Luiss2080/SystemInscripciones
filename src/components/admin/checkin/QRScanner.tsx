"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import Link from "next/link";
import { validateAndCheckinTicket } from "@/actions/admin/checkin";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import { formatShortTime } from "@/lib/utils/format";
import { Html5Qrcode } from "html5-qrcode";
import { AdminModal, AdminBadge } from "@/components/admin/ui";
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Clock,
  ShieldCheck,
  Keyboard,
  Zap,
  Phone,
  Mail,
  Copy,
  Check,
  Ticket,
  Building,
  Briefcase,
  Eye,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface ScanHistoryEntry {
  id?: string;
  code: string;
  name?: string;
  email?: string;
  phone?: string;
  occupation?: string;
  organization?: string | null;
  eventTitle?: string;
  modality?: string;
  academicHours?: number;
  status: "ATTENDED" | "DUPLICATE";
  attendedAt?: Date | string | null;
  time: string;
}

interface PendingTicketItem {
  id?: string;
  ticketCode: string;
  attendeeName: string;
  attendeeEmail?: string;
  attendeePhone?: string;
  attendeeOccupation?: string;
  attendeeOrganization?: string | null;
  eventTitle: string;
  modality?: string;
  academicHours?: number;
}

interface QRScannerProps {
  initialHistory?: ScanHistoryEntry[];
  pendingQueue?: PendingTicketItem[];
}

export function QRScanner({
  initialHistory = [],
  pendingQueue = [],
}: QRScannerProps) {
  const [manualCode, setManualCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    alreadyAttended?: boolean;
    message: string;
    attendeeName?: string;
    eventTitle?: string;
    attendedAt?: Date | string | null;
    ticketCode?: string;
  } | null>(null);

  const [history, setHistory] = useState<ScanHistoryEntry[]>(initialHistory);
  const [queue, setQueue] = useState<PendingTicketItem[]>(pendingQueue);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Selected check-in record for details modal
  const [selectedCheckin, setSelectedCheckin] = useState<ScanHistoryEntry | PendingTicketItem | null>(null);
  const [modalQrUrl, setModalQrUrl] = useState<string>("");
  const [copiedModalCode, setCopiedModalCode] = useState(false);
  const [isProcessingModalCheckin, setIsProcessingModalCheckin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const ticketCode = selectedCheckin
      ? "ticketCode" in selectedCheckin
        ? selectedCheckin.ticketCode
        : selectedCheckin.code
      : null;

    if (ticketCode) {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const ticketUrl = `${origin}/tickets/${ticketCode}`;
      QRCode.toDataURL(ticketUrl, {
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
        .catch((err) => console.error("Error generating Ticket QR:", err));
    } else {
      Promise.resolve().then(() => {
        if (isMounted) setModalQrUrl("");
      });
    }
    return () => {
      isMounted = false;
    };
  }, [selectedCheckin]);

  const handleCopyTicketModal = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedModalCode(true);
    setTimeout(() => setCopiedModalCode(false), 2000);
  };

  const handleProcessCode = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed || loading) return;
    setLoading(true);

    try {
      const res = await validateAndCheckinTicket(trimmed);
      setScanResult(res);

      if (res.success || res.alreadyAttended) {
        const resolvedCode = res.ticketCode || trimmed;
        setHistory((prev) => [
          {
            code: resolvedCode,
            name: res.attendeeName,
            eventTitle: res.eventTitle,
            status: res.success ? "ATTENDED" : "DUPLICATE",
            time: formatShortTime(new Date()),
          },
          ...prev.slice(0, 11),
        ]);

        if (res.success) {
          setQueue((prev) => prev.filter((q) => q.ticketCode !== resolvedCode));
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al validar el ticket.";
      setScanResult({
        success: false,
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  const startScanner = async () => {
    try {
      setIsScanning(true);
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 240, height: 240 },
        },
        (decodedText) => {
          html5QrCode.pause(true);
          handleProcessCode(decodedText).finally(() => {
            setTimeout(() => {
              try {
                html5QrCode.resume();
              } catch {}
            }, 2500);
          });
        },
        () => {}
      );
    } catch (err) {
      console.error("Camera access failed", err);
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {}
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessCode(manualCode);
    setManualCode("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      {/* Scanner & Manual Input Column */}
      <MotionFadeIn className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex-1 rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white">
                  Control de Acceso en Vivo
                </h2>
                <p className="text-[11px] text-slate-400">
                  Cámara, folio manual o validación rápida de inscritos confirmados
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={isScanning ? stopScanner : startScanner}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                isScanning
                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/40 hover:bg-rose-500/25"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/20"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{isScanning ? "Detener Cámara" : "Activar Cámara"}</span>
            </button>
          </div>

          {/* Camera Viewport */}
          <div
            id="qr-reader"
            className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-slate-950 border-2 border-cyan-500/40 ${
              isScanning ? "min-h-[240px]" : "hidden"
            }`}
          />

          {/* Compact Animated Cyber Viewfinder */}
          {!isScanning && (
            <div className="relative py-6 px-5 text-center bg-slate-950/85 rounded-2xl border border-slate-800/90 overflow-hidden">
              {/* Laser Beam Animation */}
              <div className="pointer-events-none absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-scan-laser" />

              {/* Cyber Corner Brackets */}
              <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
              <span className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
              <span className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
              <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br" />

              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mx-auto mb-2.5">
                <Camera className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-xs font-bold text-white">Lector Óptico en Espera</p>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs mx-auto">
                Activa la cámara para leer QR o selecciona un ticket confirmado debajo.
              </p>
            </div>
          )}

          {/* Manual Input + Quick Queue Chips */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Validación Manual por Folio</span>
              </label>
              <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Ej. TCK-ENG-84920"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs uppercase tracking-wider"
                />
                <button
                  type="submit"
                  disabled={loading || !manualCode.trim()}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Acreditar</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {queue.length > 0 && (
              <div className="space-y-1.5">
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Asistentes Confirmados en Espera (clic para validar o inspeccionar)</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {queue.map((item) => (
                    <div
                      key={item.ticketCode}
                      className="inline-flex items-center rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => handleProcessCode(item.ticketCode)}
                        disabled={loading}
                        title={`Acreditar en Puerta: ${item.attendeeName} • ${item.eventTitle}`}
                        className="px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/15 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span className="text-cyan-400 font-bold">{item.ticketCode}</span>
                        <span className="text-slate-500">•</span>
                        <span className="truncate max-w-[120px] font-sans font-semibold">
                          {item.attendeeName.split(" ")[0]}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedCheckin(item)}
                        title="Ver Ficha Oficial de Acreditación"
                        className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 border-l border-slate-800/80 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animated Scan Result Feedback */}
        <AnimatePresence mode="wait">
          {scanResult && (
            <motion.div
              key={`${scanResult.ticketCode ?? "res"}-${scanResult.message}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl p-4 border shadow-xl ${
                scanResult.success
                  ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-200"
                  : scanResult.alreadyAttended
                  ? "bg-amber-950/50 border-amber-500/50 text-amber-200"
                  : "bg-rose-950/50 border-rose-500/50 text-rose-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    scanResult.success
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : scanResult.alreadyAttended
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      : "bg-rose-500/20 border-rose-500/40 text-rose-400"
                  }`}
                >
                  {scanResult.success ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : scanResult.alreadyAttended ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest block">
                    {scanResult.success
                      ? "INGRESO AUTORIZADO"
                      : scanResult.alreadyAttended
                      ? "ALERTA: TICKET YA UTILIZADO"
                      : "ACCESO DENEGADO: INVÁLIDO"}
                  </span>

                  <h3 className="text-base sm:text-lg font-black text-white truncate">
                    {scanResult.attendeeName || "No Identificado"}
                  </h3>

                  <p className="text-xs font-medium">{scanResult.message}</p>

                  {scanResult.eventTitle && (
                    <p className="text-[11px] text-slate-300 truncate">
                      <strong>Programa:</strong> {scanResult.eventTitle}
                    </p>
                  )}
                </div>

                {scanResult.ticketCode && (
                  <span className="px-2 py-1 rounded-lg bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono font-bold text-cyan-400 shrink-0">
                    {scanResult.ticketCode}
                  </span>
                )}
              </div>

              {/* Quick Modal Button */}
              <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCheckin({
                      code: scanResult.ticketCode || "",
                      name: scanResult.attendeeName,
                      eventTitle: scanResult.eventTitle,
                      status: scanResult.success ? "ATTENDED" : "DUPLICATE",
                      time: formatShortTime(new Date()),
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-850 text-cyan-300 text-xs font-mono font-bold border border-slate-700/80 hover:border-cyan-500/50 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ver Ficha Oficial de Acreditación</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionFadeIn>

      {/* Real-Time Check-in Audit Log Column (Matched Height) */}
      <MotionFadeIn delay={0.1} className="lg:col-span-5 flex flex-col">
        <div className="h-full rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Bitácora de Ingresos en Vivo</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-[10px] font-mono font-bold text-cyan-400">
                {history.length} ingresos
              </span>
            </div>

            {history.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-1.5">
                <QrCode className="w-7 h-7 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-400">
                  Sin acreditaciones registradas aún.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {history.map((item, idx) => (
                  <motion.div
                    key={`${item.code}-${idx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.2) }}
                    onClick={() => setSelectedCheckin(item)}
                    className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all flex items-center justify-between text-xs gap-2.5 cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                        {item.name || "Participante"}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="text-cyan-400 font-bold">{item.code}</span>
                        {item.eventTitle && (
                          <span className="text-slate-500 truncate max-w-[140px]">
                            • {item.eventTitle}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            item.status === "ATTENDED"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-700/60"
                              : "bg-amber-950 text-amber-300 border border-amber-700/60"
                          }`}
                        >
                          {item.status === "ATTENDED" ? "OK" : "DUPLICADO"}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 block mt-0.5 tabular-nums">
                          {item.time}
                        </span>
                      </div>
                      <Eye className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Slim Operational Protocol Footer */}
          <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Cada validación cambia el registro a <strong className="text-white">ATTENDED</strong> y habilita su certificado oficial QR al instante.
            </p>
          </div>
        </div>
      </MotionFadeIn>

      {/* Modal de Acreditación y Validación en Puerta */}
      <AdminModal
        isOpen={selectedCheckin !== null}
        onClose={() => setSelectedCheckin(null)}
        title="Ficha Oficial de Acreditación en Puerta"
        subtitle={
          selectedCheckin
            ? `Ticket #${"ticketCode" in selectedCheckin ? selectedCheckin.ticketCode : selectedCheckin.code} • Operaciones Staff`
            : ""
        }
        icon={ShieldCheck}
        maxWidth="max-w-2xl"
        footer={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
            <div>
              {selectedCheckin && (
                <Link
                  href={`/tickets/${"ticketCode" in selectedCheckin ? selectedCheckin.ticketCode : selectedCheckin.code}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold transition-all"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Ver Ticket Digital</span>
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCheckin(null)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              Cerrar Ficha
            </button>
          </div>
        }
      >
        {selectedCheckin && (() => {
          const isPendingItem = "ticketCode" in selectedCheckin;
          const ticketCode = isPendingItem
            ? selectedCheckin.ticketCode
            : selectedCheckin.code;
          const attendeeName = isPendingItem
            ? selectedCheckin.attendeeName
            : selectedCheckin.name || "Participante";
          const email = isPendingItem
            ? selectedCheckin.attendeeEmail
            : selectedCheckin.email;
          const phone = isPendingItem
            ? selectedCheckin.attendeePhone
            : selectedCheckin.phone;
          const occupation = isPendingItem
            ? selectedCheckin.attendeeOccupation
            : selectedCheckin.occupation;
          const organization = isPendingItem
            ? selectedCheckin.attendeeOrganization
            : selectedCheckin.organization;
          const eventTitle = selectedCheckin.eventTitle || "Taller Técnico";
          const modality = selectedCheckin.modality || "Presencial";
          const academicHours = selectedCheckin.academicHours || 6;
          const isAttended = !isPendingItem && selectedCheckin.status === "ATTENDED";

          return (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-black text-base flex items-center justify-center shadow-lg shadow-emerald-950/40 shrink-0">
                    {attendeeName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      {attendeeName}
                    </h4>
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="text-xs text-cyan-400 font-mono hover:underline inline-flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{email}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">Participante Oficial</span>
                    )}
                  </div>
                </div>
                <AdminBadge
                  variant={isAttended ? "approved" : "confirmed"}
                  label={isAttended ? "ACREDITADO (QR)" : "CONFIRMADO"}
                />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5 font-bold">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Teléfono / WhatsApp</span>
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-mono font-bold">{phone || "No especificado"}</p>
                    {phone && (
                      <a
                        href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ocupación / Rol</span>
                  </span>
                  <p className="text-white font-medium">{occupation || "Profesional de Ingeniería"}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5 font-bold">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Organización / Universidad</span>
                  </span>
                  <p className="text-white font-medium">{organization || "Independiente"}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Modalidad & Carga</span>
                  </span>
                  <p className="text-white font-mono font-bold">{modality} • {academicHours}h académicas</p>
                </div>
              </div>

              {/* Program Title */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                  Programa de Ingeniería Asignado
                </span>
                <p className="text-sm font-bold text-cyan-300">{eventTitle}</p>
              </div>

              {/* Ticket & Live QR Box */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                      Ticket Oficial de Acceso
                    </span>
                    <span className="text-sm font-mono font-black text-white tracking-wider">
                      #{ticketCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyTicketModal(ticketCode)}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto"
                  >
                    {copiedModalCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedModalCode ? "Copiado" : "Copiar Folio"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 items-center">
                  <div className="sm:col-span-2 space-y-2">
                    <div className="text-xs font-mono">
                      <span className="text-slate-400 block mb-1">Estado de Acreditación Operativa:</span>
                      {isAttended ? (
                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <span className="block text-xs text-white">Ingreso Autorizado & Acreditado</span>
                            <span className="block text-[11px] text-emerald-400 font-normal">
                              Validado en consola de puerta por Operador Staff
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div>
                            <span className="block text-xs font-bold text-amber-200">En espera de ingreso físico</span>
                            <span className="block text-[10px] text-amber-400/80">Listo para validar en puerta</span>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              setIsProcessingModalCheckin(true);
                              try {
                                await handleProcessCode(ticketCode);
                                setSelectedCheckin((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        status: "ATTENDED" as const,
                                        time: formatShortTime(new Date()),
                                      }
                                    : null
                                );
                              } finally {
                                setIsProcessingModalCheckin(false);
                              }
                            }}
                            disabled={loading || isProcessingModalCheckin}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shrink-0 disabled:opacity-50"
                          >
                            {loading || isProcessingModalCheckin ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>Acreditar Ahora</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    {modalQrUrl ? (
                      <div className="p-1.5 bg-white rounded-lg mb-1 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={modalQrUrl} alt="QR Ticket" className="w-20 h-20 object-contain" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-slate-800 flex items-center justify-center mb-1">
                        <QrCode className="w-6 h-6 text-slate-600 animate-pulse" />
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">QR Operativo</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </AdminModal>
    </div>
  );
}
