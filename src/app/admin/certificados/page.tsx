import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { CertificatesTable } from "@/components/admin/certificates/CertificatesTable";
import { AdminPageHeader } from "@/components/admin/ui";
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

      {/* Fila Adicional de Estadísticas de Certificados */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Alumnos Elegibles</span>
            <strong className="text-xl font-black text-white font-mono tabular-nums">{attendedRecords.length}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Emitidos</span>
            <strong className="text-xl font-black text-emerald-400 font-mono tabular-nums">{issuedCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Pendientes de Folio</span>
            <strong className="text-xl font-black text-amber-300 font-mono tabular-nums">{pendingCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Horas Acreditadas</span>
            <strong className="text-xl font-black text-cyan-300 font-mono tabular-nums">{certifiedHours}h</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Award className="w-4 h-4" />
          </div>
        </div>
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
