// app/pencapaian/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PencapaianPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [studentInitial, setStudentInitial] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [coins, setCoins] = useState(150);
  const [hearts, setHearts] = useState(5);
  
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State khusus untuk Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [splashOpacity, setSplashOpacity] = useState("opacity-100");

  useEffect(() => {
    const userId = localStorage.getItem("snag_user_id");
    if (!userId) { window.location.replace("/auth"); return; }
    setIsAuth(true);

    const fullName = localStorage.getItem("snag_user_name") || "Ksatria";
    const firstName = fullName.split(" ")[0];
    setStudentInitial(firstName.charAt(0).toUpperCase());
    setAvatarImage(localStorage.getItem("snag_avatar_image") || "");
    setHearts(parseInt(localStorage.getItem("snag_student_hearts") || "5"));
    setCoins(parseInt(localStorage.getItem("snag_student_coins") || "150"));

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("students").select("full_name, username");
        if (error) throw error;
        
        // Simulasi kalkulasi skor
        const formattedData = (data || []).map((student, idx) => ({
          ...student, score: (student.full_name.length * 15) + (100 - idx * 5)
        })).sort((a, b) => b.score - a.score);
        setLeaderboardData(formattedData);
      } catch (err) {
        console.error("Gagal menarik data papan peringkat", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();

    // Logika durasi Splash Screen
    setTimeout(() => {
        setSplashOpacity("opacity-0");
        setTimeout(() => setShowSplash(false), 300);
    }, 600);
  }, []);

  if (!isAuth) return null;

  return (
    <div className="relative h-[100dvh] w-screen flex flex-col items-center justify-between overflow-hidden font-sans selection:bg-emerald-200 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bg-castle.webp')] before:bg-cover before:bg-center animate-fade-in">
      
       {/* ── SPLASH SCREEN LAYOUT ── */}
       {showSplash && (
           <div className={`absolute inset-0 z-[100] bg-[#FFF8DE] flex flex-col items-center justify-center transition-opacity duration-300 ${splashOpacity}`}>
               <img src="/images/1.png" alt="Loading" className="w-[15vh] animate-bounce drop-shadow-xl" />
               <p className="mt-[2vh] text-[2.5vh] font-black text-[#5C3A21] animate-pulse">Memuat Papan Juara...</p>
           </div>
       )}

       {/* ── HEADER (Tanpa Koin & Nyawa, Hanya Logo & Profil) ── */}
       <header className="w-full h-[12vh] flex justify-between items-center px-[4vw] pt-[2vh] z-40 shrink-0 pointer-events-none">
          
          <div className="h-[10vh] md:h-[12vh] aspect-square pointer-events-auto bg-white/70 backdrop-blur-md rounded-full border-[3px] border-white drop-shadow-xl flex items-center justify-center overflow-hidden scale-110 origin-top-left">
              <img src="/images/1.png" alt="Logo SNAG" className="w-[120%] h-[120%] object-contain drop-shadow-md" />
          </div>
          
          <div className="flex items-center gap-[2.5vw] h-[65%] md:h-[75%] pointer-events-auto mt-[1vh]">
             {/* Avatar (Dipertahankan) */}
             <div className="h-full aspect-square bg-slate-100 rounded-full border-[3px] border-white drop-shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                 {avatarImage ? <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover scale-125" /> : <span className="text-[2.5vh] font-black text-slate-400">{studentInitial}</span>}
             </div>
          </div>
       </header>

       {/* ── KONTEN TENGAH (PAPAN JUARA) ── */}
       {/* pt-0 agar area atas memiliki ruang maksimal */}
       <main className="flex-1 w-full max-w-[1000px] flex flex-col items-center justify-start px-[2vw] md:px-[4vw] pt-0 z-10 min-h-0">
          
          {/* Header Papan Juara & Total Peserta */}
          {/* mt-[-3vh] menarik judul dan pita ke atas menjauhi kertas */}
          <div className="w-full relative flex flex-col items-center justify-center shrink-0 mb-[1vh] mt-[-3vh]">
              
              {/* Kotak Total Peserta (Melayang di Kanan) */}
              <div className="hidden md:flex absolute right-[-7vw] top-0 flex-col items-center justify-center w-[18vw] max-w-[745px] aspect-[3/3] drop-shadow-md">
                  <img src="/images/card-level.webp" alt="Total Peserta" className="absolute inset-1 w-full h-full object-fill -z-15" />
                  <span className="text-[2.5vh] font-black text-[#8B5A33] uppercase mt-[-10%]">Peserta</span>
                  <span className="text-[3.5vh] font-black text-[#5C3A21] leading-none mt-[2%]">{isLoading ? "..." : leaderboardData.length}</span>
              </div>

              {/* Pita Judul Raksasa */}
              <div className="relative w-[45vw] max-w-[400px] aspect-[4/1] flex items-center justify-center drop-shadow-md mb-[1vh]">
                  <img src="/images/ribbon-title.webp" alt="Pita" className="absolute inset-0 w-full h-full object-fill -z-10" />
                  <h2 className="text-[3.5vh] font-black text-white uppercase tracking-widest drop-shadow-md pb-[4%] z-10">Papan Juara</h2>
              </div>
              
          </div>

          {/* Kertas Gulungan (Scroll Background) - List Siswa */}
          {/* mt-[-8vh] memberikan jarak lega dengan teks di atasnya */}
          <div className="relative w-[65vw] max-w-[1400px] flex-10 flex flex-col drop-shadow-2xl mb-[-15vh] mt-[-8vh] min-h-10 shrink-10">
              <img src="/images/bg-scroll.webp" alt="Kertas" className="absolute inset-0 w-full h-full object-fill -z-10" />
              
              {/* Area Dalam yang Bisa Digulir (Jarak Aman Kertas) */}
              <div className="absolute top-[19%] bottom-[21%] left-[17%] right-[25%] overflow-y-auto px-[2%]">
                 {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-[#8B5A33] font-bold text-[2.5vh]">
                        <img src="/images/fx-sparkles.webp" alt="Loading" className="h-[6vh] w-auto animate-spin mb-[2vh]" style={{ animationDuration: '3s' }} />
                        Mencari jejak ksatria...
                    </div>
                 ) : (
                    <div className="flex flex-col gap-[1vh] pb-[2vh]">
                       {leaderboardData.map((student, idx) => (
                           <div key={idx} className="flex items-center justify-between py-[1.5vh] border-b-[2px] border-[#8B5A33]/20 hover:bg-[#8B5A33]/5 rounded-xl px-[2%] transition-colors">
                               
                               {/* Bagian Kiri: Medali & Nama */}
                               <div className="flex items-center gap-[1.5vw] flex-1 min-w-0">
                                   
                                   {/* Rank Medali */}
                                   <div className="w-[5vh] md:w-[6vh] flex justify-center items-center shrink-0">
                                       {idx === 0 ? <img src="/images/medal-gold.webp" alt="1" className="h-[5vh] md:h-[6vh] w-auto drop-shadow-md object-contain" /> :
                                        idx === 1 ? <img src="/images/medal-silver.webp" alt="2" className="h-[5vh] md:h-[6vh] w-auto drop-shadow-md object-contain" /> :
                                        idx === 2 ? <img src="/images/medal-bronze.webp" alt="3" className="h-[5vh] md:h-[6vh] w-auto drop-shadow-md object-contain" /> :
                                        <span className="text-[2.5vh] md:text-[3vh] font-black text-[#8B5A33]">{idx + 1}</span>}
                                   </div>
                                   
                                   {/* Avatar Inisial */}
                                   <div className={`h-[4vh] md:h-[5vh] aspect-square rounded-full flex items-center justify-center font-black text-white text-[2vh] md:text-[2.5vh] shrink-0 drop-shadow-sm border-2 border-white ${idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-orange-500' : 'bg-slate-300'}`}>
                                       {student.full_name.charAt(0).toUpperCase()}
                                   </div>
                                   
                                   {/* Nama Siswa */}
                                   <div className="flex flex-col justify-center min-w-0">
                                       <p className="font-black text-[#5C3A21] text-[1.8vh] md:text-[2.2vh] leading-tight truncate">{student.full_name}</p>
                                       <p className="text-[1.2vh] md:text-[1.5vh] text-[#8B5A33]/80 font-bold truncate">@{student.username}</p>
                                   </div>
                               </div>
                               
                               {/* Bagian Kanan: Skor Akhir */}
                               <div className="shrink-0 text-right ml-[2vw]">
                                   <p className={`font-black text-[2.5vh] md:text-[3vh] ${idx === 0 ? 'text-amber-600' : 'text-[#5C3A21]'}`}>
                                      {student.score}
                                   </p>
                               </div>

                           </div>
                       ))}
                    </div>
                 )}
              </div>
          </div>

       </main>

       {/* ── NAVBAR BAWAH (Kode Manual Anda - Dipertahankan 100%) ── */}
       <div className="w-full flex justify-center shrink-0 z-30 pointer-events-none mb-[2vh]">
           <nav className="relative h-[30vh] inline-block pointer-events-auto">
               <img src="/images/nav-wood.webp" alt="Papan Navigasi" className="h-full w-auto object-contain drop-shadow-[0_-5px_25px_rgba(0,0,0,0.5)]" />
               
               <div className="absolute inset-0 flex justify-around items-end pb-[6.5%] px-[9%]">
                   
                   <Link href="/beranda" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-home.webp" alt="Beranda" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Beranda</span>
                   </Link>
                   
                   <Link href="/petualangan" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-adventure.webp" alt="Petualangan" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Petualangan</span>
                   </Link>
                   
                   {/* Tombol Pencapaian Aktif */}
                   <Link href="/pencapaian" className="h-[85%] flex flex-col items-center justify-end group transition-transform">
                       <img src="/images/icon-trophy.webp" alt="Pencapaian" className="h-[65%] w-auto object-contain drop-shadow-[0_0_20px_rgba(252,211,77,1)] scale-110 relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Pencapaian</span>
                   </Link>
                   
                   <Link href="/profil" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-profile.webp" alt="Profil" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-17%] relative z-20">Profil</span>
                   </Link>
                   
               </div>
           </nav>
       </div>

       {/* ANIMASI FADE-IN */}
       <style jsx global>{`
           @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
           .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
       `}</style>
    </div>
  );
}