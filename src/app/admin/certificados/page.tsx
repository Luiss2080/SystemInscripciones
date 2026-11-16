import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { CertificatesTable } from "@/components/admin/certificates/CertificatesTable";
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui";
import { AnimatedProgressBar } from "@/components/shared/MotionPrimitives";
import { Award, ShieldCheck, Users, CheckCircle2, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const isSpeaker = session.role === "SPEAKER";
  const isStaff = session.role === "STAFF";

  const certFilter = {
    status: "ATTENDED" as const,
    deletedAt: null,
    ...(isSpeaker ? { event: { speakerId: session.id } } : {}),
  };

  const attendedRecords = await prisma.registration.findMany({
    where: certFilter,
    orderBy: { attendedAt: "desc" },
    include: {
      event: { select: { id: true, title: true, academicHours: true } },
      certificate: { select: { certificateCode: true, issuedAt: true } },
    },
  });

  const issuedCount = attendedRecords.filter((r) => r.certificate !== null).length;
  const pendingCount = attendedRecords.length - issuedCount;
  const coveragePct =
    attendedRecords.length > 0
      ? Math.round((issuedCount / attendedRecords.length) * 100)
      : 0;
  const certifiedHours = attendedRecords
    .filter((r) => r.certificate !== null)
    .reduce((sum, r) => sum + r.event.academicHours, 0);

  return (
    <div className="space-y-5">
      {/* Standard Module Header */}
      <AdminPageHeader
        icon={Award}
        badgeText={
          isSpeaker
            ? `CÁTEDRA DOCENTE • CERTIFICADOS DE MIS ALUMNOS`
            : isStaff
            ? `CONTROL OPERATIVO • ACREDITACIONES Y FOLIOS QR`
            : `ACREDITACIÓN & VALIDEZ QR • REGISTRO OFICIAL`
        }
        title={isSpeaker ? "Certificados de" : "Emisión de"}
        accentTitle={isSpeaker ? "Mis Cursos" : "Certificados Digitales"}
        description={
          isSpeaker
            ? "Gestión oficial de folios y acreditación académica para los alumnos que asistieron a tus talleres y conferencias."
            : "Gestión oficial de folios criptográficos para participantes con asistencia acreditada (ATTENDED). Emisión en 1-clic y verificación pública inmediata."
        }
      />

      {/* Fila Enriquecida de Estadísticas de Certificados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <AdminStatCard
          label="Alumnos con Asistencia"
          value={attendedRecords.length}
          valueSuffix="acreditados"
          icon={Users}
          badge="ASISTENCIA"
          description="Participantes con estado ATTENDED"
          subDetail="100% elegibles para certificación"
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Folios Criptográficos"
          value={issuedCount}
          valueSuffix="emitidos"
          icon={CheckCircle2}
          badge="HASH ÚNICO"
          description="Certificados firmados digitalmente"
          progress={coveragePct}
          colorVariant="emerald"
        />

        <AdminStatCard
          label="Pendientes de Emisión"
          value={pendingCount}
          valueSuffix="en espera"
          icon={Clock}
          badge="POR GENERAR"
          description="Alumnos sin certificado emitido aún"
          subDetail="Generación masiva o individual 1-clic"
          colorVariant={pendingCount > 0 ? "amber" : "cyan"}
        />

        <AdminStatCard
          label="Horas Certificadas"
          value={certifiedHours}
          valueSuffix="horas"
          icon={Award}
          badge="VALIDEZ ACADÉMICA"
          description="Carga horaria técnica avalada"
          subDetail="Verificables mediante código QR público"
          colorVariant="indigo"
        />
      </div>

      {/* Live Animated Coverage Bar Card */}
      <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center gap-3">
        <span className="text-[11px] font-mono font-bold text-slate-300 uppercase whitespace-nowrap flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cobertura de Emisión ({coveragePct}%)</span>
        </span>
        <AnimatedProgressBar percentage={coveragePct} className="flex-1" />
      </div>

      {/* Main Standardized Table & Filter Section */}
      <CertificatesTable initialRecords={attendedRecords} />
    </div>
  );
}
