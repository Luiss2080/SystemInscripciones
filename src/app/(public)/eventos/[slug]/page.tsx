import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RegistrationForm } from "@/components/RegistrationForm";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Users,
  Award,
  BookOpen,
  ExternalLink,
  Code2,
  AlertTriangle,
  ArrowLeft,
  Globe,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      resources: true,
      _count: {
        select: {
          registrations: {
            where: {
              status: { in: ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"] },
            },
          },
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const registeredCount = event._count.registrations;
  const availableSeats = Math.max(0, event.maxCapacity - registeredCount);
  const isSoldOut = event.status === "SOLD_OUT" || availableSeats === 0;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/#eventos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#8b1524] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo de talleres</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Event Details & Syllabus */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-[#8b1524] border border-rose-200">
                {event.eventType === "WORKSHOP" ? "Taller Práctico" : "Conferencia Magistral"}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1.5">
                {event.modality === "VIRTUAL" ? (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    <span>Modalidad Virtual</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Modalidad Presencial / Híbrida</span>
                  </>
                )}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isSoldOut
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {isSoldOut ? "Cupos Agotados" : `${availableSeats} cupos disponibles`}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 uppercase font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#8b1524]" />
                Fecha & Hora
              </span>
              <p className="font-bold text-slate-800 capitalize text-sm">
                {formatDate(event.startDate)}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 uppercase font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Certificación
              </span>
              <p className="font-bold text-slate-800 text-sm">
                {event.academicHours} horas académicas oficiales
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 uppercase font-bold">
                <Users className="w-3.5 h-3.5 text-[#8b1524]" />
                Aforo Máximo
              </span>
              <p className="font-bold text-slate-800 text-sm">
                {event.maxCapacity} participantes en vivo
              </p>
            </div>
          </div>

          {/* Syllabus Section */}
          {event.syllabus && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-200/90 shadow-md">
              <div className="flex items-center gap-2 text-[#8b1524] mb-2">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-xl font-black text-slate-900">
                  Temario Detallado y Contenido
                </h2>
              </div>
              <div className="text-slate-700 text-sm whitespace-pre-line leading-relaxed font-sans">
                {event.syllabus}
              </div>
            </div>
          )}

          {/* Requirements Section */}
          {event.requirements && (
            <div className="bg-amber-50/80 rounded-2xl p-6 space-y-3 border border-amber-200 shadow-sm">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold text-amber-900">
                  Prerrequisitos y Software Recomendado
                </h3>
              </div>
              <p className="text-sm text-amber-900/90 leading-relaxed font-medium">
                {event.requirements}
              </p>
            </div>
          )}

          {/* Resources & Repos */}
          {event.resources.length > 0 && (
            <div className="bg-white rounded-2xl p-6 space-y-4 border border-slate-200/90 shadow-md">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#8b1524]" />
                <span>Recursos y Material Preparatorio</span>
              </h3>
              <div className="space-y-2">
                {event.resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#8b1524] hover:bg-rose-50/30 transition-all text-sm group"
                  >
                    <span className="text-slate-800 font-semibold group-hover:text-[#8b1524] transition-colors">
                      {res.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#8b1524] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Registration Form (Sticky on desktop) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <RegistrationForm
              eventId={event.id}
              eventTitle={event.title}
              price={Number(event.price)}
              currency={event.currency}
              isSoldOut={isSoldOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
