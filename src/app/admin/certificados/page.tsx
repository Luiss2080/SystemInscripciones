import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { CertificatesTable } from "@/components/admin/certificates/CertificatesTable";
import { AdminPageHeader } from "@/components/admin/ui";
import { AnimatedProgressBar } from "@/components/shared/MotionPrimitives";
import { Award, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const attendedRecords = await prisma.registration.findMany({
    where: {
      status: "ATTENDED",
      deletedAt: null,
    },
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
        badgeText="ACREDITACIÓN & VALIDEZ QR • POSTGRESQL 18"
        title="Emisión de"
        accentTitle="Certificados Digitales"
        description="Gestión oficial de folios criptográficos para participantes con asistencia acreditada (ATTENDED). Emisión en 1-clic y verificación pública inmediata."
        actions={
          <div className="flex flex-wrap items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0 shadow-sm">
            <div>
              <span className="text-slate-400 block text-[9px]">ELEGIBLES</span>
              <strong className="text-white font-black tabular-nums">{attendedRecords.length}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">EMITIDOS</span>
              <strong className="text-emerald-300 font-black tabular-nums">{issuedCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">PENDIENTES</span>
              <strong className="text-amber-300 font-black tabular-nums">{pendingCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px]">HORAS CERT.</span>
              <strong className="text-cyan-400 font-black tabular-nums">{certifiedHours}h</strong>
            </div>
          </div>
        }
      />

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
