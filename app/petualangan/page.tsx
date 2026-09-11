// app/petualangan/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";

// Struktur 8 Level (Materi CT Kelas 8)
// -- REVISI: Properti id telah disesuaikan agar cocok dengan kunci rute workspace --
const LEVEL_DATA = [
  { id: "level-1", number: 1, title: "Pola & Algoritma", desc: "Memahami bagian dari gambar", imageSrc: "/images/unit-1.webp", flagColor: "bg-emerald-500" },
  { id: "level-2", number: 2, title: "Logika Bersyarat", desc: "Menemukan aturan", imageSrc: "/images/unit-2.webp", flagColor: "bg-amber-400" },
  { id: "level-3", number: 3, title: "Rute & Kriptografi", desc: "Memahami koordinat", imageSrc: "/images/unit-3.webp", flagColor: "bg-sky-500" },
  { id: "level-4", number: 4, title: "Simulasi & Jejak", desc: "Melacak pola pergerakan", imageSrc: "/images/unit-4.webp", flagColor: "bg-emerald-500" },
  { id: "level-5", number: 5, title: "Penyaringan Data", desc: "Menganalisis aliran kondisi", imageSrc: "/images/unit-5.webp", flagColor: "bg-amber-400" },
  { id: "level-6", number: 6, title: "Segera Hadir", desc: "Misteri logika baru", imageSrc: "/images/unit-6.webp", flagColor: "bg-slate-400", isComingSoon: true },
  { id: "level-7", number: 7, title: "Segera Hadir", desc: "Tantangan rahasia", imageSrc: "/images/unit-6.webp", flagColor: "bg-slate-400", isComingSoon: true },
  { id: "level-8", number: 8, title: "Segera Hadir", desc: "Level master logika", imageSrc: "/images/unit-6.webp", flagColor: "bg-slate-400", isComingSoon: true },
];

