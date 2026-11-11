import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { RegistrationForm } from "@/components/public/events/RegistrationForm";
import { formatDate } from "@/lib/utils/format";
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
import FondoTech from "@/components/shared/FondoTech";

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
    <div className="relative min-h-[calc(100vh-68px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#030712] text-white overflow-hidden">
      <FondoTech id="evento-detail" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/#eventos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo de talleres</span>
          </Link>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Event Details & Syllabus */}
        <div className="lg:col-span-2 space-y-8">
          {/* Accompanied Cover Banner Image */}
          <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                event.slug.includes("docker") || event.slug.includes("microservicios")
                  ? "/images/card-docker-k8s.jpg"
                  : event.slug.includes("owasp") || event.slug.includes("seguridad")
                  ? "/images/card-owasp-security.jpg"
                  : event.slug.includes("ia") || event.slug.includes("agentes")
                  ? "/images/card-ai-agents.jpg"
                  : "/images/card-clean-architecture.jpg"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 text-[11px] font-mono font-bold text-cyan-300 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                <span>CAPACITACIÓN TÉCNICA OFICIAL</span>
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                {event.eventType === "WORKSHOP" ? "Taller Práctico" : "Conferencia Magistral"}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-950/80 text-blue-400 border border-blue-800/60 inline-flex items-center gap-1.5">
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
                    ? "bg-rose-950/80 text-rose-400 border border-rose-800/60"
                    : "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                }`}
              >
                {isSoldOut ? "Cupos Agotados" : `${availableSeats} cupos disponibles`}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 uppercase font-bold">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Fecha & Hora
              </span>
              <p className="font-bold text-white capitalize text-sm">
                {formatDate(event.startDate)}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 uppercase font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Certificación
              </span>
              <p className="font-bold text-white text-sm">
                {event.academicHours} horas académicas oficiales
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 uppercase font-bold">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Aforo Máximo
              </span>
              <p className="font-bold text-white text-sm">
                {event.maxCapacity} participantes en vivo
              </p>
            </div>
          </div>

          {/* Syllabus Section */}
          {event.syllabus && (
            <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-md">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-xl font-black text-white">
                  Temario Detallado y Contenido
                </h2>
              </div>
              <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed font-sans">
                {event.syllabus}
              </div>
            </div>
          )}

          {/* Requirements Section */}
          {event.requirements && (
            <div className="bg-amber-950/30 rounded-2xl p-6 space-y-3 border border-amber-800/40 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold text-amber-300">
                  Prerrequisitos y Software Recomendado
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {event.requirements}
              </p>
            </div>
          )}

          {/* Resources & Repos */}
          {event.resources.length > 0 && (
            <div className="bg-slate-900/80 rounded-2xl p-6 space-y-4 border border-slate-800 shadow-md">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span>Recursos y Material Preparatorio</span>
              </h3>
              <div className="space-y-2">
                {event.resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900 transition-all text-sm group"
                  >
                    <span className="text-slate-200 font-semibold group-hover:text-cyan-400 transition-colors">
                      {res.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Registration Form */}
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
    </div>
  );
}
