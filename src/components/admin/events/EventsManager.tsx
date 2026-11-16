"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatShortDate } from "@/lib/utils/format";
import { getWorkshopMedia } from "@/lib/utils/workshop-media";
import {
  AdminFilterBar,
  AdminTrayHeader,
  AdminStatusTabs,
  AdminPagination,
  AdminEmptyState,
  AdminBadge,
  AdminModal,
  AdminSelect,
} from "@/components/admin/ui";
import {
  AnimatedProgressBar,
  MotionStaggerItem,
} from "@/components/shared/MotionPrimitives";
import {
  Calendar,
  PlusCircle,
  ExternalLink,
  Users,
  Clock,
  Globe,
  Award,
  Eye,
  LayoutGrid,
  List,
  BookOpen,
  MapPin,
  Filter,
  Copy,
  Check,
  Calendar,
  Sparkles,
  GraduationCap,
  FileText,
} from "lucide-react";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  syllabus: string | null;
  requirements: string | null;
  eventType: string;
  modality: string;
  locationOrUrl: string | null;
  startDate: Date | string;
  endDate: Date | string;
  maxCapacity: number;
  price: number | string;
  currency: string;
  academicHours: number;
  status: string;
  speaker?: {
    fullName: string;
    email?: string;
  } | null;
  _count: {
    registrations: number;
  };
}

interface EventsManagerProps {
  initialEvents: EventItem[];
}

