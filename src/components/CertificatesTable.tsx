"use client";

import { useState } from "react";
import { issueCertificate } from "@/actions/admin";
import { Award, CheckCircle2, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface CertificatesTableProps {
  initialRecords: {
    id: string;
    attendeeName: string;
    attendeeEmail: string;
    attendedAt: Date | string | null;
    event: {
      title: string;
      academicHours: number;
    };
    certificate: {
      certificateCode: string;
      issuedAt: Date | string;
    } | null;
  }[];
}

export function CertificatesTable({ initialRecords }: CertificatesTableProps) {
  const [records, setRecords] = useState(initialRecords);
  const [issuingId, setIssuingId] = useState<string | null>(null);

  const handleIssue = async (registrationId: string) => {
    setIssuingId(registrationId);
    try {
      const res = await issueCertificate(registrationId);
      if (res.success && res.certificateCode) {
        setRecords((prev) =>
          prev.map((r) =>
            r.id === registrationId
              ? {
                  ...r,
                  certificate: {
                    certificateCode: res.certificateCode!,
                    issuedAt: new Date(),
                  },
                }
              : r
          )
        );
      }
    } finally {
      setIssuingId(null);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-3">Participante Acreditado</th>
              <th className="py-3 px-3">Taller / Conferencia</th>
              <th className="py-3 px-3">Horas Académicas</th>
              <th className="py-3 px-3">Código de Certificado</th>
              <th className="py-3 px-3">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {records.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-slate-500">
                  No hay asistentes acreditados aún. Realiza el check-in primero.
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-slate-200">{r.attendeeName}</p>
                    <span className="text-xs text-slate-500 font-mono">{r.attendeeEmail}</span>
                  </td>
                  <td className="py-3.5 px-3 max-w-xs truncate text-xs text-slate-300">
                    {r.event.title}
                  </td>
                  <td className="py-3.5 px-3 text-xs font-mono text-amber-400">
                    {r.event.academicHours} hrs
                  </td>
                  <td className="py-3.5 px-3">
                    {r.certificate ? (
                      <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        {r.certificate.certificateCode}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">No emitido</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    {r.certificate ? (
                      <Link
                        href={`/verificar/${r.certificate.certificateCode}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-cyan-900 text-xs font-semibold transition-all"
                      >
                        <span>Ver Ficha Oficial</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleIssue(r.id)}
                        disabled={issuingId === r.id}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                      >
                        {issuingId === r.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Award className="w-3.5 h-3.5" />
                        )}
                        <span>Emitir Certificado</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

