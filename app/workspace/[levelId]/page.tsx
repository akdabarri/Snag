// app/workspace/[LevelID]/page.tsx
"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useLearningAnalytics } from "@/hooks/useLearningAnalytics";
import { LEVELS_DATA } from "@/data/levelsData";

// ================= ICONS =================

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 21h6M12 3a6 6 0 016 6c0 2.22-1.21 4.16-3 5.2V17a1 1 0 01-1 1H10a1 1 0 01-1-1v-2.8C7.21 13.16 6 11.22 6 9a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="17" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="20" cy="20" r="8" fill="#bae6fd" opacity="0.8" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" opacity=".6" />
      <path d="M5 14l.75 2.25L8 17l-2.25.75L5 20l-.75-2.25L2 17l2.25-.75L5 14z" opacity=".6" />
    </svg>
  );
}

function LoadingSpinnerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
    </svg>
  );
}

function TropyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
    </svg>
  );
}

// ================= ANSWER CARD =================

interface AnswerCardProps {
  value: number | string; 
  label: string;
  imageUrl?: string; 
  selected: boolean;
  disabled: boolean;
  isCorrect?: boolean;
  onSelect: () => void;
}

function AnswerCard({ value, label, imageUrl, selected, disabled, isCorrect, onSelect }: AnswerCardProps) {
  const getStyle = () => {
    if (!selected) return "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md cursor-pointer";
    if (isCorrect === undefined) return "border-sky-400 bg-sky-50 shadow-md ring-2 ring-sky-200";
    if (isCorrect) return "border-emerald-400 bg-emerald-50 shadow-md ring-2 ring-emerald-200";
    return "border-red-300 bg-red-50 shadow-sm ring-2 ring-red-100";
  };

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border-2 text-left transition-all duration-200 group ${getStyle()}`}
    >
      <div
        className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-base md:text-lg transition-colors duration-200
        ${selected && isCorrect === undefined ? "bg-sky-500 text-white" : ""}
        ${selected && isCorrect ? "bg-emerald-500 text-white" : ""}
        ${selected && isCorrect === false ? "bg-red-400 text-white" : ""}
        ${!selected ? "bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-600" : ""}`}
      >
        {value}
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0">
        <span className="font-semibold text-sm text-slate-700">{label}</span>
        {imageUrl && (
          <img src={imageUrl} alt={label} className="mt-2 w-auto max-h-16 md:max-h-20 object-contain rounded-md border border-slate-100" />
        )}
      </div>

      {selected && isCorrect === true && <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />}
      {selected && isCorrect === false && <XCircleIcon className="w-5 h-5 text-red-400 shrink-0" />}
    </button>
  );
}

// ================= SCAFFOLD IDLE =================

function ScaffoldingIdle() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 py-10 text-center px-4">
      <div className="w-24 h-24 rounded-3xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center rotate-6">
        <LightbulbIcon className="w-10 h-10 text-amber-400" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-700 mb-1.5">Butuh bantuan logika?</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          Jika kamu merasa bingung, klik tombol petunjuk. AI akan membantumu memecah masalah ini secara bertahap.
        </p>
      </div>
    </div>
  );
}

// ================= SCAFFOLD STEP =================

function ScaffoldStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center bg-sky-500 text-white shrink-0">
          {number}
        </span>
        <p className="text-xs font-bold text-sky-700">{title}</p>
      </div>
      {children}
    </div>
  );
}

// ================= MAIN =================

