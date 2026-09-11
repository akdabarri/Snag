// app/beranda/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BerandaPage() {
  const [isAuth, setIsAuth] = useState(false); 
  const [studentName, setStudentName] = useState("");
  const [studentInitial, setStudentInitial] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [streak, setStreak] = useState(1);
  const [coins, setCoins] = useState(150);
  const [hearts, setHearts] = useState(5);
  const [completedCount, setCompletedCount] = useState(0);

  // State khusus untuk Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [splashOpacity, setSplashOpacity] = useState("opacity-100");

  useEffect(() => {
    const userId = localStorage.getItem("snag_user_id");
    if (!userId) { window.location.replace("/auth"); return; }
    setIsAuth(true);

    const fullName = localStorage.getItem("snag_user_name") || "Ksatria";
    const firstName = fullName.split(" ")[0]; 
    setStudentName(firstName);
    setStudentInitial(firstName.charAt(0).toUpperCase());
    setAvatarImage(localStorage.getItem("snag_avatar_image") || "");
    setHearts(parseInt(localStorage.getItem("snag_student_hearts") || "5"));
    setCoins(parseInt(localStorage.getItem("snag_student_coins") || "150"));
    
    const savedProgress = localStorage.getItem("snag_completed_levels");
    if (savedProgress) setCompletedCount(JSON.parse(savedProgress).filter((lvl: string) => lvl !== "intro_done").length);

    // Logika durasi Splash Screen
    setTimeout(() => {
        setSplashOpacity("opacity-0");
        setTimeout(() => setShowSplash(false), 300);
    }, 600);
  }, []);

  const getMascotExpression = () => {
    if (hearts <= 0) return { image: "/images/mascot-sad.webp", message: "Aduh, nyawaku habis..." };
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 15) return { image: "/images/mascot-happy.webp", message: "Pagi yang cerah untuk CT!" };
    if (hour >= 15 && hour < 18) return { image: "/images/mascot-chill.webp", message: "Sore santai, yuk lanjut!" };
    return { image: "/images/mascot-sleepy.webp", message: "Hoam.. masih semangat belajar?" };
  };

  if (!isAuth) return null;
  const currentMascot = getMascotExpression();

  return (
   <div className="relative h-[100dvh] w-screen flex flex-col items-center justify-between overflow-hidden font-sans selection:bg-emerald-200 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bg-forest.webp')] before:bg-cover before:bg-center before:-scale-x-100 animate-fade-in">
      
       {/* ── SPLASH SCREEN LAYOUT ── */}
       {showSplash && (
           <div className={`absolute inset-0 z-[100] bg-[#FFF8DE] flex flex-col items-center justify-center transition-opacity duration-300 ${splashOpacity}`}>
               <img src="/images/1.png" alt="Loading" className="w-[15vh] animate-bounce drop-shadow-xl" />
               <p className="mt-[2vh] text-[2.5vh] font-black text-[#5C3A21] animate-pulse">Memuat Beranda...</p>
           </div>
       )}
       
       {/* ── HEADER (Telah Diperbarui) ── */}
       <header className="w-full h-[12vh] flex justify-between items-center px-[4vw] pt-[2vh] z-40 shrink-0 pointer-events-none">
          
          <div className="h-[10vh] md:h-[12vh] aspect-square pointer-events-auto bg-white/70 backdrop-blur-md rounded-full border-[3px] border-white drop-shadow-xl flex items-center justify-center overflow-hidden scale-110 origin-top-left">
              <img src="/images/1.png" alt="Logo SNAG" className="w-[120%] h-[120%] object-contain drop-shadow-md" />
          </div>
          
          <div className="flex items-center gap-[2.5vw] h-[65%] md:h-[75%] pointer-events-auto mt-[1vh]">
             
             {/* Koin & Nyawa yang Jauh Lebih Lebar dan Jelas */}
             <div className="flex items-center justify-center h-full px-[3vw] relative drop-shadow-md rounded-[10vh]">
                 {/* Latar Kertas */}
                 <img src="/images/header-pill.webp" alt="Alas" className="absolute inset-0 w-full h-full object-fill z-0 rounded-[10vh]" />
                 
                 <div className="flex items-center justify-center gap-[1.5vw] z-10 w-full">
                    {/* Seksi Koin */}
                    <div className="flex items-center gap-[0.5vw]">
                        <img src="/images/icon-coin.webp" alt="Koin" className="h-[4.5vh] w-auto drop-shadow-sm object-contain" />
                        <span className="text-[2.5vh] font-black text-amber-700">{coins}</span>
                    </div>
                    
                    {/* Garis Pemisah */}
                    <div className="w-[3px] h-[5vh] bg-orange-300 rounded-full"></div>
                    
                    {/* Seksi Hati (Anti Gepeng) */}
                    <div className="flex items-center gap-[0.5vw]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <img key={i} src="/images/icon-heart.webp" alt="Nyawa" className={`h-[4.5vh] w-auto object-contain ${i < hearts ? 'opacity-100 drop-shadow-sm' : 'opacity-30 grayscale'}`} />
                        ))}
                    </div>
                 </div>
             </div>
             
             {/* Avatar Profil */}
             <div className="h-full aspect-square bg-slate-100 rounded-full border-[3px] border-white drop-shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                 {avatarImage ? <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover scale-125" /> : <span className="text-[2.5vh] font-black text-slate-400">{studentInitial}</span>}
             </div>
          </div>
       </header>

       {/* ── KONTEN TENGAH (Dipertahankan Sesuai Keinginan Anda) ── */}
       <main className="flex-1 w-full flex flex-row items-center justify-center px-[2vw] gap-[2vw] z-10 min-h-0">
          
          <div className="relative h-[110vh] inline-block drop-shadow-2xl shrink-0">
             <img src="/images/board-main.webp" alt="Papan Utama" className="h-full w-auto object-contain" />
             
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="flex flex-col items-center justify-center w-[75%] h-[65%] text-center z-10 mt-[2%]">
                     <h1 className="text-[4.5vh] font-black text-[#5C3A21] drop-shadow-sm leading-none">Halo, {studentName}!</h1>
                     <p className="text-[2.2vh] font-bold text-[#8B5A33] mt-[3%] mb-[8%] leading-tight">Siap berpetualang hari ini?<br/>Yuk, asah logikamu!</p>
                     
                     <Link href="/petualangan" className="relative h-[22%] inline-block hover:scale-105 active:scale-95 transition-transform drop-shadow-md cursor-pointer">
                        <img src="/images/btn-green.webp" alt="Tombol" className="h-full w-auto object-contain" />
                        <div className="absolute inset-0 flex items-center justify-center pb-[3%]">
                            <span className="text-[2.2vh] font-black text-white drop-shadow-md z-10">Mulai Petualangan ➔</span>
                        </div>
                     </Link>
                 </div>
             </div>
          </div>
          
          <div className="hidden lg:flex flex-col items-center justify-center relative h-[50vh] shrink-0">
             <div className="absolute bottom-[10%] w-[60%] h-[8%] bg-black/30 blur-md rounded-full"></div>
             <img src={currentMascot.image} alt="Maskot SNAG" className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-bounce z-10" style={{ animationDuration: '3.5s' }} onError={(e) => { e.currentTarget.src = "/images/1.png"; }} />
          </div>

       </main>

       {/* ── NAVBAR BAWAH (Dipertahankan Sesuai Keinginan Anda) ── */}
       <div className="w-full flex justify-center shrink-0 z-30 pointer-events-none mb-[2vh]">
           <nav className="relative h-[30vh] inline-block pointer-events-auto">
               <img src="/images/nav-wood.webp" alt="Papan Navigasi" className="h-full w-auto object-contain drop-shadow-[0_-5px_25px_rgba(0,0,0,0.5)]" />
               
               <div className="absolute inset-0 flex justify-around items-end pb-[6.5%] px-[9%]">
                   
                   <Link href="/beranda" className="h-[85%] flex flex-col items-center justify-end group transition-transform">
                       <img src="/images/icon-home.webp" alt="Beranda" className="h-[65%] w-auto object-contain drop-shadow-[0_0_20px_rgba(252,211,77,1)] scale-110 relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Beranda</span>
                   </Link>
                   
                   <Link href="/petualangan" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-adventure.webp" alt="Petualangan" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Petualangan</span>
                   </Link>
                   
                   <Link href="/pencapaian" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-trophy.webp" alt="Pencapaian" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
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