export default function FondoTech() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Background Cyber Tech Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="fondo-tech-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#A3E635"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="1.5" fill="#A3E635" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fondo-tech-grid)" />
      </svg>

      {/* Floating Ambient Glowing Particles / Radial Lights in Lime #A3E635 */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#A3E635]/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-[#A3E635]/5 rounded-full blur-[160px]" />
      <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px]" />

      {/* Scattered Tech Accent Dots */}
      <span className="absolute top-20 left-[15%] w-1.5 h-1.5 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635] opacity-60 animate-pulse" />
      <span className="absolute top-1/2 left-[8%] w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_12px_#A3E635] opacity-40" />
      <span className="absolute top-1/3 right-[12%] w-1.5 h-1.5 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635] opacity-50 animate-pulse" />
      <span className="absolute bottom-24 right-[18%] w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_10px_#A3E635] opacity-50" />
    </div>
  );
}
