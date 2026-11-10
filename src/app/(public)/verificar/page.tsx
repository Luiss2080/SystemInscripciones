"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Search, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function VerifySearchPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/verificar/${code.trim().toUpperCase()}`);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-8 h-8 text-[#8b1524]" />
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
        Verificador Oficial de Certificados
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
        Comprueba la autenticidad, horas académicas y validez de cualquier certificado de taller o conferencia emitido por el{" "}
        <strong className="text-slate-900 font-bold">Ing. Alex Martínez</strong>.
      </p>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-12">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej. CERT-2026-ENG-84920"
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#8b1524] text-sm font-mono uppercase tracking-wider font-semibold"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-[#8b1524] hover:bg-[#72101c] text-white font-bold text-sm transition-all shadow-lg shadow-rose-950/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Verificar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1.5" />
          <p className="font-bold text-slate-800">Anti-Falsificación</p>
          <span className="text-slate-500 font-medium">Firma SHA-256 única y trazable en base de datos.</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
          <Award className="w-4 h-4 text-amber-600 mb-1.5" />
          <p className="font-bold text-slate-800">Acreditación</p>
          <span className="text-slate-500 font-medium">Válido para CV y acreditación profesional continua.</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
          <ShieldCheck className="w-4 h-4 text-[#8b1524] mb-1.5" />
          <p className="font-bold text-slate-800">Acceso Inmediato</p>
          <span className="text-slate-500 font-medium">Verificación instantánea por QR o código de folio.</span>
        </div>
      </div>
    </div>
  );
}
