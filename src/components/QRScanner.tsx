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
  User,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

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

  const [history, setHistory] = useState<any[]>([]);
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
    } catch (err: any) {
      setScanResult({
        success: false,
        message: err?.message || "Error al validar el ticket.",
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
          // Pause camera and process
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Scanner & Manual Input Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Scanner Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-cyan-400" />
                <span>Control de Acceso en Vivo</span>
              </h2>
              <p className="text-xs text-slate-400">
                Escanea el código QR del ticket desde tu cámara móvil o webcam
              </p>
            </div>

            <button
              onClick={isScanning ? stopScanner : startScanner}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isScanning
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isScanning ? "Detener Cámara" : "Activar Cámara"}</span>
            </button>
          </div>

          {/* Camera Viewport */}
          <div
            id="qr-reader"
            className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 ${
              isScanning ? "min-h-[300px]" : "hidden"
            }`}
          />

          {!isScanning && (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 mb-6">
              <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-300 font-medium">Cámara Inactiva</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Haz clic en &quot;Activar Cámara&quot; para permitir el escaneo automático de tickets de los asistentes.
              </p>
            </div>
          )}

          {/* Manual Input Fallback */}
          <div className="pt-6 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              O ingresa el código de ticket manualmente
            </span>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Ej. TCK-ENG-84920"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-sm uppercase"
              />
              <button
                type="submit"
                disabled={loading || !manualCode.trim()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-sm border border-slate-700 hover:border-cyan-500 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Acreditar</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Scan Result Feedback Card */}
        {scanResult && (
          <div
            className={`rounded-3xl p-6 sm:p-8 border transition-all ${
              scanResult.success
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                : scanResult.alreadyAttended
                ? "bg-amber-950/40 border-amber-500/50 text-amber-300"
                : "bg-rose-950/40 border-rose-500/50 text-rose-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  scanResult.success
                    ? "bg-emerald-500/20 text-emerald-400"
                    : scanResult.alreadyAttended
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-rose-500/20 text-rose-400"
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

              <div className="space-y-2 flex-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider block">
                  {scanResult.success
                    ? "Ingreso Autorizado"
                    : scanResult.alreadyAttended
                    ? "Alerta: Ticket Ya Utilizado"
                    : "Acceso Denegado: Ticket Inválido"}
                </span>

                <h3 className="text-2xl font-black text-slate-100">
                  {scanResult.attendeeName || "No Identificado"}
                </h3>

                <p className="text-sm font-medium">{scanResult.message}</p>

                {scanResult.eventTitle && (
                  <p className="text-xs text-slate-300">
                    <strong>Evento:</strong> {scanResult.eventTitle}
                  </p>
                )}

                {scanResult.ticketCode && (
                  <p className="text-xs font-mono text-slate-400">
                    Ticket: <strong>{scanResult.ticketCode}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* History Log Column */}
      <div className="glass-panel rounded-3xl p-6 border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Últimos Escaneos de la Sesión</span>
        </h3>

        {history.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No se han registrado acreditaciones en esta sesión aún.
          </p>
        ) : (
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-slate-200">{item.name}</p>
                  <span className="font-mono text-[10px] text-slate-400">{item.code}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "ATTENDED"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-amber-950 text-amber-300 border border-amber-800"
                    }`}
                  >
                    {item.status === "ATTENDED" ? "OK" : "Repetido"}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
