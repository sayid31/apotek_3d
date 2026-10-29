# 02 — Wireframe

Sketsa lo-fi tiap halaman. Bukan gambar akhir — hanya **posisi blok, hierarki,
dan prioritas konten**. Ukuran relatif, tidak berskala 1:1.

**Kode warna teks:**
- `▌` = elemen tetap/global
- `▢` = gambar/visual
- `●` = interaktif (bisa diklik)
- `…` = teks paragraf

---

## 1. GLOBAL — Navbar & Footer

### 1.1 Navbar (desktop, semua halaman)
```
▌ ╭──────────────────────────────────────────────────────────────────────╮
▌ │ ◉ apotek3D        [Beranda] [Promo] [Profil] [Kontak]   ● Chat Kami │
▌ ╰──────────────────────────────────────────────────────────────────────╯
   ▲ fixed di atas, transparan → putih blur saat scroll   ▲ CTA utama
```

### 1.2 Navbar (mobile ≤ 900px)
```
Default:                    Saat menu dibuka:
╭────────────────────╮       ╭────────────────────╮
│ ◉ apotek3D      ☰ │       │ ◉ apotek3D      ✕ │
╰────────────────────╯       │ ┌────────────────┐ │
                             │ │ Beranda        │ │
                             │ │ Promo          │ │ ← panel slide-down
                             │ │ Profil         │ │    menutupi konten
                             │ │ Kontak         │ │
                             │ │ [● Chat Kami]  │ │
                             │ └────────────────┘ │
                             ╰────────────────────╯
```

### 1.3 Footer (semua halaman)
```
╭──────────────────────────────────────────────────────────────────────╮
│ ◉ apotek3D          NAVIGASI        HUBUNGI KAMI      JAM BUKA       │
│   Ringkasan          • Beranda      ▌alamat           ▌Sen–Jum 08–22 │
│   singkat            • Promo        ▌telepon          ▌Sabtu  08–23  │
│   + izin             • Profil       ▌email            ▌Minggu 09–21  │
│   [● Konsultasi]     • Kontak                          ▌24 jam via WA │
├──────────────────────────────────────────────────────────────────────┤
│ © 2026 apotek3D                        Izin SIP No. 503/1234/…       │
╰──────────────────────────────────────────────────────────────────────╯
```

---

## 2. BERANDA `/`

### 2.1 Desktop
```
▌navbar (fixed)
────────────────────────────────────────────────────────────────────────
╭─────────────────────────────────────┬────────────────────────────────╮
│ HERO (2 kolom)                      │  ▢ panggung 3D                │
│                                     │                                │
│ [● Apotek keluarga sejak 2011]      │      ╔════════╗   ┌─PROMO────┐│
│                                     │       ║ kubus ║   │ OKTOBER  ││
│ H1: Obat asli, harga jujur,         │       ║  3D   ║   │ s.d. 40% ││
│     diantar cepat ke rumah Anda.    │       ╚════════╝   └──────────┘│
│                                     │                                │
│ …lead paragraph (2 baris)           │   ┌──────────────────────────┐ │
│                                     │   │ Pesanan #A-118           │ │
│ [● Lihat Promo] [● Tanya Apoteker]  │   │ Paracetamol     Rp12.000 │ │
│                                     │   │ Vitamin C       Rp45.000 │ │
│ ✓ 100% resmi                        │   │ Total hemat    -Rp46.000 │ │
│ ✓ Antar 30 menit                    │   │ ● Dalam perjalanan        │ │
│ ✓ Rating 4.9/5                      │   └──────────────────────────┘ │
│                                     │      ┌─rating─┐               │
└─────────────────────────────────────┴──────┴────────┴───────────────┘
╭──────────────────────────────────────────────────────────────────────╮
│  ▌ 15 thn        ▌ 12.000+         ▌ 2.500+         ▌ 4.9/5        │
│    Melayani        Pelanggan         Produk           Rating         │
│    warga Depok     setia             tersedia                        │
╰─ strip statistik (latar hijau tua, MARGIN-OVERLAP naik ke atas) ─────╯

        PROMO UNGGULAN — "Penawaran spesial bulan ini"
        [subtitle: berlaku 1–31 Oktober 2026]

   ┌─ kartu ──────────┐ ┌─ kartu ──────────┐ ┌─ … ────────┐ ┌─ … ────────┐
   │ ▢ media   -40%   │ │ ▢ media   -40%   │ │             │ │             │
   │ ──────────────── │ │                   │ │             │ │             │ │
   │ [kategori]       │ │                   │ │             │ │             │
   │ Nama produk      │ │                   │ │             │ │             │
   │ deskripsi 2 baris│ │                   │ │             │ │             │ │
   │ Rp12.000 Rp18.000│ │                   │ │             │ │             │ │
   │ [● Pesan Promo]  │ │                   │ │             │ │             │ │
   └──────────────────┘ └───────────────────┘ └─────────────┘ └─────────────┘
                     [● Lihat semua promo (8) →]
────────────────────────────────────────────────────────────────────────
   LAYANAN KAMI (latar abu hijau) — 4 kartu sejajar
   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ [icon]   │ │ [icon]   │ │ [icon]   │ │ [icon]   │
   │ Judul    │ │          │ │          │ │          │
   │ …desc    │ │          │ │          │ │          │
   └──────────┘ └──────────┘ └──────────┘ └──────────┘

   TESTIMONI — 3 kartu sejajar
   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
   │ ★★★★★          │ │                │ │                │
   │ "kutipan…"     │ │                │ │                │
   │ (A) Nama       │ │                │ │                │
   └────────────────┘ └────────────────┘ └────────────────┘

   CTA BAND (kartu hijau gradasi, lebar penuh)
   Butuh obat mendesak malam ini?          [● Pesan via WhatsApp]
   …penjelasan                            [○ Lihat Lokasi]
────────────────────────────────────────────────────────────────────────
▌footer
```

