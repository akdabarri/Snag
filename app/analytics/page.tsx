// app/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  Download, 
  Users, 
  Brain, 
  Clock, 
  MousePointerClick,
  BarChart as BarChartIcon
} from "lucide-react";

// Mengimpor library visualisasi tingkat industri
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ComposedChart, Line, Legend, Area, RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';

interface TelemetryLog {
  id: string;
  user_id: string;
  student_name: string;
  question_id: string;
  level_id: string;
  hesitation_time: number;
  scaffolding_clicks: number;
  is_correct: boolean;
  created_at: string;
}

export default function AnalyticsPage() {
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    avgHesitation: "0.0s",
    avgHints: 0,
  });

  // State untuk Data Visualisasi Grafik
  const [chartData, setChartData] = useState<any[]>([]);
  const [radialData, setRadialData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true);

        // Menarik payload telemetri real-time dari Supabase
        const { data: telemetryData, error } = await supabase
          .from("telemetry_logs") 
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (telemetryData && telemetryData.length > 0) {
          setLogs(telemetryData);

          const totalRecords = telemetryData.length;
          const uniqueStudents = new Set(telemetryData.map(item => item.user_id)).size;
          const totalHesitation = telemetryData.reduce((acc, curr) => acc + (curr.hesitation_time || 0), 0);
          const avgHesitationSec = (totalHesitation / totalRecords).toFixed(1);
          const totalClicks = telemetryData.reduce((acc, curr) => acc + (curr.scaffolding_clicks || 0), 0);
          const avgClicksPerSoal = (totalClicks / totalRecords).toFixed(1);

          setMetrics({
            totalStudents: uniqueStudents || 1,
            avgHesitation: `${avgHesitationSec}s`,
            avgHints: parseFloat(avgClicksPerSoal),
          });

          // PENGOLAHAN DATA UNTUK GRAFIK (DATA AGREGASI PER LEVEL)
          const levelMap: Record<string, any> = {};
          
          let decompSuccess = 0, decompTotal = 0;
          let patternSuccess = 0, patternTotal = 0;
          let algoSuccess = 0, algoTotal = 0;

          telemetryData.forEach((log) => {
            // Pengolahan Grafik Batang Kombinasi
            const level = log.level_id || "Uncategorized";
            if (!levelMap[level]) {
              levelMap[level] = { name: level, totalAttempts: 0, avgHesitation: 0, hintsUsed: 0, errorRate: 0 };
            }
            levelMap[level].totalAttempts += 1;
            levelMap[level].avgHesitation += log.hesitation_time || 0;
            levelMap[level].hintsUsed += log.scaffolding_clicks || 0;
            if (!log.is_correct) levelMap[level].errorRate += 1;

            // Pengolahan CT Profiling (Grafik Radial)
            const currentLevel = log.level_id || "";

            // 1. DEKOMPOSISI (Memecah masalah kompleks)
            // Cocok untuk Level 2 (Logika Bersyarat) & Level 5 (Penyaringan Data)
            if (currentLevel === "level-2" || currentLevel === "level-5") {
              decompTotal++;
              if (log.is_correct) decompSuccess++;
            } 
            // 2. PENGENALAN POLA (Mencari kesamaan/tren)
            // Cocok untuk Level 1 (Pola & Algoritma) & Level 3 (Rute & Kriptografi)
            else if (currentLevel === "level-1" || currentLevel === "level-3") {
              patternTotal++;
              if (log.is_correct) patternSuccess++;
            } 
            // 3. LOGIKA ALGORITMA (Langkah demi langkah)
            // Cocok untuk Level 4 (Simulasi & Jejak) atau level lainnya
            else {
              algoTotal++;
              if (log.is_correct) algoSuccess++;
            }
          });

          // Finalisasi Array Grafik
          const processedChartData = Object.values(levelMap).map(item => ({
            name: item.name.replace("unit-", "Lvl "),
            WaktuRagu: Math.round(item.avgHesitation / item.totalAttempts),
            BantuanAI: item.hintsUsed,
            Kesalahan: Math.round((item.errorRate / item.totalAttempts) * 100) // Persentase salah
          })).slice(0, 7); // Ambil 7 level terbaru/paling aktif

          setChartData(processedChartData);

          // Finalisasi Array Radial (CT Scores)
          setRadialData([
            { name: 'Dekomposisi', score: Math.round((decompSuccess / (decompTotal || 1)) * 100), fill: '#0ea5e9' },
            { name: 'Pola Komputasi', score: Math.round((patternSuccess / (patternTotal || 1)) * 100), fill: '#8b5cf6' },
            { name: 'Logika Algoritma', score: Math.round((algoSuccess / (algoTotal || 1)) * 100), fill: '#10b981' }
          ]);
        }
      } catch (err) {
        console.error("Gagal menarik data telemetri analitik dari Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  const exportToCSV = () => {
    if (logs.length === 0) return;

    const headers = ["ID Log", "User ID", "Nama Siswa", "ID Soal", "Waktu Ragu (detik)", "Klik Scaffolding AI", "Status Jawaban", "Waktu Simpan\n"];
    const csvRows = logs.map(log => [
      log.id,
      log.user_id,
      `"${log.student_name || 'Siswa Anonim'}"`,
      log.question_id || log.level_id,
      log.hesitation_time,
      log.scaffolding_clicks,
      log.is_correct ? "BENAR" : "SALAH",
      new Date(log.created_at).toLocaleString("id-ID")
    ].join(","));

    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Dataset_SNAG_Telemetry_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      {/* ── Top Navigation ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 -ml-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <h1 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <BarChartIcon className="w-5 h-5 text-sky-500" />
              Educator Telemetry Dashboard
            </h1>
          </div>
          
          <button 
            onClick={exportToCSV}
            disabled={logs.length === 0}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Ekspor Dataset (CSV)
          </button>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Total Populasi Siswa</p>
              <h2 className="text-3xl font-black text-slate-800">{loading ? "..." : metrics.totalStudents}</h2>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Rata-rata Waktu Ragu (Hesitation)</p>
              <h2 className="text-3xl font-black text-slate-800">{loading ? "..." : metrics.avgHesitation}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-2xl">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Intensitas Penggunaan AI</p>
              <h2 className="text-3xl font-black text-slate-800">
                {loading ? "..." : metrics.avgHints} <span className="text-base font-medium text-slate-400">klik/soal</span>
              </h2>
            </div>
          </div>
        </div>

        {/* ── Visualisasi Data (Recharts) ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart: AI Usage vs Error Rate */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col p-6">
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 text-lg">Distribusi Intervensi AI vs Rasio Kesalahan</h3>
              <p className="text-sm text-slate-500 mt-1">Korelasi antara penggunaan Scaffolding AI dan tingkat kesulitan level (Data Riil)</p>
            </div>
            <div className="h-72 w-full">
              {loading || chartData.length === 0 ? (
                <div className="w-full h-full bg-slate-50 animate-pulse rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium">Memuat Visualisasi Data...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Bar yAxisId="left" dataKey="Kesalahan" name="Rasio Kegagalan (%)" barSize={30} fill="#f43f5e" radius={[6, 6, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="BantuanAI" name="Total Klik AI" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Radial Chart: CT Profiling */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col p-6">
             <div className="mb-2 text-center">
              <h3 className="font-bold text-slate-800 text-lg">Agregasi Kognitif CT</h3>
              <p className="text-xs text-slate-500 mt-1">Tingkat keberhasilan berdasarkan taksonomi</p>
            </div>
            <div className="h-64 w-full flex items-center justify-center relative">
              {loading || radialData.length === 0 ? (
                 <div className="w-48 h-48 rounded-full bg-slate-50 animate-pulse border-8 border-slate-100 flex items-center justify-center text-xs text-slate-400 font-medium text-center p-4">Kalkulasi Psikometrik...</div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={16} data={radialData} startAngle={90} endAngle={-270}>
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar 
                        background={{ fill: '#f1f5f9' }} 
                        dataKey="score" 
                        cornerRadius={10} 
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  {/* Legend Overlay Custom */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                     <Brain className="w-8 h-8 text-slate-300 mb-1" />
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">PROFIL</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Custom Legend */}
            <div className="mt-auto pt-4 flex flex-col gap-3">
               {radialData.map((entry, index) => (
                 <div key={index} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                     <span className="text-sm font-semibold text-slate-600">{entry.name}</span>
                   </div>
                   <span className="text-sm font-black text-slate-800">{entry.score}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* ── Raw Data Table ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-800">Log Resolusi Kognitif (Raw Data)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Jejak digital interaksi individual yang disinkronisasi dari Supabase</p>
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full animate-pulse border border-emerald-200">Live Sync</span>
          </div>
          
          {/* Menambahkan max-h-[500px] dan overflow-y-auto agar tabel bisa di-scroll secara internal */}
          <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
            <table className="w-full text-left text-sm relative">
              {/* Menambahkan sticky top-0 agar header tabel tidak ikut tergulung */}
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider text-[10px] sticky top-0 shadow-sm z-10">
                <tr>
                  <th className="px-6 py-4 font-black">Identitas / Waktu</th>
                  <th className="px-6 py-4 font-black">Quest Level</th>
                  <th className="px-6 py-4 font-black">Hesitation Time</th>
                  <th className="px-6 py-4 font-black text-center">AI Interventions</th>
                  <th className="px-6 py-4 font-black">Final State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center font-semibold text-slate-400">
                      Mengekstraksi baris relasional dari basis data cloud...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center font-semibold text-slate-400">
                      Tidak ada aktivitas telemetri yang terdeteksi.
                    </td>
                  </tr>
                ) : (
                  // Menghapus .slice(0, 8) agar seluruh log ditampilkan
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-sky-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-700">{log.student_name || "Guest User"}</p>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          {new Date(log.created_at).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 font-mono text-[10px] font-bold px-2 py-1 rounded-md border border-slate-200">
                          {log.question_id || log.level_id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <Clock className={`w-3.5 h-3.5 ${log.hesitation_time > 45 ? 'text-amber-500' : 'text-slate-400'}`} />
                           <span className={`font-mono font-medium ${log.hesitation_time > 45 ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                             {log.hesitation_time?.toFixed(1) ?? 0} s
                           </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black shadow-sm ${log.scaffolding_clicks > 0 ? 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                          {log.scaffolding_clicks ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {log.is_correct ? (
                          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 w-fit px-3 py-1.5 rounded-full border border-emerald-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Success
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs bg-rose-50 w-fit px-3 py-1.5 rounded-full border border-rose-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Error
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}