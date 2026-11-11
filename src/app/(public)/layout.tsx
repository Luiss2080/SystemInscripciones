import { HeaderNav } from "@/components/layout/HeaderNav";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
      <HeaderNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
