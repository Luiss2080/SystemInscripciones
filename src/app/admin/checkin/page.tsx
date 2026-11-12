import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import {
  getRecentCheckinLogs,
  getPendingCheckinQueue,
} from "@/services/admin/dashboard.service";
import { QRScanner } from "@/components/admin/checkin/QRScanner";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import { QrCode, ShieldCheck, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCheckinPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [initialHistory, pendingQueue] = await Promise.all([
    getRecentCheckinLogs(8),
    getPendingCheckinQueue(6),
  ]);

  return (
    <div className="space-y-4">
      {/* Compact Command Header */}
      <MotionFadeIn className="relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.18em] text-cyan-400">
              <QrCode className="w-3 h-3 text-cyan-400" />
              <span>ACREDITACIÓN EN VIVO • CHECK-IN</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Escáner y Validación de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Tickets QR
              </span>
            </h1>

            <p className="text-xs text-slate-400 font-medium">
              Valida códigos QR por cámara o folio manual y acredita ingresos al instante en PostgreSQL 18.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white">{initialHistory.length}</strong> acreditados recientes
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>
                <strong className="text-cyan-400">{pendingQueue.length}</strong> confirmados en cola
              </span>
            </div>
          </div>
        </div>
      </MotionFadeIn>

      <QRScanner initialHistory={initialHistory} pendingQueue={pendingQueue} />
    </div>
  );
}
