import React from "react";
import { LucideIcon } from "lucide-react";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";

export interface AdminStatCardProps {
  label: string;
  value: string | number;
  valueSuffix?: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
  subDetail?: string;
  progress?: number;
  colorVariant?: "cyan" | "emerald" | "indigo" | "amber" | "purple";
  className?: string;
}

const COLOR_VARIANTS = {
  cyan: {
    badgeBg: "bg-cyan-950/80 border-cyan-800/60 text-cyan-400",
    iconBox: "bg-cyan-950/80 border-cyan-800/60 text-cyan-400",
    valueText: "text-white",
    accentValue: "text-cyan-400",
    progressBar: "bg-gradient-to-r from-cyan-500 to-blue-500",
    glowHover: "hover:border-cyan-500/40 hover:shadow-cyan-500/5",
  },
  emerald: {
    badgeBg: "bg-emerald-950/80 border-emerald-800/60 text-emerald-400",
    iconBox: "bg-emerald-950/80 border-emerald-800/60 text-emerald-400",
    valueText: "text-emerald-400",
    accentValue: "text-emerald-400",
    progressBar: "bg-gradient-to-r from-emerald-500 to-teal-400",
    glowHover: "hover:border-emerald-500/40 hover:shadow-emerald-500/5",
  },
  indigo: {
    badgeBg: "bg-indigo-950/80 border-indigo-800/60 text-indigo-400",
    iconBox: "bg-indigo-950/80 border-indigo-800/60 text-indigo-400",
    valueText: "text-indigo-400",
    accentValue: "text-indigo-400",
    progressBar: "bg-gradient-to-r from-indigo-500 to-purple-500",
    glowHover: "hover:border-indigo-500/40 hover:shadow-indigo-500/5",
  },
  amber: {
    badgeBg: "bg-amber-950/80 border-amber-800/60 text-amber-400",
    iconBox: "bg-amber-950/80 border-amber-800/60 text-amber-400",
    valueText: "text-amber-300",
    accentValue: "text-amber-300",
    progressBar: "bg-gradient-to-r from-amber-500 to-orange-500",
    glowHover: "hover:border-amber-500/40 hover:shadow-amber-500/5",
  },
  purple: {
    badgeBg: "bg-purple-950/80 border-purple-800/60 text-purple-400",
    iconBox: "bg-purple-950/80 border-purple-800/60 text-purple-400",
    valueText: "text-purple-300",
    accentValue: "text-purple-300",
    progressBar: "bg-gradient-to-r from-purple-500 to-pink-500",
    glowHover: "hover:border-purple-500/40 hover:shadow-purple-500/5",
  },
};

export function AdminStatCard({
  label,
  value,
  valueSuffix,
  icon: Icon,
  badge,
  description,
  subDetail,
  progress,
  colorVariant = "cyan",
  className = "",
}: AdminStatCardProps) {
  const scheme = COLOR_VARIANTS[colorVariant] || COLOR_VARIANTS.cyan;

  return (
    <MotionFadeIn
      className={`relative overflow-hidden rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 p-4 shadow-md backdrop-blur-sm transition-all flex flex-col justify-between ${scheme.glowHover} ${className}`}
    >
      {/* Top Header: Badge and Icon */}
      <div className="flex items-center justify-between gap-2">
        {badge ? (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${scheme.badgeBg}`}
          >
            {badge}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
            Métrica
          </span>
        )}

        <div
          className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${scheme.iconBox}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Primary Value & Label */}
      <div className="mt-3 min-w-0">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-2xl font-black font-mono tracking-tight tabular-nums ${scheme.valueText}`}
          >
            {value}
          </span>
          {valueSuffix && (
            <span className="text-xs font-normal text-slate-400 font-mono">
              {valueSuffix}
            </span>
          )}
        </div>

        <h4 className="text-xs font-bold text-slate-200 tracking-wide mt-0.5 truncate" title={label}>
          {label}
        </h4>

        {description && (
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5 line-clamp-1" title={description}>
            {description}
          </p>
        )}
      </div>

      {/* Bottom Area: Progress Bar or SubDetail */}
      {(progress !== undefined || subDetail) && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/60">
          {progress !== undefined && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Progreso</span>
                <span className="font-bold text-slate-300">{progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800/90 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${scheme.progressBar}`}
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}

          {subDetail && !progress && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 truncate" title={subDetail}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span className="truncate">{subDetail}</span>
            </div>
          )}
        </div>
      )}
    </MotionFadeIn>
  );
}
