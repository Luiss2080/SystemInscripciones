import FondoTech from "./FondoTech";
import {
  QrCode,
  Code2,
  ScanLine,
  Award,
  ArrowRight,
} from "lucide-react";

export default function MetodologiaSection() {
  const steps = [
    {
      num: "01",
      icon: <QrCode className="w-6 h-6 text-cyan-400" />,
      title: "Registro & Pase QR Inmediato",
      description:
        "Selecciona tu taller, confirma tu cupo en tiempo real y recibe al instante tu ticket digital oficial con código QR firmado y credencial de acceso.",
      highlight: "Cupo Garantizado",
    },
    {
      num: "02",
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      title: "Laboratorios Hands-On en Vivo",
      description:
        "Sesiones 100% prácticas guiadas paso a paso. Construye arquitecturas de microservicios, seguridad en APIs y despliegues en servidores reales.",
      highlight: "Código en Producción",
    },
    {
      num: "03",
      icon: <ScanLine className="w-6 h-6 text-cyan-400" />,
      title: "Acreditación por Escáner QR",
      description:
        "Validación de asistencia ágil y sin filas mediante el escáner de cámara web o móvil oficial de DevCon en el auditorio o aula virtual.",
      highlight: "Acreditación 0 Filas",
    },
    {
      num: "04",
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      title: "Certificación Digital Verificable",
      description:
        "Al finalizar y acreditar tu asistencia, se emite tu certificado oficial con identificador hash único y validez pública inmediata para LinkedIn y CV.",
      highlight: "Verificación Pública",
    },
  ];

  return (
    <section
      id="metodologia"
      className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="metodologia" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        {/* Section Header Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            METODOLOGÍA DE APRENDIZAJE & CERTIFICACIÓN
          </span>
        </div>

        {/* Section Title */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Cómo transformamos tu aprendizaje en{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              experiencia real
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            Un flujo estricto y transparente diseñado para ingenieros que buscan dominar herramientas modernas de desarrollo con validación oficial de sus competencias.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm relative"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-gradient-to-r from-cyan-500/60 to-transparent z-20 pointer-events-none" />
              )}

              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:scale-105 group-hover:border-cyan-500/60 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-cyan-400/30 group-hover:text-cyan-400 transition-colors">
                    {step.num}
                  </span>
                </div>

                {/* Step Badge */}
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3">
                  {step.highlight}
                </span>

                {/* Title */}
                <h3 className="text-lg font-black text-white mb-2.5 leading-snug group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Bottom detail pill */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 font-mono">
                <span>FASE {step.num}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
