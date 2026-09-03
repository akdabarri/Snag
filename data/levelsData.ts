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
  // UNIT 1: UNSRI - DEKOMPOSISI & POLA VISUAL
  // ======================================================
  "q_unsri_1_dekomposisi": {
    id: "q_unsri_1_dekomposisi",
    topic: "Dekomposisi Visual",
    difficulty: "Beginner",
    questions: [
      {
        id: "u1_q1",
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
        id: "u1_q2",
        questionText: "Nana membuat gelang dengan aturan: tiap rantai pendek hanya boleh ada 1 bunga dan 1 love.",
        questionSubtext: "Gelang manakah yang PASTI BUKAN hasil buatan Ali?",
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
        id: "u1_q3",
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
        totalItems: 7
      }
    ]
  },
  "q_unsri_1_pola": {
    id: "q_unsri_1_pola",
    topic: "Pengenalan Pola Gerak",
    difficulty: "Beginner",
    questions: [
      {
        id: "u1_q4",
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
        id: "u1_q5",
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
      },
      {
        id: "u1_q6",
        questionText: "Penduduk Kota A membangun taman. Aturan-1: 1 Bunga jadi 2 Bunga.",
        questionSubtext: "Jika kita memakai Aturan-1 sebanyak 3 KALI dari satu ikat bunga, manakah hasil taman yang benar?",
        imageUrl: "/images/unsri/soal_taman.png",
        aiContext: "Awal 1 bunga. Aturan 1 diputar 3 kali (1+1=2, 2+1=3, 3+1=4). Hasilnya 4 ikat bunga (Opsi D).",
        choices: [
          { value: "A", label: "Opsi A", choiceImageUrl: "/images/unsri/taman_a.png" },
          { value: "B", label: "Opsi B", choiceImageUrl: "/images/unsri/taman_b.png" },
          { value: "C", label: "Opsi C", choiceImageUrl: "/images/unsri/taman_c.png" },
          { value: "D", label: "Opsi D", choiceImageUrl: "/images/unsri/taman_d.png" }
        ],
        correctAnswer: "D",
        successMessage: "Sempurna! Penambahan konstan dieksekusi dengan baik.",
        errorMessage: "Aturan-1 hanya menambahkan satu bunga baru tiap putaran. Hitung 1 + 1 + 1 + 1.",
        totalItems: 4
      }
    ]
  },
  "q_unsri_1_grid": {
    id: "q_unsri_1_grid",
    topic: "Pemetaan & Grid",
    difficulty: "Beginner",
    questions: [
      {
        id: "u1_q7",
        questionText: "Dalam grid 25 sel, sebuah sel bertetangga dengan sel lainnya jika sisinya bersebelahan.",
        questionSubtext: "Sel manakah (A, B, C, atau D) yang dikelilingi oleh PALING BANYAK kupu-kupu?",
        imageUrl: "/images/unsri/soal_kupu.png",
        aiContext: "Sel C dikelilingi 5 kupu-kupu, paling banyak di antara yang lain.",
        choices: [
          { value: "A", label: "Sel A", choiceImageUrl: undefined },
          { value: "B", label: "Sel B", choiceImageUrl: undefined },
          { value: "C", label: "Sel C", choiceImageUrl: undefined },
          { value: "D", label: "Sel D", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Tepat! Sel C memiliki 5 tetangga kupu-kupu.",
        errorMessage: "Hitung juga kupu-kupu yang bersentuhan di sudut (diagonal).",
        totalItems: 4
      },
      {
        id: "u1_q8",
        questionText: "Kertas seni gores memiliki 4 lapisan warna di baliknya. Jika digores, warna di bawahnya akan terlihat.",
        questionSubtext: "Motif manakah yang memperlihatkan TEPAT 3 warna berbeda?",
        imageUrl: "/images/unsri/soal_gores.png",
        aiContext: "Hanya motif Mega Mendung yang rute goresannya mengenai tepat 3 kuadran warna.",
        choices: [
          { value: "A", label: "Motif Parang", choiceImageUrl: "/images/unsri/gores_a.png" },
          { value: "B", label: "Motif Mega Mendung", choiceImageUrl: "/images/unsri/gores_b.png" },
          { value: "C", label: "Motif Kawung", choiceImageUrl: "/images/unsri/gores_c.png" },
          { value: "D", label: "Motif Lung-lungan", choiceImageUrl: "/images/unsri/gores_d.png" }
        ],
        correctAnswer: "B",
        successMessage: "Brilian! Pola ruang berhasil diselesaikan.",
        errorMessage: "Lihat motif mana yang garisnya tidak menyentuh satu kotak warna sama sekali.",
        totalItems: 4
      },
      {
        id: "u1_q9",
        questionText: "Turnamen sepak bola! Nama Tim dibuat dengan mengganti huruf asli desa menggunakan tabel suku kata. (A=re, B=mu, M=na, I=ta).",
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
      }
    ]
  },

  // ======================================================
  // UNIT 2: UNSRI - ABSTRAKSI & ALGORITMA DASAR
  // ======================================================
  "q_unsri_2_abstraksi": {
    id: "q_unsri_2_abstraksi",
    topic: "Abstraksi Syarat",
    difficulty: "Intermediate",
    questions: [
      {
        id: "u2_q1",
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
        id: "u2_q2",
        questionText: "Tulisan aneh di Kampung Matematika punya aturan: pilih 1 lambang, lalu tambahkan lambang lain di kiri dan kanannya secara simetris.",
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
      },
      {
        id: "u2_q3",
        questionText: "Latihan voli dilakukan tiap hari Minggu. Dua hari setelah hari sebelum latihan voli adalah suatu hari tertentu.",
        questionSubtext: "Tentukan hari SETELAH suatu hari tertentu tersebut!",
        imageUrl: "/images/unsri/soal_kalender.png",
        aiContext: "Latihan (Minggu). Sebelum (Sabtu). Dua hari setelahnya (Senin). Hari setelahnya lagi (Selasa).",
        choices: [
          { value: "A", label: "Minggu", choiceImageUrl: undefined },
          { value: "B", label: "Senin", choiceImageUrl: undefined },
          { value: "C", label: "Selasa", choiceImageUrl: undefined },
          { value: "D", label: "Rabu", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Luar biasa! Algoritma waktumu sangat runut.",
        errorMessage: "Mundur 1 hari dari Minggu, lalu maju 2 hari, lalu maju 1 hari lagi.",
        totalItems: 4
      }
    ]
  },
  "q_unsri_2_navigasi": {
    id: "q_unsri_2_navigasi",
    topic: "Navigasi & Algoritma",
    difficulty: "Intermediate",
    questions: [
      {
        id: "u2_q4",
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
      },
      {
        id: "u2_q5",
        questionText: "Alat tenun membuat pola songket sesuai diagram panah, mulai dari Bungo Pacik. Panah melingkar berarti boleh berulang.",
        questionSubtext: "Kain songket manakah yang urutan motifnya valid?",
        imageUrl: "/images/unsri/soal_songket.png",
        aiContext: "Hanya opsi C yang mengikuti alur diagram panah dengan benar sampai berhenti di Bungo Melati.",
        choices: [
          { value: "A", label: "Opsi A", choiceImageUrl: "/images/unsri/songket_a.png" },
          { value: "B", label: "Opsi B", choiceImageUrl: "/images/unsri/songket_b.png" },
          { value: "C", label: "Opsi C", choiceImageUrl: "/images/unsri/songket_c.png" },
          { value: "D", label: "Opsi D", choiceImageUrl: "/images/unsri/songket_d.png" }
        ],
        correctAnswer: "C",
        successMessage: "Sempurna! Kamu memahami konsep diagram alir (flowchart).",
        errorMessage: "Telusuri rute panah dari awal. Apakah ada urutan gambar yang melompat?",
        totalItems: 4
      },
      {
        id: "u2_q6",
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
      }
    ]
  },
  "q_unsri_2_essay": {
    id: "q_unsri_2_essay",
    topic: "Logika Lanjutan",
    difficulty: "Intermediate",
    questions: [
      {
        id: "u2_q7",
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
        id: "u2_q8",
        questionText: "Tanda jejak pramuka: Belok Kiri (Batu kecil di kiri), Jalan Terus (2 Batu tumpuk), Ada Bahaya (3 Batu tumpuk).",
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
        id: "u2_q9",
        questionText: "Sarah bermain lempar kaleng. Awalnya kaleng disusun piramida 4 tingkat. Setelah dilempar, kaleng berhamburan ke tanah.",
        questionSubtext: "Jika digabungkan (yang jatuh dan yang masih berdiri), berapa TOTAL kaleng pada piramida awal?",
        imageUrl: "/images/unsri/soal_kaleng.png",
        aiContext: "Total ada 4 kaleng biru, 3 kuning, 2 hijau, 1 merah. Total = 10 kaleng.",
        choices: [
          { value: "A", label: "8 Kaleng", choiceImageUrl: undefined },
          { value: "B", label: "9 Kaleng", choiceImageUrl: undefined },
          { value: "C", label: "10 Kaleng", choiceImageUrl: undefined },
          { value: "D", label: "12 Kaleng", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Hebat! Dekomposisi kondisimu sangat tajam.",
        errorMessage: "Jumlahkan kaleng yang masih ada di atas meja dengan yang sudah jatuh di tanah.",
        totalItems: 4
      }
    ]
  },

  // ======================================================
  // UNIT 3: UNSRI - TANTANGAN ANALITIK EKSPLORATIF
  // ======================================================
  "q_unsri_3_sistem": {
    id: "q_unsri_3_sistem",
    topic: "Dekomposisi Sistem",
    difficulty: "Advanced",
    questions: [
      {
        id: "u3_q1",
        questionText: "Pak Tito ingin memasang CCTV di persimpangan jalan agar bisa mengawasi seluruh 6 wahana di taman bermain.",
        questionSubtext: "Berapa jumlah PALING SEDIKIT CCTV yang diperlukan agar semua wahana terpantau?",
        imageUrl: "/images/unsri/soal_cctv.png",
        aiContext: "Dengan meletakkan CCTV di persimpangan strategis yang menjangkau 4 arah (bentuk +), Pak Tito hanya butuh minimal 3 CCTV.",
        choices: [
          { value: "A", label: "2 CCTV", choiceImageUrl: undefined },
          { value: "B", label: "3 CCTV", choiceImageUrl: undefined },
          { value: "C", label: "4 CCTV", choiceImageUrl: undefined },
          { value: "D", label: "5 CCTV", choiceImageUrl: undefined }
        ],
        correctAnswer: "B",
        successMessage: "Efisien sekali! Solusi optimasi ruang berhasil.",
        errorMessage: "Cari persimpangan jalan (tanda tambah) yang bisa melihat ke arah 2 wahana sekaligus.",
        totalItems: 4
      },
      {
        id: "u3_q2",
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
      },
      {
        id: "u3_q3",
        questionText: "Tiga kucing besar dan beberapa kucing kecil berbaris. Aturan: Dalam 1x tukar, hanya dua kucing berdampingan yang boleh pindah.",
        questionSubtext: "Untuk mengumpulkan ketiga kucing besar secara bersebelahan paling cepat, kucing besar mana yang harus dijadikan 'TITIK KUMPUL'?",
        imageUrl: "/images/unsri/soal_kucing.png",
        aiContext: "Kucing besar yang di TENGAH harus dijadikan patokan agar kucing besar kiri dan kanan tinggal digeser mendekatinya.",
        choices: [
          { value: "A", label: "Kucing besar paling kiri", choiceImageUrl: undefined },
          { value: "B", label: "Kucing besar paling kanan", choiceImageUrl: undefined },
          { value: "C", label: "Kucing besar di tengah", choiceImageUrl: undefined },
          { value: "D", label: "Kucing kecil di ujung", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Tepat! Menentukan titik temu di tengah menghemat banyak langkah.",
        errorMessage: "Pilih kucing yang jaraknya paling dekat ke semua teman-temannya.",
        totalItems: 4
      }
    ]
  },
  "q_unsri_3_algoritma": {
    id: "q_unsri_3_algoritma",
    topic: "Algoritma Runtutan",
    difficulty: "Advanced",
    questions: [
      {
        id: "u3_q4",
        questionText: "Kiko Kelinci berjalan searah. Kiko bisa makan wortel, tapi perutnya kecil: setiap selesai memakan DUA WORTEL, ia HARUS minum air biru dulu.",
        questionSubtext: "Berapa JUMLAH MAKSIMAL wortel yang bisa dimakan Kiko hingga garis akhir?",
        imageUrl: "/images/unsri/soal_kiko.png",
        aiContext: "Simulasi: Makan 2, Minum. Makan 2, Minum. Makan 2, Minum. Makan 1. Total = 7 wortel.",
        choices: [
          { value: "A", label: "5 Wortel", choiceImageUrl: undefined },
          { value: "B", label: "6 Wortel", choiceImageUrl: undefined },
          { value: "C", label: "7 Wortel", choiceImageUrl: undefined },
          { value: "D", label: "8 Wortel", choiceImageUrl: undefined }
        ],
        correctAnswer: "C",
        successMessage: "Sempurna! Kamu memahami siklus berulang (looping) dengan batas variabel.",
        errorMessage: "Jangan lupa, jika Kiko sudah makan 2 wortel tanpa minum, ia tidak boleh makan wortel yang ketiga.",
        totalItems: 4
      },
      {
        id: "u3_q5",
        questionText: "Rizi petani buah punya aturan campur jus. Tiap buah punya kartu yang menunjuk ke buah berikutnya. Hanya ada SATU BUAH yang tidak punya kartu petunjuk sama sekali.",
        questionSubtext: "Buah apakah yang harus dimasukkan Rizi PERTAMA KALI ke dalam jus?",
        imageUrl: "/images/unsri/soal_jus.png",
        aiContext: "Pelacakan terbalik (Reverse tracing). Lemon tidak ada kartu. Yang menunjuk Lemon adalah Nanas. Terus telusuri mundur hingga ke Apel sebagai awal.",
        choices: [
          { value: "A", label: "Apel", choiceImageUrl: undefined },
          { value: "B", label: "Lemon", choiceImageUrl: undefined },
          { value: "C", label: "Stroberi", choiceImageUrl: undefined },
          { value: "D", label: "Nanas", choiceImageUrl: undefined }
        ],
        correctAnswer: "A",
        successMessage: "Teknik rekayasa balik (reverse engineering) yang luar biasa!",
        errorMessage: "Cari buah yang tidak memegang kartu petunjuk, lalu lacak mundur buah mana yang menunjuk ke arahnya.",
        totalItems: 4
      },
      {
        id: "u3_q6",
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
        successMessage: "Bagus! Evaluasi kondisi bersyaratmu (IF) berfungsi dengan baik.",
        errorMessage: "Periksa balon satu per satu dari kiri ke kanan menggunakan kedua syarat sekaligus.",
        totalItems: 4
      }
    ]
  },
  "q_unsri_3_pertumbuhan": {
    id: "q_unsri_3_pertumbuhan",
    topic: "Pola Pertumbuhan",
    difficulty: "Advanced",
    questions: [
      {
        id: "u3_q7",
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
      },
      {
        id: "u3_q8",
        questionText: "Tiga teman memesan 12 pizza untuk makan siang dan membaginya rata.",
        questionSubtext: "Berapa banyak pizza yang didapat masing-masing teman?",
        imageUrl: undefined,
        aiContext: "Ini adalah soal dekomposisi sederhana (12 dibagi 3).",
        choices: [
          { value: "3", label: "3 pizza" }, 
          { value: "4", label: "4 pizza" }, 
          { value: "6", label: "6 pizza" }
        ],
        correctAnswer: "4",
        successMessage: "Pemikiran yang bagus!",
        errorMessage: "Ingatlah untuk memecah 12 menjadi 3 kelompok.",
        totalItems: 12
      },
      {
        id: "u3_q9",
        questionText: "Ibu memanggang 20 kue kering untuk 4 anaknya.",
        questionSubtext: "Berapa kue yang didapat setiap anak?",
        imageUrl: undefined,
        aiContext: "Pembagian seimbang dasar (20 dibagi 4).",
        choices: [
          { value: "4", label: "4 kue" }, 
          { value: "5", label: "5 kue" }, 
          { value: "6", label: "6 kue" }
        ],
        correctAnswer: "5",
        successMessage: "Betul! 20 dibagi 4 adalah 5.",
        errorMessage: "Ayo hitung lagi kue-kuenya dengan cara membagi.",
        totalItems: 20
      }
    ]
  },

  // ======================================================
  // UNIT 4: BEBRAS - POLA KOMPLEKS
  // ======================================================
  "q_pattern_1": {
    id: "q_pattern_1",
    topic: "Barisan Geometri",
    difficulty: "Advanced",
    questions: [
      {
        id: "q_pat_1_s1",
        questionText: "Urutan angka: 2, 4, 6, titik titik.",
        questionSubtext: "Angka berapa selanjutnya?",
        aiContext: "Barisan aritmetika dengan beda +2.",
        choices: [{ value: 7, label: "7" }, { value: 8, label: "8" }, { value: 9, label: "9" }],
        correctAnswer: 8,
        successMessage: "Tepat! Setiap angka bertambah 2.",
        errorMessage: "Lihat pola pertambahannya.",
        totalItems: 8
      },
      {
        id: "q_pat_1_s2",
        questionText: "Perhatikan barisan berpola berikut: 5, 10, 15, ...",
        questionSubtext: "Tentukan nilai angka pengisi deret keempat.",
        aiContext: "Barisan aritmetika dengan beda +5.",
        choices: [{ value: 18, label: "18" }, { value: 20, label: "20" }, { value: 25, label: "25" }],
        correctAnswer: 20,
        successMessage: "Luar biasa! Polanya adalah penambahan konstan +5.",
        errorMessage: "Tambahkan nilai 5 pada urutan angka paling akhir.",
        totalItems: 12
      },
      {
        id: "q_pat_1_s3",
        questionText: "Lengkapi deretan simbol angka rahasia ini: 10, 20, 30, ...",
        questionSubtext: "Berapakah kelanjutan nilai data di atas?",
        aiContext: "Penambahan +10 konstan.",
        choices: [{ value: 35, label: "35" }, { value: 40, label: "40" }, { value: 50, label: "50" }],
        correctAnswer: 40,
        successMessage: "Keren! Lompatan nilai berpola +10 dipahami dengan baik.",
        errorMessage: "Gunakan logika penambahan puluhan.",
        totalItems: 15
      }
    ]
  },
  "q_pattern_2": {
    id: "q_pattern_2",
    topic: "Matriks Logika",
    difficulty: "Advanced",
    questions: [
      {
        id: "q_pat_2_s1",
        questionText: "Pola melompat tiga langkah: 3, 6, 9, titik titik.",
        questionSubtext: "Berapa angka keempat?",
        aiContext: "Tambahkan 3 untuk mendapatkan angka selanjutnya.",
        choices: [{ value: 11, label: "11" }, { value: 12, label: "12" }, { value: 15, label: "15" }],
        correctAnswer: 12,
        successMessage: "Benar! Kamu pandai mengenali pola.",
        errorMessage: "Tambahkan 3 pada angka terakhir.",
        totalItems: 12
      },
      {
        id: "q_pat_2_s2",
        questionText: "Urutan baris data komputasi: 4, 8, 12, ...",
        questionSubtext: "Berapakah output deret selanjutnya jika polanya ajeg?",
        aiContext: "Pola perkalian atau penambahan 4.",
        choices: [{ value: 14, label: "14" }, { value: 16, label: "16" }, { value: 20, label: "20" }],
        correctAnswer: 16,
        successMessage: "Mantap! Kelipatan 4 terdeteksi dengan tepat.",
        errorMessage: "Lompat empat langkah ke depan dari angka 12.",
        totalItems: 12
      },
      {
        id: "q_pat_2_s3",
        questionText: "Analisis perubahan urutan deret angka biner buatan: 6, 12, 18, ...",
        questionSubtext: "Berapakah kelanjutan angka pada urutan keempat?",
        aiContext: "Pola perkalian 6.",
        choices: [{ value: 20, label: "20" }, { value: 22, label: "22" }, { value: 24, label: "24" }],
        correctAnswer: 24,
        successMessage: "Sempurna! Pola pertambahan stabil +6 dikuasai penuh.",
        errorMessage: "Tambahkan nilai 6 ke komponen angka 18.",
        totalItems: 12
      }
    ]
  },
  "q_pattern_3": {
    id: "q_pattern_3",
    topic: "Sandi Rahasia",
    difficulty: "Advanced",
    questions: [
      {
        id: "q_pat_3_s1",
        questionText: "Kode brankas: 5, 10, 15, titik titik.",
        questionSubtext: "Apa angka terakhir kode tersebut?",
        aiContext: "Barisan bertambah 5.",
        choices: [{ value: 20, label: "20" }, { value: 25, label: "25" }, { value: 30, label: "30" }],
        correctAnswer: 20,
        successMessage: "Brankas berhasil dibuka!",
        errorMessage: "Lompat lima langkah ke depan.",
        totalItems: 15
      },
      {
        id: "q_pat_3_s2",
        questionText: "Sandi enkripsi pesan komputer berbunyi: 7, 14, 21, ...",
        questionSubtext: "Berapakah angka pemecah sandi pada slot berikutnya?",
        aiContext: "Penambahan 7 konstan.",
        choices: [{ value: 25, label: "25" }, { value: 28, label: "28" }, { value: 35, label: "35" }],
        correctAnswer: 28,
        successMessage: "Hebat! Pola perkalian/penambahan tujuh dipahami.",
        errorMessage: "Sandi mengikuti deret penambahan 7.",
        totalItems: 15
      },
      {
        id: "q_pat_3_s3",
        questionText: "Pecahkan pola instruksi sandi transmisi: 8, 16, 24, ...",
        questionSubtext: "Angka berapakah yang bertindak sebagai kelanjutan sistem?",
        aiContext: "Kelipatan 8 secara konstan.",
        choices: [{ value: 30, label: "30" }, { value: 32, label: "32" }, { value: 36, label: "36" }],
        correctAnswer: 32,
        successMessage: "Luar biasa! Seluruh gerbang tantangan pola kompleks terlampaui.",
        errorMessage: "Hitung kelipatan angka 8 selanjutnya.",
        totalItems: 15
      }
    ]
  },

  // ======================================================
  // UNIT 5: BEBRAS - BERPIKIR ALGORITMIS
  // ======================================================
  "q_algo_1": {
    id: "q_algo_1",
    topic: "Jalur Terpendek",
    difficulty: "Advanced",
    questions: [
      {
        id: "q_alg_1_s1",
        questionText: "Robot melangkah 2 kotak ke utara, lalu 3 kotak ke timur.",
        questionSubtext: "Berapa total kotak yang dilalui?",
        aiContext: "Penjumlahan langkah 2+3.",
        choices: [{ value: 4, label: "4" }, { value: 5, label: "5" }, { value: 6, label: "6" }],
        correctAnswer: 5,
        successMessage: "Algoritma perjalanan sempurna.",
        errorMessage: "Jumlahkan semua langkah robot.",
        totalItems: 5
      },
      {
        id: "q_alg_1_s2",
        questionText: "Kurir mengantar paket bergerak 4 blok ke barat, kemudian berbelok 2 blok ke selatan.",
        questionSubtext: "Berapa akumulasi total langkah blok yang dilewati kurir?",
        aiContext: "Penjumlahan langkah spasial 4+2.",
        choices: [{ value: 5, label: "5" }, { value: 6, label: "6" }, { value: 8, label: "8" }],
        correctAnswer: 6,
        successMessage: "Tepat! Total eksekusi lintasan sekuensial adalah 6.",
        errorMessage: "Gabungkan nilai perpindahan langkah kurir.",
        totalItems: 6
      },
      {
        id: "q_alg_1_s3",
        questionText: "Semut berjalan mencari makan sejauh 5 cm ke kanan, lalu putar arah 4 cm ke atas.",
        questionSubtext: "Berapakah jarak total langkah rute sekuensial semut?",
        aiContext: "Rute spasial 5+4.",
        choices: [{ value: 8, label: "8 cm" }, { value: 9, label: "9 cm" }, { value: 10, label: "10 cm" }],
        correctAnswer: 9,
        successMessage: "Bagus! Kamu memahami instruksi runtutan pergerakan spasial.",
        errorMessage: "Hitung total langkah tanpa mengurangi arah.",
        totalItems: 9
      }
    ]
  },
  "q_algo_2": {
    id: "q_algo_2",
    topic: "Flowchart Angka",
    difficulty: "Advanced",
    questions: [
      {
        id: "q_alg_2_s1",
        questionText: "Pilih angka 4. Kalikan dengan 2.",
        questionSubtext: "Berapa hasil akhirnya?",
        aiContext: "Algoritma flowchart dasar 4x2.",
        choices: [{ value: 6, label: "6" }, { value: 8, label: "8" }, { value: 10, label: "10" }],
        correctAnswer: 8,
        successMessage: "Mesin instruksi berjalan baik.",
        errorMessage: "Lakukan operasi perkalian.",
        totalItems: 8
      },
      {
        id: "q_alg_2_s2",
        questionText: "Mulai dengan data input angka 10. Kurangi dengan angka 3, kemudian kalikan hasilnya dengan 2.",
        questionSubtext: "Berapa nilai keluaran akhir algoritma logika flowchart ini?",
        aiContext: "Urutan prioritas operasi: (10-3) * 2.",
        choices: [{ value: 12, label: "12" }, { value: 14, label: "14" }, { value: 16, label: "16" }],
        correctAnswer: 14,
        successMessage: "Hebat! Runtutan operasi prioritas tanda kurung berhasil.",
        errorMessage: "Ikuti tahapan instruksi satu per satu secara kronologis.",
        totalItems: 14
      },
      {
        id: "q_alg_2_s3",
        questionText: "Input nilai awal 6. Jalankan percabangan logika: Jika genap, tambahkan dengan angka 4. Jika ganjil, kurangi 2.",
        questionSubtext: "Berapakah hasil output akhir dari gerbang logika ini?",
        aiContext: "Logika IF-ELSE. Angka 6 genap, maka 6+4=10.",
        choices: [{ value: 4, label: "4" }, { value: 8, label: "8" }, { value: 10, label: "10" }],
        correctAnswer: 10,
        successMessage: "Luar biasa! Kamu menguasai konsep kondisi kondisional dasar.",
        errorMessage: "Identifikasi apakah angka 6 genap atau ganjil terlebih dahulu.",
        totalItems: 10
      }
    ]
  },
  "q_algo_3": {
    id: "q_algo_3",
    topic: "Puncak SNAG",
    difficulty: "Advanced",
    questions: [
      {
        id: "q_alg_3_s1",
        questionText: "Bawa 10 apel. Bagi menjadi 2 kelompok. Tambahkan 1 apel ke satu kelompok.",
        questionSubtext: "Berapa apel di kelompok yang ditambahkan?",
        aiContext: "Dekomposisi bercabang: (10/2)+1.",
        choices: [{ value: 5, label: "5" }, { value: 6, label: "6" }, { value: 7, label: "7" }],
        correctAnswer: 6,
        successMessage: "Evaluasi instruksi bercabang pertama terlewati.",
        errorMessage: "Ikuti instruksi langkah demi langkah.",
        totalItems: 10
      },
      {
        id: "q_alg_3_s2",
        questionText: "Ada kantong berisi 12 permen. Bagi rata ke dalam 3 wadah kecil. Ambil 2 permen dari wadah pertama.",
        questionSubtext: "Berapakah sisa permen pada wadah pertama tersebut?",
        aiContext: "Algoritma bertingkat: (12/3)-2.",
        choices: [{ value: 2, label: "2 permen" }, { value: 4, label: "4 permen" }, { value: 6, label: "6 permen" }],
        correctAnswer: 2,
        successMessage: "Tepat sekali! Evaluasi sekuensial bersarang berhasil diselesaikan.",
        errorMessage: "Bagi dulu 12 dengan 3, lalu kurangi hasilnya dengan nilai 2.",
        totalItems: 12
      },
      {
        id: "q_alg_3_s3",
        questionText: "Mulai: Ambil 15 kotak puzzle. Distribusikan rata ke 5 anak. Anak ketiga mendapatkan bonus tambahan 2 kotak lagi.",
        questionSubtext: "Berapakah total akhir kotak puzzle yang dimiliki anak ketiga?",
        aiContext: "Operasi puncak: (15/5)+2.",
        choices: [{ value: 3, label: "3 kotak" }, { value: 5, label: "5 kotak" }, { value: 6, label: "6 kotak" }],
        correctAnswer: 5,
        successMessage: "Selamat! Kamu menamatkan SNAG Platform dengan pencapaian tertinggi!",
        errorMessage: "Hitung jatah dasar pembagian rata, lalu akumulasikan dengan nilai bonus.",
        totalItems: 15
      }
    ]
  }
};