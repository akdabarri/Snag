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

function AnswerCard({
  value,
  label,
  imageUrl,
  selected,
  disabled,
  isCorrect,
  onSelect,
}: AnswerCardProps) {
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
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 group ${getStyle()}`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-lg transition-colors duration-200
        ${selected && isCorrect === undefined ? "bg-sky-500 text-white" : ""}
        ${selected && isCorrect ? "bg-emerald-500 text-white" : ""}
        ${selected && isCorrect === false ? "bg-red-400 text-white" : ""}
        ${!selected ? "bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-600" : ""}`}
      >
        {value}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <span className="font-semibold text-sm text-slate-700">{label}</span>
        {imageUrl && (
          <img src={imageUrl} alt={label} className="mt-2 w-auto h-20 object-contain rounded-md border border-slate-100" />
        )}
      </div>

      {selected && isCorrect === true && <CheckCircleIcon className="w-5 h-5 text-emerald-500" />}
      {selected && isCorrect === false && <XCircleIcon className="w-5 h-5 text-red-400" />}
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
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
          Jika kamu merasa bingung, klik tombol petunjuk. AI akan membantumu memecah masalah ini secara bertahap.
        </p>
      </div>
    </div>
  );
}

// ================= SCAFFOLD STEP =================

function ScaffoldStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center bg-sky-500 text-white">
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

  // KODE ANTI-BOCOR PARAMETER URL (Aman apapun nama folder Anda: [id], [levelId], dll)
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
    // Membaca ID Siswa
    const savedUid = localStorage.getItem("snag_user_id");
    if (savedUid) setActiveStudentId(savedUid);

    // Membaca Nyawa Siswa dengan aman di sisi Client
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

  // Jika parameter salah, kembalikan layar ini
  if (!levelData || !levelData.questions || levelData.questions.length === 0 || !activeQuestion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Ups! Level Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6">Mungkin URL yang kamu masukkan salah.</p>
        <Link href="/dashboard" className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-sm">
          Kembali ke Dashboard
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
      // LOGIKA KETIKA JAWABAN BENAR
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
            router.push("/dashboard");
          }
        }, 3200);

      } else {
        // Lanjut ke soal berikutnya di level yang sama
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
      // LOGIKA KETIKA JAWABAN SALAH (PENGURANGAN NYAWA)
      setShowHintPulse(true);

      const currentHearts = parseInt(localStorage.getItem("snag_student_hearts") || "5");
      if (currentHearts > 0) {
        const newHearts = currentHearts - 1;
        localStorage.setItem("snag_student_hearts", newHearts.toString());
        setHearts(newHearts);

        // Jika nyawa mulai berkurang dari 5 ke 4, mulai hitung mundur regen di sistem
        if (newHearts === 4) {
          localStorage.setItem("snag_regen_start", Date.now().toString());
        }

        // Jika nyawa habis
        if (newHearts === 0) {
          setTimeout(() => {
            alert("Nyawa kamu habis! Silakan isi ulang di Profil.");
            router.push("/dashboard");
          }, 1000);
        }
      }
    }
  }, [
    selectedAnswer, activeQuestion, currentQuestionIndex, levelData.questions.length, currentLevelId, flushToSupabase, router,
  ]);

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
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden relative">
      
      {/* SCREEN SELEBRASI SUKSES */}
      {showSuccessScreen && (
        <div className="fixed inset-0 z-50 bg-emerald-500 flex flex-col items-center justify-center text-white p-6 animate-[duoFadeIn_0.3s_ease_forwards]">
          <div className="text-center space-y-6 max-w-sm animate-[duoScaleUp_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_0.1s_forwards] opacity-0 scale-75">
            <div className="w-28 h-28 bg-white/20 border-4 border-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30 animate-bounce">
              <TropyIcon className="w-14 h-14 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight">Luar Biasa!</h1>
              <p className="text-emerald-100 font-medium text-sm leading-relaxed">
                Kamu berhasil menyelesaikan seluruh tantangan di tingkat <span className="underline decoration-amber-300 decoration-2 font-bold">{levelData.topic}</span> dengan sempurna!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 shadow-sm animate-[slideInDown_0.4s_ease]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Progres Sesi: {currentQuestionIndex + 1} / {levelData.questions.length}</span>
            <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-10 overflow-x-hidden animate-[duoScaleUp_0.4s_ease]">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start transition-all duration-700">
          
          {/* LEFT CONTENT */}
          <div className={`transition-all duration-700 w-full ${scaffoldingOpen ? "lg:w-[58%]" : "lg:w-[72%]"}`}>
            
            {/* QUESTION */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wide">{levelData.topic}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-800 leading-relaxed mb-3">{activeQuestion.questionText}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{activeQuestion.questionSubtext}</p>

              {activeQuestion.imageUrl && (
                <div className="mt-4 mb-4 rounded-xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex items-center justify-center p-2">
                  <img src={activeQuestion.imageUrl} alt="Ilustrasi Soal" className="max-h-64 object-contain rounded-lg" />
                </div>
              )}

              {!activeQuestion.imageUrl && (
                activeQuestion.imageSvg ? (
                  <div className="mt-5 p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-center">
                    {activeQuestion.imageSvg}
                  </div>
                ) : (
                  <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-2 flex-wrap">
                    {Array.from({ length: activeQuestion.totalItems || 0 }).map((_, i) => (
                      <ItemIcon key={i} className="w-8 h-8" />
                    ))}
                  </div>
                )
              )}
            </div>

            {/* ANSWERS */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-6">
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

            {/* RESULT */}
            {checkResult !== null && (
              <div className={`flex items-center gap-3 border-2 rounded-2xl p-4 mt-4 animate-[fadeInUp_0.3s_ease] ${checkResult ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                {checkResult ? <CheckCircleIcon className="w-6 h-6 text-emerald-500" /> : <XCircleIcon className="w-6 h-6 text-red-400" />}
                <div>
                  <p className={`font-bold text-sm ${checkResult ? "text-emerald-700" : "text-red-600"}`}>
                    {checkResult ? "Tepat Sekali!" : "Masih keliru, mari coba lagi!"}
                  </p>
                  <p className={`text-xs mt-0.5 ${checkResult ? "text-emerald-600" : "text-red-500"}`}>
                    {checkResult ? activeQuestion.successMessage : activeQuestion.errorMessage}
                  </p>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="relative flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null || answeredCorrectly}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  selectedAnswer !== null && !answeredCorrectly
                    ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md border-b-4 border-sky-700"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                Periksa Jawaban
              </button>

              <button
                onClick={handleHint}
                disabled={scaffoldingOpen}
                className={`relative overflow-hidden flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl font-bold text-sm border-2 transition-all duration-300
                  ${!scaffoldingOpen ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100 border-b-4 border-amber-500" : "bg-slate-100 border-slate-200 text-slate-400"}
                  ${showHintPulse && !scaffoldingOpen ? "animate-[hintPulse_1.8s_ease-in-out_infinite] ring-4 ring-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.45)]" : ""}
                  ${checkResult === false ? "glowing-hint" : ""}
                `}
              >
                <LightbulbIcon className="w-4 h-4" />
                {scaffoldingOpen ? "Bantuan Aktif" : "Minta Petunjuk AI"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - AI SCAFFOLDING */}
          {(scaffoldingOpen || checkResult === false) && (
            <div className="w-full lg:w-[38%] animate-[slideInRight_0.5s_cubic-bezier(0.22,1,0.36,1)]">
              <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-sm overflow-hidden min-h-[500px]">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b bg-amber-50 border-amber-100">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-amber-400">
                    <SparkleIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div><p className="text-xs font-black uppercase tracking-widest text-amber-600">AI Scaffolding</p></div>
                </div>

                <div className="p-5">
                  {isAiLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                      <LoadingSpinnerIcon className="w-10 h-10 text-amber-500" />
                      <p className="text-sm font-semibold text-slate-500 animate-pulse">Menyusun petunjuk logika...</p>
                    </div>
                  ) : aiResponseData ? (
                    <div className="flex flex-col gap-4 animate-[fadeIn_0.4s_ease_forwards]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                          <LightbulbIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-700 text-sm">Petunjuk Analisis (Bertahap)</h3>
                      </div>

                      {/* MEMETAKAN (LOOPING) MULTIPLE STEPS DARI AI */}
                      {aiResponseData.steps && aiResponseData.steps.map((step: any, idx: number) => (
                        <ScaffoldStep 
                          key={idx} 
                          number={step.step_number || idx + 1} 
                          title={`Analisis Langkah ${idx + 1}`}
                        >
                          <p className="text-xs text-slate-600 mb-1 mt-1 font-medium leading-relaxed">
                            {step.instruction}
                          </p>
                        </ScaffoldStep>
                      ))}

                      {/* FALLBACK TAMPILAN VISUAL KOTAK (JIKA SOAL MATEMATIKA) */}
                      {((aiResponseData.visual_groups && aiResponseData.visual_groups.length > 0) || aiResponseData.visual_boxes > 0) && (
                        <ScaffoldStep 
                          number={(aiResponseData.steps?.length || 1) + 1} 
                          title="Langkah Bantuan Visual"
                        >
                          <div className="flex flex-wrap gap-3 mt-2">
                            {aiResponseData.visual_groups ? (
                              aiResponseData.visual_groups.map((count: number, boxIdx: number) => (
                                <div key={boxIdx} className="flex flex-col items-center gap-1 p-2 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50 min-w-[3rem]">
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {Array.from({ length: count || 0 }).map((_, itemIdx) => (
                                      <ItemIcon key={itemIdx} className="w-5 h-5 animate-[popIn_0.3s_ease_forwards]" />
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              Array.from({ length: aiResponseData.visual_boxes || 0 }).map((_, boxIdx) => (
                                <div key={boxIdx} className="flex flex-col items-center gap-1 p-2 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50">
                                  <div className="flex flex-wrap gap-1 justify-center min-h-[3rem]">
                                    {Array.from({ length: aiResponseData.items_per_box || 0 }).map((_, itemIdx) => (
                                      <ItemIcon key={itemIdx} className="w-5 h-5 animate-[popIn_0.3s_ease_forwards]" />
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

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes duoFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes duoScaleUp { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes slideInDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hintPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(251,191,36,0); }
          50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(251,191,36,0.35); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(251,191,36,0); }
        }
        @keyframes hintGlow {
          0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 16px rgba(251, 191, 36, 0.7); }
          100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
        }
        .glowing-hint { animation: hintGlow 1.4s infinite; border: 2px solid #fbbf24; }
      `}</style>
    </div>
  );
}