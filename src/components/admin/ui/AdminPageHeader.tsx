import React from "react";
import { LucideIcon } from "lucide-react";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";

interface AdminPageHeaderProps {
  icon: LucideIcon;
  badgeText: string;
  title: string;
  accentTitle?: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}

export function AdminPageHeader({
  icon: Icon,
  badgeText,
  title,
  accentTitle,
  description,
  actions,
  className = "",
}: AdminPageHeaderProps) {
  return (
    <MotionFadeIn
      className={`relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl ${className}`}
    >
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-black uppercase tracking-[0.18em] text-cyan-400">
            <Icon className="w-3 h-3 text-cyan-400" />
            <span>{badgeText}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {title}{" "}
            {accentTitle && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {accentTitle}
              </span>
            )}
          </h1>

          <p className="text-xs text-slate-400 font-medium max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-auto">
            {actions}
          </div>
        )}
      </div>
    </MotionFadeIn>
  );
}

