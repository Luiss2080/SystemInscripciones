"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validateAndCheckinTicket } from "@/actions/admin/checkin";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import { formatShortTime } from "@/lib/utils/format";
import { Html5Qrcode } from "html5-qrcode";
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
} from "lucide-react";

interface ScanHistoryEntry {
  code: string;
  name?: string;
  eventTitle?: string;
  status: "ATTENDED" | "DUPLICATE";
  time: string;
}

interface PendingTicketItem {
  ticketCode: string;
  attendeeName: string;
  eventTitle: string;
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

          {/* Manual Input + Quick Queue Chips from PostgreSQL */}
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
                  <span>Cola Confirmada en PostgreSQL (clic para validar)</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {queue.map((item) => (
                    <button
                      key={item.ticketCode}
                      type="button"
                      onClick={() => handleProcessCode(item.ticketCode)}
                      disabled={loading}
                      title={`${item.attendeeName} • ${item.eventTitle}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <span className="text-cyan-400 font-bold">{item.ticketCode}</span>
                      <span className="text-slate-500">•</span>
                      <span className="truncate max-w-[120px] font-sans font-semibold">
                        {item.attendeeName.split(" ")[0]}
                      </span>
                    </button>
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
                <span>Bitácora en Vivo (PostgreSQL)</span>
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
                    className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex items-center justify-between text-xs gap-2.5"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">
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
                    <div className="text-right shrink-0">
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
    </div>
  );
}
