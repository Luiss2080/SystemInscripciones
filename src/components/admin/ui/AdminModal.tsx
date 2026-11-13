"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LucideIcon } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-xl", "max-w-2xl"
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  children,
  footer,
  maxWidth = "max-w-xl",
}: AdminModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={`w-full ${maxWidth} rounded-2xl bg-[#0b0e14] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs font-mono text-slate-400">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-300">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-900/40 flex items-center justify-end gap-2.5">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
