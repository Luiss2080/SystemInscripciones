import {
  Terminal,
  Cpu,
  Code2,
  ShieldCheck,
  GraduationCap,
  Server,
  FileCode,
  FolderGit2,
  BookOpen,
  Award,
  HelpCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  Bot,
  MessageCircle,
  Globe,
  Share2,
} from "lucide-react";
import Link from "next/link";
import FondoTech from "./public/FondoTech";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-slate-800/80 bg-[#030712] text-slate-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <FondoTech id="footer" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 relative z-10">
        {/* Brand Column (Left) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-lg shadow-cyan-950/40">
              <Terminal className="w-5 h-5 text-cyan-400 font-bold" />
            </div>
            <div className="flex items-center gap-1.5 font-black text-xl text-white tracking-tight">
              <span>DEVCON</span>
              <span className="text-cyan-400">WORKSHOPS</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Educación tecnológica y capacitación en ingeniería de sistemas de vanguardia, impulsando el aprendizaje práctico y creativo para desarrollar talento innovador y preparado para los desafíos de la industria.
          </p>

          {/* Social circular SVG buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            {[
              { icon: Globe, href: "https://github.com", label: "Web" },
              { icon: FolderGit2, href: "https://github.com", label: "GitHub" },
              { icon: Share2, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:contacto@ingeniero.tech", label: "Mail" },
            ].map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  title={soc.label}
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-slate-950 hover:bg-cyan-400 hover:border-cyan-400 transition-all cursor-pointer shadow-xs"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: SERVICIOS */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
            Servicios
          </h4>
          <ul className="space-y-3 text-xs">
            {[
              { label: "Microservicios & Cloud Native", icon: Cpu },
              { label: "Arquitectura de Software a Medida", icon: Code2 },
              { label: "Auditoría & Seguridad OWASP", icon: ShieldCheck },
              { label: "Capacitación Docente y Equipos", icon: GraduationCap },
              { label: "Consultoría DevOps & CI/CD", icon: Server },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx}>
                  <Link
                    href="/#eventos"
                    className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-300 transition-colors group"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 transition-colors">
                      <Icon className="w-3 h-3 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: APRENDE GRATIS */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
            Aprende Gratis
          </h4>
          <ul className="space-y-3 text-xs">
            {[
              { label: "Laboratorios Hands-On", icon: Terminal, href: "/#eventos" },
              { label: "Guías de Arquitectura", icon: FileCode, href: "/#eventos" },
              { label: "Repositorios de Código", icon: FolderGit2, href: "https://github.com" },
              { label: "Temarios & Masterclasses", icon: BookOpen, href: "/#eventos" },
              { label: "Verificador de Certificados", icon: Award, href: "/verificar" },
              { label: "Preguntas Frecuentes", icon: HelpCircle, href: "/#eventos" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors group"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:bg-slate-800 transition-colors">
                      <Icon className="w-3 h-3 text-slate-300" />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 4: CONTACTO */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
            Contacto
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3 h-3 text-cyan-400" />
              </span>
              <div>
                <strong className="block text-slate-200">Ubicación</strong>
                <span className="text-slate-400">La Paz / Santa Cruz de la Sierra - Bolivia</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-3 h-3 text-cyan-400" />
              </span>
              <div>
                <strong className="block text-slate-200">Email Oficial</strong>
                <span className="text-slate-400 font-mono">contacto@ingeniero.tech</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-3 h-3 text-cyan-400" />
              </span>
              <div>
                <strong className="block text-slate-200">Teléfono / WhatsApp</strong>
                <span className="text-slate-400 font-mono">+591 71234567</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#8b1524]/20 border border-[#8b1524]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-[#e11d48]" />
              </span>
              <div>
                <strong className="block text-slate-200">Horarios de Atención</strong>
                <span className="text-slate-400">Lun - Vie: 08:00 - 20:00 • Sáb: 09:00 - 14:00</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-footer bottom bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 relative z-10">
        <p>© 2026 DevCon Workshops. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <Link href="/verificar" className="hover:text-white transition-colors">
            Acreditación y Certificados
          </Link>
          <span>•</span>
          <Link href="/admin" className="hover:text-white transition-colors">
            Portal Administrador
          </Link>
        </div>
      </div>

      {/* Floating Bottom Left Bot SVG */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
        <div className="relative group">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-[#e11d48] shadow-xl hover:border-rose-500/60 hover:scale-110 transition-all cursor-pointer">
            <Bot className="w-6 h-6 text-[#e11d48]" />
          </div>
          <span className="absolute left-14 top-2 bg-slate-900 border border-slate-700 text-white text-[11px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Asistente DevCon Bot
          </span>
        </div>
      </div>

      {/* Floating Bottom Right WhatsApp SVG */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href="https://wa.me/59171234567"
          target="_blank"
          rel="noreferrer"
          title="Consultas por WhatsApp"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        </a>
      </div>
    </footer>
  );
}