**Catatan Beranda:**
- Hero wajib memuat **2 CTA** dan **3 bukti kredibilitas** — jangan lebih.
- Strip statistik sengaja *menumpuk* ke atas hero untuk kesan berlapis (efek 3D).
- Promo unggulan menampilkan **maksimal 4** kartu; sisanya diarahkan ke `/promo`.
- Panggung 3D (`kubus + kartu melayang`) bersifat dekoratif → `aria-hidden`.

### 2.2 Mobile (≤ 560px)
```
╭────────────────────────────╮
│ ◉ apotek3D              ☰  │
├────────────────────────────┤
│ [● Apotek keluarga 2011]   │
│ H1 (3 baris)               │
│ …lead                      │
│ [● Lihat Promo Bulan Ini]  │ ← lebar penuh
│ [● Tanya Apoteker]         │
│ ✓ ✓ ✓ (wrap 2 baris)      │
│                            │
│   ▢ panggung 3D            │ ← tinggi 400px,
│     (kubus + 3 kartu       │    kartu mengecil,
│      menyesuaikan)         │    rating pindah bawah
├────────────────────────────┤
│ statistik 2 × 2            │
├────────────────────────────┤
│ kartu produk: 1 kolom      │
│ …                          │
```

---

## 3. PROMO `/promo`

```
▌navbar
────────────────────────────────────────────────────────────────────────
╭──────────────────────────────────────────────────────────────────────╮
│              ▌ PAGE HERO (latar hijau tua + orb dekoratif)           │
│              [● Katalog Promo]                                       │
│              Promo khusus bulan ini                                  │
│              Berlaku 1–31 Oktober 2026 atau selama stok ada          │
╰──────────────────────────────────────────────────────────────────────╯

╭─ info bar ───────────────────────────────────────────────────────────╮
│ [🏷] Cara pesan: klik "Pesan Promo Ini" → WhatsApp terbuka dgn       │
│     detail pesanan terisi → apoteker konfirmasi stok & ongkir        │
╰──────────────────────────────────────────────────────────────────────╯

╭──────────────────────────────────┬───────────────────────────────────╮
│ 🔍 [Cari obat, vitamin, alat…]   │ (Semua) Obat Umum Vitamin Perawatan │
╰──────────────────────────────────┴───────────────────────────────────╯
                    ▲ filter kategori (chip) — chip aktif = hijau

 Menampilkan 8 dari 8 produk promo

 ┌─ kartu ───────────┐ ┌─ … ────────┐ ┌─ … ────────┐ ┌─ … ────────┐
 │ (sama dgn beranda) │ │             │ │             │ │             │
 └────────────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
   … (grid 4 kolom desktop / 2 kolom tablet / 1 kolom HP)

 ┌─ EMPTY STATE (saat pencarian kosong hasil) ────────────────────────┐
 │                     (ikon 🔍 besar)                                │
 │              Produk tidak ditemukan                                │
 │         Coba kata kunci lain / kategori "Semua"                    │
 │                   [● Reset pencarian]                              │
 └────────────────────────────────────────────────────────────────────┘

   TIPS HEMAT (latar tint) — ajakan gabung grup WhatsApp
   CTA BAND
────────────────────────────────────────────────────────────────────────
▌footer
```

