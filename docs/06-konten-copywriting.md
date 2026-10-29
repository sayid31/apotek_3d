# 06 — Rencana Konten & Copywriting

Naskah **final** untuk seluruh teks website (siap dipakai di kode). Semua teks
berbahasa Indonesia, ramah, dan tanpa klaim medis berlebihan.

> **Revisi (Okt 2026)** — dua perubahan besar mengikuti arahan pemilik:
> 1. **Lokasi: Bali dengan empat cabang** (Denpasar–pusat, Sanur, Kuta/Tuban, Ubud).
>    Struktur data cabang ada di `src/data/site.js` (`site.branches`: alamat, landmark,
>    catatan, jam buka, koordinat). Peta Google dibangun otomatis dari koordinat
>    (`mapsEmbed`/`mapsLink`), lalu ditampilkan dengan pemilih cabang di `/kontak#lokasi`.
>    *Alamat, nomor, dan izin masih contoh — menunggu data asli.*
> 2. **Gaya humanis**: teks ditulis ulang sebagai bahasa bertutur yang hangat — konkret,
>    memakai sudut pandang orang, bukan brosur. Contoh pola yang dipakai:
>    *"Obat yang kami simpan adalah obat yang kami berikan kepada keluarga kami sendiri"*
>    menggantikan *"100% Produk Asli"*. Naskah per halaman di bawah sudah diselaraskan;
>    kata "pelanggan" beralih ke "Anda"/"keluarga" di tempat yang wajar.

---

## 1. Aturan Bahasa

| Aspek | Aturan |
|-------|--------|
| Bentuk kata | Sapaan memakai "Anda" (bukan "kamu") |
| Nada | Ramah dan menenangkan, seperti apoteker yang menjelaskan |
| Sapaan | "Halo {nama}!" — singkat, tanpa berbelit |
| Panjang | Headline maksimal 12 kata · deskripsi produk maksimal 120 karakter |
| Sudut pandang | Manfaat pelanggan dulu, baru informasi produk |
| Huruf | Sentence case untuk judul (jangan HURUF BESAR semua) |
| Angka | Format Indonesia: `12.000`, `4,9`, `08.00–22.00` |

### ✅ Boleh vs. ❌ Hindari
| ✅ Gunakan | ❌ Hindari |
|-----------|-----------|
| "Obat asli, harga jujur" | "Apotek terbaik dan termurah se-Indonesia" |
| "Konsultasi gratis dengan apoteker" | "Garansi tanpa efek samping" |
| "Diskon 40% sampai 31 Okt 2026" | "PROMO TERBATAS SEGERA!!!" |
| "Pereda nyeri ringan" | "Menyembuhkan semua penyakit" |
| "Untuk ibu menyusui, gunakan sesuai catatan kemasan" | "Pasti asli 100% dari luar negeri" |

---

## 2. Naskah Per Halaman

### 2.1 Elemen Global

| Elemen | Teks final |
|--------|-----------|
| Brand | `apotek` + `3D` (aksen warna) |
| Nav | Beranda · Promo · Profil · Kontak |
| Tombol navbar | `Chat Kami` |
| Tagline footer | `Apotek Keluarga Terpercaya` |
| Tombol footer | `Konsultasi Sekarang` |
| Baris bawah footer | `© {tahun} apotek3D. Seluruh hak cipta dilindungi.` |
| Baris izin | `Izin SIP No. 503/1234/DPMPTSP/2024` |

### 2.2 Beranda `/`

