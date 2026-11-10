import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowLeft,
  XCircle,
  Terminal,
} from "lucide-react";
import { PrintCertificateButton } from "@/components/PrintCertificateButton";

interface VerifyPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function VerifyResultPage({ params }: VerifyPageProps) {
  const { code } = await params;

  const certificate = await prisma.certificate.findUnique({
    where: {
      certificateCode: code.toUpperCase(),
    },
    include: {
      registration: {
        include: {
          event: true,
        },
      },
    },
  });

  if (!certificate) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          Certificado No Encontrado
        </h1>
        <p className="text-sm text-slate-600 mb-6 font-medium">
          El código <span className="font-mono text-[#8b1524] font-bold">{code}</span> no corresponde a ningún certificado registrado en nuestra base de datos.
        </p>
        <Link
          href="/verificar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Intentar con otro código</span>
        </Link>
      </div>
    );
  }

  const { registration } = certificate;
  const { event } = registration;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/verificar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#8b1524] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nueva búsqueda</span>
        </Link>

        <div className="flex items-center gap-3">
          <PrintCertificateButton />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Certificado Oficial y Auténtico
          </span>
        </div>
      </div>

      {/* Official Certificate Visualizer (Printable Diploma) */}
      <div className="rounded-3xl border-4 border-[#8b1524] bg-white text-slate-900 p-8 sm:p-14 relative shadow-2xl print:border-black print:text-black print:bg-white print:shadow-none">
        {/* Corner academic decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-amber-500 pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-amber-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-amber-500 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-amber-500 pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#8b1524] text-xs font-mono uppercase tracking-widest mb-4 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Certificado de Aprobación y Asistencia</span>
          </div>

          <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase font-bold">
            Se otorga la presente acreditación a:
          </h2>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight my-4">
            {registration.attendeeName}
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Por haber asistido, participado activamente y completado con éxito la capacitación técnica en:
          </p>
        </div>

        {/* Workshop Title */}
        <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 text-center max-w-2xl mx-auto mb-8 shadow-inner">
          <h3 className="text-xl sm:text-2xl font-black text-[#8b1524] leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 font-medium">
            Modalidad: {event.modality === "VIRTUAL" ? "Virtual en Vivo" : "Presencial"} • Carga Horaria:{" "}
            <strong className="text-slate-900 font-bold">{event.academicHours} Horas Académicas</strong>
          </p>
        </div>

        {/* Signatures & Verification Stamp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200 items-end">
          {/* Facilitator signature */}
          <div className="text-center sm:text-left space-y-1">
            <div className="font-serif italic text-2xl text-[#8b1524] tracking-wider mb-2 font-bold">
              Alex Martínez
            </div>
            <div className="w-48 h-0.5 bg-slate-300 mx-auto sm:mx-0 mb-1" />
            <p className="font-black text-slate-900 text-sm">Ing. Alex Martínez</p>
            <p className="text-xs text-slate-500 font-medium">
              Systems Engineer & Cloud Solutions Architect
            </p>
          </div>

          {/* Verification Code Stamp */}
          <div className="text-center sm:text-right space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
              Identificador Único Verificado
            </span>
            <span className="font-mono text-sm font-black text-[#8b1524] tracking-wider">
              {certificate.certificateCode}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">
              Emitido el {new Date(certificate.issuedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
