"use client";

import { useState } from "react";
import Link from "next/link";
import FondoTech from "@/components/shared/FondoTech";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  QrCode,
} from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo recibo mi pase de acceso y código QR tras inscribirme?",
      a: "De forma automática e instantánea. Una vez completado el formulario de registro en la plataforma, el sistema genera tu ticket digital con un código QR criptográfico único que puedes descargar o guardar en tu teléfono para el check-in el día del evento.",
    },
    {
      q: "¿Los talleres se dictan en vivo o son pregrabados?",
      a: "Todas nuestras conferencias y talleres son sesiones en vivo con interacción directa, resolución de dudas en tiempo real y laboratorios hands-on. Los asistentes acreditados obtienen acceso a la grabación HD y al repositorio privado de código fuente.",
    },
    {
      q: "¿Cómo valida un reclutador o empresa mi certificado oficial?",
      a: "Cada certificado emitido incluye un código hash verificable único y un código QR. Cualquier empresa puede ingresar a nuestro validador público en /verificar e introducir el folio para comprobar la autenticidad, horas académicas y titularidad.",
    },
    {
      q: "¿Qué requisitos previos necesito para participar?",
      a: "Cada taller especifica su nivel en el temario. En general, se recomienda noción básica de programación y terminal. Días previos enviamos por correo las instrucciones exactas para preparar tu entorno local (Docker, Node.js, VS Code o terminal).",
    },
    {
      q: "¿Cuáles son los métodos de pago para los talleres con inversión?",
      a: "Aceptamos transferencias bancarias directas, pagos mediante código QR simple y pasarelas digitales. Para coordinar pagos corporativos o facturación institucional, puedes contactarnos por el botón de WhatsApp o en la sección de Contacto.",
    },
    {
      q: "¿Ofrecen capacitaciones privadas o In-House para equipos de empresas?",
      a: "Sí. Diseñamos bootcamps y mentorías personalizadas para equipos de desarrollo sobre arquitectura distribuida, Docker/Kubernetes, ciberseguridad OWASP y automatización CI/CD adaptadas a los proyectos reales de tu organización.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="faq" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Title + Quick Support Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950 mb-4">
                PREGUNTAS FRECUENTES
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                Respuestas a tus dudas sobre{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  inscripción y acreditación
                </span>
              </h2>

              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Todo lo que necesitas saber sobre la dinámica en vivo, laboratorios prácticos y emisión oficial de certificados verificables.
              </p>
            </div>

            {/* Compact Support & Guarantee Card */}
            <div className="bg-[#0b0e14]/95 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                  <span>SOPORTE TÉCNICO EN LÍNEA</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  &lt; 2h Respuesta
                </span>
              </div>

              <h3 className="text-base font-black text-white">
                ¿Tienes dudas técnicas o solicitudes corporativas?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nuestro equipo coordinador te asiste directamente con el proceso de registro, pagos o planes In-House para empresas.
              </p>

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-200">
                    Pase QR Inmediato
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-200">
                    Certificado SHA-256
                  </span>
                </div>
              </div>

              {/* Dual CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://wa.me/59171234567?text=Hola,%20tengo%20una%20consulta%20sobre%20los%20talleres."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white font-bold text-xs transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>WhatsApp</span>
                </a>

                <Link
                  href="/contacto"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
                >
                  <span>Ir a Contacto</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Compact FAQ Accordion Stack */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-[#0b0e14]/95 border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm shadow-xl ${
                    isOpen
                      ? "border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
                      : "border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                            : "bg-slate-900 border border-slate-800 text-slate-400"
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-white leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-2 pl-[3.25rem] text-xs sm:text-[13px] text-slate-400 leading-relaxed font-medium border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
