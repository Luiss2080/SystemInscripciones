import FondoTech from "@/components/shared/FondoTech";
import {
  Users,
  Terminal,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "+500",
      label: "Ingenieros & Estudiantes",
      detail: "Capacitados en talleres de alta especialización",
      icon: <Users className="w-5 h-5 text-cyan-400" />,
    },
    {
      value: "100%",
      label: "Laboratorios Hands-On",
      detail: "Despliegues reales y repositorios con código fuente",
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    },
    {
      value: "4.9 / 5.0",
      label: "Satisfacción Académica",
      detail: "Evaluación destacada en temarios y rigor técnico",
      icon: <Star className="w-5 h-5 text-amber-400" />,
    },
    {
      value: "0.2s",
      label: "Verificación QR Pública",
      detail: "Acreditación instantánea de credenciales digitales",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#030712] border-t border-slate-800/80">
      <FondoTech id="stats" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center sm:text-left space-y-2 border-b sm:border-b-0 sm:border-r border-slate-800/80 last:border-none pb-6 sm:pb-0 sm:pr-6"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mb-3 mx-auto sm:mx-0 shadow-sm shadow-cyan-950">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white tracking-tight">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

