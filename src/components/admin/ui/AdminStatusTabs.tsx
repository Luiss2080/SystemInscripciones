"use client";

import React from "react";
import { motion } from "framer-motion";

export interface StatusTabItem {
  id: string;
  label: string;
  count?: number;
  badgeVariant?: "default" | "success" | "warning" | "cyan";
}

interface AdminStatusTabsProps {
  tabs: StatusTabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  layoutId?: string;
  rightActions?: React.ReactNode;
  className?: string;
}

export function AdminStatusTabs({
  tabs,
  activeTab,
  onChange,
  layoutId = "admin-status-tab",
  rightActions,
  className = "",
}: AdminStatusTabsProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-950/30 overflow-x-auto ${className}`}
    >
      {/* Scrollable pill container */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer z-10 ${
                isActive
                  ? "text-slate-950 font-black"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/25 -z-10"
                />
              )}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black tabular-nums ${
                    isActive
                      ? "bg-slate-950/20 text-slate-950"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right utilities (e.g. Export CSV, Refresh) */}
      {rightActions && (
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {rightActions}
        </div>
      )}
    </div>
  );
}

