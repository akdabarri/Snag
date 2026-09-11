// app/introduction/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, Loader2, CheckCircle2, ArrowRight, Gamepad2, Star, Target } from "lucide-react";
import { supabase } from "@/lib/supabase";

// 10 Soal: 3 Beginner, 4 Intermediate, 3 Advanced
const QUESTIONS = [
  // Beginner (0-2)
  { q: "4 apel dibagi 2 teman, berapa apel yang didapat tiap teman?", options: ["1 Apel", "2 Apel", "4 Apel"], correct: 1 },
  { q: "Jika 8 kelereng disimpan dalam 4 kotak, berapa isi tiap kotak?", options: ["2 Kelereng", "3 Kelereng", "4 Kelereng"], correct: 0 },
  { q: "10 koin ajaib dibagi menjadi 2 baris sama rata. Ada berapa koin per baris?", options: ["4 Koin", "5 Koin", "6 Koin"], correct: 1 },
  // Intermediate (3-6)
  { q: "Ada 12 potongan pizza untuk 3 teman. Berapa potong untuk masing-masing?", options: ["3 Potong", "4 Potong", "6 Potong"], correct: 1 },
  { q: "Kamu punya 20 kue kering yang akan dibagikan ke 4 anak. Berapa bagiannya?", options: ["4 Kue", "5 Kue", "6 Kue"], correct: 1 },
  { q: "15 stiker bintang dibagikan kepada 5 murid dengan adil. Berapa stiker tiap murid?", options: ["2 Stiker", "3 Stiker", "5 Stiker"], correct: 1 },
  { q: "Bus membawa 15 siswa. Di halte, 5 siswa turun. Berapa sisa siswa di bus?", options: ["5 Siswa", "10 Siswa", "15 Siswa"], correct: 1 },
  // Advanced (7-9)
  { q: "Kamu punya 10 pensil, lalu diberikan ke adik 2 buah. Berapa sisanya?", options: ["8 Pensil", "10 Pensil", "12 Pensil"], correct: 0 },
  { q: "Ada 14 burung hinggap di 2 dahan sama rata. Berapa burung di dahan pertama?", options: ["6 Burung", "7 Burung", "8 Burung"], correct: 1 },
  { q: "Tebak pola rahasia ini: 2, 4, 6, ... Angka berapakah selanjutnya?", options: ["Angka 7", "Angka 8", "Angka 9"], correct: 1 },
];

