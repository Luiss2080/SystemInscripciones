import { Terminal, Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="space-y-5 animate-pulse select-none">
      {/* Top Floating Sync Indicator */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Sincronizando Consola Administrativa</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <p className="text-[10px] font-mono text-slate-400">
              Cargando registros y módulos operativos en tiempo real...
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          <span>CARGANDO</span>
        </div>
      </div>

      {/* Standard Header Skeleton */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0b0e14]/90 border border-slate-800/80 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-36 rounded-full bg-slate-900" />
            <div className="h-7 w-64 rounded-xl bg-slate-900/80" />
            <div className="h-3 w-80 max-w-full rounded-md bg-slate-900/50" />
          </div>
        </div>
        <div className="h-10 w-44 rounded-xl bg-slate-900 shrink-0" />
      </div>

      {/* KPI Telemetry Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-[#0b0e14]/90 border border-slate-800/80 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-slate-900" />
              <div className="w-7 h-7 rounded-lg bg-slate-900" />
            </div>
            <div className="h-7 w-24 rounded-lg bg-slate-900" />
            <div className="h-2 w-full rounded bg-slate-900/60" />
          </div>
        ))}
      </div>

      {/* Main Tray Table Skeleton */}
      <div className="rounded-3xl bg-[#0b0e14]/90 border border-slate-800/80 p-5 space-y-4 shadow-xl">
        {/* Filter bar placeholder */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="h-10 flex-1 w-full rounded-xl bg-slate-900" />
          <div className="h-10 w-36 rounded-xl bg-slate-900 shrink-0" />
          <div className="h-10 w-36 rounded-xl bg-slate-900 shrink-0" />
        </div>

        {/* Status tabs placeholder */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
          <div className="h-8 w-24 rounded-xl bg-slate-900" />
          <div className="h-8 w-24 rounded-xl bg-slate-900" />
          <div className="h-8 w-24 rounded-xl bg-slate-900" />
        </div>

        {/* Table rows placeholder */}
        <div className="space-y-2 pt-2">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="h-12 w-full rounded-xl bg-slate-900/60 border border-slate-800/40 flex items-center px-4 justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-800" />
                <div className="h-3 w-40 rounded bg-slate-800" />
              </div>
              <div className="h-3 w-28 rounded bg-slate-800 hidden md:block" />
              <div className="h-5 w-20 rounded-full bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
