// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ArrowRight, Puzzle, Shapes, Lightbulb, Lock, 
  Star, Gift, Home, Map, Trophy, User, Coins, Clock, Palette, ShoppingCart, Target, Zap
} from "lucide-react";

function ApiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function NyawaIcon({ className, diisi }: { className?: string; diisi?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={diisi ? "#ef4444" : "#e2e8f0"} />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KeluarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M17 16l4-4m0 0l-4-4m4 4H9m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h6a3 3 0 013 3v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const UNIT_DATA = [
  {
    id: "unit-1",
    title: "Unit A: Dekomposisi Visual",
    subtitle: "Instrumen UNSRI Bagian A",
    levels: [
      { id: "q_unsri_1_dekomposisi", number: 1, title: "Dekomposisi Dasar", desc: "Menganalisis komponen gambar", icon: Puzzle, color: "text-emerald-500", bg: "bg-emerald-50" },
      { id: "q_unsri_1_pola", number: 2, title: "Pengenalan Pola Gerak", desc: "Mendeteksi arah dan rotasi", icon: Shapes, color: "text-amber-500", bg: "bg-amber-50" },
      { id: "q_unsri_1_grid", number: 3, title: "Pemetaan Spasial", desc: "Memecahkan masalah koordinat", icon: Lightbulb, color: "text-blue-500", bg: "bg-blue-50" },
    ]
  },
  {
    id: "unit-2",
    title: "Unit B: Abstraksi & Syarat",
    subtitle: "Instrumen UNSRI Bagian B",
    levels: [
      { id: "q_unsri_2_abstraksi", number: 4, title: "Abstraksi Syarat", desc: "Fokus pada aturan penting", icon: Star, color: "text-rose-500", bg: "bg-rose-50" },
      { id: "q_unsri_2_navigasi", number: 5, title: "Navigasi Kondisional", desc: "Melacak jejak instruksi", icon: Map, color: "text-indigo-500", bg: "bg-indigo-50" },
      { id: "q_unsri_2_essay", number: 6, title: "Evaluasi Analitik", desc: "Menyaring informasi tersembunyi", icon: Puzzle, color: "text-cyan-500", bg: "bg-cyan-50" },
    ]
  },
  {
    id: "unit-3",
    title: "Unit C: Algoritma Runtutan",
    subtitle: "Instrumen UNSRI Bagian C",
    levels: [
      { id: "q_unsri_3_sistem", number: 7, title: "Dekomposisi Sistem", desc: "Memecah jaringan masalah", icon: Shapes, color: "text-fuchsia-500", bg: "bg-fuchsia-50" },
      { id: "q_unsri_3_algoritma", number: 8, title: "Instruksi Bercabang", desc: "Looping dan kondisi", icon: Lightbulb, color: "text-teal-500", bg: "bg-teal-50" },
      { id: "q_unsri_3_pertumbuhan", number: 9, title: "Pola Pertumbuhan", desc: "Menghitung efisiensi langkah", icon: Map, color: "text-orange-500", bg: "bg-orange-50" },
    ]
  },
  {
    id: "unit-4",
    title: "Unit D: Pengenalan Pola Kompleks",
    subtitle: "Instrumen UNSRI Bagian D",
    levels: [
      { id: "q_pattern_1", number: 10, title: "Deret Geometri", desc: "Melihat lompatan nilai konstan", icon: Puzzle, color: "text-violet-500", bg: "bg-violet-50" },
      { id: "q_pattern_2", number: 11, title: "Matriks Logika", desc: "Analisis koordinat dua dimensi", icon: Shapes, color: "text-pink-500", bg: "bg-pink-50" },
      { id: "q_pattern_3", number: 12, title: "Sandi Rahasia", desc: "Kriptografi numerasi dasar", icon: Lock, color: "text-slate-500", bg: "bg-slate-100" },
    ]
  },
  {
    id: "unit-5",
    title: "Unit E: Evaluasi & Sintesis",
    subtitle: "Instrumen UNSRI Bagian E",
    levels: [
      { id: "q_algo_1", number: 13, title: "Jalur Terpendek", desc: "Navigasi optimal", icon: Map, color: "text-red-500", bg: "bg-red-50" },
      { id: "q_algo_2", number: 14, title: "Logika Flowchart", desc: "Mengikuti instruksi percabangan", icon: Lightbulb, color: "text-lime-500", bg: "bg-lime-50" },
      { id: "q_algo_3", number: 15, title: "Puncak Tantangan", desc: "Evaluasi akhir integrasi CT", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-50" },
    ]
  }
];

export default function DashboardPage() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("beranda");
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [streak, setStreak] = useState(1);
  const [hearts, setHearts] = useState(5);
  const [coins, setCoins] = useState(150);
  const [avatarColor, setAvatarColor] = useState("bg-blue-600");
  const [regenTimeLeft, setRegenTimeLeft] = useState<number | null>(null);
  
  const [studentInitial, setStudentInitial] = useState("?");
  const [studentName, setStudentName] = useState("Siswa");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // State Papan Peringkat
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  useEffect(() => {
    const currentName = localStorage.getItem("snag_user_name");
    if (currentName) {
      setStudentName(currentName);
      setStudentInitial(currentName.charAt(0).toUpperCase());
    }

    const savedProgress = localStorage.getItem("snag_completed_levels");
    const savedParsed = savedProgress ? JSON.parse(savedProgress) : [];
    setCompletedLevels([...new Set(savedParsed)]);

    const savedHearts = localStorage.getItem("snag_student_hearts");
    if (savedHearts) setHearts(parseInt(savedHearts));

    const savedCoins = localStorage.getItem("snag_student_coins");
    if (savedCoins) setCoins(parseInt(savedCoins));

    const savedColor = localStorage.getItem("snag_avatar_color");
    if (savedColor) setAvatarColor(savedColor);
  }, []);

  useEffect(() => {
    const REGEN_MS = 60000;
    const interval = setInterval(() => {
      const currentStoredHearts = parseInt(localStorage.getItem("snag_student_hearts") || "5");
      setHearts(currentStoredHearts);

      if (currentStoredHearts < 5) {
        let regenStart = parseInt(localStorage.getItem("snag_regen_start") || "0");
        if (!regenStart) {
          regenStart = Date.now();
          localStorage.setItem("snag_regen_start", regenStart.toString());
        }

        const elapsed = Date.now() - regenStart;
        if (elapsed >= REGEN_MS) {
          const newHearts = Math.min(5, currentStoredHearts + 1);
          setHearts(newHearts);
          localStorage.setItem("snag_student_hearts", newHearts.toString());
          
          if (newHearts < 5) {
            localStorage.setItem("snag_regen_start", Date.now().toString());
          } else {
            localStorage.removeItem("snag_regen_start");
            setRegenTimeLeft(null);
          }
        } else {
          setRegenTimeLeft(Math.ceil((REGEN_MS - elapsed) / 1000));
        }
      } else {
        localStorage.removeItem("snag_regen_start");
        setRegenTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // PENARIKAN DATA PAPAN PERINGKAT DARI SUPABASE
  useEffect(() => {
    if (activeTab === "pencapaian") {
      const fetchLeaderboard = async () => {
        setIsLoadingLeaderboard(true);
        try {
          const { data, error } = await supabase
            .from("students")
            .select("full_name, username");
          
          if (error) throw error;
          
          const formattedData = (data || []).map((student, idx) => ({
            ...student,
            // Simulasi skor logis berdasarkan panjang karakter nama agar data terlihat dinamis
            score: (student.full_name.length * 15) + (100 - idx * 5)
          })).sort((a, b) => b.score - a.score);

          setLeaderboardData(formattedData);
        } catch (err) {
          console.error("Gagal menarik data papan peringkat", err);
        } finally {
          setIsLoadingLeaderboard(false);
        }
      };
      fetchLeaderboard();
    }
  }, [activeTab]);

  const handleLevelClick = (levelId: string, isLocked: boolean) => {
    if (isLocked) return;
    const currentHearts = parseInt(localStorage.getItem("snag_student_hearts") || "5");
    if (currentHearts <= 0) {
      alert("Nyawa habis. Tunggu beberapa saat atau beli nyawa di Profil.");
      return;
    }
    router.push(`/workspace/${levelId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("snag_user_id");
    localStorage.removeItem("snag_user_name");
    router.push("/auth");
  };

  const buyHeart = () => {
    if (coins >= 20 && hearts < 5) {
      const newCoins = coins - 20;
      const newHearts = hearts + 1;
      setCoins(newCoins);
      setHearts(newHearts);
      localStorage.setItem("snag_student_coins", newCoins.toString());
      localStorage.setItem("snag_student_hearts", newHearts.toString());
      if (newHearts === 5) localStorage.removeItem("snag_regen_start");
    }
  };

  const buyAvatarColor = (colorClass: string, cost: number) => {
    if (coins >= cost && avatarColor !== colorClass) {
      const newCoins = coins - cost;
      setCoins(newCoins);
      setAvatarColor(colorClass);
      localStorage.setItem("snag_student_coins", newCoins.toString());
      localStorage.setItem("snag_avatar_color", colorClass);
    }
  };

  const simulateWrongAnswer = () => {
    if (hearts > 0) {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      localStorage.setItem("snag_student_hearts", newHearts.toString());
      if (newHearts === 4) {
        localStorage.setItem("snag_regen_start", Date.now().toString());
      }
    }
  };

  const totalLevels = 15;
  const progressPercentage = (completedLevels.length / totalLevels) * 100;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-28 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity h-full py-2">
            <img src="/images/1.png" alt="Logo SNAG" className="h-12 md:h-14 w-auto object-contain drop-shadow-sm scale-[1.35] origin-left" />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <ApiIcon className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: "10s" }} />
              <span className="text-sm font-bold text-orange-600">{streak} Hari</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
                <Coins className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-700">{coins}</span>
              </div>
              <div className="flex gap-1 pl-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <NyawaIcon key={i} className="w-5 h-5" diisi={i < hearts} />
                ))}
              </div>
            </div>
            
            <div className="relative ml-2">
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-white transition-colors duration-500 ${avatarColor}`}>
                  {studentInitial}
                </div>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-3 pt-2 border-b border-slate-100 mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Masuk Sebagai</p>
                    <p className="text-sm font-black text-slate-800 truncate">{studentName}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2">
                    <KeluarIcon className="w-4 h-4" /> Keluar Akun
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-6">
        
        {/* TAB 1: BERANDA */}
        {activeTab === "beranda" && (
          <div className="space-y-6 animate-in slide-in-from-left-8 duration-300">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
              <div className="z-10 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-3">Selamat Datang, {studentName}!</h1>
                <p className="text-slate-600 text-lg mb-6">Pusat komando pembelajaran logika Anda.</p>
                <button onClick={() => setActiveTab("petualangan")} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors flex items-center gap-2 mx-auto md:mx-0">
                  Lanjutkan Petualangan <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="z-10 w-full md:w-1/3">
                 <div className="w-48 h-48 bg-emerald-100/50 rounded-full flex items-center justify-center mx-auto relative">
                  <span className="text-emerald-500 text-sm font-bold text-center">Area Maskot<br/>Ular.png</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><Star className="w-7 h-7 text-amber-500 fill-amber-500"/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-400">Total Bintang</p>
                    <p className="text-2xl font-black text-slate-800">{completedLevels.length} / 15</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center"><Target className="w-7 h-7 text-blue-500"/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-400">Target Harian</p>
                    <p className="text-2xl font-black text-slate-800">{Math.floor((completedLevels.length / 15) * 100)}%</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center"><Zap className="w-7 h-7 text-orange-500"/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-400">Momentum</p>
                    <p className="text-2xl font-black text-slate-800">{streak} Hari</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* TAB 2: PETUALANGAN */}
        {activeTab === "petualangan" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-right-8 duration-300">
            <div className="lg:col-span-3 space-y-12">
              {UNIT_DATA.map((unit) => (
                <div key={unit.id}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">{unit.title}</h2>
                      <p className="text-sm text-slate-500">{unit.subtitle}</p>
                    </div>
                  </div>
                  <div className="relative flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                    <div className="absolute top-1/2 left-0 w-full border-t-4 border-dashed border-slate-200 -z-10 transform -translate-y-1/2"></div>
                    {unit.levels.map((level) => {
                      const flatLevels = UNIT_DATA.flatMap(u => u.levels.map(l => l.id));
                      const currentGlobalIdx = flatLevels.indexOf(level.id);
                      
                      const isCompleted = completedLevels.includes(level.id);
                      const prevLevelId = currentGlobalIdx > 0 ? flatLevels[currentGlobalIdx - 1] : null;
                      const isPrevCompleted = !prevLevelId || completedLevels.includes(prevLevelId);
                      const isActive = !isCompleted && isPrevCompleted;
                      const isLocked = !isCompleted && !isActive;
                      
                      const Icon = level.icon;

                      return (
                        <div key={level.id} className={`snap-start shrink-0 w-64 bg-white rounded-3xl border p-6 flex flex-col shadow-sm relative transition-transform duration-300 ${isLocked ? 'border-slate-200 opacity-75' : isActive ? 'border-blue-300 hover:-translate-y-2' : 'border-slate-200 hover:-translate-y-2'}`}>
                          <div className={`absolute -top-3 left-4 w-8 h-12 flex items-start justify-center pt-2 font-black text-white text-sm ${isCompleted ? 'bg-emerald-500' : isActive ? 'bg-blue-500' : 'bg-slate-400'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                            {level.number}
                          </div>
                          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 mt-4 ${level.bg}`}>
                            <Icon className={`w-10 h-10 ${level.color}`} />
                          </div>
                          <div className="text-center flex-1">
                            <h3 className="font-bold text-slate-800 text-lg mb-2">{level.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-6">{level.desc}</p>
                          </div>
                          <button onClick={() => handleLevelClick(level.id, isLocked)} className={`w-full py-2.5 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${isCompleted ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : ""} ${isActive ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md" : ""} ${isLocked ? "bg-slate-100 text-slate-400 cursor-not-allowed" : ""}`}>
                            {isCompleted && <><CheckIcon className="w-4 h-4"/> Selesai</>}
                            {isActive && "Mulai"}
                            {isLocked && "Terkunci"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-amber-50/30 border border-amber-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
                <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-6 relative">
                  <Star className="w-8 h-8 fill-amber-500" />
                  {regenTimeLeft && (
                     <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full animate-pulse border-2 border-white shadow-sm">
                       {regenTimeLeft}s
                     </div>
                  )}
                </div>
                <h3 className="text-4xl font-black text-slate-800 mb-2">{completedLevels.length} <span className="text-2xl text-slate-400">/ 15</span></h3>
                <p className="text-sm font-bold text-slate-500 mb-6">Bintang CT Terkumpul</p>
                <div className="w-full bg-slate-200 rounded-full h-3 mb-8">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(completedLevels.length/15)*100}%` }}></div>
                </div>
                <div className="bg-white w-full p-4 rounded-2xl border border-slate-100 flex items-center justify-between text-left">
                  <p className="text-xs font-semibold text-slate-500 leading-tight">Gunakan koinmu untuk kustomisasi Avatar di Profil.</p>
                  <Coins className="w-8 h-8 text-amber-400 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PENCAPAIAN (PAPAN PERINGKAT SUPABASE) */}
        {activeTab === "pencapaian" && (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-300">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-10 text-center">
                <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white">Papan Peringkat</h2>
                <p className="text-indigo-100 mt-2">Daftar Pahlawan Logika SNAG</p>
              </div>
              <div className="p-6">
                {isLoadingLeaderboard ? (
                  <div className="text-center py-10 text-slate-400 font-bold">Menghubungkan ke basis data...</div>
                ) : (
                  <div className="space-y-3">
                    {leaderboardData.map((student, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-slate-300' : idx === 2 ? 'bg-amber-600' : 'bg-slate-800'}`}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{student.full_name}</p>
                            <p className="text-xs text-slate-400">@{student.username}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-indigo-600">{student.score}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Skor Logika</p>
                        </div>
                      </div>
                    ))}
                    {leaderboardData.length === 0 && (
                      <div className="text-center py-10 text-slate-400 font-bold">Belum ada peserta yang mendaftar.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFIL & TOKO */}
        {activeTab === "profil" && (
          <div className="animate-in slide-in-from-bottom-8 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-black text-6xl shadow-xl mb-6 transition-colors duration-500 border-4 border-white ring-4 ring-slate-100 ${avatarColor}`}>
                  {studentInitial}
                </div>
                <h2 className="text-2xl font-black text-slate-800">{studentName}</h2>
                <p className="text-slate-500 font-bold mb-6">Pahlawan Logika Level {Math.floor(completedLevels.length / 3) + 1}</p>
                
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase">Koin Emas</p>
                    <p className="text-2xl font-black text-amber-500 flex justify-center items-center gap-2 mt-1"><Coins className="w-6 h-6"/> {coins}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase">Status Nyawa</p>
                    <div className="flex justify-center items-center gap-2 mt-2">
                       <p className="text-2xl font-black text-red-500">{hearts}</p>
                       {regenTimeLeft ? <span className="text-xs font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3"/> {regenTimeLeft}s</span> : <span className="text-xs font-bold text-emerald-500 bg-emerald-100 px-2 py-0.5 rounded-full">Penuh</span>}
                    </div>
                  </div>
                </div>

                <button onClick={simulateWrongAnswer} className="mt-8 text-[10px] font-bold text-red-400 border border-red-200 hover:bg-red-50 px-3 py-1 rounded-full transition-colors">
                  Uji Coba Pengurangan Nyawa
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <ShoppingCart className="w-6 h-6 text-sky-500" />
                    <h3 className="text-lg font-black text-slate-800">Toko Kebutuhan</h3>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500"><NyawaIcon className="w-6 h-6" diisi={true} /></div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Isi Ulang 1 Nyawa</p>
                        <p className="text-xs text-slate-500">Masa pemulihan instan</p>
                      </div>
                    </div>
                    <button onClick={buyHeart} disabled={coins < 20 || hearts >= 5} className="bg-amber-100 hover:bg-amber-200 text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs px-4 py-2 rounded-full transition-colors flex items-center gap-1">
                      <Coins className="w-3 h-3"/> 20
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-6 h-6 text-fuchsia-500" />
                    <h3 className="text-lg font-black text-slate-800">Skin Avatar (50 Koin)</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <button onClick={() => buyAvatarColor('bg-blue-600', 50)} className="w-full aspect-square rounded-2xl bg-blue-600 border-4 border-transparent hover:border-slate-300 focus:border-slate-800 transition-all"></button>
                    <button onClick={() => buyAvatarColor('bg-emerald-500', 50)} className="w-full aspect-square rounded-2xl bg-emerald-500 border-4 border-transparent hover:border-slate-300 focus:border-slate-800 transition-all"></button>
                    <button onClick={() => buyAvatarColor('bg-fuchsia-500', 50)} className="w-full aspect-square rounded-2xl bg-fuchsia-500 border-4 border-transparent hover:border-slate-300 focus:border-slate-800 transition-all"></button>
                    <button onClick={() => buyAvatarColor('bg-amber-500', 50)} className="w-full aspect-square rounded-2xl bg-amber-500 border-4 border-transparent hover:border-slate-300 focus:border-slate-800 transition-all"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex justify-between items-center px-8 py-4">
          <button onClick={() => setActiveTab("beranda")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'beranda' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Beranda</span>
          </button>
          <button onClick={() => setActiveTab("petualangan")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'petualangan' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Map className="w-6 h-6" />
            <span className="text-[10px] font-bold">Petualangan</span>
          </button>
          <button onClick={() => setActiveTab("pencapaian")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'pencapaian' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Trophy className="w-6 h-6" />
            <span className="text-[10px] font-bold">Pencapaian</span>
          </button>
          <button onClick={() => setActiveTab("profil")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profil' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profil</span>
          </button>
        </div>
      </nav>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}