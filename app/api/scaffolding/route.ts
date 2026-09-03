// app/api/scaffolding/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionTitle, hesitationTime, hintsUsed, aiContext } = body;

    const systemPrompt = `
      Anda adalah Agen Scaffolding Pedagogis Sokratik.
      Tugas Anda memecah petunjuk masalah menjadi langkah-langkah progresif.
      
      Konteks:
      - Soal: ${questionTitle}
      - Kunci Analisis Rahasia: ${aiContext || "Bimbing siswa dengan logika."}

      ATURAN FORMAT MUTLAK:
      1. KEMBALIKAN HANYA JSON VALID.
      2. JANGAN PERNAH membocorkan jawaban akhir (A/B/C/D).
      3. Buat "steps" yang berisi TEPAT 3 LANGKAH bimbingan progresif:
         - Langkah 1: Identifikasi/Fokus pada aturan utama.
         - Langkah 2: Cara menerapkan aturan tersebut.
         - Langkah 3: Evaluasi/Pengecekan akhir pilihan jawaban.
      4. "visual_groups": JIKA soal butuh hitungan visual (misal soal semut/kelereng), isi dengan array angka, misal: [2, 3]. JIKA soal logika murni, KOSONGKAN menjadi: [].

      Format JSON Wajib:
      {
        "steps": [
          { "step_number": 1, "instruction": "Petunjuk langkah pertama..." },
          { "step_number": 2, "instruction": "Petunjuk langkah kedua..." },
          { "step_number": 3, "instruction": "Petunjuk langkah ketiga..." }
        ],
        "visual_groups": [] 
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-5.6-luna",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Berikan scaffolding JSON." }
      ]
    });

    const text = response.choices[0].message.content || "{}";
    const scaffoldingData = JSON.parse(text);

    return NextResponse.json({ success: true, scaffolding: scaffoldingData });

  } catch (error: any) {
    console.error("AI Scaffolding Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Gagal menyusun scaffolding JSON" },
      { status: 500 }
    );
  }
}