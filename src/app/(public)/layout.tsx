import { HeaderNav } from "@/components/layout/HeaderNav";
import { Footer } from "@/components/layout/Footer";
import { getPublicNavEvents } from "@/services/public/catalog.service";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navEvents = await getPublicNavEvents(3);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
      <HeaderNav navEvents={navEvents} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
