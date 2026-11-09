"use client";

import { Printer } from "lucide-react";

export function PrintCertificateButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500 text-xs font-semibold transition-all shadow-sm cursor-pointer no-print"
    >
      <Printer className="w-4 h-4 text-cyan-400" />
      <span>Imprimir / Descargar Diploma</span>
    </button>
  );
}
