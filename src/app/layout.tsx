import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevCon & Workshops | Talleres y Conferencias para Ingenieros",
  description:
    "Plataforma oficial de capacitación, acreditación con código QR y certificación digital para talleres y conferencias de Ingeniería de Sistemas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfcfd] text-slate-900 font-sans selection:bg-[#701121] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
