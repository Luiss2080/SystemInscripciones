"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Printer,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Award,
  Terminal,
  CheckCircle2,
  Check,
  Globe,
  MapPin,
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
        dark: "#0f172a",
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
                ? "bg-purple-50 text-purple-800 border-purple-200"
                : isConfirmed
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {isAttended ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Asistencia Acreditada</span>
              </>
            ) : isConfirmed ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pase Confirmado</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Pendiente de Pago</span>
              </>
            )}
          </span>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8b1524] hover:bg-[#72101c] text-white text-sm font-bold transition-all shadow-md cursor-pointer"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>Imprimir / Guardar PDF</span>
        </button>
      </div>

      {/* Ticket Boarding Pass Card */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xl relative print:border-black print:text-black">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-r from-[#6b111a] via-[#851623] to-[#540c14] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-mono tracking-widest text-rose-200 block uppercase font-bold">
                Pase de Acceso Oficial
              </span>
              <h2 className="text-lg font-black tracking-tight text-white">
                DevCon Workshops 2026
              </h2>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-rose-200 block font-bold">
              Folio Ticket
            </span>
            <span className="font-mono text-base font-black tracking-wider text-amber-300">
              {ticket.ticketCode}
            </span>
          </div>
        </div>

        {/* Ticket Body: Two sections separated by dotted line */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Event Title */}
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#8b1524] border border-rose-200 uppercase tracking-wide inline-block mb-2">
              {event.eventType === "WORKSHOP" ? "Taller Práctico" : "Conferencia Magistral"}
            </span>
            <h1 className="text-2xl font-black text-slate-900 leading-snug">
              {event.title}
            </h1>
          </div>

          {/* Attendee Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 uppercase font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#8b1524]" />
                Asistente Acreditado
              </span>
              <p className="font-black text-slate-900 text-sm">{registration.attendeeName}</p>
              <p className="text-slate-500">{registration.attendeeOccupation}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 uppercase font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8b1524]" />
                Fecha & Modalidad
              </span>
              <p className="font-bold text-slate-900 text-sm capitalize">
                {formatDate(event.startDate)}
              </p>
              <p className="text-slate-500">
                {event.modality === "VIRTUAL" ? "Transmisión Virtual en Vivo" : "Presencial"} •{" "}
                {event.academicHours} Horas
              </p>
            </div>
          </div>

          {/* QR Code & Scan Instructions */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t-2 border-dashed border-slate-200">
            {/* QR Image Box */}
            <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-md shrink-0 flex items-center justify-center">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`QR Ticket ${ticket.ticketCode}`}
                  className="w-40 h-40 object-contain"
                />
              ) : (
                <div className="w-40 h-40 bg-slate-100 animate-pulse rounded-xl" />
              )}
            </div>

            {/* Verification Instructions */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>QR Criptográficamente Seguro</span>
              </div>
              <h4 className="text-sm font-black text-slate-900">
                Presenta este código al ingresar
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                El docente o moderador escaneará tu código para validar tu cupo y registrar tu asistencia en tiempo real. Al finalizar se activará tu certificado digital.
              </p>
              <p className="text-[10px] font-mono text-slate-400">
                Hash: {ticket.qrHash.substring(0, 24)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
