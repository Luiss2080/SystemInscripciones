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
        actions={
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white">{initialHistory.length}</strong> acreditados recientes
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-sm">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>
                <strong className="text-cyan-400">{pendingQueue.length}</strong> confirmados en cola
              </span>
            </div>
          </div>
        }
      />

      <QRScanner initialHistory={initialHistory} pendingQueue={pendingQueue} />
    </div>
  );
}
