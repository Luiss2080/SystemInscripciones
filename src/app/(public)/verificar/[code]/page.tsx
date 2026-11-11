import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FondoTech from "@/components/public/FondoTech";
import {
  CheckCircle2,
  ArrowLeft,
  XCircle,
  Terminal,
  ShieldCheck,
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
      <div className="relative min-h-[calc(100vh-68px)] flex flex-col justify-center items-center py-20 px-4 bg-[#030712] text-white overflow-hidden">
        <FondoTech id="not-found" />
        <div className="w-full max-w-lg mx-auto text-center relative z-10 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-950/50">
            <XCircle className="w-8 h-8 text-rose-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">
            Certificado No Encontrado
          </h1>
          <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">
            El código <span className="font-mono text-cyan-400 font-bold bg-slate-950 px-2 py-1 rounded border border-slate-800">{code}</span> no corresponde a ningún certificado emitido en nuestra base de datos.
          </p>
          <Link
            href="/verificar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Intentar con otro código</span>
          </Link>
        </div>
      </div>
    );
  }

  const { registration } = certificate;
  const { event } = registration;

  return (
    <div className="relative min-h-[calc(100vh-68px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#030712] text-white overflow-hidden">
      <FondoTech id="cert-result" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between no-print">
          <Link
            href="/verificar"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Nueva búsqueda</span>
          </Link>

          <div className="flex items-center gap-3">
            <PrintCertificateButton />
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Certificado Oficial y Auténtico</span>
            </span>
          </div>
        </div>

        {/* Official Certificate Visualizer (Digital Diploma Screen / Clean Print) */}
        <div className="rounded-3xl border-2 border-cyan-500/40 bg-slate-900/95 text-white p-8 sm:p-14 relative shadow-2xl backdrop-blur-md print:border-black print:text-black print:bg-white print:shadow-none">
          {/* Corner academic decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 pointer-events-none print:border-black" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400 pointer-events-none print:border-black" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400 pointer-events-none print:border-black" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 pointer-events-none print:border-black" />

          {/* Certificate Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4 font-bold print:border-black print:text-black print:bg-transparent">
              <Terminal className="w-3.5 h-3.5" />
              <span>Certificado de Aprobación y Asistencia</span>
            </div>

            <h2 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold print:text-gray-600">
              Se otorga la presente acreditación a:
            </h2>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight my-4 print:text-black">
              {registration.attendeeName}
            </h1>

            <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium print:text-gray-700">
              Por haber asistido, participado activamente y completado con éxito la capacitación técnica en:
            </p>
          </div>

          {/* Workshop Title */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center max-w-2xl mx-auto mb-8 shadow-inner print:bg-gray-50 print:border-gray-300">
            <h3 className="text-xl sm:text-2xl font-black text-cyan-300 leading-snug print:text-black">
              {event.title}
            </h3>
            <p className="text-xs text-slate-400 mt-2 font-medium print:text-gray-600">
              Modalidad: {event.modality === "VIRTUAL" ? "Virtual en Vivo" : "Presencial"} • Carga Horaria:{" "}
              <strong className="text-white font-bold print:text-black">{event.academicHours} Horas Académicas</strong>
            </p>
          </div>

          {/* Signatures & Verification Stamp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-800 items-end print:border-gray-300">
            {/* Facilitator signature */}
            <div className="text-center sm:text-left space-y-1">
              <div className="font-serif italic text-2xl text-cyan-400 tracking-wider mb-2 font-bold print:text-black">
                Alex Martínez
              </div>
              <div className="w-48 h-0.5 bg-cyan-500/40 mx-auto sm:mx-0 mb-1 print:bg-black" />
              <p className="font-black text-white text-sm print:text-black">Ing. Alex Martínez</p>
              <p className="text-xs text-slate-400 font-medium print:text-gray-600">
                Systems Engineer & Cloud Solutions Architect
              </p>
            </div>

            {/* Verification Code Stamp */}
            <div className="text-center sm:text-right space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold print:text-gray-500">
                Identificador Único Verificado
              </span>
              <span className="font-mono text-sm font-black text-cyan-400 tracking-wider print:text-black">
                {certificate.certificateCode}
              </span>
              <p className="text-[11px] text-slate-400 font-medium print:text-gray-600">
                Emitido el {new Date(certificate.issuedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
