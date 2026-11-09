import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Award, ArrowRight } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    slug: string;
    description: string;
    eventType: string;
    modality: string;
    locationOrUrl: string | null;
    startDate: Date;
    maxCapacity: number;
    price: number | string | any;
    currency: string;
    academicHours: number;
    status: string;
    _count?: {
      registrations: number;
    };
  };
}

export function EventCard({ event }: EventCardProps) {
  const registeredCount = event._count?.registrations ?? 0;
  const availableSeats = Math.max(0, event.maxCapacity - registeredCount);
  const isSoldOut = event.status === "SOLD_OUT" || availableSeats === 0;

  const eventTypeLabel =
    event.eventType === "WORKSHOP"
      ? "Taller Práctico"
      : event.eventType === "CONFERENCE"
      ? "Conferencia Magistral"
      : "Bootcamp Intensivo";

  const modalityBadgeColor =
    event.modality === "VIRTUAL"
      ? "bg-blue-950 text-blue-300 border-blue-800/60"
      : event.modality === "PRESENTIAL"
      ? "bg-purple-950 text-purple-300 border-purple-800/60"
      : "bg-emerald-950 text-emerald-300 border-emerald-800/60";

  return (
    <article className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

      <div>
        {/* Top badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              {eventTypeLabel}
            </span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${modalityBadgeColor}`}
            >
              {event.modality === "VIRTUAL"
                ? "🌐 Virtual"
                : event.modality === "PRESENTIAL"
                ? "📍 Presencial"
                : "⚡ Híbrido"}
            </span>
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isSoldOut
                ? "bg-rose-950/80 text-rose-300 border border-rose-800/50"
                : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
            }`}
          >
            {isSoldOut ? "Cupos Agotados" : "Inscripciones Abiertas"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-3 leading-snug line-clamp-2">
          {event.title}
        </h3>

        {/* Description snippet */}
        <p className="text-sm text-slate-400 mb-5 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Metadata Details */}
        <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-900/60 rounded-xl p-3.5 border border-slate-800/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="capitalize">{formatDate(event.startDate)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Certificado por {event.academicHours} horas</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-slate-400">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>
                <strong className={availableSeats < 10 ? "text-amber-400" : "text-cyan-400"}>
                  {availableSeats}
                </strong>{" "}
                / {event.maxCapacity} cupos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Inversión</span>
          <span className="text-lg font-bold text-slate-100 font-mono">
            {formatCurrency(Number(event.price), event.currency)}
          </span>
        </div>

        <Link
          href={`/eventos/${event.slug}`}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isSoldOut
              ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
          }`}
        >
          <span>{isSoldOut ? "Ver Detalles" : "Inscribirme"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

