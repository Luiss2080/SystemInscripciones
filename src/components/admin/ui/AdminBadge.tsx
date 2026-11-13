import React from "react";

export type AdminBadgeVariant =
  | "confirmed"
  | "attended"
  | "pending_payment"
  | "open"
  | "closed"
  | "approved"
  | "rejected"
  | "info"
  | "neutral";

interface AdminBadgeProps {
  variant?: AdminBadgeVariant;
  label?: string;
  pulse?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BADGE_STYLES: Record<
  AdminBadgeVariant,
  { bg: string; border: string; text: string; dot: string }
> = {
  confirmed: {
    bg: "bg-emerald-950/70",
    border: "border-emerald-700/60",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  attended: {
    bg: "bg-cyan-950/70",
    border: "border-cyan-700/60",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
  },
  pending_payment: {
    bg: "bg-amber-950/70",
    border: "border-amber-700/60",
    text: "text-amber-300",
    dot: "bg-amber-400",
  },
  open: {
    bg: "bg-cyan-950/70",
    border: "border-cyan-700/60",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
  },
  closed: {
    bg: "bg-slate-800/80",
    border: "border-slate-700",
    text: "text-slate-400",
    dot: "bg-slate-500",
  },
  approved: {
    bg: "bg-emerald-950/70",
    border: "border-emerald-700/60",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  rejected: {
    bg: "bg-rose-950/70",
    border: "border-rose-700/60",
    text: "text-rose-300",
    dot: "bg-rose-400",
  },
  info: {
    bg: "bg-blue-950/70",
    border: "border-blue-700/60",
    text: "text-blue-300",
    dot: "bg-blue-400",
  },
  neutral: {
    bg: "bg-slate-900/80",
    border: "border-slate-800",
    text: "text-slate-400",
    dot: "bg-slate-500",
  },
};

export function AdminBadge({
  variant = "neutral",
  label,
  pulse = false,
  className = "",
  children,
}: AdminBadgeProps) {
  const style = BADGE_STYLES[variant] || BADGE_STYLES.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-xs ${style.bg} ${style.border} ${style.text} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${style.dot} ${
          pulse ? "animate-pulse" : ""
        }`}
      />
      <span>{label || children}</span>
    </span>
  );
}

export function getStatusBadgeVariant(status: string): AdminBadgeVariant {
  switch (status) {
    case "CONFIRMED":
      return "confirmed";
    case "ATTENDED":
      return "attended";
    case "PENDING_PAYMENT":
      return "pending_payment";
    case "OPEN":
      return "open";
    case "CLOSED":
    case "DRAFT":
      return "closed";
    case "APPROVED":
      return "approved";
    case "REJECTED":
      return "rejected";
    default:
      return "neutral";
  }
}
