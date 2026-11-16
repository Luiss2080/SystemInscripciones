import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { EventsManager } from "@/components/admin/events/EventsManager";
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui";
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
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
  const totalHours = rawEvents.reduce((acc, e) => acc + e.academicHours, 0);
  const availableSeats = Math.max(0, totalCapacity - totalOccupied);

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

      {/* Fila Enriquecida de Estadísticas de Talleres */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <AdminStatCard
          label="Catálogo Académico"
          value={rawEvents.length}
          valueSuffix="programas"
          icon={Layers}
          badge="CATÁLOGO"
          description="Talleres técnicos y masterclasses"
          subDetail={`${totalHours} horas académicas registradas`}
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Inscripciones Abiertas"
          value={openCount}
          valueSuffix="talleres"
          icon={Calendar}
          badge="EN VENTA"
          description="Disponibles en la landing pública"
          subDetail={`${rawEvents.length - openCount} programas concluidos o cerrados`}
          colorVariant="cyan"
        />

        <AdminStatCard
          label="Inscritos / Aforo Total"
          value={totalOccupied}
          valueSuffix={`/ ${totalCapacity}`}
          icon={Users}
          badge="RESERVAS"
          description="Asientos confirmados por alumnos"
          progress={occupancyRate}
          colorVariant="emerald"
        />

        <AdminStatCard
          label="Disponibilidad Restante"
          value={availableSeats}
          valueSuffix="cupos libres"
          icon={CheckCircle2}
          badge={`${occupancyRate}% OCUPADO`}
          description="Margen de inscripción disponible"
          subDetail="Monitoreo de aforo en tiempo real"
          colorVariant={occupancyRate > 85 ? "amber" : "cyan"}
        />
      </div>

      {/* Main Events Manager with Filter, Tabs, Grid/Table and Pagination */}
      <EventsManager initialEvents={serializedEvents} />
    </div>
  );
}
