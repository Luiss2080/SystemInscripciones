import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { EventsManager } from "@/components/admin/events/EventsManager";
import { AdminPageHeader } from "@/components/admin/ui";
import Link from "next/link";
import { PlusCircle, Layers, Calendar, Users, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const isSpeaker = session.role === "SPEAKER";
  const eventFilter = isSpeaker ? { deletedAt: null, speakerId: session.id } : { deletedAt: null };

  const rawEvents = await prisma.event.findMany({
    where: eventFilter,
    orderBy: { startDate: "asc" },
    include: {
      _count: {
        select: {
          registrations: {
            where: { status: { in: ["CONFIRMED", "PENDING_PAYMENT", "ATTENDED"] } },
          },
        },
      },
    },
  });

  const openCount = rawEvents.filter((e) => e.status === "OPEN").length;
  const totalOccupied = rawEvents.reduce((acc, e) => acc + e._count.registrations, 0);
  const totalCapacity = rawEvents.reduce((acc, e) => acc + e.maxCapacity, 0);

  // Serialize Decimal objects to plain numbers for Client Components
  const serializedEvents = rawEvents.map((e) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: e.description,
    syllabus: e.syllabus,
    requirements: e.requirements,
    eventType: e.eventType,
    modality: e.modality,
    locationOrUrl: e.locationOrUrl,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate.toISOString(),
    maxCapacity: e.maxCapacity,
    price: Number(e.price),
    currency: e.currency,
    academicHours: e.academicHours,
    status: e.status,
    _count: {
      registrations: e._count.registrations,
    },
  }));

  return (
    <div className="space-y-5">
      {/* Standard Module Header */}
      <AdminPageHeader
        icon={Layers}
        badgeText={
          isSpeaker
            ? `CÁTEDRA DOCENTE • ${rawEvents.length} PROGRAMAS ASIGNADOS`
            : `CATÁLOGO ACADÉMICO • ${rawEvents.length} PROGRAMAS ACTIVOS`
        }
        title={isSpeaker ? "Mis Talleres y" : "Talleres y"}
        accentTitle={isSpeaker ? "Cursos Asignados" : "Conferencias"}
        description={
          isSpeaker
            ? "Control de tus talleres técnicos: temarios, modalidades, cupos asignados y acceso a la landing pública."
            : "Control centralizado de aforos, tarifas, temarios, modalidades y acceso a landings públicas."
        }
        actions={
          session.role === "ADMIN" ? (
            <Link
              href="/admin/eventos/nuevo"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Programar Taller</span>
            </Link>
          ) : undefined
        }
      />

      {/* Fila Adicional de Estadísticas de Talleres */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Total Programas</span>
            <strong className="text-xl font-black text-white font-mono tabular-nums">{rawEvents.length}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Con Cupos Abiertos</span>
            <strong className="text-xl font-black text-cyan-300 font-mono tabular-nums">{openCount}</strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Inscritos / Aforo</span>
            <strong className="text-xl font-black text-emerald-400 font-mono tabular-nums">
              {totalOccupied} <span className="text-xs text-slate-400 font-normal">/ {totalCapacity}</span>
            </strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold truncate">Tasa de Ocupación</span>
            <strong className="text-xl font-black text-cyan-400 font-mono tabular-nums">
              {totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0}%
            </strong>
          </div>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Events Manager with Filter, Tabs, Grid/Table and Pagination */}
      <EventsManager initialEvents={serializedEvents} />
    </div>
  );
}
