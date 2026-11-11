"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FondoTech from "@/components/shared/FondoTech";
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
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 bg-[#030712] text-white overflow-hidden">
      {/* Background Cyber Tech Circuit Grid with Moving Accent Dots */}
      <FondoTech id="verificar" />

      <div className="w-full max-w-3xl mx-auto text-center relative z-10">
        {/* Top Icon Squircle */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-950/50">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>

        {/* Section Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            SISTEMA DE VERIFICACIÓN OFICIAL
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
          Verificador Oficial de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Certificados
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Comprueba la autenticidad, horas académicas y validez de cualquier certificado de taller o conferencia emitido por el{" "}
          <strong className="text-cyan-400 font-bold">Ing. Alex Martínez</strong>.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-14">
          <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl focus-within:border-cyan-500/80 transition-colors">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ej. CERT-2026-ENG-84920"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-transparent text-white placeholder:text-slate-500 focus:outline-none text-sm font-mono uppercase tracking-wider font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              <span>Verificar</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </form>

        {/* 3 Dark Cyber Guarantee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl backdrop-blur-sm hover:border-cyan-500/50 transition-colors group">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-white text-xs mb-1">Anti-Falsificación</p>
            <span className="text-slate-400 font-medium text-[11px] leading-relaxed block">
              Firma SHA-256 única y trazable en base de datos PostgreSQL.
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl backdrop-blur-sm hover:border-cyan-500/50 transition-colors group">
            <Award className="w-4 h-4 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-white text-xs mb-1">Acreditación Oficial</p>
            <span className="text-slate-400 font-medium text-[11px] leading-relaxed block">
              Válido para LinkedIn, CV y acreditación profesional continua.
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl backdrop-blur-sm hover:border-cyan-500/50 transition-colors group">
            <ShieldCheck className="w-4 h-4 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-white text-xs mb-1">Acceso Inmediato</p>
            <span className="text-slate-400 font-medium text-[11px] leading-relaxed block">
              Verificación instantánea por QR o código de folio único.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
