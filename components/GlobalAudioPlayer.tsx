// components/GlobalAudioPlayer.tsx
"use client";

import { useState, useEffect, useRef } from "react";

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Cek preferensi saat web pertama kali dimuat
    const savedMusicState = localStorage.getItem("snag_music_playing");
    if (savedMusicState === "true") {
      setIsPlaying(true);
      // Coba putar otomatis jika sebelumnya menyala
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Jika browser memblokir putaran otomatis saat web di-refresh, matikan statusnya
          setIsPlaying(false);
          localStorage.setItem("snag_music_playing", "false");
        });
      }
    }
  }, []);

  // Logika play/pause dipindah LANGSUNG ke dalam klik tombol
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("snag_music_playing", "false");
    } else {
      // Browser memberikan izin penuh jika diputar dari event onClick
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem("snag_music_playing", "true");
        })
        .catch((err) => {
          console.error("Gagal memutar audio:", err);
          alert("Gagal memutar musik! Pastikan file bgm.mp3 sudah ada di dalam folder public/audio/");
          setIsPlaying(false);
        });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Pastikan file public/audio/bgm.mp3 benar-benar ada! */}
      <audio ref={audioRef} src="/audio/bgm.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        style={{ zIndex: 9999 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 transition-transform duration-300 hover:scale-110 active:scale-95 group focus:outline-none"
        aria-label="Toggle Background Music"
      >
        <img 
          src={isPlaying ? "/images/icon-sound-on.webp" : "/images/icon-sound-off.webp"} 
          alt={isPlaying ? "Music On" : "Music Off"} 
          className={`w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-xl transition-opacity duration-300 ${
            isPlaying ? "opacity-100" : "opacity-60 hover:opacity-100"
          }`}
        />
        
        <span className="absolute -top-12 right-0 bg-slate-800 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
        </span>
      </button>
    </>
  );
}