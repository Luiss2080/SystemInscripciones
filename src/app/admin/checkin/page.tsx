import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { QRScanner } from "@/components/QRScanner";

export default async function AdminCheckinPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AdminNav />

      <div className="mb-8">
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

