import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// ─── Konfigurasi Font Ramah Anak ──────────────────────────────────────────────
// Menggunakan Nunito yang memiliki karakteristik bulat, hangat, dan sangat 
// nyaman dibaca oleh anak usia SD (mengurangi extraneous cognitive load).
const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], 
  variable: "--font-nunito",
});

// ─── Metadata Aplikasi ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "SNAG | Smart Numeracy AI-Gamification",
  description: "Platform adaptif berbasis AI dan gamifikasi untuk pembelajaran numerasi sekolah dasar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning mencegah error dari ekstensi browser (seperti AdBlock/Grammarly)
    // lang="id" untuk optimalisasi aksesibilitas (Screen Reader) bahasa Indonesia
    <html lang="id" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-slate-50 antialiased",
          nunito.className // Menyuntikkan font Nunito secara global ke seluruh elemen
        )}
      >
        {children}
      </body>
    </html>
  );
}