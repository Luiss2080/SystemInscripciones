import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TicketView } from "@/components/TicketView";
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-6 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      <TicketView ticket={ticket} />
    </div>
  );
}
