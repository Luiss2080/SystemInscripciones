"use client";

import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { Search, Sparkles, Filter, Cpu } from "lucide-react";

interface EventCatalogProps {
  initialEvents: any[];
}

export function EventCatalog({ initialEvents }: EventCatalogProps) {
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = initialEvents.filter((event) => {
    const matchesType =
      selectedType === "ALL" ? true : event.eventType === selectedType;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Type tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "ALL", label: "Todos" },
            { id: "WORKSHOP", label: "Talleres Prácticos" },
            { id: "CONFERENCE", label: "Conferencias" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedType === tab.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tecnología o tema..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto">
          <Cpu className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-200 mb-2">
            No se encontraron eventos
          </h3>
          <p className="text-xs text-slate-400">
            Intenta con otro término de búsqueda o selecciona otra categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

