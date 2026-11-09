import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Calendar,
  CheckCircle2,
  Printer,
  ArrowLeft,
  XCircle,
  Terminal,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
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
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-rose-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Certificado No Encontrado
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          El código <span className="font-mono text-cyan-400">{code}</span> no corresponde a ningún certificado registrado en nuestra base de datos.
        </p>
        <Link
          href="/verificar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500 text-sm font-semibold transition-all"
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
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nueva búsqueda</span>
        </Link>

        <div className="flex items-center gap-3">
          <PrintCertificateButton />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            Certificado Oficial y Auténtico
          </span>
        </div>
      </div>

      {/* Official Certificate Visualizer (Printable Diploma) */}
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 sm:p-14 relative shadow-2xl shadow-cyan-500/10 print:border-black print:text-black print:bg-white">
        {/* Corner cyber decorations */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/80 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Certificado de Aprobación y Asistencia</span>
          </div>

          <h2 className="text-sm font-mono tracking-widest text-slate-400 uppercase">
            Se otorga la presente acreditación a:
          </h2>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight my-4">
            {registration.attendeeName}
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Por haber asistido, participado activamente y completado con éxito la capacitación técnica en:
          </p>
        </div>

        {/* Workshop Title */}
        <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-cyan-400 leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Modalidad: {event.modality === "VIRTUAL" ? "Virtual en Vivo" : "Presencial"} • Carga Horaria:{" "}
            <strong className="text-slate-200">{event.academicHours} Horas Académicas</strong>
          </p>
        </div>

        {/* Signatures & Verification Stamp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-800 items-end">
          {/* Facilitator signature */}
          <div className="text-center sm:text-left space-y-1">
            <div className="font-serif italic text-2xl text-cyan-400 tracking-wider mb-2">
              Alex Martínez
            </div>
            <div className="w-48 h-0.5 bg-slate-700 mx-auto sm:mx-0 mb-1" />
            <p className="font-bold text-slate-200 text-sm">Ing. Alex Martínez</p>
            <p className="text-xs text-slate-400">
              Systems Engineer & Cloud Solutions Architect
            </p>
          </div>

          {/* Verification Code Stamp */}
          <div className="text-center sm:text-right space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Identificador Único Verificado
            </span>
            <span className="font-mono text-sm font-bold text-cyan-400 tracking-wider">
              {certificate.certificateCode}
            </span>
            <p className="text-[11px] text-slate-400">
              Emitido el {new Date(certificate.issuedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

