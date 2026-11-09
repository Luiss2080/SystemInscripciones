import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";
import { AttendeesTable } from "@/components/AttendeesTable";

export default async function AdminAttendeesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const attendees = await prisma.registration.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      event: { select: { id: true, title: true } },
      ticket: { select: { ticketCode: true } },
    },
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AdminNav />

      <div className="mb-8">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">
          Base de Datos de Inscritos
        </span>
        <h1 className="text-3xl font-extrabold text-slate-100">
          Listado Oficial de Asistentes
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Filtra, busca, acredita manualmente o exporta a archivo CSV.
        </p>
      </div>

      <AttendeesTable initialAttendees={attendees} />
    </div>
  );
}

