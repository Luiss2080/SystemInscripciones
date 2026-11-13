"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
  className?: string;
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  itemLabel = "registros",
  className = "",
}: AdminPaginationProps) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array (with ellipsis if large)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3.5 border-t border-slate-800/80 bg-slate-900/40 text-xs text-slate-400 ${className}`}
    >
      {/* Summary Text */}
      <div className="font-mono text-center sm:text-left">
        <span>Mostrando </span>
        <strong className="text-white font-bold tabular-nums">
          {startItem} - {endItem}
        </strong>
        <span> de </span>
        <strong className="text-white font-bold tabular-nums">{totalItems}</strong>
        <span> {itemLabel}</span>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Primera página"
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (typeof p === "string") {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-slate-500 font-mono">
                  ...
                </span>
              );
            }
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-8 h-8 px-2 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Página siguiente"
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Última página"
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* Page Size Selector */}
      {onPageSizeChange && (
        <div className="flex items-center gap-2 font-mono">
          <span className="hidden lg:inline text-slate-500">Filas por pág:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size} className="bg-slate-900 text-white">
                {size} / pág
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