**Aturan data:**
- Sumber data = **satu daftar statis** `src/data/products.js`.
- Produk yang **tidak sedang promo tidak boleh tampil** di halaman ini.
- Sembunyikan seluruh blok bila daftar kosong (jangan tampilkan judul kosong).

---

## 4. PROFIL `/profil`

```
▌navbar
╭──────────────────────────────────────────────────────────────────────╮
│ ▌ PAGE HERO: "Melayani keluarga Depok sejak 2011" + lead            │
╰──────────────────────────────────────────────────────────────────────╯

╭───────────────────────────────────┬─────────────────────────────────╮
│ CERITA KAMI                       │ ▌ KARTU KUTIPAN (hijau tua)     │
│                                   │                                 │
│ H2: Dari etalase kecil…           │  [♥]                            │
│                                   │  "Obat harus sampai ke orang    │
│ …paragraf 1                       │   yang membutuhkannya…"         │
│ …paragraf 2                       │                                 │
│                                   │  (A) apt. Andini Rahmawati      │
│ ✓ checklist 3 poin                │      Pendiri & Apoteker PJ      │
╰───────────────────────────────────┴─────────────────────────────────╯

 ┌─ fakta ─────────┐ ┌─ fakta ────────┐ ┌─ fakta ──────┐ ┌─ fakta ─────┐
 │ [🛡] Izin SIP…   │ │ [👥] 4 Apoteker │ │ [★] 2.500+   │ │ [📍] 2 Cabang│
 └──────────────────┘ └────────────────┘ └──────────────┘ └─────────────┘

 ─── VISI & MISI (latar tint, 2 kolom) ───
 ┌─ VISI ─────────────────────┐ ┌─ MISI ──────────────────────┐
 │ [● Visi]                   │ │ [● Misi]                    │
 │ H3 kalimat visi            │ │ ✓ butir 1                   │
 │ …paragraf                  │ │ ✓ butir 2                   │
 │                             │ │ ✓ butir 3                   │
 └─────────────────────────────┘ │ ✓ butir 4                   │
                                 └──────────────────────────────┘

 ─── NILAI KAMI — 4 kartu ───
 ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
 │ [icon]  01   │ │ [icon]  02   │ │ …            │ │ …            │
 │ Amanah       │ │ Ramah        │ │              │ │              │
 │ …desc        │ │              │ │              │ │              │
 └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

 CTA BAND  →  ▌footer
```

---

## 5. KONTAK `/kontak`

