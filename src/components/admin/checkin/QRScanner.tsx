"use client";

import { useEffect, useRef, useState } from "react";
import { validateAndCheckinTicket } from "@/actions/admin";
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
} from "lucide-react";

interface ScanHistoryEntry {
  code: string;
  name?: string;
  status: "ATTENDED" | "DUPLICATE";
  time: string;
}

export function QRScanner() {
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

  const [history, setHistory] = useState<ScanHistoryEntry[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleProcessCode = async (code: string) => {
    if (!code || loading) return;
    setLoading(true);

    try {
      const res = await validateAndCheckinTicket(code);
      setScanResult(res);

      if (res.success || res.alreadyAttended) {
        setHistory((prev) => [
          {
            code: res.ticketCode || code,
            name: res.attendeeName,
            status: res.success ? "ATTENDED" : "DUPLICATE",
            time: new Date().toLocaleTimeString(),
          },
          ...prev.slice(0, 9),
        ]);
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
          qrbox: { width: 250, height: 250 },
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Scanner & Manual Input Column */}
      <div className="lg:col-span-7 space-y-5">
        <div className="rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">
                  Control de Acceso en Vivo
                </h2>
                <p className="text-xs text-slate-400">
                  Cámara trasera, webcam o ingreso manual de código
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={isScanning ? stopScanner : startScanner}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                isScanning
                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/40 hover:bg-rose-500/25"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/25"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isScanning ? "Detener Cámara" : "Activar Cámara"}</span>
            </button>
          </div>

          {/* Camera Viewport */}
          <div
            id="qr-reader"
            className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-slate-950 border-2 border-cyan-500/40 mb-5 ${
              isScanning ? "min-h-[280px]" : "hidden"
            }`}
          />

          {/* Futuristic Cyber Viewfinder Placeholder */}
          {!isScanning && (
            <div className="relative p-8 text-center bg-slate-950/80 rounded-2xl border border-slate-800/90 mb-5 overflow-hidden">
              {/* Cyber Corner Brackets */}
              <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-md" />
              <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-md" />
              <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl-md" />
              <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-md" />

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                <Camera className="w-7 h-7 text-cyan-400" />
              </div>
              <p className="text-sm text-white font-bold">Lector Óptico en Espera</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Presiona <strong className="text-cyan-400">Activar Cámara</strong> para apuntar al ticket QR o ingresa el folio abajo.
              </p>
            </div>
          )}

          {/* Manual Input Fallback */}
          <div className="pt-5 border-t border-slate-800/80">
            <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ingreso Manual de Ticket</span>
            </label>
            <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Ej. TCK-ENG-84920"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-sm uppercase tracking-wider"
              />
              <button
                type="submit"
                disabled={loading || !manualCode.trim()}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-extrabold text-xs uppercase tracking-wider border border-slate-700 hover:border-cyan-400 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Acreditar</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Scan Result Feedback Card */}
        {scanResult && (
          <div
            className={`rounded-3xl p-6 border shadow-xl transition-all ${
              scanResult.success
                ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-200"
                : scanResult.alreadyAttended
                ? "bg-amber-950/50 border-amber-500/50 text-amber-200"
                : "bg-rose-950/50 border-rose-500/50 text-rose-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                  scanResult.success
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    : scanResult.alreadyAttended
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                    : "bg-rose-500/20 border-rose-500/40 text-rose-400"
                }`}
              >
                {scanResult.success ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : scanResult.alreadyAttended ? (
                  <AlertTriangle className="w-7 h-7" />
                ) : (
                  <XCircle className="w-7 h-7" />
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest block">
                  {scanResult.success
                    ? "INGRESO AUTORIZADO"
                    : scanResult.alreadyAttended
                    ? "ALERTA: TICKET YA UTILIZADO"
                    : "ACCESO DENEGADO: INVÁLIDO"}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {scanResult.attendeeName || "No Identificado"}
                </h3>

                <p className="text-xs sm:text-sm font-medium">{scanResult.message}</p>

                {scanResult.eventTitle && (
                  <p className="text-xs text-slate-300 pt-1">
                    <strong>Taller:</strong> {scanResult.eventTitle}
                  </p>
                )}

                {scanResult.ticketCode && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-lg bg-slate-950/80 border border-slate-700/80 text-[11px] font-mono font-bold text-cyan-400">
                    {scanResult.ticketCode}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* History Log & Quick Guide Column */}
      <div className="lg:col-span-5 space-y-5">
        <div className="rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Bitácora de Sesión</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-[10px] font-mono font-bold text-cyan-400">
              {history.length} registros
            </span>
          </div>

          {history.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-2">
              <QrCode className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-400">
                Sin acreditaciones en esta sesión aún.
              </p>
              <p className="text-[11px] text-slate-500">
                Cada ticket escaneado o acreditado manualmente aparecerá aquí al instante.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {history.map((item, idx) => (
                <div
                  key={`${item.code}-${idx}`}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between text-xs gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">
                      {item.name || "Participante"}
                    </p>
                    <span className="font-mono text-[11px] text-cyan-400">
                      {item.code}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.status === "ATTENDED"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-700/60"
                          : "bg-amber-950 text-amber-300 border border-amber-700/60"
                      }`}
                    >
                      {item.status === "ATTENDED" ? "OK" : "DUPLICADO"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compact Operational Protocol Strip */}
          <div className="pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Al acreditar un ticket, el estado cambia automáticamente a{" "}
              <strong className="text-white">ATTENDED</strong> y habilita al participante para emitir su certificado digital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
