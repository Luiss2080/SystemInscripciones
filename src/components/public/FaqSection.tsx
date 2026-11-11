"use client";

import { useState } from "react";
import FondoTech from "./FondoTech";
import {
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo recibo mi pase de acceso y código QR tras inscribirme?",
      a: "De forma automática e instantánea. Una vez completado el formulario de registro en la plataforma, el sistema genera tu ticket digital con un código QR criptográfico único que puedes descargar, imprimir o guardar en tu teléfono móvil para el check-in el día del evento.",
    },
    {
      q: "¿Los talleres se dictan en vivo o son pregrabados?",
      a: "Todas nuestras conferencias y talleres son sesiones en vivo con interacción directa, resolución de dudas en tiempo real y laboratorios hands-on. Además, los asistentes acreditados obtienen acceso a la grabación en alta definición y al repositorio privado de código fuente.",
    },
    {
      q: "¿Cómo valida un reclutador o empresa mi certificado oficial?",
      a: "Cada certificado emitido incluye un código hash verificable único y un código QR. Cualquier persona o departamento de recursos humanos puede ingresar a nuestro validador público en /verificar e ingresar el código para comprobar la autenticidad, horas académicas y fecha de emisión.",
    },
    {
      q: "¿Qué requisitos previos necesito para participar?",
      a: "Cada taller especifica su nivel en el temario. En general, se recomienda conocimientos básicos de programación y terminal de comandos. Antes del taller enviamos por correo las instrucciones para preparar tu entorno local (Docker, Node.js, VS Code o terminal).",
    },
    {
      q: "¿Cuáles son los métodos de pago para los talleres con inversión?",
      a: "Aceptamos transferencias bancarias directas, pagos mediante código QR simple y pasarelas digitales. Para coordinar pagos corporativos o facturación institucional, puedes contactarnos directamente por el botón de WhatsApp del taller correspondiente.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="faq" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        {/* Section Header Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            PREGUNTAS FRECUENTES
          </span>
        </div>

        {/* Section Title */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Respuestas a tus dudas sobre{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              inscripción y acreditación
            </span>
          </h2>
          <p className="text-base text-slate-400 font-medium leading-relaxed">
            Todo lo que necesitas saber sobre el desarrollo de las sesiones, validación de certificados y acceso a los laboratorios.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 backdrop-blur-sm shadow-xl"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-bold text-sm sm:text-base text-white">
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
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