export default function PetualanganPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [studentInitial, setStudentInitial] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [coins, setCoins] = useState(150);
  const [hearts, setHearts] = useState(5);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);

  // State khusus untuk Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [splashOpacity, setSplashOpacity] = useState("opacity-100");

  useEffect(() => {
    const userId = localStorage.getItem("snag_user_id");
    if (!userId) { window.location.replace("/auth"); return; }
    setIsAuth(true); 

    const firstName = (localStorage.getItem("snag_user_name") || "Ksatria").split(" ")[0];
    setStudentInitial(firstName.charAt(0).toUpperCase());
    setAvatarImage(localStorage.getItem("snag_avatar_image") || "");
    setHearts(parseInt(localStorage.getItem("snag_student_hearts") || "5"));
    setCoins(parseInt(localStorage.getItem("snag_student_coins") || "150"));
    
    const savedProgress = localStorage.getItem("snag_completed_levels");
    if (savedProgress) setCompletedLevels(JSON.parse(savedProgress));

    // Logika durasi Splash Screen
    setTimeout(() => {
        setSplashOpacity("opacity-0");
        setTimeout(() => setShowSplash(false), 300);
    }, 600);
  }, []);

  const handleLevelClick = (level: any, isLocked: boolean) => {
    if (level.isComingSoon) { alert("Sabar ya ksatria, unit ini masih dalam tahap pembangunan!"); return; }
    if (isLocked) { alert("Tantangan ini masih terkunci! Selesaikan level sebelumnya."); return; }
    if (hearts <= 0) { alert("Nyawa habis. Tunggu pemulihan atau beli di Profil."); return; }
    router.push(`/workspace/${level.id}`);
  };

  if (!isAuth) return null; 

  const trueCompletedCount = completedLevels.filter(lvl => lvl !== "intro_done").length;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start overflow-hidden font-sans selection:bg-emerald-200 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bg-forest.webp')] before:bg-cover before:bg-center before:-scale-x-100 animate-fade-in">
      
       {/* ── SPLASH SCREEN LAYOUT ── */}
       {showSplash && (
           <div className={`absolute inset-0 z-[100] bg-[#FFF8DE] flex flex-col items-center justify-center transition-opacity duration-300 ${splashOpacity}`}>
               <img src="/images/1.png" alt="Loading" className="w-[15vh] animate-bounce drop-shadow-xl" />
               <p className="mt-[2vh] text-[2.5vh] font-black text-[#5C3A21] animate-pulse">Mempersiapkan Peta...</p>
           </div>
       )}

       {/* ── HEADER (Sama Persis dengan Beranda) ── */}
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

       {/* KONTEN TENGAH (MENGGUNAKAN PADDING BAWAH / pb-[22vh] AGAR TIDAK TERTUTUP NAVBAR) */}
       <main className="flex-1 w-full max-w-[1200px] flex flex-col items-center justify-center px-[2vw] z-10 pb-[22vh]">
          
          <div className="flex flex-col items-center mb-[2vh] shrink-0">
              <div className="relative w-[50vw] max-w-[600px] aspect-[5/1] flex items-center justify-center drop-shadow-md">
                  <img src="/images/ribbon-title.webp" alt="Pita" className="absolute inset-0 w-full h-full object-fill -z-10" />
                  <h2 className="text-[3vh] md:text-[3.5vh] font-black text-white uppercase tracking-widest drop-shadow-sm pb-[2%] z-10 whitespace-nowrap px-[4vw]">PILIH UNIT PETUALANGAN</h2>
              </div>
              
          </div>

          <div className="w-full flex flex-row shrink-0 gap-[2vw] items-center px-[2vw]">
              
              {/* AREA KARTU (TERKUNCI MATI DENGAN UKURAN VH) */}
              <div className="flex-1 flex flex-row overflow-x-auto overflow-y-hidden gap-[2vw] pb-[2vh] custom-scrollbar snap-x snap-mandatory items-center px-[1vw]">
                  {LEVEL_DATA.map((level, idx) => {
                      const flatLevels = LEVEL_DATA.filter(l => !l.isComingSoon).map(l => l.id);
                      const isCompleted = !level.isComingSoon && completedLevels.includes(level.id);
                      const isPrevCompleted = idx === 0 || completedLevels.includes(flatLevels[idx - 1]) || (idx === 0 && completedLevels.includes("intro_done"));
                      
                      const isActive = !level.isComingSoon && !isCompleted && isPrevCompleted;
                      const isLocked = level.isComingSoon || (!isCompleted && !isActive);

                      const cardBg = level.isComingSoon ? 'bg-[#E2E8F0] border-[#CBD5E1]' : 'bg-[#FFF8DE] border-[#E5C99F]';
                      const titleColor = level.isComingSoon ? 'text-slate-500' : 'text-[#5C3A21]';
                      const descColor = level.isComingSoon ? 'text-slate-400' : 'text-[#8B5A33]/80';
                      
                      return (
                          /* KARTU DIKUNCI MATI (32vh x 46vh) */
                          <div key={level.id} className={`relative w-[32vh] h-[46vh] shrink-0 snap-center ${cardBg} border-[0.6vh] rounded-[3vh] flex flex-col items-center p-[2vh] shadow-lg transition-transform ${isLocked && !level.isComingSoon ? 'opacity-80' : 'hover:-translate-y-2'}`}>
                              
                              <div className={`absolute top-[-0.6vh] left-[2vh] w-[5vh] h-[6.5vh] ${level.flagColor} shadow-md flex items-start justify-center pt-[1vh] z-10 border-b-[0.4vh] border-black/10`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                                  <span className="text-white font-black text-[2.5vh] leading-none drop-shadow-sm">{level.number}</span>
                              </div>

                              <div className="h-[40%] w-full flex items-center justify-center mt-[2vh] z-0">
                                  <img src={level.imageSrc} alt={level.title} className={`w-full h-full object-contain drop-shadow-md origin-center ${isActive ? 'animate-breathe' : level.isComingSoon ? 'grayscale opacity-60 scale-[1.2]' : isCompleted ? 'scale-[1.4]' : 'scale-[1.4] opacity-80'}`} onError={(e) => { e.currentTarget.src = "/images/1.png"; }} />
                              </div>

                              <div className="flex-1 flex flex-col items-center justify-start w-full px-[1vh] text-center border-t-[0.3vh] border-dashed border-[#E5C99F]/50 pt-[1.5vh] mt-[3vh] z-10">
                                  {level.isComingSoon ? (
                                      <div className="bg-slate-300 w-[60%] h-[2vh] rounded-full mb-[1vh]"></div>
                                  ) : (
                                      <h3 className={`text-[2.2vh] font-black ${titleColor} leading-tight`}>{level.title}</h3>
                                  )}
                                  
                                  {level.isComingSoon ? (
                                      <div className="bg-slate-300 w-[40%] h-[1.5vh] rounded-full mt-[1vh]"></div>
                                  ) : (
                                      <p className={`text-[1.4vh] font-bold ${descColor} mt-[1vh] leading-tight`}>{level.desc}</p>
                                  )}
                              </div>

                              <button onClick={() => handleLevelClick(level, isLocked)} className={`w-[90%] h-[12%] shrink-0 rounded-[1.5vh] flex items-center justify-center font-black text-[1.8vh] shadow-sm transition-transform mt-auto mb-[1vh] active:scale-95 z-10 ${
                                  isCompleted ? 'bg-emerald-500 text-white border-[0.4vh] border-emerald-600' : 
                                  isActive ? 'bg-emerald-500 text-white hover:scale-105 border-[0.4vh] border-emerald-600 shadow-md' : 
                                  'bg-slate-300 text-slate-500 cursor-not-allowed border-[0.4vh] border-slate-400'
                              }`}>
                                  {isCompleted ? "Selesai" : isActive ? "Mulai" : level.isComingSoon ? <><Lock className="w-[2vh] h-[2vh] mr-[0.5vh]" /> Segera Hadir</> : <><Lock className="w-[2vh] h-[2vh] mr-[0.5vh]" /> Terkunci</>}
                              </button>
                          </div>
                      );
                  })}
              </div>

              {/* AREA KANAN: PANEL BINTANG CT */}
              <div className="hidden lg:flex w-[28vh] h-[46vh] shrink-0 bg-[#FFF8DE] border-[0.6vh] border-[#E5C99F] rounded-[3vh] flex-col items-center shadow-lg relative px-[2vh] pt-[5vh] pb-[2vh]">
                  <div className="absolute top-[-2.5vh] w-[6vh] h-[6vh] bg-rose-500 rounded-full border-[0.5vh] border-white shadow-md flex items-center justify-center rotate-12">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[3.5vh] h-[3.5vh] text-white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                  <p className="text-[1.6vh] font-black text-[#8B5A33] text-center leading-tight uppercase mt-[1vh]">Bintang CT<br/>Terkumpul</p>
                  
                  <div className="mt-[2vh] flex items-center justify-center w-[80%] pb-[2vh] border-b-[0.4vh] border-[#E5C99F]/50">
                      <span className="text-[4.5vh] font-black text-[#5C3A21] leading-none">{trueCompletedCount} <span className="text-[2.2vh] text-[#8B5A33]/50">/ 15</span></span>
                  </div>

                  <div className="flex-1 w-full flex items-center justify-center mt-[1vh]">
                      <img src="/images/icon-trophy.webp" alt="Peti Harta" className="max-h-full w-auto object-contain drop-shadow-xl" onError={(e) => { e.currentTarget.src = "/images/1.png"; }} />
                  </div>
              </div>
          </div>
       </main>

       {/* NAVBAR BAWAH (MELAYANG ABSOLUT DI BAWAH LAYAR) */}
       <div className="absolute bottom-[2vh] w-full flex justify-center z-30 pointer-events-none">
           <nav className="relative h-[30vh] inline-block pointer-events-auto">
               <img src="/images/nav-wood.webp" alt="Papan Navigasi" className="h-full w-auto object-contain drop-shadow-[0_-5px_25px_rgba(0,0,0,0.5)]" />
               
               <div className="absolute inset-0 flex justify-around items-end pb-[6.5%] px-[9%]">
                   <Link href="/beranda" className="h-[85%] flex flex-col items-center justify-end group hover:-translate-y-2 transition-transform opacity-90 hover:opacity-100">
                       <img src="/images/icon-home.webp" alt="Beranda" className="h-[65%] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                       <span className="text-[1.8vh] font-black text-amber-100 uppercase drop-shadow-md tracking-wider mt-[-10%] relative z-20">Beranda</span>
                   </Link>
                   
                   <Link href="/petualangan" className="h-[85%] flex flex-col items-center justify-end group transition-transform">
                       <img src="/images/icon-adventure.webp" alt="Petualangan" className="h-[65%] w-auto object-contain drop-shadow-[0_0_20px_rgba(252,211,77,1)] scale-110 relative z-10" />
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
       
       <style jsx global>{`
           @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
           .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
           
           @keyframes breathe {
               0%, 100% { transform: scale(1.4); }
               50% { transform: scale(1.48); }
           }
           .animate-breathe {
               animation: breathe 3s ease-in-out infinite;
           }

           .custom-scrollbar::-webkit-scrollbar { height: 1.5vh; } 
           .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.4); border-radius: 1.5vh; margin: 0 1vw; } 
           .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139, 90, 51, 0.6); border-radius: 1.5vh; border: 0.3vh solid transparent; background-clip: padding-box; } 
           .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(139, 90, 51, 0.9); border: 0.3vh solid transparent; background-clip: padding-box; }
       `}</style>
    </div>
  );
}