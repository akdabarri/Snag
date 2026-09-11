// app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    /* KUNCI MUTLAK LAYAR (fixed inset-0) AGAR TIDAK BISA SCROLL */
    <div className="fixed inset-0 flex flex-col bg-[#E0F4FF] font-sans selection:bg-sky-200 selection:text-sky-900 overflow-hidden">
      
      {/* ================= BACKGROUND IMAGE (MEMENUHI LAYAR 100%) ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        {/* Gambar background akan melar menutupi seluruh layar (object-cover) */}
        <img 
          src="/images/bg-landing.webp" 
          alt="Pemandangan Alam" 
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Gradien putih halus di bagian bawah agar kartu lebih terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 -z-10"></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      {/* Menggunakan flex-1 agar mengambil sisa ruang yang ada di antara atas dan kartu */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center min-h-0 gap-4 lg:gap-12 pt-4 md:pt-8">
        
        {/* Teks Kiri */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 z-20">
          {/* Menambahkan kelas 'text-outline' agar teks tidak nyaru */}
          <h1 className="text-outline text-4xl md:text-5xl lg:text-[4rem] font-black text-[#1E293B] leading-[1.1] mb-4 tracking-tight">
            Belajar Matematika<br/>
            Jadi Lebih <span className="relative inline-block text-amber-500">
              Seru!
              <svg className="absolute w-full h-3 md:h-4 -bottom-1 left-0 text-amber-400 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-[#475569] text-sm md:text-base lg:text-lg font-bold max-w-lg leading-relaxed bg-white/60 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/50 shadow-sm mt-2">
            Petualangan numerasi cerdas dengan AI, untuk melatih logika dan kemampuan berpikir secara menyenangkan.
          </p>
        </div>

        {/* Gambar Logo SNAG Kanan (Digeser ke kiri menggunakan pr-12 dan xl:pr-24) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center flex-1 min-h-0 lg:pr-12 xl:pr-24 z-10">
          <img 
            src="/images/1.png" 
            alt="Logo SNAG" 
            className="w-auto h-[25vh] md:h-[40vh] lg:h-[55vh] scale-110 lg:scale-125 object-contain drop-shadow-2xl animate-[breathe_4s_ease-in-out_infinite]" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </main>

      {/* ================= CARDS SECTION ================= */}
      {/* Menggunakan shrink-0 agar tidak menyusut, posisinya tepat di atas footer */}
      <section className="relative z-30 w-full px-4 lg:px-12 flex justify-center pb-4 md:pb-6 shrink-0">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl p-3 md:p-5 lg:p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[3px] border-white flex flex-col md:flex-row gap-3 md:gap-5">
          
          {/* Kartu Portal Siswa */}
          <div className="flex-1 bg-[#F0F8FF] rounded-[1.5rem] p-5 flex flex-col relative overflow-hidden group border border-[#D6EFFF]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="flex items-start gap-3 mb-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-black text-[#1E3A8A] mb-1 truncate">Portal Siswa</h2>
                <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed pr-8 md:pr-12">
                  Masuk ke jalur belajar interaktif, selesaikan tantangan logika, dan pecahkan masalah.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 relative z-10">
              <Link href="/beranda" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-full transition-colors shadow-md shadow-sky-500/20 active:scale-95">
                Mulai Petualangan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <img 
               src="/images/icon-books-3d.webp" 
               alt="Buku" 
               className="absolute bottom-2 right-2 w-20 md:w-28 h-auto drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
               onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>

          {/* Kartu Dasbor Peneliti */}
          <div className="flex-1 bg-[#F0FDF4] rounded-[1.5rem] p-5 flex flex-col relative overflow-hidden group border border-[#DCFCE7]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="flex items-start gap-3 mb-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-black text-[#064E3B] mb-1 truncate">Dasbor Peneliti</h2>
                <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed pr-8 md:pr-12">
                  Pantau metrik <span className="italic">Learning Analytics</span>, dan evaluasi performa siswa komprehensif.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 relative z-10">
              <Link href="/analytics" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-full transition-colors shadow-md shadow-emerald-500/20 active:scale-95">
                Lihat Analitik <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <img 
               src="/images/icon-chart-3d.webp" 
               alt="Analitik" 
               className="absolute bottom-2 right-2 w-20 md:w-28 h-auto drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
               onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>

        </div>
      </section>

      {/* ================= HUMBLE RESEARCHER SECTION (SANGAT TIPIS) ================= */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-md border-t border-white py-2 px-6 shrink-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-wide">
            Tim Riset Kolaborasi UPI Kampus Purwakarta
          </span>
        </div>
        <p className="text-slate-400 text-[10px] md:text-xs font-medium tracking-wide">
          — made by akda barri —
        </p>
      </footer>
      
      {/* Animasi & Text Stroke */}
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Kelas khusus untuk memberikan Outline (Stroke) tebal pada teks agar tidak nyaru */
        .text-outline {
          text-shadow: 
            -2px -2px 0 #FFF,
             2px -2px 0 #FFF,
            -2px  2px 0 #FFF,
             2px  2px 0 #FFF,
            -2px  0   0 #FFF,
             2px  0   0 #FFF,
             0   -2px 0 #FFF,
             0    2px 0 #FFF,
             0    6px 15px rgba(0,0,0,0.15);
        }

        @media (min-width: 768px) {
          .text-outline {
            text-shadow: 
              -3px -3px 0 #FFF,
               3px -3px 0 #FFF,
              -3px  3px 0 #FFF,
               3px  3px 0 #FFF,
              -3px  0   0 #FFF,
               3px  0   0 #FFF,
               0   -3px 0 #FFF,
               0    3px 0 #FFF,
               0    8px 20px rgba(0,0,0,0.15);
          }
        }
      `}</style>
    </div>
  );
}