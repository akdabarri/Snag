// app/introduction/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

// 10 Soal: 3 Beginner, 4 Intermediate, 3 Advanced
const QUESTIONS = [
  // Beginner (0-2)
  { q: "4 apel dibagi 2 teman, berapa tiap teman?", options: ["1", "2", "4"], correct: 1 },
  { q: "8 kelereng dibagi 4 kotak, isi tiap kotak?", options: ["2", "3", "4"], correct: 0 },
  { q: "10 koin dibagi 2 baris sama rata?", options: ["4", "5", "6"], correct: 1 },
  // Intermediate (3-6)
  { q: "12 pizza dibagi 3 teman?", options: ["3", "4", "6"], correct: 1 },
  { q: "20 kue untuk 4 anak?", options: ["4", "5", "6"], correct: 1 },
  { q: "15 stiker untuk 5 murid?", options: ["2", "3", "5"], correct: 1 },
  { q: "Ada 15 siswa, 5 turun dari bus. Sisa?", options: ["5", "10", "15"], correct: 1 },
  // Advanced (7-9)
  { q: "10 pensil, dikasih ke adik 2. Sisa?", options: ["8", "10", "12"], correct: 0 },
  { q: "14 burung di 2 dahan sama rata. Dahan pertama?", options: ["6", "7", "8"], correct: 1 },
  { q: "Pola: 2, 4, 6, ...?", options: ["7", "8", "9"], correct: 1 },
];

export default function IntroductionPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"welcome" | "test" | "result" | "loading" | "done">("welcome");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

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
    
    // 1. HITUNG LOGIKA ADAPTIF ANDA
    let startingUnit = 1;
    if (score >= 9) startingUnit = 3;
    else if (score >= 6) startingUnit = 2;

    // 2. AMBIL ID SISWA YANG SEDANG LOGIN
    const studentId = localStorage.getItem("snag_user_id");

    try {
      if (studentId) {
        // Amankan data skor diagnostik awal langsung ke Supabase students Anda
        const { error } = await supabase
          .from("students")
          .update({ 
            current_unit: startingUnit 
          })
          .eq("id", studentId);

        if (error) throw error;
      }
    } catch (err) {
      console.error("Gagal menyimpan hasil diagnostik ke Supabase:", err);
    }

    // 3. SIMPAN FALLBACK LOKAL & TRANSISE LAYAR
    localStorage.setItem("snag_starting_unit", startingUnit.toString());
    localStorage.setItem("snag_diagnostic_score", score.toString());
    
    setStage("done");
    setTimeout(() => router.push("/dashboard"), 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      {stage === "welcome" && (
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center animate-in zoom-in duration-500">
          <Brain className="w-16 h-16 text-sky-400 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-slate-800 mb-4">Tes Penempatan</h1>
          <p className="text-slate-600 mb-8">Jawab 10 soal ini agar sistem tahu di mana kamu harus memulai petualangan!</p>
          <button onClick={() => setStage("test")} className="w-full py-4 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600">Mulai Tes</button>
        </div>
      )}

      {stage === "test" && (
        <div className="max-w-lg w-full animate-in slide-in-from-right duration-500">
          <div className="mb-6 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${(current / QUESTIONS.length) * 100}%` }} />
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-slate-800">{QUESTIONS[current].q}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {QUESTIONS[current].options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(i)} className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-300 font-bold text-slate-700 text-left transition-all">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === "result" && (
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-800 mb-2">Hasil Analisis</h2>
          <p className="text-slate-600 mb-6">Kamu menjawab <span className="font-black text-sky-600">{score}/10</span> dengan benar.</p>
          <button onClick={finishTest} className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-2">
            Konfirmasi & Mulai <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {stage === "loading" && (
        <div className="text-center animate-in fade-in duration-500">
          <Loader2 className="w-16 h-16 text-sky-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-black text-slate-800">Menyesuaikan Level...</h2>
        </div>
      )}

      {stage === "done" && (
        <div className="text-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-800">Siap!</h2>
        </div>
      )}
    </div>
  );
}