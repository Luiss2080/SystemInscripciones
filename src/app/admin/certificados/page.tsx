import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CertificatesTable } from "@/components/CertificatesTable";

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
    <div className="space-y-8">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">
          Acreditación & Validez Oficial
        </span>
        <h1 className="text-3xl font-extrabold text-slate-100">
          Emisión de Certificados Digitales
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Solo los asistentes que completaron el check-in están habilitados para la emisión de certificado.
        </p>
      </div>

      <CertificatesTable initialRecords={attendedRecords} />
    </div>
  );
}

