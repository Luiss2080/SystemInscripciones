"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAttendee } from "@/actions/registration";
import { CheckCircle2, AlertCircle, Loader2, Ticket, ArrowRight, User, Mail, Phone, Briefcase, Building, Info } from "lucide-react";
import confetti from "canvas-confetti";

interface RegistrationFormProps {
  eventId: string;
  eventTitle: string;
  price: number;
  currency: string;
  isSoldOut: boolean;
}

export function RegistrationForm({
  eventId,
  eventTitle,
  price,
  currency,
  isSoldOut,
}: RegistrationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [registeredTicketCode, setRegisteredTicketCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    attendeeName: "",
    attendeeEmail: "",
    attendeePhone: "",
    attendeeOccupation: "",
    attendeeOrganization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[e.target.name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSoldOut) return;

    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const res = await registerAttendee({
        eventId,
        fullName: formData.attendeeName,
        email: formData.attendeeEmail,
        phone: formData.attendeePhone,
        occupation: formData.attendeeOccupation,
        organization: formData.attendeeOrganization || undefined,
      });

      if (!res.success) {
        if (res.errors) {
          setFieldErrors(res.errors);
        } else {
          setErrorMsg(res.message || "Error al procesar el registro");
        }
        return;
      }

      if (res.ticketCode) {
        setRegisteredTicketCode(res.ticketCode);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    } catch {
      setErrorMsg("Ocurrió un error inesperado de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (isSoldOut) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center border border-rose-800/60 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-800/60 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6 text-rose-400" />
        </div>
        <h3 className="text-xl font-black text-white mb-2">Cupos Agotados</h3>
        <p className="text-sm text-slate-400">
          Lo sentimos, se ha alcanzado la capacidad máxima para este taller.
        </p>
      </div>
    );
  }

  if (registeredTicketCode) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center border border-emerald-800/60 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">¡Inscripción Exitosa!</h3>
        <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
          Tu registro para <strong className="text-white">{eventTitle}</strong> ha sido confirmado. Hemos generado tu pase digital con código QR de acceso.
        </p>

        <div className="bg-slate-950 rounded-xl p-4 border border-cyan-800/60 max-w-sm mx-auto mb-6">
          <span className="text-xs text-slate-400 block mb-1 uppercase tracking-wider font-bold">Código de Ticket</span>
          <span className="text-xl font-mono font-black text-cyan-400 tracking-wider">
            {registeredTicketCode}
          </span>
        </div>

        <button
          onClick={() => router.push(`/tickets/${registeredTicketCode}`)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02] cursor-pointer"
        >
          <Ticket className="w-5 h-5" />
          <span>Ver Mi Ticket y Pase QR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/95 rounded-2xl p-6 sm:p-8 relative border border-slate-800 shadow-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-black text-white mb-1">Formulario de Registro</h3>
        <p className="text-xs text-slate-400 font-medium">
          Completa tus datos para emitir tu pase oficial y acreditación.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Nombre Completo *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="attendeeName"
              required
              value={formData.attendeeName}
              onChange={handleChange}
              placeholder="Ej. Ing. Juan Pérez"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
            />
          </div>
          {fieldErrors.attendeeName && (
            <p className="text-xs text-rose-400 mt-1">{fieldErrors.attendeeName[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Correo Electrónico *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="attendeeEmail"
              required
              value={formData.attendeeEmail}
              onChange={handleChange}
              placeholder="tu.correo@ejemplo.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
            />
          </div>
          {fieldErrors.attendeeEmail && (
            <p className="text-xs text-rose-400 mt-1">{fieldErrors.attendeeEmail[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Teléfono / WhatsApp *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              name="attendeePhone"
              required
              value={formData.attendeePhone}
              onChange={handleChange}
              placeholder="+591 71234567"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
            />
          </div>
          {fieldErrors.attendeePhone && (
            <p className="text-xs text-rose-400 mt-1">{fieldErrors.attendeePhone[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Rol / Profesión *
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="attendeeOccupation"
                required
                value={formData.attendeeOccupation}
                onChange={handleChange}
                placeholder="Estudiante, Dev, etc."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
            </div>
            {fieldErrors.attendeeOccupation && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.attendeeOccupation[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Empresa / Universidad
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="attendeeOrganization"
                value={formData.attendeeOrganization}
                onChange={handleChange}
                placeholder="Opcional"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
            </div>
          </div>
        </div>

        {price > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>
              Este taller tiene un costo de <strong className="text-white">{price.toFixed(2)} {currency}</strong>. Al enviar el formulario, tu ticket quedará pre-registrado y te indicaremos las opciones para validar tu transferencia.
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generando Pase y Ticket QR...</span>
            </>
          ) : (
            <>
              <Ticket className="w-5 h-5" />
              <span>Confirmar Inscripción ({price === 0 ? "Gratis" : `${price.toFixed(2)} ${currency}`})</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
