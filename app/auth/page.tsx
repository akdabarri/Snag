// app/auth/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  // Fungsi pembersihan username dari spasi dan huruf kapital
  const cleanUsername = (str: string) => str.trim().toLowerCase().replace(/\s+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", isError: false });

    const targetUsername = cleanUsername(username);

    try {
      if (isRegister) {
        // ======================================================
        // PROSES REGISTER: SIMPAN KE TABEL STUDENTS
        // ======================================================
        
        // 1. Validasi apakah username sudah terpakai
        const { data: existingStudent, error: checkError } = await supabase
          .from("students")
          .select("username")
          .eq("username", targetUsername);

        if (checkError) {
          console.error("Supabase Check Error Details:", checkError);
          throw new Error(`Gagal memeriksa username: ${checkError.message} (Kode: ${checkError.code})`);
        }

        if (existingStudent && existingStudent.length > 0) {
          throw new Error("Username sudah diambil pahlawan lain. Coba nama unik ya!");
        }

        // 2. Masukkan data siswa baru ke tabel public.students
        const { error: insertError } = await supabase
          .from("students")
          .insert([
            {
              username: targetUsername,
              full_name: fullName.trim(),
              password: password, // Menyimpan kredensial dasar pengerjaan media siswa SD
            },
          ]);

        if (insertError) {
          console.error("Supabase Insert Error Details:", insertError);
          throw new Error(`Gagal membuat akun: ${insertError.message} (Kode: ${insertError.code})`);
        }

        setMessage({ text: "Akun SNAG berhasil dibuat! Ayo masuk menggunakan username-mu.", isError: false });
        setIsRegister(false);
        setPassword("");
        setFullName("");
      } else {
        // ======================================================
        // PROSES LOGIN: COCOKKAN DATA TABEL STUDENTS
        // ======================================================
        const { data: student, error: loginError } = await supabase
          .from("students")
          .select("*")
          .eq("username", targetUsername)
          .eq("password", password);

        if (loginError) {
          console.error("Supabase Login Error Details:", loginError);
          throw new Error(`Gagal memuat basis data: ${loginError.message} (Kode: ${loginError.code})`);
        }

        if (!student || student.length === 0) {
          throw new Error("Username atau Kata Sandi salah. Periksa kembali ya!");
        }

        const activeStudent = student[0];

        // Amankan sesi identitas siswa ke LocalStorage untuk mesin Learning Analytics
        localStorage.setItem("snag_user_id", activeStudent.id);
        localStorage.setItem("snag_user_name", activeStudent.full_name);
        localStorage.setItem("snag_student_hearts", (activeStudent.current_hearts ?? 5).toString());

        setMessage({ text: "Koneksi sukses! Membuka gerbang tantangan SNAG...", isError: false });
        
        setTimeout(() => {
          router.push("/introduction");
        }, 1500);
      }
    } catch (error: any) {
      // Mengekstrak properti message string eksplisit agar tidak mentah menjadi objek kosongan {}
      console.error("SNAG Auth Exception Caught:", error.message || error);
      setMessage({ text: error.message || "Terjadi kendala jaringan, silakan coba lagi.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-sky-200 selection:text-sky-900">
      <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-xl max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        
        {/* Aksen Estetik Latar Belakang Kotak (Opsional, agar tidak kaku) */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

        {/* BRANDING LOGO SNAG (DIUBAH MENGGUNAKAN GAMBAR ASLI) */}
        <div className="space-y-3 relative z-10">
          <div className="flex justify-center mb-2">
            <img 
              src="/images/1.png" 
              alt="Logo SNAG" 
              className="h-20 md:h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {isRegister ? "Pendaftaran SNAG" : "Masuk ke SNAG"}
          </h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            {isRegister ? "Ayo gabung dan kembangkan logika Computational Thinking!" : "Selamat datang di Arena Berpikir Bebras"}
          </p>
        </div>

        {/* NOTIFIKASI STATUS */}
        {message.text && (
          <div className={`relative z-10 p-4 rounded-2xl text-xs font-bold border-2 leading-relaxed text-left ${
            message.isError 
              ? "bg-red-50 border-red-200 text-red-600 animate-[shake_0.4s_ease]" 
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            {message.isError ? "⚠️ " : "✅ "} {message.text}
          </div>
        )}

        {/* FORM UTAMA */}
        <form onSubmit={handleSubmit} className="text-left space-y-4 relative z-10">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 px-1">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Tulis nama lengkapmu"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-400 outline-none text-sm transition-all font-semibold text-slate-700 bg-slate-50/50 focus:bg-white"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-600 px-1">Username Unik</label>
            <input
              type="text"
              required
              placeholder="Contoh: akda24"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-400 outline-none text-sm transition-all font-semibold text-slate-700 bg-slate-50/50 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-600 px-1">Kata Sandi (Password)</label>
            <input
              type="password"
              required
              placeholder="Masukkan kata sandimu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-400 outline-none text-sm transition-all font-semibold text-slate-700 bg-slate-50/50 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 text-white font-extrabold rounded-2xl text-sm transition-all border-b-4 border-sky-700 disabled:border-slate-300 shadow-md flex items-center justify-center gap-2"
          >
            {loading ? "Menghubungkan..." : isRegister ? "Buat Akun Ksatria 🚀" : "Mulai Petualangan Game 🎮"}
          </button>
        </form>

        {/* TOGGLE PINDAH FORM */}
        <div className="pt-3 border-t border-slate-100 relative z-10">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage({ text: "", isError: false });
              setUsername("");
              setPassword("");
              setFullName("");
            }}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 underline transition-colors"
          >
            {isRegister ? "Sudah punya akun petualang? Masuk di sini" : "Baru di sini? Daftar akun SNAG dulu"}
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