import React from "react";
import { LucideIcon } from "lucide-react";

interface AdminTrayHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  totalCount: number;
  countLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function AdminTrayHeader({
  icon: Icon,
  title,
  subtitle,
  totalCount,
  countLabel = "REGISTROS",
  actions,
  className = "",
}: AdminTrayHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/40 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 shadow-sm shadow-cyan-950/50">
          <Icon className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-white">
              {title}
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700/80">
              {totalCount} {countLabel}
            </span>
          </div>
          {subtitle && (
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
          {actions}
        </div>
      )}
    </div>
  );
}

