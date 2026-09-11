// data/levelsData.ts
import React from "react";

export type QuestionItem = {
  id: string;
  questionText: string;
  questionSubtext: string;
  imageUrl?: string;
  aiContext?: string;
  choices: { 
    value: number | string;
    label: string; 
    choiceImageUrl?: string;
  }[];
  correctAnswer: number | string;
  successMessage: string;
  errorMessage: string;
  totalItems: number;
  imageSvg?: React.ReactNode;
};

export type LevelData = {
  id: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: QuestionItem[];
};

export const LEVELS_DATA: Record<string, LevelData> = {
  // ======================================================
  // UNIT 1: POLA & ALGORITMA
  // ======================================================
  "level-1": {
    id: "level-1",
    topic: "Pola & Algoritma",
    difficulty: "Beginner",
    questions: [
      {
        id: "l1_q1",
        questionText: "Batik ceplok tempel dibuat dengan 10 Tembereng Coklat, 6 Lingkaran Kuning, dan 4 Lingkaran Besar Coklat.",
        questionSubtext: "Pola mana yang BISA dibuat Tina dari sisa potongan kertasnya?",
        imageUrl: "/images/unsri/soal_batik.png",
        aiContext: "Pola C butuh 8 tembereng, 5 kuning, 4 besar coklat, sehingga kertas Tina cukup. Pola A dan B kurang bahannya.",
        choices: [
          { value: "A", label: "Pola A", choiceImageUrl: "/images/unsri/batik_a.png" },
          { value: "B", label: "Pola B", choiceImageUrl: "/images/unsri/batik_b.png" },
          { value: "C", label: "Pola C", choiceImageUrl: "/images/unsri/batik_c.png" },
          { value: "D", label: "Tidak Ada", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Tepat! Kamu berhasil memecah kebutuhan bahan pola C.",
        errorMessage: "Hitung satu per satu kebutuhan kertas kuning dan coklat besar untuk tiap pola.",
        totalItems: 4
      },
      {
        id: "l1_q2",
        questionText: "Ketika tombol ditekan, posisi Kupu-kupu, Kelinci, Kucing, dan Burung bergeser satu kotak melingkar.",
        questionSubtext: "Jika tombol ditekan sekali lagi, bagaimana posisi akhirnya?",
        imageUrl: "/images/unsri/soal_tombolhewan.png",
        aiContext: "Polanya berputar: Kanan -> Bawah -> Kiri -> Atas. Posisi akhir ada di Opsi C.",
        choices: [
          { value: "A", label: "Opsi A", choiceImageUrl: "/images/unsri/hewan_a.png" },
          { value: "B", label: "Opsi B", choiceImageUrl: "/images/unsri/hewan_b.png" },
          { value: "C", label: "Opsi C", choiceImageUrl: "/images/unsri/hewan_c.png" },
          { value: "D", label: "Opsi D", choiceImageUrl: "/images/unsri/hewan_d.png" }
        ],
        correctAnswer: "C",
        successMessage: "Benar! Pola rotasinya teridentifikasi dengan tepat.",
        errorMessage: "Amati ke arah mana satu hewan bergeser pada putaran pertama.",
        totalItems: 4
      },
      {
        id: "l1_q3",
        questionText: "Seorang penari menggerakkan selendang dari Atas-Kiri, ke Kanan, lalu Bawah-Kiri, lalu ke Kiri.",
        questionSubtext: "Gambar manakah yang menunjukkan gerakan selendang ke-5?",
        imageUrl: "/images/unsri/soal_selendang.png",
        aiContext: "Arah pergerakannya memutar. Gerakan ke-5 akan kembali ke arah atas namun berlawanan, yaitu posisi Atas-Kanan (Opsi B).",
        choices: [
          { value: "A", label: "Opsi A", choiceImageUrl: "/images/unsri/tari_a.png" },
          { value: "B", label: "Opsi B", choiceImageUrl: "/images/unsri/tari_b.png" },
          { value: "C", label: "Opsi C", choiceImageUrl: "/images/unsri/tari_c.png" },
          { value: "D", label: "Opsi D", choiceImageUrl: "/images/unsri/tari_d.png" }
        ],
        correctAnswer: "B",
        successMessage: "Bagus! Kamu bisa memprediksi pola kelanjutan gerak tari.",
        errorMessage: "Bayangkan arah tangan penari berputar membentuk sebuah lingkaran.",
        totalItems: 4
      }
    ]
  },

  // ======================================================
  // UNIT 2: LOGIKA BERSYARAT
  // ======================================================
  "level-2": {
    id: "level-2",
    topic: "Logika Bersyarat",
    difficulty: "Intermediate",
    questions: [
      {
        id: "l2_q1",
        questionText: "Nana membuat gelang dengan aturan: tiap rantai pendek hanya boleh ada 1 bunga dan 1 love.",
        questionSubtext: "Gelang manakah yang PASTI BUKAN hasil buatan Nana?",
        imageUrl: "/images/unsri/soal_gelang.png",
        aiContext: "Gelang C salah karena memiliki 2 manik love yang berjejeran berurutan, melanggar aturan awal.",
        choices: [
          { value: "A", label: "Gelang A", choiceImageUrl: "/images/unsri/gelang_a.png" },
          { value: "B", label: "Gelang B", choiceImageUrl: "/images/unsri/gelang_b.png" },
          { value: "C", label: "Gelang C", choiceImageUrl: "/images/unsri/gelang_c.png" },
          { value: "D", label: "Gelang D", choiceImageUrl: "/images/unsri/gelang_d.png" }
        ],
        correctAnswer: "C",
        successMessage: "Luar biasa! Dekomposisi elemen gelangmu akurat.",
        errorMessage: "Periksa apakah ada gelang yang dua manik lovenya saling menempel.",
        totalItems: 4
      },
      {
        id: "l2_q2",
        questionText: "Buket snack Naira harus punya 3 rasa (asin, keju, cokelat), rasa yang sama tidak boleh berdampingan, dan maksimal 2 buah per rasa.",
        questionSubtext: "Buket manakah yang memenuhi semua syarat tersebut?",
        imageUrl: "/images/unsri/soal_snack.png",
        aiContext: "Opsi D memenuhi semuanya. Opsi A (cokelat nempel), Opsi B (tanpa keju), Opsi C (3 cokelat).",
        choices: [
          { value: "A", label: "Buket A", choiceImageUrl: "/images/unsri/snack_a.png" },
          { value: "B", label: "Buket B", choiceImageUrl: "/images/unsri/snack_b.png" },
          { value: "C", label: "Buket C", choiceImageUrl: "/images/unsri/snack_c.png" },
          { value: "D", label: "Buket D", choiceImageUrl: "/images/unsri/snack_d.png" }
        ],
        correctAnswer: "D",
        successMessage: "Hebat! Filtrasi syarat multi-kriteria berhasil.",
        errorMessage: "Cek apakah ada *snack* berasa sama yang saling bersebelahan.",
        totalItems: 4
      },
      {
        id: "l2_q3",
        questionText: "Tulisan kuno punya aturan: pilih 1 lambang, lalu tambahkan lambang lain di kiri dan kanannya secara simetris.",
        questionSubtext: "Dari tulisan berikut, mana yang TIDAK mengikuti aturan tersebut?",
        imageUrl: "/images/unsri/soal_simbol.png",
        aiContext: "Opsi A salah karena penambahan lambangnya tidak simetris (kiri 4, kanan 5).",
        choices: [
          { value: "A", label: "XXXX+xxxxx", choiceImageUrl: undefined },
          { value: "B", label: "+++", choiceImageUrl: undefined },
          { value: "C", label: "-x+x-", choiceImageUrl: undefined },
          { value: "D", label: "+-++-+", choiceImageUrl: undefined }
        ],
        correctAnswer: "A",
        successMessage: "Tepat! Kamu menemukan anomali pada sistem.",
        errorMessage: "Hitung apakah jumlah karakter di sebelah kiri sama dengan di sebelah kanan.",
        totalItems: 4
      }
    ]
  },

  // ======================================================
  // UNIT 3: RUTE & KRIPTOGRAFI
  // ======================================================
  "level-3": {
    id: "level-3",
    topic: "Rute & Kriptografi",
    difficulty: "Intermediate",
    questions: [
      {
        id: "l3_q1",
        questionText: "Nama Tim desa dibuat dengan mengganti huruf asli menggunakan tabel sandi. (A=re, B=mu, M=na, I=ta).",
        questionSubtext: "Jika nama Timnya adalah 'mutanare', apa nama asli desa asal tim tersebut?",
        imageUrl: "/images/unsri/soal_sandi.png",
        aiContext: "mu = B, ta = I, na = M, re = A. Maka hasilnya adalah BIMA.",
        choices: [
          { value: "A", label: "BONI", choiceImageUrl: undefined },
          { value: "B", label: "BIMA", choiceImageUrl: undefined },
          { value: "C", label: "BANI", choiceImageUrl: undefined },
          { value: "D", label: "BUDI", choiceImageUrl: undefined }
        ],
        correctAnswer: "B",
        successMessage: "Enkripsi berhasil dipecahkan!",
        errorMessage: "Cocokkan suku kata 'mu', 'ta', 'na', dan 're' di dalam tabel huruf.",
        totalItems: 4
      },
      {
        id: "l3_q2",
        questionText: "Diza di kebun buah ingin mencicipi semua buah. Diza akan selalu berjalan ke pohon yang PALING DEKAT dari posisinya saat itu.",
        questionSubtext: "Buah apa yang dicicipi TERAKHIR oleh Diza?",
        imageUrl: "/images/unsri/soal_kebun.png",
        aiContext: "Rutenya: Apel -> Mangga -> Pir -> Jeruk. Jeruk adalah yang terakhir.",
        choices: [
          { value: "A", label: "Apel", choiceImageUrl: undefined },
          { value: "B", label: "Mangga", choiceImageUrl: undefined },
          { value: "C", label: "Jeruk", choiceImageUrl: undefined },
          { value: "D", label: "Pir", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Analisis rute spasial yang brilian!",
        errorMessage: "Mulai dari kiri bawah, lalu cari yang terdekat. Setelah pindah, cari lagi yang terdekat dari titik baru tersebut.",
        totalItems: 4
      },
      {
        id: "l3_q3",
        questionText: "Dua robot, Bolt dan Robo, dikendalikan satu remot. Mereka bergerak bersamaan sesuai tabel.",
        questionSubtext: "Urutan tombol mana yang membuat Bolt dan Robo berhenti pada kotak yang SAMA?",
        imageUrl: "/images/unsri/soal_robot.png",
        aiContext: "Hanya kombinasi tombol D yang mempertemukan kedua robot di satu koordinat.",
        choices: [
          { value: "A", label: "Opsi A", choiceImageUrl: "/images/unsri/robot_a.png" },
          { value: "B", label: "Opsi B", choiceImageUrl: "/images/unsri/robot_b.png" },
          { value: "C", label: "Opsi C", choiceImageUrl: "/images/unsri/robot_c.png" },
          { value: "D", label: "Opsi D", choiceImageUrl: "/images/unsri/robot_d.png" }
        ],
        correctAnswer: "D",
        successMessage: "Mantap! Kamu berhasil melacak koordinat ganda.",
        errorMessage: "Jalankan simulasi langkah kedua robot secara bersamaan di pikiranmu.",
        totalItems: 4
      }
    ]
  },

  // ======================================================
  // UNIT 4: SIMULASI & JEJAK
  // ======================================================
  "level-4": {
    id: "level-4",
    topic: "Simulasi & Jejak",
    difficulty: "Advanced",
    questions: [
      {
        id: "l4_q1",
        questionText: "Empat hewan mengikuti lomba lompat melingkar di 20 titik (0-19). Kelinci lompat 4 titik, Katak 3, Belalang 1, Kangguru 5.",
        questionSubtext: "Hewan mana yang PALING CEPAT (paling sedikit lompatan) kembali ke posisi awal (0)?",
        imageUrl: "/images/unsri/soal_lompat.png",
        aiContext: "Kangguru lompat sejauh 5 titik. 20 dibagi 5 = 4 lompatan untuk kembali ke 0. Hewan lain butuh lebih banyak.",
        choices: [
          { value: "A", label: "Kelinci", choiceImageUrl: undefined },
          { value: "B", label: "Katak", choiceImageUrl: undefined },
          { value: "C", label: "Belalang", choiceImageUrl: undefined },
          { value: "D", label: "Kangguru", choiceImageUrl: undefined }
        ],
        correctAnswer: "D",
        successMessage: "Tepat! Semakin besar faktor pembaginya, semakin cepat siklusnya selesai.",
        errorMessage: "Bagi total titik lintasan (20) dengan daya lompat tiap hewan.",
        totalItems: 4
      },
      {
        id: "l4_q2",
        questionText: "Tanda jejak: Belok Kiri (Batu kecil di kiri), Jalan Terus (2 Batu tumpuk), Ada Bahaya (3 Batu tumpuk).",
        questionSubtext: "Sebagian susunan batu tertutup semak dari atas sehingga hanya tampak 2 batu bertumpuk. Arti jejak apa yang MUNGKIN terjadi?",
        imageUrl: "/images/unsri/soal_jejak.png",
        aiContext: "Karena tertutup daun, bisa jadi hanya 2 batu (Jalan Terus) atau ada batu ke-3 di atasnya (Ada Bahaya).",
        choices: [
          { value: "A", label: "Hanya Jalan Terus", choiceImageUrl: undefined },
          { value: "B", label: "Hanya Ada Bahaya", choiceImageUrl: undefined },
          { value: "C", label: "Jalan Terus & Ada Bahaya", choiceImageUrl: undefined },
          { value: "D", label: "Belok Kanan", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Sangat kritis! Kamu memperhitungkan variabel yang tidak terlihat.",
        errorMessage: "Apakah mungkin ada batu ketiga yang bersembunyi di balik daun?",
        totalItems: 4
      },
      {
        id: "l4_q3",
        questionText: "Kelinci ingin melompat ke kebun wortel. Syaratnya: Kelinci hanya boleh lewat di jalur yang semak durinya TIDAK LEBIH dari 2.",
        questionSubtext: "Berapa lompatan yang dibutuhkan pada jalur PALING PENDEK menuju kebun?",
        imageUrl: "/images/unsri/soal_rute_kelinci.png",
        aiContext: "Rute optimal dan aman duri membutuhkan tepat 8 lompatan untuk sampai ke kebun wortel.",
        choices: [
          { value: "A", label: "6 Lompatan", choiceImageUrl: undefined },
          { value: "B", label: "8 Lompatan", choiceImageUrl: undefined },
          { value: "C", label: "10 Lompatan", choiceImageUrl: undefined },
          { value: "D", label: "12 Lompatan", choiceImageUrl: undefined }
        ],
        correctAnswer: "B",
        successMessage: "Brilian! Pathfinding algoritmamu sangat cepat.",
        errorMessage: "Cari jalur yang semaknya maksimal 2, lalu hitung lompatannya.",
        totalItems: 4
      }
    ]
  },

  // ======================================================
  // UNIT 5: PENYARINGAN DATA
  // ======================================================
  "level-5": {
    id: "level-5",
    topic: "Penyaringan Data",
    difficulty: "Advanced",
    questions: [
      {
        id: "l5_q1",
        questionText: "Ira memilih sebuah panda yang memiliki bentuk love di kakinya, memakai topi atau pita, dan TIDAK memakai kacamata.",
        questionSubtext: "Panda nomor berapakah yang dipilih Ira?",
        imageUrl: "/images/unsri/soal_panda.png",
        aiContext: "Satu-satunya panda yang memenuhi ketiga syarat eliminasi (love kaki, topi/pita, tanpa kacamata) adalah Panda nomor 1.",
        choices: [
          { value: "A", label: "Panda 3", choiceImageUrl: undefined },
          { value: "B", label: "Panda 6", choiceImageUrl: undefined },
          { value: "C", label: "Panda 2", choiceImageUrl: undefined },
          { value: "D", label: "Panda 1", choiceImageUrl: undefined }
        ],
        correctAnswer: "D",
        successMessage: "Brilian! Aturan eliminasi karakter dieksekusi dengan baik.",
        errorMessage: "Saring dulu panda yang tidak pakai kacamata, lalu cari yang ada love di kaki.",
        totalItems: 4
      },
      {
        id: "l5_q2",
        questionText: "Balon dikatakan ISTIMEWA jika: 1) Balon di sebelah KIRI-nya beda warna. 2) Ada satu balon di sebelah KANAN-nya dengan warna yang sama.",
        questionSubtext: "Ada berapa jumlah balon istimewa pada deretan tersebut?",
        imageUrl: "/images/unsri/soal_balon.png",
        aiContext: "Berdasarkan syarat ganda, akan ada tepat 3 balon yang memenuhi kedua aturan kiri dan kanan tersebut secara bersamaan.",
        choices: [
          { value: "A", label: "1 Balon", choiceImageUrl: undefined },
          { value: "B", label: "2 Balon", choiceImageUrl: undefined },
          { value: "C", label: "3 Balon", choiceImageUrl: undefined },
          { value: "D", label: "4 Balon", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Bagus! Evaluasi kondisi bersyaratmu berfungsi dengan baik.",
        errorMessage: "Periksa balon satu per satu dari kiri ke kanan menggunakan kedua syarat sekaligus.",
        totalItems: 4
      },
      {
        id: "l5_q3",
        questionText: "Pak Komang memiliki sawah terasering. Air dari waduk akan mengalir ke semua petak yang menempel setiap pergantian hari.",
        questionSubtext: "Setelah berapa HARI seluruh petak tanah subur selesai dialiri air?",
        imageUrl: "/images/unsri/soal_sawah.png",
        aiContext: "Karena air menyebar serentak ke segala sisi tiap hari, butuh 6 hari (6 langkah radius) untuk mencapai ujung terjauh.",
        choices: [
          { value: "A", label: "4 Hari", choiceImageUrl: undefined },
          { value: "B", label: "5 Hari", choiceImageUrl: undefined },
          { value: "C", label: "6 Hari", choiceImageUrl: undefined },
          { value: "D", label: "7 Hari", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Mantap! Kamu berhasil memetakan algoritma penyebaran area (Breadth-First Search).",
        errorMessage: "Hitung jarak radius terjauh dari titik waduk ke petak sawah paling ujung.",
        totalItems: 4
      }
    ]
  }
};