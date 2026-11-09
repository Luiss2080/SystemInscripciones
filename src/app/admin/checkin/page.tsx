import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { QRScanner } from "@/components/QRScanner";

export default async function AdminCheckinPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">
          Acreditación en el Evento
        </span>
        <h1 className="text-3xl font-extrabold text-slate-100">
          Escáner y Validación de Tickets QR
        </h1>
      </div>

      <QRScanner />
    </div>
  );
}

