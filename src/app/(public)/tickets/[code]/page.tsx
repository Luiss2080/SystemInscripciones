import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { TicketView } from "@/components/public/credentials/TicketView";
import FondoTech from "@/components/shared/FondoTech";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TicketPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { code } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: {
      ticketCode: code,
    },
    include: {
      registration: {
        include: {
          event: true,
        },
      },
    },
  });

  if (!ticket) {
    notFound();
  }

  return (
    <div className="relative min-h-[calc(100vh-68px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#030712] text-white overflow-hidden">
      <FondoTech id="ticket" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-6 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        <TicketView ticket={ticket} />
      </div>
    </div>
  );
}
