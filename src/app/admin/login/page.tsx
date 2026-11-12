"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/auth/session";
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
  QrCode,
  Award,
  Calendar,
} from "lucide-react";
import FondoTech from "@/components/shared/FondoTech";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";

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
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#030712] text-white overflow-hidden">
      {/* Unified Animated Cyber Grid Background */}
      <FondoTech id="admin-login" />

      {/* Subtle Radial Backlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Unified Compact Split Portal Container */}
      <MotionFadeIn className="w-full max-w-4xl bg-[#0b0e14]/95 border border-slate-800/90 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.12)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 backdrop-blur-xl">
        {/* Left Brand & Security Visual Column */}
        <div className="lg:col-span-5 relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between bg-slate-950/90 border-b lg:border-b-0 lg:border-r border-slate-800/80">
          {/* Atmospheric Background Image Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/card-owasp-security.jpg"
              alt="Seguridad y Control Administrativo"
              className="w-full h-full object-cover opacity-20 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-[#0b0e14]" />
          </div>

          <div className="relative z-10 space-y-5">
            {/* Institutional Brand Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/25 shrink-0">
                <Terminal className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm tracking-tight text-white">
                    DevCon <span className="text-cyan-400">Workshops</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                    SYSENG
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Consola Administrativa Central
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                <ShieldCheck className="w-3 h-3" />
                <span>ZERO-TRUST GATEWAY</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Gestión integral de talleres y acreditación
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Control operativo en tiempo real para el ingeniero organizador.
              </p>
            </div>

            {/* 3 Core Capability Rows */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center shrink-0">
                  <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 block leading-tight">
                    Escáner QR de Asistencia
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Check-in instantáneo en sala
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 block leading-tight">
                    Certificados SHA-256
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Emisión automática con folio único
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 block leading-tight">
                    Control de Cupos & Pagos
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Validación en PostgreSQL 18
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>JWT HTTPONLY • RBAC</span>
            <span className="text-cyan-400 font-bold">v2.6.0-LTS</span>
          </div>
        </div>

        {/* Right Authentication Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between relative">
          {/* Top Bar inside Form */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al sitio público</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
              <span>ENLACE SEGURO</span>
            </span>
          </div>

          {/* Auth Title & Lock Icon */}
          <div className="mb-6">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
                <Lock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
                  Acceso Administrativo
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Ingresa con tu cuenta autorizada de administrador.
                </p>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 shadow-sm">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Compact High-Contrast Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ingeniero.tech"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>VERIFICANDO...</span>
                </>
              ) : (
                <>
                  <span>INGRESAR AL PANEL</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Compact Demo Credentials Bar */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
            <div className="text-[11px] font-mono text-slate-400">
              <span className="text-slate-500 uppercase text-[9px] font-bold block">
                CUENTA DEMO LOCAL
              </span>
              admin@ingeniero.tech • <span className="text-cyan-400">AdminPassword2026!</span>
            </div>

            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/60 text-cyan-400 hover:text-white text-[11px] font-bold transition-all cursor-pointer shadow-sm"
            >
              {demoFilled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Listo</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Autocompletar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </MotionFadeIn>
    </div>
  );
}
