import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { EventsManager } from "@/components/admin/events/EventsManager";
import { AdminPageHeader } from "@/components/admin/ui";
import Link from "next/link";
import { PlusCircle, Layers } from "lucide-react";

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
            : `CATÁLOGO ACADÉMICO • ${rawEvents.length} PROGRAMAS EN BD`
        }
        title={isSpeaker ? "Mis Talleres y" : "Talleres y"}
        accentTitle={isSpeaker ? "Cursos Asignados" : "Conferencias"}
        description={
          isSpeaker
            ? "Control de tus talleres técnicos: temarios, modalidades, cupos asignados y acceso a la landing pública."
            : "Control centralizado de aforos, tarifas, temarios, modalidades y acceso directo a landings públicas en PostgreSQL 18."
        }
        actions={
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-3.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[9px]">ABIERTOS</span>
                <strong className="text-cyan-400 font-black tabular-nums">
                  {openCount}/{rawEvents.length}
                </strong>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div>
                <span className="text-slate-400 block text-[9px]">OCUPACIÓN TOTAL</span>
                <strong className="text-white font-black tabular-nums">
                  {totalOccupied}/{totalCapacity}
                </strong>
              </div>
            </div>

            {session.role === "ADMIN" && (
              <Link
                href="/admin/eventos/nuevo"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Programar Taller</span>
              </Link>
            )}
          </div>
        }
      />

      {/* Main Events Manager with Filter, Tabs, Grid/Table and Pagination */}
      <EventsManager initialEvents={serializedEvents} />
    </div>
  );
}
