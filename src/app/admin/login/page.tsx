"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/auth";
import {
  Lock,
  Mail,
  Terminal,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import FondoTech from "@/components/public/FondoTech";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@ingeniero.tech");
  const [password, setPassword] = useState("");
  const [demoFilled, setDemoFilled] = useState(false);

  const handleFillDemo = () => {
    setEmail("admin@ingeniero.tech");
    setPassword("AdminPassword2026!");
    setDemoFilled(true);
    setTimeout(() => setDemoFilled(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);

    if (!res.success) {
      setErrorMsg(res.message || "Error al iniciar sesión.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-[#030712] text-white overflow-hidden">
      {/* Unified Animated Cyber Grid Background */}
      <FondoTech id="admin-login" />

      {/* Top Navigation & Brand Strip */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 text-slate-300 hover:text-white text-xs font-bold transition-all backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span>Volver a DevCon Workshops</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
          <span>CONSOLE GATEWAY • SYSENG 2026</span>
        </div>
      </div>

      {/* Main Two-Column Executive Auth Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Column: Accompanied Visual Card & Security Architecture */}
        <div className="lg:col-span-5 bg-[#0b0e14]/95 border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between backdrop-blur-xl relative group">
          <div>
            {/* Image Banner with Floating Icon OUTSIDE overflow-hidden (ENCIMA DE TODO) */}
            <div className="relative mb-8">
              <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/card-owasp-security.jpg"
                  alt="Seguridad y Control Administrativo DevCon Workshops"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top-Left Security Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    ZERO-TRUST
                  </span>
                </div>

                {/* Top-Right Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                    <span>JWT HTTPONLY</span>
                  </span>
                </div>
              </div>

              {/* Floating Icon: ENCIMA DE TODO */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 z-30 ring-4 ring-[#0b0e14]">
                <ShieldCheck className="w-7 h-7 text-slate-950 stroke-[2.2]" />
              </div>
            </div>

            {/* Text & Info */}
            <div className="text-center space-y-2.5 mt-3">
              <span className="inline-block px-3 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                SISTEMA DE GESTIÓN TÉCNICA
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Panel de Control Operativo
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-medium">
                Administra talleres en producción, realiza el escaneo de pases QR en tiempo real, valida pagos y emite certificados digitales verificables con firma criptográfica.
              </p>
            </div>

            {/* Security Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                  SESIÓN
                </span>
                <span className="text-xs font-bold text-cyan-400 block mt-0.5">
                  HttpOnly
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                  ROL RBAC
                </span>
                <span className="text-xs font-bold text-cyan-400 block mt-0.5">
                  Admin Strict
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">
                  MOTOR
                </span>
                <span className="text-xs font-bold text-cyan-400 block mt-0.5">
                  PostgreSQL 18
                </span>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ing. Alex Martínez</span>
            </span>
            <span className="text-cyan-400 font-bold">v2.6.0-LTS</span>
          </div>
        </div>

        {/* Right Column: Login Authentication Form Card */}
        <div className="lg:col-span-7 bg-[#0b0e14]/95 border border-slate-800/80 rounded-3xl p-7 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-between relative">
          {/* Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                  AUTENTICACIÓN DE ADMINISTRADOR
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Acceso Administrativo
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
                  Ingresa tus credenciales para acceder a la consola del organizador.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Correo Electrónico Institucional
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ingeniero.tech"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Contraseña de Acceso
                  </label>
                </div>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>VERIFICANDO CREDENCIALES...</span>
                  </>
                ) : (
                  <>
                    <span>INGRESAR AL PANEL</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Environment Helper Footer */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                CREDENCIALES AMBIENTE LOCAL
              </span>
              <span className="text-xs font-mono text-slate-300">
                admin@ingeniero.tech / <span className="text-cyan-400 font-bold">AdminPassword2026!</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/60 text-cyan-400 hover:text-white text-[11px] font-bold transition-all cursor-pointer shrink-0 shadow-sm"
            >
              {demoFilled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Cargado</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Autocompletar Demo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
