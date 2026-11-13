import React from "react";
import { LucideIcon, Inbox, RotateCcw } from "lucide-react";

interface AdminEmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

export function AdminEmptyState({
  icon: Icon = Inbox,
  title = "No se encontraron registros",
  description = "No hay elementos que coincidan con los criterios de búsqueda o filtros aplicados.",
  action,
  className = "",
}: AdminEmptyStateProps) {
  const ActionIcon = action?.icon || RotateCcw;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 space-y-3.5 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-inner">
        <Icon className="w-7 h-7 text-cyan-400/80 stroke-[1.5]" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-md cursor-pointer mt-1"
        >
          <ActionIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
}

