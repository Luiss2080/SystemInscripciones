"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewEvent } from "@/actions/admin/events";
import { MotionFadeIn } from "@/components/shared/MotionPrimitives";
import {
  PlusCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Terminal,
  Calendar,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

function slugifyTitle(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

const INPUT_CLASS =
  "w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors";

const LABEL_CLASS =
  "block text-[10px] font-mono font-bold text-slate-300 mb-1 uppercase tracking-wider";

export function NewEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [slugEditedManually, setSlugEditedManually] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!slugEditedManually) {
      setSlug(slugifyTitle(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await createNewEvent(formData);

    if (!res.success) {
      setErrorMsg(res.message || "Error al crear el evento.");
      setLoading(false);
      return;
    }

    router.push("/admin/eventos");
    router.refresh();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <MotionFadeIn className="relative overflow-hidden rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <Link
              href="/admin/eventos"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Catálogo</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Programar Nuevo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Taller o Conferencia
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Define temario, cupos y modalidad para habilitar registro QR automático en PostgreSQL.
            </p>
          </div>
        </div>
      </MotionFadeIn>

      {errorMsg && (
        <MotionFadeIn className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </MotionFadeIn>
      )}

      <MotionFadeIn delay={0.08}>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#0b0e14]/95 border border-slate-800/80 p-4 sm:p-6 space-y-5 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800/80">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <h2 className="text-[11px] font-mono font-black uppercase tracking-widest text-cyan-400">
                1. Información Principal
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2 lg:col-span-2">
                <label className={LABEL_CLASS}>Título del Taller / Conferencia *</label>
                <input
                  type="text"
                  name="title"
                  required
                  onChange={handleTitleChange}
                  placeholder="Ej. Taller Práctico: Despliegue con Docker y CI/CD"
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className={LABEL_CLASS}>Slug URL *</label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugEditedManually(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="taller-docker-cicd-2026"
                  className={`${INPUT_CLASS} font-mono text-xs`}
                />
              </div>

              <div>
                <label className={LABEL_CLASS}>Tipo de Evento</label>
                <select name="eventType" className={INPUT_CLASS}>
                  <option value="WORKSHOP">Taller Práctico (Hands-On)</option>
                  <option value="CONFERENCE">Conferencia Magistral</option>
                  <option value="BOOTCAMP">Bootcamp Intensivo</option>
                </select>
              </div>

              <div>
                <label className={LABEL_CLASS}>Modalidad</label>
                <select name="modality" className={INPUT_CLASS}>
                  <option value="VIRTUAL">Virtual (Meet / Zoom)</option>
                  <option value="PRESENTIAL">Presencial</option>
                  <option value="HYBRID">Híbrido</option>
                </select>
              </div>

              <div>
                <label className={LABEL_CLASS}>Ubicación o Enlace</label>
                <input
                  type="text"
                  name="locationOrUrl"
                  placeholder="Google Meet o Auditorio"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800/80">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <h2 className="text-[11px] font-mono font-black uppercase tracking-widest text-cyan-400">
                2. Agenda, Cupos & Inversión
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              <div>
                <label className={LABEL_CLASS}>Inicio *</label>
                <input type="datetime-local" name="startDate" required className={INPUT_CLASS} />
              </div>

              <div>
                <label className={LABEL_CLASS}>Fin *</label>
                <input type="datetime-local" name="endDate" required className={INPUT_CLASS} />
              </div>

              <div>
                <label className={LABEL_CLASS}>Horas Lectivas</label>
                <input
                  type="number"
                  name="academicHours"
                  defaultValue={4}
                  min={1}
                  className={`${INPUT_CLASS} font-mono`}
                />
              </div>

              <div>
                <label className={LABEL_CLASS}>Aforo Máximo *</label>
                <input
                  type="number"
                  name="maxCapacity"
                  required
                  defaultValue={30}
                  min={1}
                  className={`${INPUT_CLASS} font-mono`}
                />
              </div>

              <div>
                <label className={LABEL_CLASS}>Inversión BOB</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={0}
                  className={`${INPUT_CLASS} font-mono`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800/80">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <h2 className="text-[11px] font-mono font-black uppercase tracking-widest text-cyan-400">
                3. Contenido Académico
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
              <div>
                <label className={LABEL_CLASS}>Descripción General *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Resumen técnico de objetivos y arquitectura..."
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className={LABEL_CLASS}>Temario Detallado (Markdown)</label>
                <textarea
                  name="syllabus"
                  rows={4}
                  placeholder={`### Módulo 1: Arquitectura\n- Contenedores Multi-Stage\n- Orquestación`}
                  className={`${INPUT_CLASS} font-mono text-xs`}
                />
              </div>

              <div>
                <label className={LABEL_CLASS}>Prerrequisitos</label>
                <textarea
                  name="requirements"
                  rows={4}
                  placeholder="Laptop 8GB RAM, Docker Desktop y Node.js 20+..."
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando y publicando taller...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Publicar Taller en Catálogo</span>
              </>
            )}
          </button>
        </form>
      </MotionFadeIn>
    </div>
  );
}
