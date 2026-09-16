// app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* ─── INTEGRASI MAZE ANALYTICS (Sesuai instruksi Maze diletakkan di head) ─── */}
        <Script
          id="maze-universal-snippet"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (m, a, z, e) {
                var s, t, u, v;
                try {
                  t = m.sessionStorage.getItem('maze-us');
                } catch (err) {}

                if (!t) {
                  t = new Date().getTime();
                  try {
                    m.sessionStorage.setItem('maze-us', t);
                  } catch (err) {}
                }

                u = document.currentScript || (function () {
                  var w = document.getElementsByTagName('script');
                  return w[w.length - 1];
                })();
                v = u && u.nonce;

                s = a.createElement('script');
                s.src = z + '?apiKey=' + e;
                s.async = true;
                if (v) s.setAttribute('nonce', v);
                a.getElementsByTagName('head')[0].appendChild(s);
                m.mazeUniversalSnippetApiKey = e;
              })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', 'd4015134-5421-40fb-9363-34ed8039533e');
            `,
          }}
        />
      </head>
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