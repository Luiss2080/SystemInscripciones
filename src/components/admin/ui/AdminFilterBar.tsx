"use client";

import React from "react";
import { Search, X, RotateCcw, Filter, ArrowUpDown, ChevronDown } from "lucide-react";

export interface FilterSelectOption {
  label: string;
  value: string;
}

export interface FilterSelectConfig {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterSelectOption[];
  icon?: React.ReactNode;
}

interface AdminFilterBarProps {
  title?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterSelectConfig[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: FilterSelectOption[];
  onReset?: () => void;
  isFiltered?: boolean;
  className?: string;
  onOpenFilterModal?: () => void;
}

export function AdminFilterBar({
  title = "FILTRAR REGISTROS",
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar por código, nombre, email o detalle...",
  filters = [],
  sortValue,
  onSortChange,
  sortOptions = [],
  onReset,
  isFiltered = false,
  className = "",
  onOpenFilterModal,
}: AdminFilterBarProps) {
  return (
    <div
      className={`rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 p-3.5 sm:p-4 shadow-lg backdrop-blur-md space-y-3 ${className}`}
    >
      {/* Top micro bar with title and active filter status */}
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
        <span className="text-slate-400 font-bold flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>{title}</span>
        </span>

        {isFiltered && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restablecer Filtros</span>
          </button>
        )}
      </div>

      {/* Inputs Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        {/* Main Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-xs text-white placeholder-slate-400 transition-all font-medium"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800 transition-colors"
              title="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic Select Filters */}
        {filters.map((filter) => (
          <div key={filter.id} className="w-full sm:w-auto min-w-[190px]">
            <div className="relative">
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="w-full appearance-none px-3.5 py-2 pr-8 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-xs text-slate-200 font-medium transition-all cursor-pointer"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}

        {/* Right action group: Sort + Dedicated Filter Modal Trigger Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {sortOptions.length > 0 && onSortChange && (
            <div className="relative flex-1 sm:w-auto sm:min-w-[170px]">
              <select
                value={sortValue || sortOptions[0]?.value}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full appearance-none px-3.5 py-2 pr-8 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-xs text-slate-200 font-medium transition-all cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
          )}

          {onOpenFilterModal && (
            <button
              type="button"
              onClick={onOpenFilterModal}
              className={`relative h-9 w-10 min-w-[40px] rounded-xl border flex items-center justify-center cursor-pointer shrink-0 transition-all shadow-xs ${
                isFiltered
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/30"
                  : "bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border-slate-700/80 hover:border-cyan-500/50"
              }`}
              title="Abrir filtros avanzados"
              aria-label="Abrir filtros avanzados"
            >
              <Filter className="w-4 h-4 stroke-[2.2]" />
              {isFiltered && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#0b0e14] animate-pulse" />
              )}
            </button>
          )}

          {isFiltered && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="h-9 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              title="Restablecer filtros"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline text-[11px]">Restablecer</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