| Blok | Label | Teks final |
|------|-------|-----------|
| Hero | Eyebrow | `Apotek keluarga sejak 2011` |
| | H1 | `Obat asli, harga jujur, diantar cepat ke rumah Anda.` |
| | Lead | `apotek3D melayani kebutuhan kesehatan warga Depok dengan apoteker bersertifikat, konsultasi gratis, dan promo rutin setiap bulan.` |
| | CTA utama | `Lihat Promo Bulan Ini` |
| | CTA kedua | `Tanya Apoteker` |
| | Bukti 1–3 | `100% produk resmi` · `Antar 30 menit` · `Rating 4.9/5` |
| Statistik | 4 item | `15 thn Melayani warga Depok` · `12.000+ Pelanggan setia` · `2.500+ Produk tersedia` · `4.9/5 Rating pelanggan` |
| Promo | Eyebrow | `Promo Berjalan` |
| | Judul | `Penawaran spesial bulan ini` |
| | Subjudul | `Pilihan obat dan suplemen paling dicari, khusus dengan harga promo 1 – 31 Oktober 2026.` |
| | Link bawah | `Lihat semua promo (8)` |
| Layanan | Eyebrow / Judul | `Layanan Kami` / `Bukan sekadar tempat beli obat` |
| | Subjudul | `Empat hal yang membuat pelanggan tetap kembali ke apotek3D.` |
| Testimoni | Eyebrow / Judul | `Kata Pelanggan` / `Dipercaya ribuan keluarga` |
| | Subjudul | `Ulasan asli dari pelanggan yang rutin belanja di apotek3D.` |
| CTA band | Judul | `Butuh obat mendesak malam ini?` |
| | Isi | `Kirim daftar belanjaan lewat WhatsApp — kami siapkan dan antar secepat mungkin, termasuk di luar jam operasional toko.` |
| | Tombol | `Pesan via WhatsApp` · `Lihat Lokasi` |

### 2.3 Promo `/promo`

| Blok | Teks final |
|------|-----------|
| Eyebrow | `Katalog Promo` |
| H1 | `Promo khusus bulan ini` |
| Sub | `Semua produk di halaman ini sedang dalam masa diskon — berlaku 1 – 31 Oktober 2026 atau selama stok masih tersedia.` |
| Info bar | **Cara pesan:** klik "Pesan Promo Ini" pada produk, Anda akan diarahkan ke WhatsApp kami dengan detail pesanan yang sudah terisi. Apoteker akan mengonfirmasi ketersediaan dan menghitung ongkir. |
| Placeholder pencarian | `Cari obat, vitamin, alat kesehatan…` |
| Counter | `Menampilkan 8 dari 8 produk promo` |
| Empty state | Judul: `Produk tidak ditemukan` · Isi: `Coba kata kunci lain atau pilih kategori "Semua".` · Tombol: `Reset pencarian` |
| Tips hemat | Judul: `Mau tahu promo berikutnya lebih dulu?` · Isi: `Gabung ke grup WhatsApp pelanggan untuk info diskon, stok obat langka, dan jadwal cek kesehatan gratis.` |
| Disclaimer | `Harga promo berlaku selama periode berjalan atau hingga stok habis. Gambar produk bersifat ilustrasi.` |

### 2.4 Profil `/profil`

| Blok | Teks final |
|------|-----------|
| Eyebrow / H1 | `Profil Apotek` / `Melayani keluarga Depok sejak 2011` |
| Sub | `Berawal dari satu etalase kecil di Jl. Melati, kini apotek3D menjadi langganan kesehatan ribuan keluarga — dengan prinsip yang tidak pernah berubah.` |
| Cerita H2 | `Dari etalase kecil jadi rumah kedua warga sekitar` |
| Cerita ¶1 | `apotek3D didirikan pada 2011 oleh seorang apoteker muda yang ingin warga sekitar mendapat obat asli dengan harga wajar, tanpa harus menempuh perjalanan jauh ke rumah sakit. Perdana dibuka dengan 120 item obat dan satu orang apoteker penjaga.` |
| Cerita ¶2 | `Hari ini kami menampung lebih dari 2.500 produk, didukung empat apoteker bersertifikat, dan tetap mempertahankan kebiasaan lama: edukasi sebelum menjual. Kami percaya obat yang tepat dimulai dari penjelasan yang tepat.` |
| Checklist | `Konsultasi gratis tanpa minimum pembelian` · `Menyimpan obat pada suhu terkontrol sesuai standar` · `Menerima resep dokter dan menyiapkannya di tempat` |
| Kutipan | `"Obat harus sampai ke orang yang membutuhkannya — dengan harga yang tidak menyakiti, dan penjelasan yang membuat pasien paham."` — apt. Andini Rahmawati, S.Farm. (Pendiri & Apoteker Penanggung Jawab) |
| Fakta | `Izin SIP No. 503/1234/DPMPTSP/2024 — Berizin resmi` · `4 Apoteker — Bersertifikat` · `2.500+ — Produk tersedia` · `2 Cabang — Cimanggis & Kukusan` |
| Visi | `Menjadi apotek lingkungan paling dipercaya di Depok` — `Tempat di mana setiap keluarga merasa aman bertanya soal kesehatan, yakin mendapat obat asli, dan tidak pernah merasa dibebani biaya tersembunyi.` |
| Misi (4 butir) | ① Menjamin keaslian seluruh produk yang dijual. ② Memberi edukasi obat yang jujur dan mudah dipahami. ③ Menjaga harga tetap transparan dan bersaing. ④ Mengantar obat secepat mungkin saat pelanggan membutuhkan. |
| Nilai (4) | `Amanah` · `Ramah` · `Cepat` · `Konsisten` |
| Eyebrow Nilai | `Nilai Kami` · `Empat prinsip yang tidak kami tawar` |

