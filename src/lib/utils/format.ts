import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatShortDate(date: Date | string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function formatShortTime(date: Date | string) {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(date));
}

export function formatCurrency(amount: number | string, currency = "BOB") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (num === 0) return "Gratuito";
  return `${num.toFixed(2)} ${currency}`;
}

export function formatRevenue(amount: number | string, currency = "BOB") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `${Number.isFinite(num) ? num.toFixed(2) : "0.00"} ${currency}`;
}
