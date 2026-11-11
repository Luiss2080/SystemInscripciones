import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CertificatesTable } from "@/components/CertificatesTable";
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

  return (
    <div className="space-y-6">
      {/* Compact Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              Participantes con check-in confirmado listos para recibir folio verificable QR en línea.
            </p>
          </div>
        </div>
      </div>

      <CertificatesTable initialRecords={attendedRecords} />
    </div>
  );
}