### 2.5 Kontak `/kontak`

| Blok | Teks final |
|------|-----------|
| Eyebrow / H1 | `Kontak & Lokasi` / `Mampir atau chat kapan saja` |
| Sub | `Apoteker kami siap menjawab pertanyaan seputar obat, ketersediaan stok, dan promo yang sedang berjalan.` |
| Info | `Alamat Toko` (+ `Buka di Google Maps →`) · `Telepon & WhatsApp` (+ `Balasan tercepat lewat WhatsApp.`) · `Email` (+ `Untuk kerja sama dan pengadaan institusi.`) · `Jam Operasional` |
| Form | Eyebrow: `Kirim Pesan` · H2: `Butuh obat atau konsultasi?` · Lead: `Isi data berikut, pesan Anda akan otomatis terkirim ke WhatsApp apotek kami beserta format yang rapi.` |
| Label form | `Nama lengkap` · `No. HP / WhatsApp` · `Keperluan` · `Pesan` |
| Placeholder | `Contoh: Rina Kurnia` · `0812xxxxxxx` · `Tuliskan keluhan, nama obat, atau daftar belanjaan Anda…` |
| Pilihan keperluan | `Konsultasi obat` · `Cek ketersediaan produk` · `Pesan dan antar ke rumah` · `Resep dokter` · `Kerja sama dan pengadaan` |
| Tombol | `Kirim via WhatsApp` |
| Peta | Judul `Lokasi Kami` · `Mudah dijangkau dari arah mana pun` · `Berada di pusat Cimanggis, 2 menit dari exit tol dan dekat halte TransJakarta.` |
| FAQ | Judul `Pertanyaan Umum` · `Sering ditanyakan pelanggan` (4 pasang Q&A di bawah) |

---

## 3. Naskah FAQ (final)

| # | Pertanyaan | Jawaban |
|---|-----------|---------|
| 1 | Apakah bisa beli obat tanpa resep dokter? | Obat bebas (OB) dan obat terbatas (OTC) bisa langsung dibeli. Untuk obat keras (K) kami memerlukan salinan resep dokter sesuai peraturan yang berlaku. |
| 2 | Berapa lama pesanan diantar? | Untuk area Cimanggis sekitarnya rata-rata 30 menit sejak pesanan dikonfirmasi. Di luar jam buka, layanan antar tetap tersedia melalui WhatsApp dengan sedikit tambahan biaya kurir. |
| 3 | Metode pembayaran apa yang diterima? | Tunai, kartu debit, QRIS, transfer bank, dan dompet digital (GoPay, OVO, DANA, ShopeePay). Untuk pesanan antar, pembayaran dilakukan saat barang diterima atau lewat transfer di muka. |
| 4 | Apakah menerima resep dokter dari rumah sakit? | Bisa. Kirim foto resep melalui WhatsApp, lalu apoteker kami akan mengecek ketersediaan obat dan mengabari estimasi waktu penyiapan. |

---

## 4. Naskah Produk Promo (8 item contoh)

Format nama wajib: `Nama + kekuatan + jumlah isi`. Deskripsi = manfaat + catatan singkat.

