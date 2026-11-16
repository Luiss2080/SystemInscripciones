"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface AdminSelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: AdminSelectOption[];
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  menuClassName?: string;
  id?: string;
  title?: string;
}

export function AdminSelect({
  value,
  onChange,
  options,
  icon,
  placeholder = "Seleccionar opción...",
  className = "",
  menuClassName = "",
  id,
  title,
}: AdminSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        title={title || selectedOption?.label}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-9 flex items-center justify-between gap-2.5 px-3.5 rounded-xl bg-slate-900/90 border transition-all cursor-pointer text-xs font-medium ${
          isOpen
            ? "border-cyan-500 ring-1 ring-cyan-500/30 text-white bg-slate-800/90 shadow-md shadow-cyan-950/40"
            : "border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          <span className="truncate block font-medium">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </button>

      {/* Floating Cyber Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-full left-0 right-0 sm:right-auto sm:min-w-[220px] mt-1.5 z-50 p-1.5 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-xl ${menuClassName}`}
            style={{ backgroundColor: "#0d1424" }}
          >
            {/* Top Pointer Accent */}
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-5 w-3 h-3 rotate-45 border-t border-l border-slate-700 pointer-events-none"
              style={{ backgroundColor: "#0d1424" }}
            />

            <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer font-medium ${
                      isSelected
                        ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {option.icon && (
                        <span
                          className={`shrink-0 ${
                            isSelected ? "text-cyan-400" : "text-slate-400"
                          }`}
                        >
                          {option.icon}
                        </span>
                      )}
                      <span className="truncate">{option.label}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
