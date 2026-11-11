interface FondoTechProps {
  id?: string;
}

export default function FondoTech({ id = "tech-bg" }: FondoTechProps) {
  const patternId = `unified-circuit-pattern-${id}`;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Background Cyber Tech Circuit Grid (Matching Hero) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.055]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 10 L 40 10 L 60 30 L 90 30"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.2"
            />
            <circle cx="10" cy="10" r="2.5" fill="#06b6d4" />
            <circle cx="90" cy="30" r="2.5" fill="#06b6d4" />
            <path
              d="M 20 60 L 50 60 L 70 80 L 95 80"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.2"
            />
            <circle cx="20" cy="60" r="2" fill="#3b82f6" />
            <circle cx="95" cy="80" r="2" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Floating Ambient Glowing Particles / Radial Lights in Cyan & Tech Blue */}
      <div className="absolute top-1/4 left-10 w-[420px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 right-10 w-[460px] h-[400px] bg-blue-600/10 rounded-full blur-[160px]" />
      <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-cyan-600/5 rounded-full blur-[120px]" />

      {/* Scattered Animated Moving Tech Accent Dots */}
      <span className="absolute top-12 left-[12%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4] animate-float-dot-1" />
      <span className="absolute top-1/4 right-[15%] w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_14px_#38bdf8] animate-float-dot-2" />
      <span className="absolute top-1/2 left-[6%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4] animate-float-dot-3" />
      <span className="absolute top-2/3 right-[8%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6] animate-float-dot-4" />
      <span className="absolute bottom-16 left-[22%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-float-dot-1" />
      <span className="absolute bottom-24 right-[28%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4] animate-float-dot-3" />
      <span className="absolute top-1/3 left-[45%] w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8] animate-float-dot-2" />
      <span className="absolute bottom-1/3 right-[42%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-float-dot-4" />
    </div>
  );
}
