"use client";

import { useState } from "react";
import FondoTech from "@/components/public/FondoTech";
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building,
  ExternalLink,
} from "lucide-react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "inscripciones",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de envío exitoso
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] bg-[#030712] text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Cyber Tech Circuit Grid with Moving Accent Dots */}
      <FondoTech id="contacto-page" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm shadow-cyan-950">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>ATENCIÓN & COORDINACIÓN TÉCNICA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Canales Oficiales de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Contacto y Soporte
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            ¿Tienes dudas sobre los requisitos de un taller, necesitas validar un pago o deseas coordinar una capacitación in-house para tu empresa? Comunícate directamente con nuestro equipo.
          </p>
        </div>

        {/* Main Grid: Channels + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl backdrop-blur-md hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">WhatsApp & Llamadas</h3>
                  <p className="text-xs text-slate-400">Atención ágil para consultas inmediatas</p>
                </div>
              </div>
              <p className="font-mono text-base font-black text-cyan-400 mb-4">+591 71234567</p>
              <a
                href="https://wa.me/59171234567?text=Hola,%20quisiera%20consultar%20sobre%20los%20talleres%20de%20DevCon%20Workshops."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
              >
                <span>Chatear por WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl backdrop-blur-md hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Correo Institucional</h3>
                  <p className="text-xs text-slate-400">Propuestas y facturación corporativa</p>
                </div>
              </div>
              <p className="font-mono text-sm font-black text-cyan-400 mb-4">contacto@ingeniero.tech</p>
              <a
                href="mailto:contacto@ingeniero.tech"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
              >
                <span>Enviar Correo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Sedes & Horarios Card */}
            <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl backdrop-blur-md space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-sm">Sedes & Auditorio</strong>
                  <span className="text-slate-400">
                    Auditorio Central de Ingeniería de Sistemas (La Paz & Santa Cruz de la Sierra) y Transmisión Virtual en Vivo HD.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-sm">Horario de Atención</strong>
                  <span className="text-slate-400">
                    Lunes a Viernes: 08:00 - 20:00 • Sábados: 09:00 - 14:00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/85 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                Envíanos tu Requerimiento
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-8 font-medium">
                Completa el formulario y un coordinador técnico te responderá en menos de 2 horas hábiles.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-center space-y-3">
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
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ing. Juan Pérez"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="juan.perez@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+591 71234567"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Tipo de Consulta *
                      </label>
                      <select
                        name="tipoConsulta"
                        value={formData.tipoConsulta}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-sm cursor-pointer"
                      >
                        <option value="inscripciones">Inscripción a Talleres & Cupos</option>
                        <option value="corporativo">Capacitación In-House para Empresas</option>
                        <option value="certificados">Validación de Certificados & QR</option>
                        <option value="alianzas">Convenios Universitarios</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Detalle de tu Consulta o Requerimiento *
                    </label>
                    <textarea
                      name="mensaje"
                      required
                      rows={4}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Indícanos los detalles de tu consulta, número de personas o fecha estimada..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:scale-[1.01] active:scale-95"
                  >
                    {loading ? (
                      <span>Enviando requerimiento...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Enviar Consulta Técnica</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

