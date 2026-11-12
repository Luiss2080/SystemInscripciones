import FondoTech from "@/components/shared/FondoTech";
import { MotionStaggerItem } from "@/components/shared/MotionPrimitives";
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
      icon: <QrCode className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Registro & Pase QR Inmediato",
      description:
        "Selecciona tu taller, confirma tu cupo en tiempo real y recibe al instante tu ticket digital oficial con código QR firmado y credencial de acceso.",
      highlight: "Cupo Garantizado",
    },
    {
      num: "02",
      icon: <Code2 className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Laboratorios Hands-On en Vivo",
      description:
        "Sesiones 100% prácticas guiadas paso a paso. Construye arquitecturas de microservicios, seguridad en APIs y despliegues en servidores reales.",
      highlight: "Código en Producción",
    },
    {
      num: "03",
      icon: <ScanLine className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Acreditación por Escáner QR",
      description:
        "Validación de asistencia ágil y sin filas mediante el escáner de cámara web o móvil oficial de DevCon en el auditorio o aula virtual.",
      highlight: "Acreditación 0 Filas",
    },
    {
      num: "04",
      icon: <Award className="w-6 h-6 text-slate-950 stroke-[2.2]" />,
      title: "Certificación Digital Verificable",
      description:
        "Al finalizar y acreditar tu asistencia, se emite tu certificado oficial con identificador hash único y validez pública inmediata para LinkedIn y CV.",
      highlight: "Verificación Pública",
    },
  ];

  return (
    <section
      id="metodologia"
      className="py-16 sm:py-20 relative overflow-hidden bg-[#030712] border-t border-slate-800/80"
    >
      <FondoTech id="metodologia" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        {/* Section Header Badge */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm shadow-cyan-950">
            METODOLOGÍA DE APRENDIZAJE & CERTIFICACIÓN
          </span>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Cómo transformamos tu aprendizaje en{" "}
            <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              experiencia real
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            Un flujo estricto y transparente diseñado para ingenieros que buscan dominar herramientas modernas de desarrollo con validación oficial de sus competencias.
          </p>
        </div>

        {/* 4 Steps Grid with Equal Height & Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative pt-4 items-stretch">
          {steps.map((step, index) => (
            <MotionStaggerItem
              key={step.num}
              index={index}
              className="h-full bg-slate-900/85 border border-slate-800/90 rounded-3xl p-6 pt-11 shadow-2xl flex flex-col justify-between hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-colors duration-300 group backdrop-blur-md relative text-center"
            >
              {/* Floating Centered Icon: ENCIMA DE TODO (z-30, elevated top boundary, glowing cyan) */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 font-bold z-30 ring-4 ring-[#030712] group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              {/* Connecting Flow Arrow between Steps on Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950 border border-cyan-500/60 text-cyan-400 items-center justify-center z-30 shadow-xl shadow-cyan-950/80 backdrop-blur-md">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}

              <div>
                {/* Centered Step Badge */}
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>FASE {step.num} • {step.highlight}</span>
                  </span>
                </div>

                {/* Title (Centered) */}
                <h3 className="text-lg font-black text-white mb-2.5 leading-snug group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>

                {/* Description (Centered) */}
                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Bottom detail pill (Centered with Arrow) */}
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <span>PASO 0{index + 1} COMPLETADO</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </MotionStaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}

