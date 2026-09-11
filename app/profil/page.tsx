// app/profil/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentInitial, setStudentInitial] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [coins, setCoins] = useState(150);
  const [hearts, setHearts] = useState(5);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [regenTimeLeft, setRegenTimeLeft] = useState<number | null>(null);

  // State untuk Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [splashOpacity, setSplashOpacity] = useState("opacity-100");

  useEffect(() => {
    if (!localStorage.getItem("snag_user_id")) { window.location.replace("/auth"); return; }
    setIsAuth(true);

    const firstName = (localStorage.getItem("snag_user_name") || "Ksatria").split(" ")[0];
    setStudentName(firstName);
    setStudentInitial(firstName.charAt(0).toUpperCase());
    setAvatarImage(localStorage.getItem("snag_avatar_image") || "");
    setCoins(parseInt(localStorage.getItem("snag_student_coins") || "150"));
    setHearts(parseInt(localStorage.getItem("snag_student_hearts") || "5"));
    
    const savedProgress = localStorage.getItem("snag_completed_levels");
    if (savedProgress) setCompletedLevels(JSON.parse(savedProgress));

    // Logika animasi Splash Screen
    setTimeout(() => {
        setSplashOpacity("opacity-0");
        setTimeout(() => setShowSplash(false), 300);
    }, 600);
  }, []);

  useEffect(() => {
    if (!isAuth) return;
    const REGEN_MS = 60000;
    const interval = setInterval(() => {
      const currentStoredHearts = parseInt(localStorage.getItem("snag_student_hearts") || "5");
      setHearts(currentStoredHearts);
      if (currentStoredHearts < 5) {
        let regenStart = parseInt(localStorage.getItem("snag_regen_start") || "0");
        if (!regenStart) { regenStart = Date.now(); localStorage.setItem("snag_regen_start", regenStart.toString()); }
        const elapsed = Date.now() - regenStart;
        if (elapsed >= REGEN_MS) {
          const newHearts = Math.min(5, currentStoredHearts + 1);
          setHearts(newHearts);
          localStorage.setItem("snag_student_hearts", newHearts.toString());
          if (newHearts < 5) localStorage.setItem("snag_regen_start", Date.now().toString());
          else { localStorage.removeItem("snag_regen_start"); setRegenTimeLeft(null); }
        } else setRegenTimeLeft(Math.ceil((REGEN_MS - elapsed) / 1000));
      } else { localStorage.removeItem("snag_regen_start"); setRegenTimeLeft(null); }
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuth]);

  const buyHeart = () => {
    if (coins >= 20 && hearts < 5) {
      const newCoins = coins - 20; const newHearts = hearts + 1;
      setCoins(newCoins); setHearts(newHearts);
      localStorage.setItem("snag_student_coins", newCoins.toString());
      localStorage.setItem("snag_student_hearts", newHearts.toString());
      if (newHearts === 5) localStorage.removeItem("snag_regen_start");
    }
  };

  const buyAvatarImage = (imagePath: string, cost: number) => {
    if (coins >= cost && avatarImage !== imagePath) {
      const newCoins = coins - cost; setCoins(newCoins); setAvatarImage(imagePath);
      localStorage.setItem("snag_student_coins", newCoins.toString());
      localStorage.setItem("snag_avatar_image", imagePath);
    }
  };

  if (!isAuth) return null;
  const trueCompletedCount = completedLevels.filter(lvl => lvl !== "intro_done").length;
  const currentXP = (trueCompletedCount * 15) % 300; 

  return (
    <div className="relative h-[100dvh] w-screen flex flex-col items-center justify-between overflow-hidden font-sans selection:bg-emerald-200 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bg-forest.webp')] before:bg-cover before:bg-center before:-scale-x-100 animate-fade-in">
      
       {/* SPLASH SCREEN */}
       {showSplash && (
           <div className={`absolute inset-0 z-[100] bg-[#FFF8DE] flex flex-col items-center justify-center transition-opacity duration-300 ${splashOpacity}`}>
               <img src="/images/1.png" alt="Loading" className="w-[15vh] animate-bounce drop-shadow-xl" />
               <p className="mt-[2vh] text-[2.5vh] font-black text-[#5C3A21] animate-pulse">Memuat Profil...</p>
           </div>
       )}

       {/* ── HEADER (Sama Persis dengan Beranda & Petualangan) ── */}
       <header className="w-full h-[12vh] flex justify-between items-center px-[4vw] pt-[2vh] z-40 shrink-0 pointer-events-none">
          
          <div className="h-[10vh] md:h-[12vh] aspect-square pointer-events-auto bg-white/70 backdrop-blur-md rounded-full border-[3px] border-white drop-shadow-xl flex items-center justify-center overflow-hidden scale-110 origin-top-left">
              <img src="/images/1.png" alt="Logo SNAG" className="w-[120%] h-[120%] object-contain drop-shadow-md" />
          </div>
          
          <div className="flex items-center gap-[2.5vw] h-[65%] md:h-[75%] pointer-events-auto mt-[1vh]">
             
             
             
             {/* Avatar Profil */}
             <div className="h-full aspect-square bg-slate-100 rounded-full border-[3px] border-white drop-shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                 {avatarImage ? <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover scale-125" /> : <span className="text-[2.5vh] font-black text-slate-400">{studentInitial}</span>}
             </div>
          </div>
       </header>

       {/* KONTEN PROFIL (Dipertahankan Persis Sesuai Kode Anda) */}
       <main className="flex-1 w-full flex items-center justify-center px-[2vw] md:px-[4vw] z-10 min-h-0 pt-[2vh] pb-[1vh]">
          
          <div className="w-full max-w-[950px] h-[68vh] bg-[#C18145] rounded-[3.5vh] border-[1vh] border-[#8B5A33] drop-shadow-2xl flex flex-row p-[2vh] gap-[2vh] relative">
              
              {/* PANEL KIRI (Profil & Stat) */}
              <div className="w-[42%] bg-[#FFF5D1] rounded-[2.5vh] border-[0.5vh] border-[#EBD0A0] flex flex-col items-center justify-center py-[2vh] px-[2vh] relative shadow-inner">
                  <div className="absolute top-[-1vh] left-[15%] w-[4vh] h-[6vh] bg-sky-500/70 rounded-md rotate-[-15deg] shadow-sm"></div>

                  <div className="w-[18vh] aspect-square rounded-full border-[0.6vh] border-white ring-[0.4vh] ring-sky-200 bg-sky-100 flex items-center justify-center shadow-lg overflow-hidden shrink-0 mt-[2vh]">
                      {avatarImage ? <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover scale-125" /> : <span className="text-[7vh] font-black text-slate-400">{studentInitial}</span>}
                  </div>

                  <h2 className="text-[4vh] font-black text-[#1E3A8A] mt-[2.5vh] leading-none text-center truncate w-full">{studentName}</h2>
                  <p className="text-[2vh] font-bold text-sky-600 mt-[1vh]">Pahlawan Logika Level {Math.floor(trueCompletedCount / 3) + 1}</p>

                  <div className="w-[90%] h-[3.5vh] bg-[#A1C181] rounded-full border-[0.4vh] border-[#EBD0A0] relative overflow-hidden mt-[2.5vh] shadow-inner shrink-0">
                      <div className="absolute top-0 bottom-0 left-0 bg-[#5A8D35] transition-all duration-500" style={{ width: `${(currentXP / 300) * 100}%` }}></div>
                      <span className="absolute inset-0 flex items-center justify-center text-[1.5vh] font-black text-white drop-shadow-md tracking-wider">
                          {currentXP} / 300 XP
                      </span>
                  </div>

                  <div className="w-full flex gap-[1.5vh] mt-auto pt-[2vh]">
                      <div className="flex-1 bg-[#FEF9E7] border-[0.4vh] border-[#EBD0A0] rounded-[2vh] flex flex-col items-center justify-center py-[1.5vh] shadow-sm">
                          <span className="text-[1.4vh] font-bold text-[#8B5A33]">Koin Emas</span>
                          <div className="flex items-center gap-[0.5vh] mt-[0.5vh]">
                              <img src="/images/icon-coin.webp" className="h-[4vh] w-auto drop-shadow-sm" />
                              <span className="text-[3.5vh] font-black text-[#5C3A21]">{coins}</span>
                          </div>
                      </div>
                      <div className="flex-1 bg-[#FEF9E7] border-[0.4vh] border-[#EBD0A0] rounded-[2vh] flex flex-col items-center justify-center py-[1.5vh] shadow-sm">
                          <span className="text-[1.4vh] font-bold text-[#8B5A33]">Status Nyawa</span>
                          <div className="flex items-center gap-[0.5vh] mt-[0.5vh]">
                              <span className="text-[3.5vh] font-black text-rose-500 flex items-center gap-[0.5vh]"><img src="/images/icon-heart.webp" className="h-[3.5vh] w-auto"/>{hearts}</span>
                              {regenTimeLeft ? (
                                  <span className="text-[1.4vh] font-black text-slate-500 bg-slate-200 px-[0.8vh] py-[0.2vh] rounded-md">{regenTimeLeft}s</span>
                              ) : (
                                  <span className="text-[1.4vh] font-black text-emerald-600 bg-emerald-100 px-[0.8vh] py-[0.2vh] rounded-md border border-emerald-200">Penuh</span>
                              )}
                          </div>
                      </div>
                  </div>
              </div>

              {/* PANEL KANAN (Toko Medis & Koleksi) */}
              <div className="w-[58%] flex flex-col gap-[2vh]">
                  
                  {/* Toko Medis */}
                  <div className="flex-[0.35] bg-[#FFF5D1] rounded-[2.5vh] border-[0.5vh] border-[#EBD0A0] p-[2vh] flex flex-col shadow-inner">
                      <h3 className="text-[2.2vh] font-black text-[#8B5A33] flex items-center gap-[1vh]">
                         <div className="w-[3.5vh] h-[3.5vh] bg-rose-500 rounded-md flex items-center justify-center text-white font-black text-[2.5vh] pb-[0.3vh] shadow-sm">+</div>
                         TOKO MEDIS
                      </h3>
                      
                      <div className="flex-1 bg-[#FEF9E7] border-[0.4vh] border-[#EBD0A0] rounded-[2vh] mt-[1.5vh] px-[2.5vh] py-[1vh] flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-[2vh]">
                              <div className="h-[8vh] aspect-square bg-white rounded-full border-[0.4vh] border-rose-200 flex items-center justify-center shadow-sm shrink-0">
                                 <img src="/images/icon-heart.webp" className="h-[5vh] w-auto drop-shadow-sm animate-pulse" />
                              </div>
                              <div className="flex flex-col">
                                  <p className="font-black text-[#5C3A21] text-[2.5vh] leading-tight">Pemulihan Instan</p>
                                  <p className="font-bold text-[#8B5A33]/80 text-[1.8vh]">Isi ulang 1 nyawa</p>
                              </div>
                          </div>
                          
                          <button onClick={buyHeart} disabled={coins < 20 || hearts >= 5} className="relative w-[15vh] md:w-[18vh] aspect-[3/1] flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-transform drop-shadow-md shrink-0">
                              <img src="/images/btn-green.webp" alt="Beli" className="absolute inset-0 w-full h-full object-fill -z-10" />
                              <div className="flex items-center gap-[0.5vh] z-10 pb-[4%]">
                                  <img src="/images/icon-coin.webp" alt="Koin" className="h-[3vh] w-auto object-contain" />
                                  <span className="text-[2.5vh] font-black text-white drop-shadow-sm">20</span>
                              </div>
                          </button>
                      </div>
                  </div>

                  {/* Koleksi Avatar */}
                  <div className="flex-[0.65] bg-[#FFF5D1] rounded-[2.5vh] border-[0.5vh] border-[#EBD0A0] p-[2vh] flex flex-col shadow-inner min-h-0">
                      <h3 className="text-[2.2vh] font-black text-[#8B5A33] flex items-center gap-[1vh]">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-[3.5vh] h-[3.5vh] text-sky-500 stroke-[4px]"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                         KOLEKSI AVATAR
                      </h3>
                      
                      <div className="flex-1 grid grid-cols-4 gap-[2vh] mt-[1.5vh] min-h-0 pb-[0.5vh]">
                          {[1, 2, 3, 4].map((num) => (
                              <button key={num} onClick={() => buyAvatarImage(`/images/avatar-${num}.webp`, 50)} className={`w-full h-full rounded-[2vh] border-[0.5vh] transition-all overflow-hidden relative group shadow-sm flex items-center justify-center ${avatarImage === `/images/avatar-${num}.webp` ? 'border-emerald-400 bg-emerald-100/50' : 'border-[#EBD0A0] bg-[#FEF9E7] hover:border-[#8B5A33]/50'}`}>
                                  <img src={`/images/avatar-${num}.webp`} alt={`Avatar ${num}`} className="w-[75%] h-auto object-contain transition-transform group-hover:scale-110" onError={(e) => { e.currentTarget.src = "/images/1.png"; }} />
                                  
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                      <span className="text-white font-black text-[2vh] bg-black/60 px-[1.5vh] py-[0.3vh] rounded-full flex items-center gap-[0.5vh]">
                                          <img src="/images/icon-coin.webp" className="h-[2vh] w-auto"/> 50
                                      </span>
                                  </div>
                                  
                                  {avatarImage === `/images/avatar-${num}.webp` && (
                                      <div className="absolute top-[0.8vh] right-[0.8vh] bg-emerald-500 rounded-full p-[0.4vh] shadow-sm">
                                          <svg viewBox="0 0 24 24" fill="none" stroke="white" className="w-[2vh] h-[2vh] stroke-[4px]"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                      </div>
                                  )}
                              </button>
                          ))}
                      </div>
                  </div>

              </div>
          </div>
       </main>

       {/* NAVBAR BAWAH (Profil Glow) */}
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
                   
                   <Link href="/pencapaian" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-trophy.webp" alt="Pencapaian" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Pencapaian</span>
                   </Link>
                   
                   <Link href="/profil" className="h-[85%] flex flex-col items-center justify-end group transition-transform">
                       <img src="/images/icon-profile.webp" alt="Profil" className="h-[65%] w-auto object-contain drop-shadow-[0_0_20px_rgba(252,211,77,1)] scale-110 relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-17%] relative z-20">Profil</span>
                   </Link>
                   
               </div>
           </nav>
       </div>

       {/* Style untuk animasi Splash */}
       <style jsx global>{`
           @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
           .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
       `}</style>
    </div>
  );
}