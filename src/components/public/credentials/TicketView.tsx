"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Printer,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  Check,
} from "lucide-react";
import { formatDate } from "@/lib/utils/format";

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
        dark: "#030712",
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
                ? "bg-purple-950/80 text-purple-300 border-purple-800/60"
                : isConfirmed
                ? "bg-cyan-950/80 text-cyan-300 border-cyan-800/60"
                : "bg-amber-950/80 text-amber-300 border-amber-800/60"
            }`}
          >
            {isAttended ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Asistencia Acreditada</span>
              </>
            ) : isConfirmed ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pase Confirmado</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Pendiente de Pago</span>
              </>
            )}
          </span>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Printer className="w-4 h-4 stroke-[2.5]" />
          <span>Imprimir / Guardar PDF</span>
        </button>
      </div>

      {/* Ticket Boarding Pass Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 text-white overflow-hidden shadow-2xl relative print:border-black print:text-black print:bg-white backdrop-blur-xl">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 p-6 text-white border-b border-cyan-800/40 flex items-center justify-between print:bg-gray-100 print:text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shadow-md print:bg-transparent">
              <Terminal className="w-5 h-5 text-cyan-400 print:text-black" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 block uppercase font-bold print:text-gray-600">
                Pase de Acceso Oficial
              </span>
              <h2 className="text-lg font-black tracking-tight text-white print:text-black">
                DevCon Workshops 2026
              </h2>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold print:text-gray-600">
              Folio Ticket
            </span>
            <span className="font-mono text-base font-black tracking-wider text-cyan-400 print:text-black">
              {ticket.ticketCode}
            </span>
          </div>
        </div>

        {/* Ticket Body: Two sections separated by dotted line */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Event Title */}
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 uppercase tracking-wide inline-block mb-2 print:border-black print:text-black print:bg-transparent">
              {event.eventType === "WORKSHOP" ? "Taller Práctico" : "Conferencia Magistral"}
            </span>
            <h1 className="text-2xl font-black text-white leading-snug print:text-black">
              {event.title}
            </h1>
          </div>

          {/* Attendee Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs print:bg-gray-50 print:border-gray-200">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase font-bold flex items-center gap-1.5 print:text-gray-600">
                <User className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                Asistente Acreditado
              </span>
              <p className="font-black text-white text-sm print:text-black">{registration.attendeeName}</p>
              <p className="text-slate-400 print:text-gray-600">{registration.attendeeOccupation}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase font-bold flex items-center gap-1.5 print:text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                Fecha & Modalidad
              </span>
              <p className="font-bold text-white text-sm capitalize print:text-black">
                {formatDate(event.startDate)}
              </p>
              <p className="text-slate-400 print:text-gray-600">
                {event.modality === "VIRTUAL" ? "Transmisión Virtual en Vivo" : "Presencial"} •{" "}
                {event.academicHours} Horas
              </p>
            </div>
          </div>

          {/* QR Code & Scan Instructions */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t-2 border-dashed border-slate-800 print:border-gray-300">
            {/* QR Image Box */}
            <div className="p-3 bg-white rounded-2xl border-2 border-cyan-500/30 shadow-md shrink-0 flex items-center justify-center">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold print:border-black print:text-black print:bg-transparent">
                <ShieldCheck className="w-4 h-4 text-cyan-400 print:text-black" />
                <span>QR Criptográficamente Seguro</span>
              </div>
              <h4 className="text-sm font-black text-white print:text-black">
                Presenta este código al ingresar
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium print:text-gray-600">
                El docente o moderador escaneará tu código para validar tu cupo y registrar tu asistencia en tiempo real. Al finalizar se activará tu certificado digital.
              </p>
              <p className="text-[10px] font-mono text-slate-500">
                Hash: {ticket.qrHash.substring(0, 24)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
