import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { QRScanner } from "@/components/admin/checkin/QRScanner";
import { QrCode, ShieldCheck } from "lucide-react";

export default async function AdminCheckinPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      {/* Compact Command Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACREDITACIÓN EN VIVO • CHECK-IN</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Escáner y Validación de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Tickets QR
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Valida códigos QR mediante cámara o ingreso manual con verificación criptográfica anti-duplicado.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shrink-0 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>SHA-256 Anti-Reuso Activo</span>
          </div>
        </div>
      </div>

      <QRScanner />
    </div>
  );
}