export default function IntroductionPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"welcome" | "test" | "result" | "loading" | "done">("welcome");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState("Ksatria");

  useEffect(() => {
    // Ambil nama untuk sapaan
    const name = localStorage.getItem("snag_user_name");
    if (name) setStudentName(name.split(" ")[0]); // Ambil nama panggilan
  }, []);

  const handleSelect = (idx: number) => {
    if (idx === QUESTIONS[current].correct) setScore(s => s + 1);
    
    if (current < QUESTIONS.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setStage("result");
    }
  };

  const finishTest = async () => {
    setStage("loading");
    
    // 1. HITUNG LOGIKA ADAPTIF
    let startingUnit = 1;
    if (score >= 9) startingUnit = 3;
    else if (score >= 6) startingUnit = 2;

    // 2. SIMPAN KE SUPABASE (Hanya update kolom yang benar-benar ada di database)
    const studentId = localStorage.getItem("snag_user_id");
    try {
      if (studentId) {
        const { error } = await supabase
          .from("students")
          .update({ 
            current_unit: startingUnit
            // Baris 'completed_levels' DIHAPUS agar tidak memicu error PGRST204
          })
          .eq("id", studentId);

        if (error) throw error;
      }
    } catch (err) {
      console.error("Gagal menyimpan hasil diagnostik ke Supabase:", err);
    }

    // 3. SIMPAN LOKAL & TRANSISE LAYAR
    localStorage.setItem("snag_starting_unit", startingUnit.toString());
    localStorage.setItem("snag_diagnostic_score", score.toString());
    
    // Inisiasi progress buatan di LocalStorage agar sistem tahu intro beres
    localStorage.setItem("snag_completed_levels", JSON.stringify(["intro_done"]));
    
    setStage("done");
    
    // ARAHKAN KE RUTE YANG BENAR (BERANDA)
    setTimeout(() => router.replace("/beranda"), 1800);
  };

  return (
    <div className="min-h-screen bg-sky-50/50 flex items-center justify-center p-6 font-sans relative overflow-hidden selection:bg-sky-200">
      
      {/* ── LATAR BELAKANG ESTETIK ───────────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      {/* ── STAGE 1: WELCOME ─────────────────────────────────────────────── */}
      {stage === "welcome" && (
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-sky-900/10 text-center animate-in zoom-in-95 duration-500 relative z-10 border-2 border-white">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-sky-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
               <img src="/images/mascot-happy.webp" alt="Maskot SNAG" className="w-20 h-20 object-contain drop-shadow-md animate-bounce" onError={(e) => { e.currentTarget.src = "/images/1.png"; }} />
            </div>
          </div>
          
          <div className="mt-10 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Misi Pemetaan
            </span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Halo, {studentName}!</h1>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            Sebelum kita berpetualang, ayo pemanasan otak dulu! Jawab 10 teka-teki logika ini agar sistem tahu tingkat kehebatanmu.
          </p>
          
          <button onClick={() => setStage("test")} className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 shadow-md hover:shadow-lg">
            <Gamepad2 className="w-6 h-6" /> Mulai Pemanasan!
          </button>
        </div>
      )}

      {/* ── STAGE 2: TEST ARENA ──────────────────────────────────────────── */}
      {stage === "test" && (
        <div className="max-w-xl w-full animate-in slide-in-from-right-8 duration-500 relative z-10">
          
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
               <Target className="w-5 h-5 text-sky-500" />
               <span className="font-black text-sky-700">Soal {current + 1} / 10</span>
            </div>
            <div className="text-sm font-bold text-slate-400">Pemanasan Kognitif</div>
          </div>

          <div className="mb-8 w-full bg-white/50 border border-white h-3 rounded-full overflow-hidden shadow-inner p-0.5">
            <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-500 ease-out relative" style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}>
               <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]" />
            </div>
          </div>

          {/* Kartu Pertanyaan */}
          <div className="bg-white p-8 sm:p-10 rounded-[2rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 mb-6 text-center relative">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">{QUESTIONS[current].q}</h2>
          </div>

          {/* Opsi Jawaban (Gamified Buttons) */}
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[current].options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleSelect(i)} 
                className="w-full p-5 rounded-2xl border-2 border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-300 font-bold text-slate-700 text-lg transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-sm hover:shadow-md flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-black">
                  {String.fromCharCode(65 + i)}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STAGE 3: RESULT ──────────────────────────────────────────────── */}
      {stage === "result" && (
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 text-center animate-in zoom-in-95 duration-500 relative z-10 border-2 border-white">
          
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star) => (
              <Star key={star} className={`w-12 h-12 ${score >= star * 3 ? 'text-amber-400 fill-amber-400 animate-bounce' : 'text-slate-200 fill-slate-200'} drop-shadow-md`} style={{ animationDelay: `${star * 150}ms` }} />
            ))}
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">Analisis Selesai!</h2>
          <p className="text-slate-600 font-medium mb-6 leading-relaxed">
            Hebat sekali! Kamu berhasil menjawab <span className="font-black text-emerald-600 text-xl px-1">{score} dari 10</span> teka-teki logika dengan sempurna.
          </p>
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-sm font-bold text-slate-600">
            Sistem SNAG telah merekam pola berpikirmu dan menyusun peta petualangan yang paling cocok untukmu!
          </div>

          <button onClick={finishTest} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-md hover:shadow-lg">
            Buka Peta Petualangan <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* ── STAGE 4: LOADING / SAVING ────────────────────────────────────── */}
      {stage === "loading" && (
        <div className="text-center animate-in fade-in duration-500 relative z-10 bg-white/90 p-10 rounded-[3rem] shadow-2xl border-2 border-white">
          <Loader2 className="w-20 h-20 text-sky-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-800 mb-2">Membuat Peta...</h2>
          <p className="text-slate-500 font-semibold text-sm">Menyinkronkan data kognitif ke server</p>
        </div>
      )}

      {/* ── STAGE 5: DONE ────────────────────────────────────────────────── */}
      {stage === "done" && (
        <div className="text-center animate-in zoom-in duration-500 relative z-10 bg-white/90 p-10 rounded-[3rem] shadow-2xl border-2 border-white">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-emerald-600 tracking-tight">Sukses!</h2>
        </div>
      )}

      {/* Animasi Shimmer untuk Progress Bar */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { background-position: 1rem 0; }
        }
      `}</style>

    </div>
  );
}