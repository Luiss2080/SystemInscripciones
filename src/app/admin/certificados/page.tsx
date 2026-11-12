import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { CertificatesTable } from "@/components/admin/certificates/CertificatesTable";
import {
  MotionFadeIn,
  AnimatedProgressBar,
} from "@/components/shared/MotionPrimitives";
import { Award } from "lucide-react";

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
    <div className="space-y-4">
      {/* Compact Command Banner with Live Coverage Bar */}
      <MotionFadeIn className="relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl space-y-3">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.18em] text-cyan-400">
              <Award className="w-3 h-3 text-cyan-400" />
              <span>ACREDITACIÓN & VALIDEZ QR</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Emisión de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Certificados Digitales
              </span>
            </h1>

            <p className="text-xs text-slate-400 font-medium">
              Participantes con asistencia verificada (ATTENDED) en PostgreSQL listos para emisión de folio único.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0 self-start lg:self-auto">
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
        </div>

        {/* Live Animated Coverage Progress */}
        <div className="relative z-10 flex items-center gap-3 pt-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase whitespace-nowrap">
            Cobertura Emisión ({coveragePct}%)
          </span>
          <AnimatedProgressBar percentage={coveragePct} className="flex-1" />
        </div>
      </MotionFadeIn>

      <CertificatesTable initialRecords={attendedRecords} />
    </div>
  );
}