| Nama | Kategori | Harga normal | Harga promo | Batas | Deskripsi (final) |
|------|----------|--------------|-------------|-------|-------------------|
| Paracetamol 500 mg — 10 Tablet | Obat Umum | Rp18.000 | Rp12.000 | 31 Okt 2026 | Penurun demam dan pereda nyeri ringan. Cocok untuk sakit kepala maupun nyeri otot. |
| Vitamin C 1000 mg — 30 Tablet | Vitamin & Suplemen | Rp75.000 | Rp45.000 | 31 Okt 2026 | Daya tahan tubuh tetap terjaga. Cukup satu tablet per hari setelah makan. |
| Sirup Anak Batuk & Pilek 60 ml | Ibu & Anak | Rp46.000 | Rp32.000 | 25 Okt 2026 | Formula lembut untuk anak usia 2–12 tahun, rasa jeruk yang tidak pahit. |
| Masker Medis 3 Ply — 50 pcs | Alat Kesehatan | Rp45.000 | Rp28.000 | 31 Okt 2026 | Filtrasi efektif 95%, nyaman dipakai seharian, karet elastis tidak menekan telinga. |
| Minyak Kayu Putih 100 ml | Perawatan Tubuh | Rp30.000 | Rp21.000 | 31 Okt 2026 | Penghangat tubuh andalan keluarga. Aromanya tahan lama dan tidak lengket. |
| Sunscreen SPF 50+ — 50 ml | Perawatan Tubuh | Rp105.000 | Rp69.000 | 20 Okt 2026 | Perlindungan UVA/UVB harian, tekstur ringan, cocok untuk aktivitas di luar ruangan. |
| Tensimeter Digital — 1 Unit | Alat Kesehatan | Rp525.000 | Rp385.000 | 31 Okt 2026 | Ukur tekanan darah sendiri di rumah dengan layar besar dan indikator detak jantung. |
| Susu Nutrisi Lansia — 400 g | Vitamin & Suplemen | Rp132.000 | Rp96.000 | 28 Okt 2026 | Tinggi protein dan kalsium untuk menjaga massa otot serta kepadatan tulang. |

**Checklist naskah produk:**
- [ ] Tidak ada klaim XF yang berlebihan
- [ ] Tidak menyesatkan soal khasiat
- [ ] Harga promo **harus lebih murah** dari harga normal
- [ ] Batas waktu promo wajib diisi
- [ ] Kategori harus salah satu dari: Obat Umum · Vitamin & Suplemen · Ibu & Anak · Alat Kesehatan · Perawatan Tubuh

---

## 5. Disclaimer (wajib — konteks obat)

**Kaki website (footer / akhir halaman):**
> Informasi di website ini bersifat umum dan bukan pengganti konsultasi dokter atau
> apoteker. Untuk diagnosis dan saran sustentávelan, silakan konsultasikan langsung.
> Promo berlaku sesuai periode dan ketersediaan stok.

**Teks di halaman Promo (setelah grid):**
> Harga promo berlaku selama periode berjalan atau hingga stok habis. Gambar produk
> bersifat ilustrasi. Obat keras tetap memerlukan resep dokter sesuai ketentuan.

**Teks pendek di footer:**
> Bukan pengganti konsultasi dokter.

---

## 6. Aset Visual yang Dibutuhkan

| Aset | Status | Keterangan |
|------|--------|------------|
| Logo vektor | ✅ Sudah (kubus 3D) | `public/favicon.svg` + komponen `Logo` |
| Favicon | ✅ Sudah | SVG 48×48 |
| Foto produk | ⬜ Opsional | Jika ada: rasio 1:1, latar polos, WebP ≤ 80KB, alt text = nama produk |
| Foto storefront/tim | ⬜ Untuk v2 | Tambahkan section Galeri di halaman Profil |
| OG image | ⬜ Wajib sebelum launch | 1200×630 px berisi logo + nama + promo bulan ini |
| Banner WhatsApp | ⬜ Wajib | Gambar promo 1080×1920 untukbroadcast ke pelanggan |

**Aturan alt text:**
- Logo di beranda → `apotek3D`; di tempat lain → `aria-hidden="true"`
- Ikon dekoratif → `aria-hidden="true"`, tanpa alt
- Foto produk → `Nama produk, kemasan {ukuran}` contoh: `Tensimeter digital apotek3D`

---

## 7. Jadwal Pemeliharaan Konten

| Jenis konten | Frekuensi | Penanggung jawab |
|--------------|-----------|-----------------|
| Produk promo | **Bulanan** (tanggal 1) | Admin apotek |
| Jam buka & hari libur | Setiap kali berubah | Admin apotek |
| Promo kilat / musiman | Saat ada (Ramadan, tahun sekolah) | Admin apotek |
| Testimoni baru | Bulanan (1–2 buah) | Admin apotek |
| Statistik & tahun berdiri | Tahunan | Admin apotek |

> Detail SOP ada di dokumen `09-deploy-maintenance.md` bagian 5.