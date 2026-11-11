import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { CertificatesTable } from "@/components/admin/certificates/CertificatesTable";
import { Award } from "lucide-react";

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
      event: { select: { title: true, academicHours: true } },
      certificate: { select: { certificateCode: true, issuedAt: true } },
    },
  });

  const issuedCount = attendedRecords.filter((r) => r.certificate !== null).length;
  const pendingCount = attendedRecords.length - issuedCount;

  return (
    <div className="space-y-6">
      {/* Compact Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-400">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACREDITACIÓN & VALIDEZ OFICIAL</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Emisión de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Certificados Digitales
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Participantes con check-in confirmado en PostgreSQL listos para recibir folio verificable QR en línea.
            </p>
          </div>

          <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0 self-start lg:self-auto">
            <div>
              <span className="text-slate-400 block text-[10px]">ELEGIBLES</span>
              <strong className="text-white font-black">{attendedRecords.length}</strong>
            </div>
            <div className="w-px h-7 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">EMITIDOS</span>
              <strong className="text-emerald-300 font-black">{issuedCount}</strong>
            </div>
            <div className="w-px h-7 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">PENDIENTES</span>
              <strong className="text-amber-300 font-black">{pendingCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <CertificatesTable initialRecords={attendedRecords} />
    </div>
  );
}
