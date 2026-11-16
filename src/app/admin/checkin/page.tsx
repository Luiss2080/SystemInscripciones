import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import {
  getRecentCheckinLogs,
  getPendingCheckinQueue,
} from "@/services/admin/dashboard.service";
import { QRScanner } from "@/components/admin/checkin/QRScanner";
import { AdminPageHeader } from "@/components/admin/ui";
import { QrCode, ShieldCheck, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCheckinPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const isStaff = session.role === "STAFF";

  const [initialHistory, pendingQueue] = await Promise.all([
    getRecentCheckinLogs(8),
    getPendingCheckinQueue(6),
  ]);

  return (
    <div className="space-y-5">
      {/* Standard Module Header */}
      <AdminPageHeader
        icon={QrCode}
        badgeText={
          isStaff
            ? "CONTROL DE ACCESO EN PUERTA • OPERADOR STAFF"
            : "CONTROL DE ACCESO EN VIVO • SISTEMA DE VALIDACIÓN"
        }
        title="Escáner y Validación de"
        accentTitle="Tickets QR"
        description={
          isStaff
            ? "Acreditación física de asistentes en puerta mediante escáner de cámara o ingreso de código #TCK. Sincronización instantánea del aforo."
            : "Acreditación instantánea de participantes por lectura de cámara web o código de folio #TCK. Sincronización en tiempo real."
        }
      />

      {/* Fila Adicional de Estadísticas de Control de Acceso */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Acreditados Recientes</span>
            <strong className="text-xl font-black text-white font-mono tabular-nums">{initialHistory.length}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Confirmados en Cola</span>
            <strong className="text-xl font-black text-cyan-400 font-mono tabular-nums">{pendingQueue.length}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Lector Óptico QR</span>
            <strong className="text-sm font-black text-white font-mono uppercase">En Espera</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
            <QrCode className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Sincronización</span>
            <strong className="text-sm font-black text-emerald-400 font-mono uppercase">Tiempo Real</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      <QRScanner initialHistory={initialHistory} pendingQueue={pendingQueue} />
    </div>
  );
}
