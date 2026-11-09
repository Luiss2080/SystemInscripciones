"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewEvent } from "@/actions/admin";
import { AdminNav } from "@/components/AdminNav";
import { PlusCircle, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <AdminNav />

      <div className="mb-6">
        <Link
          href="/admin/eventos"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a eventos</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-100">
          Programar Nuevo Taller o Conferencia
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Define el temario, cupos y modalidad para habilitar las inscripciones.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Título del Taller / Conferencia *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ej. Taller Práctico: Despliegue con Docker y CI/CD"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Slug URL (identificador) *
            </label>
            <input
              type="text"
              name="slug"
              required
              placeholder="ej. taller-docker-cicd-2026"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Tipo de Evento
            </label>
            <select
              name="eventType"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value="WORKSHOP">Taller Práctico (Hands-On)</option>
              <option value="CONFERENCE">Conferencia Magistral</option>
              <option value="BOOTCAMP">Bootcamp Intensivo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Modalidad
            </label>
            <select
              name="modality"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value="VIRTUAL">Virtual (Streaming / Meet / Zoom)</option>
              <option value="PRESENTIAL">Presencial</option>
              <option value="HYBRID">Híbrido</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Ubicación o Enlace de Conexión
            </label>
            <input
              type="text"
              name="locationOrUrl"
              placeholder="Google Meet, Zoom o Auditorio"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Fecha y Hora de Inicio *
            </label>
            <input
              type="datetime-local"
              name="startDate"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Fecha y Hora de Finalización *
            </label>
            <input
              type="datetime-local"
              name="endDate"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Aforo Máximo (Cupos) *
            </label>
            <input
              type="number"
              name="maxCapacity"
              required
              defaultValue={30}
              min={1}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Inversión (0 para Gratuito)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              defaultValue={0}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
              Carga Horaria (Horas Académicas para Certificado)
            </label>
            <input
              type="number"
              name="academicHours"
              defaultValue={4}
              min={1}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
            Descripción General *
          </label>
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Breve resumen de lo que el estudiante aprenderá..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
            Temario Detallado (Formato Markdown)
          </label>
          <textarea
            name="syllabus"
            rows={5}
            placeholder={`### Módulo 1: Introducción\n- Punto 1\n- Punto 2`}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">
            Prerrequisitos de Software / Hardware
          </label>
          <textarea
            name="requirements"
            rows={2}
            placeholder="Laptop con 8GB RAM, Node.js instalado, etc."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Guardando y publicando taller...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              <span>Publicar Taller en Catálogo</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
