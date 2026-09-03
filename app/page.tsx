// app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* ================= MODERN HERO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pola Grid Halus */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"></div>
        {/* Efek Glow/Cahaya Halus di Latar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-emerald-100/30 rounded-full blur-[100px]"></div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          
          {/* Logo - Dibatasi tingginya agar tidak mendorong kartu ke bawah */}
          <div className="mb-8">
            <img 
              src="/images/1.png" 
              alt="Logo SNAG Platform" 
              className="h-24 md:h-32 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
              SNAG Platform
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Smart Numeracy AI-Gamification. Mendorong batas berpikir komputasional melalui pendekatan analitik Sokratik.
            </p>
          </div>

          {/* ROLE SELECTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Kartu Portal Siswa */}
            <Link 
              href="/dashboard" 
              className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-5">
                  <span className="inline-block px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Akses Peserta Didik
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">
                  Portal Siswa
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Masuk ke jalur belajar interaktif, selesaikan tantangan logika, dan temukan cara baru memecahkan masalah.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-sky-500">
                Masuk ke Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </Link>

            {/* Kartu Portal Peneliti */}
            <Link 
              href="/analytics" 
              className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-5">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Akses Akademik
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Dasbor Peneliti
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Pantau metrik <span className="italic">Learning Analytics</span>, jejak interaksi AI, dan evaluasi performa siswa secara komprehensif.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
                Lihat Analitik <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </Link>

          </div>
        </div>
      </main>

      {/* ================= HUMBLE RESEARCHER SECTION ================= */}
      <footer className="relative z-10 bg-white border-t border-slate-200 py-10 px-6">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-3">
            Dikembangkan Oleh
          </p>
          <h3 className="text-lg font-black text-slate-800 mb-1">
            Muhamad Akda Fathul Barri
          </h3>
          <p className="text-slate-500 text-sm font-medium">
            Universitas Pendidikan Indonesia Kampus Purwakarta
          </p>
        </div>
      </footer>
      
    </div>
  );
}