import Link from "next/link";
import { Calendar, Users, Award, ArrowRight, Globe, Zap, MapPin } from "lucide-react";
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
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : event.modality === "PRESENTIAL"
      ? "bg-purple-50 text-purple-700 border-purple-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <article className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300 transition-all group relative overflow-hidden">
      <div>
        {/* Top badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-[#701121] border border-rose-200">
              {eventTypeLabel}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${modalityBadgeColor}`}
            >
              {event.modality === "VIRTUAL" ? (
                <>
                  <Globe className="w-3 h-3" />
                  <span>Virtual</span>
                </>
              ) : event.modality === "PRESENTIAL" ? (
                <>
                  <MapPin className="w-3 h-3" />
                  <span>Presencial</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3" />
                  <span>Híbrido</span>
                </>
              )}
            </span>
          </div>

          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              isSoldOut
                ? "bg-rose-100 text-rose-800 border border-rose-300"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {isSoldOut ? "Cupos Agotados" : "Inscripciones Abiertas"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#701121] transition-colors mb-3 leading-snug line-clamp-2">
          {event.title}
        </h3>

        {/* Description snippet */}
        <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Metadata Details */}
        <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
          <div className="flex items-center gap-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#701121] shrink-0" />
            <span className="capitalize">{formatDate(event.startDate)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Certificado por {event.academicHours} horas</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-slate-600">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>
                <strong className={availableSeats < 10 ? "text-amber-600" : "text-[#701121]"}>
                  {availableSeats}
                </strong>{" "}
                / {event.maxCapacity} cupos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Inversión</span>
          <span className="text-lg font-black text-slate-900 font-mono">
            {formatCurrency(Number(event.price), event.currency)}
          </span>
        </div>

        <Link
          href={`/eventos/${event.slug}`}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            isSoldOut
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-[#701121] hover:bg-[#580b18] text-white shadow-md shadow-rose-950/20 hover:scale-[1.02]"
          }`}
        >
          <span>{isSoldOut ? "Ver Detalles" : "Inscribirme"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