export function EventsManager({ initialEvents }: EventsManagerProps) {
  const [events] = useState<EventItem[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [modalityFilter, setModalityFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("date_asc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Selected event for details modal
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [copiedLanding, setCopiedLanding] = useState(false);

  const handleCopyLanding = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/eventos/${slug}`);
    setCopiedLanding(true);
    setTimeout(() => setCopiedLanding(false), 2000);
  };

  // Filter & Sort Pipeline
  const query = searchTerm.toLowerCase().trim();
  const filteredEvents = events
    .filter((e) => {
      const matchesSearch =
        query === "" ||
        e.title.toLowerCase().includes(query) ||
        e.slug.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query);

      const matchesType = typeFilter === "ALL" ? true : e.eventType === typeFilter;
      const matchesModality =
        modalityFilter === "ALL" ? true : e.modality === modalityFilter;

      return matchesSearch && matchesType && matchesModality;
    })
    .sort((a, b) => {
      if (sortBy === "date_asc") {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }
      if (sortBy === "date_desc") {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      if (sortBy === "capacity_desc") {
        return b.maxCapacity - a.maxCapacity;
      }
      if (sortBy === "occupancy_desc") {
        return b._count.registrations - a._count.registrations;
      }
      if (sortBy === "name_asc") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Pagination
  const totalItems = filteredEvents.length;
  const effectivePageSize = viewMode === "grid" ? 6 : 10;
  const totalPages = Math.ceil(totalItems / effectivePageSize) || 1;
  const startIndex = (currentPage - 1) * effectivePageSize;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + effectivePageSize);

  // Tab counts
  const tabCounts = {
    ALL: events.length,
    WORKSHOP: events.filter((e) => e.eventType === "WORKSHOP").length,
    BOOTCAMP: events.filter((e) => e.eventType === "BOOTCAMP").length,
    CONFERENCE: events.filter((e) => e.eventType === "CONFERENCE").length,
  };

  const statusTabs = [
    { id: "ALL", label: "Todos los Programas", count: tabCounts.ALL },
    { id: "WORKSHOP", label: "Talleres Prácticos", count: tabCounts.WORKSHOP },
    { id: "BOOTCAMP", label: "Bootcamps Intensivos", count: tabCounts.BOOTCAMP },
    { id: "CONFERENCE", label: "Conferencias Técnicas", count: tabCounts.CONFERENCE },
  ];

  const isFiltered =
    searchTerm !== "" || typeFilter !== "ALL" || modalityFilter !== "ALL";

  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeFilter("ALL");
    setModalityFilter("ALL");
    setSortBy("date_asc");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Standardized Filter & Search Bar */}
      <AdminFilterBar
        title="FILTRAR PROGRAMAS ACADÉMICOS"
        searchValue={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Buscar por título, temática, slug o descripción..."
        filters={[
          {
            id: "modality",
            label: "Modalidad",
            value: modalityFilter,
            onChange: (val) => {
              setModalityFilter(val);
              setCurrentPage(1);
            },
            options: [
              { label: "Todas las Modalidades", value: "ALL" },
              { label: "Virtual en Vivo", value: "VIRTUAL" },
              { label: "Presencial Auditorio", value: "PRESENCIAL" },
              { label: "Híbrido", value: "HIBRIDO" },
            ],
          },
        ]}
        sortValue={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
        sortOptions={[
          { label: "Fecha de Inicio (Próximos)", value: "date_asc" },
          { label: "Fecha de Inicio (Lejanos)", value: "date_desc" },
          { label: "Mayor Ocupación", value: "occupancy_desc" },
          { label: "Mayor Capacidad", value: "capacity_desc" },
          { label: "Nombre (A - Z)", value: "name_asc" },
        ]}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Main Container Tray */}
      <div className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
        {/* Tray Header */}
        <AdminTrayHeader
          icon={Calendar}
          title="BANDEJA DE PROGRAMAS & CONFERENCIAS"
          subtitle="> CONTROL DE CUPOS, TARIFAS Y FECHAS EN TIEMPO REAL"
          totalCount={filteredEvents.length}
          countLabel="PROGRAMAS"
          actions={
            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Vista de cuadrícula"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-cyan-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  title="Vista de tabla"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "table"
                      ? "bg-cyan-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/admin/eventos/nuevo"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Nuevo Taller</span>
              </Link>
            </div>
          }
        />

        {/* Status Tabs */}
        <AdminStatusTabs
          tabs={statusTabs}
          activeTab={typeFilter}
          onChange={(tab) => {
            setTypeFilter(tab);
            setCurrentPage(1);
          }}
          layoutId="events-type-pill"
        />

        {/* Content Area: Grid or Table */}
        <div className="p-4 sm:p-5">
          {filteredEvents.length === 0 ? (
            <AdminEmptyState
              icon={Calendar}
              title="No se encontraron programas académicos"
              description="No hay talleres ni conferencias que coincidan con la búsqueda o filtros aplicados."
              action={isFiltered ? { label: "Restablecer Filtros", onClick: handleResetFilters } : undefined}
            />
          ) : viewMode === "grid" ? (
            /* Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
              {paginatedEvents.map((event, idx) => {
                const media = getWorkshopMedia(event.slug, idx);
                const available = Math.max(0, event.maxCapacity - event._count.registrations);
                const fillPct =
                  event.maxCapacity > 0
                    ? Math.min(100, Math.round((event._count.registrations / event.maxCapacity) * 100))
                    : 0;
                const priceLabel = formatCurrency(Number(event.price), event.currency);

                return (
                  <MotionStaggerItem
                    key={event.id}
                    index={idx}
                    className="group h-full relative bg-[#070b12] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:border-cyan-500/50 transition-colors"
                  >
                    {/* Cover Banner */}
                    <div className="relative h-36 w-full bg-slate-950">
                      <div className="absolute inset-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.image}
                          alt={event.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-slate-950/35 to-transparent" />
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow-md">
                          {event.eventType}
                        </span>

                        <AdminBadge
                          variant={event.status === "OPEN" ? "open" : "closed"}
                          label={event.status}
                        />
                      </div>

                      {/* Floating Category Icon */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-4 ring-[#070b12]">
                        <Award className="w-4 h-4 text-slate-950" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 pt-6 flex-1 flex flex-col justify-between space-y-3">
                      <div className="text-center space-y-1.5">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                          {media.categoryLabel}
                        </span>
                        <h3 className="text-sm font-extrabold text-white leading-snug line-clamp-2 min-h-[40px] flex items-center justify-center group-hover:text-cyan-300 transition-colors">
                          {event.title}
                        </h3>
                      </div>

                      {/* 3 Meta Pills */}
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        <div className="p-1.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                          <Globe className="w-3 h-3 text-cyan-400 mx-auto mb-0.5" />
                          <span className="text-[10px] font-bold text-slate-200 block truncate">
                            {event.modality}
                          </span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                          <Calendar className="w-3 h-3 text-cyan-400 mx-auto mb-0.5" />
                          <span className="text-[10px] font-mono font-bold text-slate-200 block">
                            {formatShortDate(event.startDate)}
                          </span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                          <Clock className="w-3 h-3 text-cyan-400 mx-auto mb-0.5" />
                          <span className="text-[10px] font-mono font-bold text-slate-200 block">
                            {event.academicHours}h
                          </span>
                        </div>
                      </div>

                      {/* Capacity & Price */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-medium">
                            Aforo:{" "}
                            <strong className="text-cyan-400 font-mono tabular-nums">
                              {event._count.registrations}/{event.maxCapacity}
                            </strong>{" "}
                            ({available} libres)
                          </span>
                          <span className="font-mono font-black text-white text-[11px]">
                            {priceLabel}
                          </span>
                        </div>
                        <AnimatedProgressBar percentage={fillPct} />
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          title="Ver ficha técnica completa del taller"
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[10px] font-bold transition-all cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-cyan-400" />
                          <span>Ficha</span>
                        </button>
                        <Link
                          href={`/eventos/${event.slug}`}
                          target="_blank"
                          title="Ver landing pública"
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 font-bold text-[10px] uppercase transition-all"
                        >
                          <span>Landing</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <Link
                          href="/admin/asistentes"
                          title="Ver asistentes de este taller"
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[10px] font-bold transition-all"
                        >
                          <Users className="w-3 h-3 text-cyan-400" />
                          <span>Padrón</span>
                        </Link>
                      </div>
                    </div>
                  </MotionStaggerItem>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4 font-bold">Programa & Modalidad</th>
                    <th className="py-3 px-4 font-bold">Tipo & Fecha</th>
                    <th className="py-3 px-4 font-bold text-center">Aforo / Inscritos</th>
                    <th className="py-3 px-4 font-bold text-center">Tarifa</th>
                    <th className="py-3 px-4 font-bold text-center">Estado</th>
                    <th className="py-3 px-4 font-bold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {paginatedEvents.map((e, idx) => {
                    const priceLabel = formatCurrency(Number(e.price), e.currency);
                    const fillPct =
                      e.maxCapacity > 0
                        ? Math.min(100, Math.round((e._count.registrations / e.maxCapacity) * 100))
                        : 0;
                    const media = getWorkshopMedia(e.slug, idx);

                    return (
                      <tr key={e.id} className="hover:bg-slate-900/50 transition-colors group">
                        <td className="py-3 px-4 max-w-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 border border-cyan-500/30 text-white flex items-center justify-center shrink-0 shadow-sm shadow-cyan-950/40">
                              <Calendar className="w-4 h-4 text-cyan-200" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-white block truncate group-hover:text-cyan-300 transition-colors">
                                {e.title}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                                {media.categoryLabel} • {e.modality} • {e.academicHours} hrs
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 font-mono font-bold text-cyan-300 text-[11px]">
                            {e.eventType}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block mt-1">
                            {formatShortDate(e.startDate)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <span className="font-mono font-bold text-white text-xs">
                            {e._count.registrations} / {e.maxCapacity}
                          </span>
                          <div className="w-24 mx-auto mt-1.5">
                            <AnimatedProgressBar percentage={fillPct} />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap font-mono font-bold text-slate-200">
                          {priceLabel}
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <AdminBadge
                            variant={e.status === "OPEN" ? "open" : "closed"}
                            label={e.status}
                          />
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => setSelectedEvent(e)}
                              title="Ver ficha técnica"
                              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <Link
                              href={`/eventos/${e.slug}`}
                              target="_blank"
                              title="Ver landing pública"
                              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all shadow-xs"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Standardized Pagination Bar */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={effectivePageSize}
          onPageChange={setCurrentPage}
          itemLabel="programas académicos"
        />
      </div>

      {/* Standardized Workshop Detail Modal */}
      <AdminModal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title="Ficha Técnica del Programa"
        subtitle={selectedEvent?.slug ? `/eventos/${selectedEvent.slug} • Catálogo DevCon` : ""}
        icon={BookOpen}
        maxWidth="max-w-3xl"
        footer={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              {selectedEvent && (
                <>
                  <Link
                    href={`/eventos/${selectedEvent.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir Landing Pública</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleCopyLanding(selectedEvent.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    {copiedLanding ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLanding ? "Enlace Copiado" : "Copiar Enlace"}</span>
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        }
      >
        {selectedEvent && (() => {
          const occPct = selectedEvent.maxCapacity > 0
            ? Math.min(100, Math.round((selectedEvent._count.registrations / selectedEvent.maxCapacity) * 100))
            : 0;
          const seatsLeft = Math.max(0, selectedEvent.maxCapacity - selectedEvent._count.registrations);

          return (
            <div className="space-y-4">
              {/* Header Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
                      {selectedEvent.eventType}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                      {selectedEvent.modality}
                    </span>
                  </div>
                  <AdminBadge
                    variant={selectedEvent.status === "OPEN" ? "open" : "closed"}
                    label={selectedEvent.status}
                  />
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white">
                  {selectedEvent.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Capacity & Occupancy Bar */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Control de Aforo y Matrícula</span>
                  </span>
                  <span className="text-cyan-400 font-extrabold">
                    {selectedEvent._count.registrations} / {selectedEvent.maxCapacity} cupos ({occPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${occPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Asientos disponibles: <strong className="text-white">{seatsLeft} cupos</strong></span>
                  <span className="text-emerald-400 font-bold">
                    {seatsLeft === 0 ? "Aforo Completo" : "Inscripciones Abiertas"}
                  </span>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">TARIFA</span>
                  <strong className="text-emerald-300 font-mono text-sm block">
                    {formatCurrency(Number(selectedEvent.price), selectedEvent.currency)}
                  </strong>
                  <span className="text-[9px] text-slate-500 font-mono">Por participante</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">CARGA</span>
                  <strong className="text-cyan-400 font-mono text-sm block">
                    {selectedEvent.academicHours} Horas
                  </strong>
                  <span className="text-[9px] text-slate-500 font-mono">Certificables</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">INICIO</span>
                  <strong className="text-white font-mono text-xs block">
                    {formatShortDate(selectedEvent.startDate)}
                  </strong>
                  <span className="text-[9px] text-slate-500 font-mono">Fecha programada</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">DOCENTE</span>
                  <strong className="text-white font-mono text-xs block truncate">
                    {selectedEvent.speaker?.fullName || "DevCon Lead"}
                  </strong>
                  <span className="text-[9px] text-slate-500 font-mono">Instructor titular</span>
                </div>
              </div>

              {/* Syllabus / Temario */}
              {selectedEvent.syllabus && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Temario & Laboratorios Prácticos</span>
                  </span>
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-mono bg-slate-950/80 p-3 rounded-lg border border-slate-850">
                    {selectedEvent.syllabus}
                  </p>
                </div>
              )}

              {/* Requirements */}
              {selectedEvent.requirements && (
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                    Requisitos Previos del Estudiante
                  </span>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    {selectedEvent.requirements}
                  </p>
                </div>
              )}

              {/* Location / Requirements */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sede o Enlace Virtual:</span>
                </span>
                <span className="text-slate-200 font-mono font-bold truncate max-w-sm">
                  {selectedEvent.locationOrUrl || "Auditorio Central / Plataforma Privada DevCon"}
                </span>
              </div>
            </div>
          );
        })()}
      </AdminModal>

      {/* Modal de Filtros Avanzados para Talleres */}
      <AdminModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtros del Catálogo de Talleres"
        subtitle="Refina programas por tipo, modalidad y criterios de orden"
        icon={Filter}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Tipo de Programa
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "ALL", label: "Todos los Tipos" },
                { id: "WORKSHOP", label: "Talleres Prácticos" },
                { id: "CONFERENCE", label: "Conferencias" },
                { id: "BOOTCAMP", label: "Bootcamps" },
              ].map((tp) => (
                <button
                  key={tp.id}
                  type="button"
                  onClick={() => {
                    setTypeFilter(tp.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    typeFilter === tp.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span>{tp.label}</span>
                  {typeFilter === tp.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Modalidad de Cursado
            </label>
            <AdminSelect
              value={modalityFilter}
              onChange={(val) => {
                setModalityFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: "Todas las Modalidades", value: "ALL" },
                { label: "Virtual en Vivo", value: "VIRTUAL" },
                { label: "Presencial Auditorio", value: "PRESENCIAL" },
                { label: "Híbrido", value: "HIBRIDO" },
              ]}
              title="Modalidad de Cursado"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              Criterio de Ordenamiento
            </label>
            <AdminSelect
              value={sortBy}
              onChange={(val) => {
                setSortBy(val);
                setCurrentPage(1);
              }}
              options={[
                { label: "Fecha de Inicio (Próximos)", value: "date_asc" },
                { label: "Fecha de Inicio (Lejanos)", value: "date_desc" },
                { label: "Mayor Ocupación", value: "occupancy_desc" },
                { label: "Mayor Capacidad", value: "capacity_desc" },
                { label: "Nombre del Taller (A - Z)", value: "name_asc" },
              ]}
              title="Criterio de Ordenamiento"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}

