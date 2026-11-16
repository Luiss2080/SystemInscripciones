import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import {
  getRecentCheckinLogs,
  getPendingCheckinQueue,
} from "@/services/admin/dashboard.service";
import { QRScanner } from "@/components/admin/checkin/QRScanner";
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui";
import { QrCode, ShieldCheck, Users, Radio, Database } from "lucide-react";

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

      {/* Fila Enriquecida de Estadísticas de Control de Acceso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <AdminStatCard
          label="Acreditaciones Recientes"
          value={initialHistory.length}
          valueSuffix="ingresos"
          icon={ShieldCheck}
          badge="EN SALA"
          description="Asistentes acreditados en este módulo"
          subDetail="Check-in instantáneo con sello de tiempo"
          colorVariant="emerald"
        />

        <AdminStatCard
          label="Confirmados en Espera"
          value={pendingQueue.length}
          valueSuffix="en cola"
          icon={Users}
          badge="POR INGRESAR"
          description="Participantes listos para escanear"
          subDetail="Validación por cámara o código manual"
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Sensor Óptico QR"
          value="ZXing HD"
          icon={Radio}
          badge="ACTIVO"
          description="Decodificador de video en tiempo real"
          subDetail="Detección de folio #TCK en <100ms"
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Persistencia & Aforo"
          value="PostgreSQL"
          valueSuffix="18"
          icon={Database}
          badge="ACID ATÓMICO"
          description="Sincronización instantánea de asistencia"
          subDetail="Aforo actualizado en vivo"
          colorVariant="emerald"
        />
      </div>

      <QRScanner initialHistory={initialHistory} pendingQueue={pendingQueue} />
    </div>
  );
}
