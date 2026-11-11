"use client";

import { useState } from "react";
import FondoTech from "@/components/shared/FondoTech";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "inscripciones",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] bg-[#030712] text-white overflow-hidden py-8 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      {/* Background Cyber Tech Circuit Grid with Moving Accent Dots */}
      <FondoTech id="contacto-page" />

      <div className="max-w-6xl mx-auto w-full space-y-8 relative z-10">
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-3 shadow-sm shadow-cyan-950">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>ATENCIÓN & COORDINACIÓN TÉCNICA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2 leading-tight">
            Canales Oficiales de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Contacto y Soporte
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            Resuelve dudas sobre requisitos, valida pagos o coordina capacitaciones corporativas in-house con nuestro equipo técnico.
          </p>
        </div>

        {/* Balanced Two-Column Grid (Equal Height, Compact & Complete) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Direct Channels Side-by-Side + Auditorio Banner Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Compact Dual Channel Row */}
            <div id="canales" className="scroll-mt-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Mini Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 shadow-xl backdrop-blur-md hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-3 shadow-sm">
                    <Phone className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">WhatsApp Directo</h3>
                  <p className="font-mono text-xs font-black text-cyan-400 mt-1 mb-3">
                    +591 71234567
                  </p>
                </div>
                <a
                  href="https://wa.me/59171234567?text=Hola,%20quisiera%20consultar%20sobre%20los%20talleres%20de%20DevCon%20Workshops."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold transition-all w-full"
                >
                  <span>Chatear</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Email Mini Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 shadow-xl backdrop-blur-md hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-3 shadow-sm">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Correo Oficial</h3>
                  <p className="font-mono text-[11px] font-black text-cyan-400 mt-1 mb-3 truncate">
                    contacto@ingeniero.tech
                  </p>
                </div>
                <a
                  href="mailto:contacto@ingeniero.tech"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white text-[11px] font-bold transition-all w-full"
                >
                  <span>Enviar Correo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Sedes & Horarios Card Accompanied by Auditorium Photo */}
            <div
              id="sedes"
              className="scroll-mt-24 flex-1 p-5 rounded-3xl bg-[#0b0e14]/95 border border-slate-800/80 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-4"
            >
              <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-slate-800 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-conference.jpg"
                  alt="Auditorio Central de Ingeniería"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[9px] font-black uppercase tracking-wider">
                    SEDES OFICIALES
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-cyan-800/60 text-[10px] font-mono font-bold text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>AUDITORIO CENTRAL • STREAMING HD</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-xs">Sedes & Modalidad</strong>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      La Paz & Santa Cruz de la Sierra • Presencial y Transmisión Virtual en Vivo.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2.5 border-t border-slate-800/80">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-xs">Horario de Atención</strong>
                    <span className="text-slate-400 text-[11px]">
                      Lun - Vie: 08:00 - 20:00 • Sáb: 09:00 - 14:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Compact & Complete Interactive Form */}
          <div id="formulario" className="scroll-mt-24 lg:col-span-7 flex">
            <div className="w-full bg-[#0b0e14]/95 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Envíanos tu Requerimiento
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Un coordinador técnico responderá en menos de 2 horas hábiles.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-[10px] font-mono font-bold text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>SOPORTE ACTIVO</span>
                  </span>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-cyan-950/50 border border-cyan-800/80 text-center space-y-3 my-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                      <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Hemos recibido tu solicitud. Nuestro equipo técnico se comunicará contigo vía WhatsApp o correo electrónico a la brevedad.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          nombre: "",
                          email: "",
                          telefono: "",
                          tipoConsulta: "inscripciones",
                          mensaje: "",
                        });
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-400 hover:text-white font-bold transition-all cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Ing. Juan Pérez"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juan.perez@empresa.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          required
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+591 71234567"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">
                          Tipo de Consulta *
                        </label>
                        <select
                          name="tipoConsulta"
                          value={formData.tipoConsulta}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-sm cursor-pointer transition-colors"
                        >
                          <option value="inscripciones">Inscripción a Talleres & Cupos</option>
                          <option value="corporativo">Capacitación In-House Empresas</option>
                          <option value="certificados">Validación de Certificados QR</option>
                          <option value="alianzas">Convenios Universitarios</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">
                        Detalle de tu Consulta o Requerimiento *
                      </label>
                      <textarea
                        name="mensaje"
                        required
                        rows={3}
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Indícanos los detalles de tu consulta, número de participantes o fecha estimada..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm leading-relaxed transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {loading ? (
                        <span>ENVIANDO REQUERIMIENTO...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 stroke-[2.5]" />
                          <span>ENVIAR CONSULTA TÉCNICA</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Balanced Guarantees Strip */}
              <div className="pt-4 mt-5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-300">Respuesta &lt; 2h</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-300">Facturación In-House</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <Award className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-300">Soporte Post-Taller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