export default function WorkspacePage() {
  const router = useRouter();
  const params = useParams();

  // Membaca Level ID 
  const rawParam = params?.levelId || params?.LevelID || params?.levelid || params?.id || Object.values(params || {})[0];
  const currentLevelId = (Array.isArray(rawParam) ? rawParam[0] : rawParam) as string;
  
  const levelData = LEVELS_DATA[currentLevelId];

  // Kumpulan State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [checkResult, setCheckResult] = useState<boolean | null>(null);
  const [scaffoldingOpen, setScaffoldingOpen] = useState(false);
  const [showHintPulse, setShowHintPulse] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponseData, setAiResponseData] = useState<any>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [activeStudentId, setActiveStudentId] = useState("00000000-0000-0000-0000-000000000000");

  useEffect(() => {
    const savedUid = localStorage.getItem("snag_user_id");
    if (savedUid) setActiveStudentId(savedUid);

    const savedHearts = localStorage.getItem("snag_student_hearts");
    if (savedHearts) setHearts(parseInt(savedHearts));
  }, []);

  const activeQuestion = levelData?.questions?.[currentQuestionIndex];

  const {
    session,
    recordInteraction,
    incrementScaffolding,
    flushToSupabase,
  } = useLearningAnalytics(activeStudentId, activeQuestion?.id || "q_unknown", currentLevelId || "unit-1");

  if (!levelData || !levelData.questions || levelData.questions.length === 0 || !activeQuestion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Ups! Level Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6">Pastikan ID level sudah benar (misal: level-1).</p>
        <Link href="/petualangan" className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-sm">
          Kembali ke Peta
        </Link>
      </div>
    );
  }

  const answeredCorrectly = checkResult === true;
  const progressPercentage = (currentQuestionIndex / levelData.questions.length) * 100;

  // ================= SELECT =================

  const handleSelectAnswer = useCallback(
    (value: number | string) => {
      if (answeredCorrectly) return;
      recordInteraction();
      setCheckResult(null);
      setSelectedAnswer(value);
    },
    [answeredCorrectly, recordInteraction]
  );

  // ================= CHECK =================

  const handleCheckAnswer = useCallback(async () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === activeQuestion.correctAnswer;
    setCheckResult(isCorrect);
    await flushToSupabase(isCorrect);

    if (isCorrect) {
      // --- SISTEM HADIAH KOIN (+10 KOIN) ---
      const currentCoins = parseInt(localStorage.getItem("snag_student_coins") || "150");
      const newCoins = currentCoins + 10;
      localStorage.setItem("snag_student_coins", newCoins.toString());
      // ------------------------------------

      const isLastQuestion = currentQuestionIndex === levelData.questions.length - 1;
      
      if (isLastQuestion) {
        const savedLevels = localStorage.getItem("snag_completed_levels");
        let levelsArray = savedLevels ? JSON.parse(savedLevels) : [];
        if (!levelsArray.includes(currentLevelId)) {
          levelsArray.push(currentLevelId);
          localStorage.setItem("snag_completed_levels", JSON.stringify(levelsArray));
        }

        setTimeout(() => setShowSuccessScreen(true), 1000);

        const levelKeys = Object.keys(LEVELS_DATA);
        const currentIndex = levelKeys.indexOf(currentLevelId);
        const nextLevelId = currentIndex >= 0 && currentIndex < levelKeys.length - 1 ? levelKeys[currentIndex + 1] : null;

        setTimeout(() => {
          if (nextLevelId) {
            router.push(`/workspace/${nextLevelId}`);
          } else {
            router.push("/petualangan");
          }
        }, 3200);

      } else {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setCheckResult(null);
          setScaffoldingOpen(false);
          setShowHintPulse(false);
          setAiResponseData(null);
        }, 1600);
      }
      
    } else {
      setShowHintPulse(true);

      const currentHearts = parseInt(localStorage.getItem("snag_student_hearts") || "5");
      if (currentHearts > 0) {
        const newHearts = currentHearts - 1;
        localStorage.setItem("snag_student_hearts", newHearts.toString());
        setHearts(newHearts);

        if (newHearts === 4) {
          localStorage.setItem("snag_regen_start", Date.now().toString());
        }

        if (newHearts === 0) {
          setTimeout(() => {
            alert("Nyawa kamu habis! Silakan isi ulang di Profil.");
            router.push("/profil");
          }, 1000);
        }
      }
    }
  }, [selectedAnswer, activeQuestion, currentQuestionIndex, levelData.questions.length, currentLevelId, flushToSupabase, router]);

  // ================= HINT =================

  const handleHint = async () => {
    setScaffoldingOpen(true);
    setShowHintPulse(false);
    incrementScaffolding();
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/scaffolding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionTitle: activeQuestion.questionText,
          difficulty: 1,
          hesitationTime: session.hesitationTime ? session.hesitationTime : 0,
          hintsUsed: session.scaffoldingClicks + 1,
          aiContext: activeQuestion.aiContext 
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiResponseData(data.scaffolding);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    /* KUNCI MUTLAK LAYAR (fixed inset-0) AGAR TIDAK BISA SCROLL LUAR. LAYAR TERKUNCI 100% */
    <div className="fixed inset-0 flex flex-col items-center justify-start overflow-hidden font-sans selection:bg-sky-200 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/quiz.webp')] before:bg-cover before:bg-center animate-[fade-in_0.3s_ease_out_forwards]">
      
      {/* SCREEN SELEBRASI SUKSES */}
      {showSuccessScreen && (
        <div className="fixed inset-0 z-50 bg-emerald-500/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 animate-[duoFadeIn_0.3s_ease_forwards]">
          <div className="text-center space-y-6 max-w-sm animate-[duoScaleUp_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_0.1s_forwards] opacity-0 scale-75">
            <div className="w-28 h-28 bg-white border-4 border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-bounce">
              <TropyIcon className="w-14 h-14 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight drop-shadow-md">Luar Biasa!</h1>
              <p className="text-emerald-50 font-bold text-base leading-relaxed drop-shadow-sm">
                Kamu berhasil menyelesaikan tantangan <span className="text-amber-200 font-black">{levelData.topic}</span> dengan sempurna!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER KUIS (TINGGI TETAP, TIDAK MENYUSUT) */}
      <header className="w-full bg-white/90 backdrop-blur-md shadow-sm animate-[slideInDown_0.4s_ease] shrink-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link href="/petualangan" className="flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition-colors font-bold bg-slate-100 hover:bg-sky-50 px-3 py-1.5 rounded-full shrink-0">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Peta</span>
          </Link>
          
          <div className="flex flex-col items-center justify-center overflow-hidden">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest truncate">{levelData.topic}</span>
             <span className="text-sm font-black text-slate-700 truncate">Misi {currentQuestionIndex + 1} dari {levelData.questions.length}</span>
          </div>

          <div className="flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 shrink-0">
             <img src="/images/icon-heart.webp" alt="Nyawa" className="h-5 w-auto" />
             <span className="font-black text-rose-600">{hearts}</span>
          </div>
        </div>
        <div className="w-full bg-slate-200/50 h-1.5 overflow-hidden">
          <div className="bg-sky-400 h-full transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]" style={{ width: `${progressPercentage}%` }} />
        </div>
      </header>

      {/* MAIN KONTEN (MEMENUHI SISA LAYAR, CARD DIKUNCI H-FULL DENGAN INTERNAL SCROLL) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 overflow-hidden flex flex-col z-10 relative">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-center items-center lg:items-stretch w-full h-full overflow-hidden">
          
          {/* ========================================================= */}
          {/* AREA KIRI: SOAL & JAWABAN (KARTU DIKUNCI H-FULL, INNER SCROLL) */}
          {/* ========================================================= */}
          <div className={`transition-all duration-700 flex flex-col h-full bg-white/95 backdrop-blur-md rounded-[2rem] border-[4px] border-white shadow-xl overflow-hidden ${scaffoldingOpen ? "w-full lg:w-[55%]" : "w-full lg:w-[70%] max-w-4xl mx-auto"}`}>
            
            {/* AREA SCROLL KONTEN DI DALAM KARTU */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-xl px-3 py-1.5 mb-4 shadow-sm">
                <LightbulbIcon className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wide">Tantangan Logika</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-snug mb-3">{activeQuestion.questionText}</h2>
              {activeQuestion.questionSubtext && (
                 <p className="text-slate-600 font-medium text-base leading-relaxed mb-6">{activeQuestion.questionSubtext}</p>
              )}

              {/* GAMBAR SOAL DIBATASI TINGGINYA AGAR TIDAK MEMAKAN RUANG */}
              {activeQuestion.imageUrl && (
                <div className="mt-4 mb-6 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex items-center justify-center p-4">
                  <img src={activeQuestion.imageUrl} alt="Ilustrasi Soal" className="max-h-[25vh] object-contain rounded-lg drop-shadow-sm" />
                </div>
              )}

              {!activeQuestion.imageUrl && (
                activeQuestion.imageSvg ? (
                  <div className="mt-4 mb-6 p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-inner flex items-center justify-center">
                    {activeQuestion.imageSvg}
                  </div>
                ) : (
                  <div className="mt-4 mb-6 p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 shadow-inner flex items-center justify-center gap-3 flex-wrap">
                    {Array.from({ length: activeQuestion.totalItems || 0 }).map((_, i) => (
                      <ItemIcon key={i} className="w-10 h-10" />
                    ))}
                  </div>
                )
              )}

              {/* AREA JAWABAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {activeQuestion.choices?.map((choice) => (
                  <AnswerCard
                    key={choice.value}
                    value={choice.value}
                    label={choice.label}
                    imageUrl={choice.choiceImageUrl} 
                    selected={selectedAnswer === choice.value}
                    disabled={answeredCorrectly}
                    isCorrect={checkResult !== null && selectedAnswer === choice.value ? checkResult : undefined}
                    onSelect={() => handleSelectAnswer(choice.value)}
                  />
                ))}
              </div>

              {/* HASIL CEK */}
              {checkResult !== null && (
                <div className={`flex items-center gap-4 border-[3px] rounded-2xl p-4 md:p-5 mt-6 shadow-sm animate-[fadeInUp_0.3s_ease] ${checkResult ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                  <div className={`p-2 rounded-full shrink-0 ${checkResult ? "bg-emerald-100" : "bg-red-100"}`}>
                     {checkResult ? <CheckCircleIcon className="w-8 h-8 text-emerald-600" /> : <XCircleIcon className="w-8 h-8 text-red-500" />}
                  </div>
                  <div>
                    <p className={`font-black text-lg md:text-xl ${checkResult ? "text-emerald-700" : "text-red-700"}`}>
                      {checkResult ? "Luar Biasa!" : "Masih Keliru"}
                    </p>
                    <p className={`text-sm font-bold mt-1 leading-snug ${checkResult ? "text-emerald-600/80" : "text-red-600/80"}`}>
                      {checkResult ? activeQuestion.successMessage : activeQuestion.errorMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* AREA BAWAH: TOMBOL (TETAP DIAM DI BAWAH KARTU, TIDAK IKUT SCROLL) */}
            <div className="shrink-0 p-5 md:p-8 pt-4 md:pt-6 bg-white/95 border-t-2 border-slate-100 z-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null || answeredCorrectly}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-base transition-all duration-200 ${
                    selectedAnswer !== null && !answeredCorrectly
                      ? "bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30 border-b-4 border-sky-700 active:border-b-0 active:mt-1"
                      : "bg-slate-200 text-slate-400 border-b-4 border-slate-300"
                  }`}
                >
                  Periksa Jawaban
                </button>

                <button
                  onClick={handleHint}
                  disabled={scaffoldingOpen}
                  className={`relative overflow-hidden flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-black text-base border-2 transition-all duration-300
                    ${!scaffoldingOpen ? "bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200 border-b-4 border-amber-400 active:border-b-2 active:mt-0.5" : "bg-slate-100 border-slate-200 text-slate-400"}
                    ${showHintPulse && !scaffoldingOpen ? "animate-[hintPulse_1.5s_ease-in-out_infinite] ring-4 ring-amber-200 shadow-xl shadow-amber-500/30" : ""}
                    ${checkResult === false ? "glowing-hint" : ""}
                  `}
                >
                  <SparkleIcon className="w-5 h-5 shrink-0" />
                  {scaffoldingOpen ? "Bantuan Aktif" : "Minta AI Membantu"}
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* AREA KANAN: AI SCAFFOLDING (DIKUNCI H-FULL, INNER SCROLL) */}
          {/* ========================================================= */}
          {(scaffoldingOpen || checkResult === false) && (
            <div className="w-full lg:w-[45%] h-full animate-[slideInRight_0.5s_cubic-bezier(0.22,1,0.36,1)]">
              <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border-[4px] border-amber-200 shadow-xl overflow-hidden h-full flex flex-col">
                
                {/* Header AI */}
                <div className="flex items-center gap-3 px-6 py-4 border-b-4 bg-amber-50 border-amber-100 shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-400 shadow-sm border border-amber-500 shrink-0">
                    <SparkleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                     <h3 className="font-black text-amber-700 text-lg truncate">AI Scaffolding</h3>
                     <p className="text-[10px] font-bold uppercase text-amber-600/70 tracking-widest truncate">Teman Analisis Logika</p>
                  </div>
                </div>

                {/* Konten AI (Bisa di-scroll) */}
                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                  {isAiLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                      <LoadingSpinnerIcon className="w-12 h-12 text-amber-500" />
                      <p className="text-base font-bold text-amber-600/80 animate-pulse text-center">AI sedang menyusun<br/>petunjuk rahasia...</p>
                    </div>
                  ) : aiResponseData ? (
                    <div className="flex flex-col gap-4 animate-[fadeIn_0.4s_ease_forwards] pb-4">
                      
                      <div className="flex items-center gap-2 mb-2 bg-slate-100 p-3 rounded-xl border border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center shrink-0">
                          <LightbulbIcon className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="font-bold text-slate-700 text-sm leading-snug">Mari kita bedah masalah ini bersama!</h3>
                      </div>

                      {/* MEMETAKAN LANGKAH AI */}
                      {aiResponseData.steps && aiResponseData.steps.map((step: any, idx: number) => (
                        <ScaffoldStep 
                          key={idx} 
                          number={step.step_number || idx + 1} 
                          title={`Analisis Langkah ${idx + 1}`}
                        >
                          <p className="text-sm text-slate-700 mb-1 mt-2 font-medium leading-relaxed">
                            {step.instruction}
                          </p>
                        </ScaffoldStep>
                      ))}

                      {/* FALLBACK TAMPILAN VISUAL */}
                      {((aiResponseData.visual_groups && aiResponseData.visual_groups.length > 0) || aiResponseData.visual_boxes > 0) && (
                        <ScaffoldStep 
                          number={(aiResponseData.steps?.length || 1) + 1} 
                          title="Langkah Bantuan Visual"
                        >
                          <div className="flex flex-wrap gap-3 mt-3">
                            {aiResponseData.visual_groups ? (
                              aiResponseData.visual_groups.map((count: number, boxIdx: number) => (
                                <div key={boxIdx} className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50 min-w-[4rem]">
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {Array.from({ length: count || 0 }).map((_, itemIdx) => (
                                      <ItemIcon key={itemIdx} className="w-6 h-6 animate-[popIn_0.3s_ease_forwards]" />
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              Array.from({ length: aiResponseData.visual_boxes || 0 }).map((_, boxIdx) => (
                                <div key={boxIdx} className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50">
                                  <div className="flex flex-wrap gap-1 justify-center min-h-[3rem]">
                                    {Array.from({ length: aiResponseData.items_per_box || 0 }).map((_, itemIdx) => (
                                      <ItemIcon key={itemIdx} className="w-6 h-6 animate-[popIn_0.3s_ease_forwards]" />
                                    ))}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </ScaffoldStep>
                      )}
                    </div>
                  ) : (
                    <ScaffoldingIdle />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ANIMATION KEYFRAMES & CUSTOM SCROLLBAR */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes duoFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes duoScaleUp { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes slideInDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes hintPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(251,191,36,0); }
          50% { transform: scale(1.03); box-shadow: 0 0 30px rgba(251,191,36,0.6); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(251,191,36,0); }
        }
        @keyframes hintGlow {
          0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.8); }
          100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
        }
        .glowing-hint { animation: hintGlow 1.4s infinite; border: 2px solid #fbbf24; }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(203, 213, 225, 0.8); border-radius: 8px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 1); }
      `}</style>
    </div>
  );
}