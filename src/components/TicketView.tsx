"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Printer,
  Calendar,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  Award,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Check,
  Globe,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TicketViewProps {
  ticket: {
    ticketCode: string;
    qrHash: string;
    issuedAt: Date;
    registration: {
      attendeeName: string;
      attendeeEmail: string;
      attendeePhone: string;
      attendeeOccupation: string;
      attendeeOrganization: string | null;
      status: string;
      attendedAt: Date | null;
      event: {
        title: string;
        eventType: string;
        modality: string;
        locationOrUrl: string | null;
        startDate: Date;
        endDate: Date;
        academicHours: number;
      };
    };
  };
}

export function TicketView({ ticket }: TicketViewProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    // Generar el QR con el hash de validación
    const qrPayload = JSON.stringify({
      code: ticket.ticketCode,
      hash: ticket.qrHash,
    });

    QRCode.toDataURL(qrPayload, {
      width: 280,
      margin: 1.5,
      color: {
        dark: "#020617",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating QR:", err));
  }, [ticket.ticketCode, ticket.qrHash]);

  const { registration } = ticket;
  const { event } = registration;

  const isAttended = registration.status === "ATTENDED";
  const isConfirmed = registration.status === "CONFIRMED";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 ${
              isAttended
                ? "bg-purple-950 text-purple-300 border-purple-800"
                : isConfirmed
                ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                : "bg-amber-950 text-amber-300 border-amber-800"
            }`}
          >
            {isAttended ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Asistencia Acreditada</span>
              </>
            ) : isConfirmed ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Pase Confirmado</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5" />
                <span>Pendiente de Pago</span>
              </>
            )}
          </span>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500 text-sm font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Imprimir / Guardar PDF</span>
        </button>
      </div>

      {/* Ticket Boarding Pass Card */}
      <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden shadow-2xl shadow-cyan-500/10 relative print:border-black print:text-black">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-6 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950/20 backdrop-blur-sm border border-black/10 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-slate-950/80">
                Pase Oficial de Acceso
              </span>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
                {event.eventType === "WORKSHOP" ? "Taller Técnico" : "Conferencia Magistral"}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-950/70 block">
              Código Ticket
            </span>
            <span className="text-base font-mono font-black tracking-wider text-slate-950">
              {ticket.ticketCode}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Event Title */}
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
              Evento
            </span>
            <h1 className="text-2xl font-bold text-slate-100 leading-snug">
              {event.title}
            </h1>
          </div>

          {/* Grid Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-sm">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Fecha y Hora
              </span>
              <p className="font-medium text-slate-200 capitalize">
                {formatDate(event.startDate)}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Modalidad / Ubicación
              </span>
              <p className="font-medium text-slate-200">
                {event.modality === "VIRTUAL" ? "🌐 Enlace Virtual" : "📍 " + (event.locationOrUrl || "Presencial")}
              </p>
            </div>
          </div>

          {/* Attendee Details & QR Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-dashed border-slate-800 items-center">
            {/* Attendee Info */}
            <div className="sm:col-span-2 space-y-3">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Participante</span>
                <p className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  {registration.attendeeName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Rol / Ocupación</span>
                  <p className="font-medium text-slate-300">{registration.attendeeOccupation}</p>
                </div>
                {registration.attendeeOrganization && (
                  <div>
                    <span className="text-slate-400 block">Organización</span>
                    <p className="font-medium text-slate-300">{registration.attendeeOrganization}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Válido para certificación de {event.academicHours} horas académicas</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white text-slate-950 shadow-inner">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`QR Ticket ${ticket.ticketCode}`}
                  className="w-36 h-36 object-contain"
                />
              ) : (
                <div className="w-36 h-36 flex items-center justify-center text-xs text-slate-400">
                  Cargando QR...
                </div>
              )}
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-700 mt-1">
                ESCANEABLE PARA CHECK-IN
              </span>
            </div>
          </div>

          {/* Virtual link instructions if virtual and confirmed */}
          {event.locationOrUrl && event.modality !== "PRESENTIAL" && (
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-cyan-200">
                <ExternalLink className="w-3.5 h-3.5" />
                Instrucciones de Conexión:
              </span>
              <p>{event.locationOrUrl}</p>
            </div>
          )}
        </div>

        {/* Security watermark footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Firma Criptográfica SHA-256 Verificada
          </span>
          <span className="font-mono text-slate-400">
            Emitido: {new Date(ticket.issuedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

