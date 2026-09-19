// app/auth/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const [secretClickCount, setSecretClickCount] = useState(0);
  const [isEducatorMode, setIsEducatorMode] = useState(false);

  const cleanUsername = (str: string) => str.trim().toLowerCase().replace(/\s+/g, "");
  
  // Regex yang sudah diperbaiki (memperbolehkan simbol, wajib 8 karakter)
  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(pwd);
  };

  const handleSecretTrigger = () => {
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    if (newCount >= 5) {
      setIsEducatorMode(!isEducatorMode);
      setSecretClickCount(0); 
      setMessage({ text: !isEducatorMode ? "Akses Peneliti Terbuka 📊" : "Kembali ke Mode Siswa 🎮", isError: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", isError: false });

    const targetUsername = cleanUsername(username);

    try {
      if (isRegister) {
        // ================== REGISTER ==================
        if (!validatePassword(password)) {
          setMessage({ text: "Ups! Kata sandimu kurang kuat. Gunakan minimal 8 karakter dengan campuran huruf dan angka ya!", isError: true });
          setLoading(false);
          return; 
        }

        const { data: existingStudent, error: checkError } = await supabase
          .from("students")
          .select("username")
          .eq("username", targetUsername);

        if (checkError) {
          setMessage({ text: `Database Error: ${checkError.message}`, isError: true });
          setLoading(false);
          return;
        }
        
        if (existingStudent && existingStudent.length > 0) {
          setMessage({ text: "Username ini sudah dipakai pahlawan lain. Coba pakai nama yang lebih unik!", isError: true });
          setLoading(false);
          return;
        }

        const { error: insertError } = await supabase
          .from("students")
          .insert([
            {
              username: targetUsername,
              full_name: fullName.trim(),
              password: password,
            },
          ]);

        if (insertError) {
          console.error("SUPABASE INSERT ERROR:", insertError);
          setMessage({ text: `Gagal dari Supabase: ${insertError.message}`, isError: true });
          setLoading(false);
          return;
        }

        setMessage({ text: "Yey! Akun SNAG berhasil dibuat. Sekarang kamu bisa masuk!", isError: false });
        setIsRegister(false);
        setPassword("");
        setFullName("");

      } else {
// ================== LOGIN ==================
        const { data: student, error: loginError } = await supabase
          .from("students")
          .select("*")
          .eq("username", targetUsername)
          .eq("password", password)
          .single();

        if (loginError || !student) {
          setMessage({ text: "Hmm, Username atau Kata Sandi sepertinya salah. Coba dicek lagi ya!", isError: true });
          setLoading(false);
          return;
        }

        // SIMPAN IDENTITAS LOKAL (Role ditentukan oleh UI, bukan Database)
        localStorage.setItem("snag_user_id", student.id);
        localStorage.setItem("snag_user_name", student.full_name);
        localStorage.setItem("snag_user_role", isEducatorMode ? "teacher" : "student");
        
        // ─── FIX SINKRONISASI DATABASE KE LOKAL ───
        localStorage.setItem("snag_student_hearts", (student.current_hearts ?? 5).toString());
        localStorage.setItem("snag_student_coins", (student.coins ?? 0).toString()); // 👈 Tarik koin dari DB!
        
        if (student.avatar_image) {
          localStorage.setItem("snag_avatar_image", student.avatar_image);
        }
        if (student.owned_avatars) {
          localStorage.setItem("snag_owned_avatars", JSON.stringify(student.owned_avatars));
        }

        setMessage({ text: "Koneksi sukses! Menyiapkan ruang belajarmu...", isError: false });
                
        // SMART ROUTING
        setTimeout(() => {
          if (isEducatorMode) {
            router.replace("/analytics"); 
          } else {
            const isNewPlayer = !student.current_unit || student.current_unit === 0;
            if (isNewPlayer) {
              router.replace("/introduction"); 
            } else {
              router.replace("/beranda"); 
            }
          }
        }, 1500);
      }
    } catch (error: any) {
      console.error("SNAG System Error:", error);
      setMessage({ text: `Sistem Error: ${error.message}`, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative min-h-[100dvh] w-screen flex flex-col items-center justify-center p-4 font-sans selection:bg-sky-200 transition-colors duration-500 overflow-hidden before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bg-forest.webp')] before:bg-cover before:bg-center before:-scale-x-100 ${isEducatorMode ? 'text-slate-100 selection:text-slate-900 before:brightness-50' : 'text-slate-900 selection:text-sky-900'}`}>
      
      {/* Tombol Back ke Beranda (Luar) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <Link 
          href="/" 
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black transition-colors shadow-md border-[3px] drop-shadow-sm ${
            isEducatorMode 
              ? 'bg-slate-800/90 backdrop-blur-md text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white' 
              : 'bg-white/90 backdrop-blur-md text-slate-700 border-white hover:bg-sky-100 hover:text-sky-700'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
             <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </Link>
      </div>

      <div className={`p-8 rounded-[2.5rem] border-4 shadow-2xl max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 relative z-10 transition-all ${isEducatorMode ? 'bg-slate-800/95 backdrop-blur-md border-slate-700' : 'bg-white/95 backdrop-blur-md border-white'}`}>
        
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors ${isEducatorMode ? 'bg-sky-900/40' : 'bg-sky-50'}`} />
        <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors ${isEducatorMode ? 'bg-emerald-900/40' : 'bg-emerald-50'}`} />

        <div className="space-y-3 relative z-10">
          <div className="flex justify-center mb-2" onClick={handleSecretTrigger} style={{ cursor: "pointer" }} title="SNAG Platform">
            <img 
              src="/images/1.png" 
              alt="Logo SNAG Platform" 
              className="h-20 md:h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            {isEducatorMode ? "Akses Peneliti Utama" : (isRegister ? "Pendaftaran SNAG" : "Masuk ke SNAG")}
          </h1>
          <p className={`text-sm font-medium leading-relaxed ${isEducatorMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {isEducatorMode 
              ? "Dasbor Analitik dan Pemantauan Kognitif" 
              : (isRegister ? "Jadilah pahlawan logika dan asah kemampuan Computational Thinking-mu!" : "Mulai petualangan numerasi seru berbasis kecerdasan buatan!")}
          </p>
        </div>

        {message.text && (
          <div className={`relative z-10 p-4 rounded-2xl text-xs font-bold border-2 leading-relaxed text-left ${
            message.isError 
              ? "bg-rose-50 border-rose-200 text-rose-600 animate-[shake_0.4s_ease]" 
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            {message.isError ? "⚠️ " : "✅ "} {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-left space-y-4 relative z-10">
          
          {isRegister && (
            <div className="space-y-1.5">
              <label className={`block text-xs font-bold px-1 ${isEducatorMode ? 'text-slate-300' : 'text-slate-600'}`}>Nama Lengkap Pahlawan</label>
              <input
                type="text"
                required
                placeholder="Misal: Budi Santoso"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm transition-all font-semibold ${isEducatorMode ? 'bg-slate-700/50 border-slate-600 text-white focus:border-sky-500 focus:bg-slate-700' : 'bg-slate-50/50 border-slate-200 text-slate-700 focus:border-sky-400 focus:bg-white'}`}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className={`block text-xs font-bold px-1 ${isEducatorMode ? 'text-slate-300' : 'text-slate-600'}`}>Username Unik</label>
            <input
              type="text"
              required
              placeholder={isEducatorMode ? "ID Akses Peneliti" : "Misal: budi2026"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm transition-all font-semibold ${isEducatorMode ? 'bg-slate-700/50 border-slate-600 text-white focus:border-sky-500 focus:bg-slate-700' : 'bg-slate-50/50 border-slate-200 text-slate-700 focus:border-sky-400 focus:bg-white'}`}
            />
          </div>

          <div className="space-y-1.5">
            <label className={`block text-xs font-bold px-1 ${isEducatorMode ? 'text-slate-300' : 'text-slate-600'}`}>Kata Sandi Rahasia</label>
            <input
              type="password"
              required
              placeholder="Masukkan sandi rahasiamu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm transition-all font-semibold ${isEducatorMode ? 'bg-slate-700/50 border-slate-600 text-white focus:border-sky-500 focus:bg-slate-700' : 'bg-slate-50/50 border-slate-200 text-slate-700 focus:border-sky-400 focus:bg-white'}`}
            />
            {isRegister && (
              <p className={`text-[10px] font-medium px-1 mt-1 ${isEducatorMode ? 'text-sky-400' : 'text-slate-400'}`}>
                *Wajib 8 karakter dengan campuran huruf & angka ya!
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 mt-2 font-extrabold rounded-2xl text-sm transition-all border-b-4 shadow-md flex items-center justify-center gap-2 ${
              isEducatorMode 
                ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-800 disabled:bg-slate-700 disabled:border-slate-800 disabled:text-slate-500'
                : 'bg-sky-500 hover:bg-sky-600 text-white border-sky-700 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400'
            }`}
          >
            {loading ? "Menyiapkan Arena..." : isRegister ? "Daftar Sekarang 🚀" : (isEducatorMode ? "Akses Dasbor Analitik 📊" : "Mulai Belajar 🎮")}
          </button>
        </form>

        <div className={`pt-3 border-t relative z-10 ${isEducatorMode ? 'border-slate-700' : 'border-slate-100'}`}>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage({ text: "", isError: false });
              setUsername("");
              setPassword("");
              setFullName("");
            }}
            className={`text-xs font-bold hover:underline transition-colors ${isEducatorMode ? 'text-slate-400 hover:text-white' : 'text-sky-600 hover:text-sky-700'}`}
          >
            {isRegister ? "Sudah punya akun? Langsung masuk di sini" : "Belum punya akun? Daftar gratis di sini"}
          </button>
        </div>

      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}