```
▌navbar
╭──────────────────────────────────────────────────────────────────────╮
│ ▌ PAGE HERO: "Mampir atau chat kapan saja" + lead                   │
╰──────────────────────────────────────────────────────────────────────╯

╭─────────────────────────────┬───────────────────────────────────────╮
│ KARTU INFO (kolom kiri)     │ FORM (kolom kanan)                    │
│                             │ ┌───────────────────────────────────┐ │
│ ┌─────────────────────────┐ │ │ [● Kirim Pesan]                  │ │
│ │ [📍] Alamat Toko        │ │ │ H2: Butuh obat atau konsultasi?  │ │
│ │  …alamat                │ │ │ …pengantar                       │ │
│ │  Buka di Google Maps →  │ │ │                                   │ │
│ └─────────────────────────┘ │ │ Nama lengkap │ No. HP / WA       │ │
│ ┌─────────────────────────┐ │ │ [input      ] │ [input          ] │ │
│ │ [📞] Telepon & WA       │ │ │ Keperluan (select)               │ │
│ │  …nomor                 │ │ │ [dropdown ▾]                     │ │
│ └─────────────────────────┘ │ │ Pesan (textarea)                 │ │
│ ┌─────────────────────────┐ │ │ [______________________________] │ │
│ │ [✉] Email               │ │ │                                   │ │
│ └─────────────────────────┘ │ │ [● Kirim via WhatsApp (blok)]    │ │
│ ┌─────────────────────────┐ │ └───────────────────────────────────┘ │
│ │ [🕐] JAM BUKA           │ │  ▲ validasi: nama & pesan wajib      │
│ │  Sen–Jum      08–22     │ │  ▲ pesan diformat rapi → wa.me       │
│ │  …                        │ │  ▲ tampilkan notifikasi sukses      │
│ └─────────────────────────┘ │                                       │
╰─────────────────────────────┴───────────────────────────────────────╯

 ─── LOKASI KAMI (latar tint) ───
 ┌────────────────────────────────────────────────────────────────────┐
 │ ▌ GOOGLE MAPS — iframe lebar penuh, tinggi 420px                   │
 └────────────────────────────────────────────────────────────────────┘

 ─── PERTANYAAN UMUM ───
 ┌────────────────────────────────────────────────────────────────────┐
 │ Apakah bisa beli tanpa resep?                              [ + ]  │
 ├────────────────────────────────────────────────────────────────────┤
 │ Berapa lama pengiriman?                                  [ + ]  │
 ├────────────────────────────────────────────────────────────────────┤
 │ Metode pembayaran apa yang diterima?                     [ + ]  │
 └────────────────────────────────────────────────────────────────────┘
                    ▲ <details> — hanya 1 terbuka bebas, tanpa JS

 CTA BAND  →  ▌footer
```

---

## 6. 404 `*`

```
▌navbar
╭──────────────────────────────────────────────────────────────────────╮
│                                                                      │
│                        4 0 4                                         │
│              Halaman tidak ditemukan                                 │
│     Halaman yang kamu tuju sudah dipindah atau tidak pernah ada.     │
│                       [● Kembali ke Beranda]                         │
│                                                                      │
╰──────────────────────────────────────────────────────────────────────╯
▌footer
```

---

## 7. Prioritas Layout & Breakpoint

| Breakpoint | Lebar | Kolom produk | Navbar | Statistik |
|------------|-------|-------------|--------|-----------|
| HP kecil | ≤ 560px | 1 | hamburger | 2 × 2 |
| HP besar / tablet | 561–900px | 2 | hamburger | 2 × 2 |
| Laptop | 901–1080px | 3 | penuh | 4 kolom |
| Desktop | ≥ 1081px | 4 | penuh | 4 kolom |

**Urutan tampilan mobile (urutan DOM = urutan baca):**
1. Judul & CTA 2. Bukti kredibilitas 3. Konten/promo 4. Kontak
   → tidak ada elemen penting yang boleh disembunyikan di mobile.

---

## 8. Daftar Elemen Interaktif (wajib hidup)

| # | Elemen | Halaman | Perilaku |
|---|--------|---------|----------|
| 1 | Menu navigasi | global | Ganti route + tutup menu otomatis |
| 2 | Tombol "Chat Kami" | global | Buka `wa.me` (tab baru) |
| 3 | Tombol promo | Beranda, Promo | Buka `wa.me` dgn pesan terisi produk |
| 4 | Pencarian | Promo | Filter real-time |
| 5 | Chip kategori | Promo | Filter + state aktif |
| 6 | Reset pencarian | Promo | Kembalikan ke keadaan awal |
| 7 | Form kontak | Kontak | Validasi → buka WhatsApp |
| 8 | FAQ | Kontak | Buka/tutup akordeon |
| 9 | Kartu produk | Beranda, Promo | Efek angkat 3D saat hover |
| 10 | Iframe peta | Kontak | Klik → buka Google Maps |
