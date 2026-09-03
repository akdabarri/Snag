// hooks/useLearningAnalytics.ts
// SNAG Platform — Telemetry & Learning Analytics Hook
// Tracks hesitation time (seconds) and scaffolding requests
// Fully synchronized with public.telemetry_logs table schema.

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LearningSession {
  userId: string;
  studentName: string;            // Menambahkan tracking nama siswa
  questionId: string;
  levelId: string;                // Menambahkan unit/level ID (contoh: unit-1)
  hesitationTime: number | null;  // Menggunakan satuan detik (float)
  scaffoldingClicks: number;
  firstInteractionAt: number | null; // epoch ms
  sessionStartAt: number;
}

export interface UseLearningAnalyticsReturn {
  session: LearningSession;
  recordInteraction: () => void;
  incrementScaffolding: () => void;
  // Menambahkan parameter isCorrect agar terekam di analitik peneliti saat di-flush
  flushToSupabase: (isCorrect: boolean) => Promise<{ success: boolean; error?: string }>;
  resetSession: () => void;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLearningAnalytics(
  userId: string,
  questionId: string,
  levelId: string = "unit-1" // Default value jika levelId tidak dipasangkan di awal
): UseLearningAnalyticsReturn {
  const sessionStartRef = useRef<number>(Date.now());
  const hasInteractedRef = useRef<boolean>(false);
  const [studentName, setStudentName] = useState("Siswa Anonim");

  // Ambil nama lengkap siswa asli dari localStorage saat hook dimuat
  useEffect(() => {
    const savedName = localStorage.getItem("snag_user_name");
    if (savedName) setStudentName(savedName);
  }, []);

  const [session, setSession] = useState<LearningSession>({
    userId,
    studentName: "Siswa Anonim",
    questionId,
    levelId,
    hesitationTime: null,
    scaffoldingClicks: 0,
    firstInteractionAt: null,
    sessionStartAt: sessionStartRef.current,
  });

  // Reset otomatis saat siswa berpindah soal/tantangan baru
  useEffect(() => {
    sessionStartRef.current = Date.now();
    hasInteractedRef.current = false;
    setSession({
      userId,
      studentName: localStorage.getItem("snag_user_name") || "Siswa Anonim",
      questionId,
      levelId,
      hesitationTime: null,
      scaffoldingClicks: 0,
      firstInteractionAt: null,
      sessionStartAt: sessionStartRef.current,
    });
  }, [userId, questionId, levelId]);

  // Rekam interaksi pertama (saat anak pertama kali klik opsi/bantuan)
  const recordInteraction = useCallback(() => {
    if (hasInteractedRef.current) return;
    hasInteractedRef.current = true;
    const now = Date.now();
    
    // Ubah durasi dari milidetik menjadi detik (float) agar serasi dengan tipe data database
    const hesitationSec = parseFloat(((now - sessionStartRef.current) / 1000).toFixed(2));
    
    setSession((prev) => ({
      ...prev,
      hesitationTime: hesitationSec,
      firstInteractionAt: now,
    }));
  }, []);

  // Tambahkan hitungan setiap kali tombol "Minta Petunjuk AI" diklik
  const incrementScaffolding = useCallback(() => {
    recordInteraction();
    setSession((prev) => ({
      ...prev,
      scaffoldingClicks: prev.scaffoldingClicks + 1,
    }));
  }, [recordInteraction]);

  // Kirim data telemetri ke tabel public.telemetry_logs di Supabase
  const flushToSupabase = useCallback(async (isCorrect: boolean): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      // Import dinamis client bawaan proyek Anda agar tidak bentrok dengan arsitektur Next.js
      const { supabase } = await import("@/lib/supabase");

      // Set default jika anak langsung submit tanpa pernah berinteraksi sama sekali
      let finalHesitation = session.hesitationTime;
      if (finalHesitation === null) {
        finalHesitation = parseFloat(((Date.now() - sessionStartRef.current) / 1000).toFixed(2));
      }

      // STRUKTUR PAYLOAD SINKRON 100% DENGAN ATURAN DATABASE POSTGRESQL ANDA
      const payload = {
        user_id: session.userId || "00000000-0000-0000-0000-000000000000",
        student_name: session.studentName || "Siswa Anonim",
        question_id: session.questionId,
        level_id: session.levelId,
        hesitation_time: finalHesitation,
        scaffolding_clicks: session.scaffoldingClicks,
        is_correct: isCorrect, // Status kebenaran dinamis dari parameter workspace game
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("telemetry_logs")
        .upsert(payload, { onConflict: "user_id,question_id" });

      if (error) {
        console.error("Supabase Telemetry Flush Error:", error);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Caught Telemetry Exception:", message);
      return { success: false, error: message };
    }
  }, [session]);

  const resetSession = useCallback(() => {
    sessionStartRef.current = Date.now();
    hasInteractedRef.current = false;
    setSession({
      userId,
      studentName: localStorage.getItem("snag_user_name") || "Siswa Anonim",
      questionId,
      levelId,
      hesitationTime: null,
      scaffoldingClicks: 0,
      firstInteractionAt: null,
      sessionStartAt: sessionStartRef.current,
    });
  }, [userId, questionId, levelId]);

  return {
    session,
    recordInteraction,
    incrementScaffolding,
    flushToSupabase,
    resetSession,
  };
}