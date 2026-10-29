# 08 — Rencana Testing & QA

Strategi testing versi 1: **manual terstruktur + checklist**, karena tidak ada
backend dan tidak ada data sensitif. Automation (unit test) ditunda ke v2.

---

## 1. Strategi

| Jenis | Metode | Kapan |
|-------|--------|-------|
| Fungsional | Manual, test case per fitur (lihat §3) | Sebelum deploy |
| Responsif | Manual, 4 ukuran layar | Sebelum deploy |
| Lintas browser | Manual, 4 browser | Sebelum deploy |
| Aksesibilitas | Lighthouse + keyboard walkthrough | Sebelum deploy |
| Performa | Lighthouse (mode mobile) | Sebelum deploy |
| Konten | Proofreading seluruh teks | Sebelum deploy |
| Regression | Checklist cepat tiap update promo | Setiap deploy |

---

## 2. Matriks Browser & Perangkat

| Platform | Versi minimum | Catatan |
|----------|---------------|---------|
| Chrome | 90+ | Browser utama audiens |
| Edge | 90+ | Sama dengan Chromium |
| Firefox | 90+ | Uji `backdrop-filter` |
| Safari (iOS) | 14+ | Uji `100dvh`, sticky header, `-webkit-` prefix |
| Android Chrome | 90+ | Mayoritas pengguna HP |

**Ukuran layar uji**
| Label | Lebar × tinggi |
|-------|----------------|
| HP kecil | 360 × 740 |
| HP besar | 414 × 896 |
| Tablet | 768 × 1024 |
| Laptop | 1280 × 800 |
| Desktop | 1440 × 900 |

---

## 3. Test Case Fungsional

### 3.1 Navigasi & Routing
| ID | Langkah | Expected |
|----|---------|----------|
| TC-01 | Klik logo di navbar | Masuk Beranda, URL `/` |
| TC-02 | Klik menu Promo | URL `/promo`, halaman berubah |
| TC-03 | Klik Profil → Kontak | Navigasi benar, menu aktif berubah warna |
| TC-04 | Klik item nav yang sedang aktif | Tetap di halaman, tidak error |
| TC-05 | Refresh browser di `/promo` | Halaman tetap tampil (butuh SPA fallback) |
| TC-06 | Buka URL tidak dikenal `/xyz` | Tampil halaman 404 + tombol kembali |
| TC-07 | Klik tombol "Kembali ke Beranda" di 404 | Masuk `/` |
| TC-08 | Geser halaman lalu pindah halaman | Scroll kembali ke atas otomatis |
| TC-09 | Mobile: klik tombol ☰ | Menu terbuka, body tidak bisa di-scroll |
| TC-10 | Mobile: klik menu → tutup | Menu tertutup, scroll body normal |

### 3.2 Halaman Promo
| ID | Langkah | Expected |
|----|---------|----------|
| TC-11 | Buka `/promo` | 8 kartu produk tampil |
| TC-12 | Ketik "vitamin" di pencarian | Hanya produk vitamin yang tampil, counter sesuai |
| TC-13 | Ketik "zzz" (tidak ada hasil) | Empty state muncul + tombol Reset |
| TC-14 | Klik Reset pencarian | Semua 8 produk kembali |
| TC-15 | Klik chip "Alat Kesehatan" | Hanya 2 produk alat kesehatan |
| TC-16 | Klik chip "Semua" setelah filter lain | Semua produk kembali |
| TC-17 | Pencarian + kategori bersamaan | Kedua filter berlaku (AND) |
| TC-18 | Periksa badge diskon | Persentase sesuai hitungan (contoh: 12.000 dari 18.000 = 33%) |
| TC-19 | Klik "Pesan Promo Ini" | Tab WhatsApp terbuka, pesan memuat nama produk + harga |
| TC-20 | Cek tampilan kartu | Harga normal ter-coret, chip "Hemat Rp…" benar |

### 3.3 Halaman Kontak
| ID | Langkah | Expected |
|----|---------|----------|
| TC-21 | Klik "Kirim via WhatsApp" tanpa isi | Pesan validasi muncul, tab tidak terbuka |
| TC-22 | Isi nama saja, pesan kosong | Validasi muncul (pesan wajib) |
| TC-23 | Isi nama + pesan | Tab WhatsApp terbuka, isi pesan rapi multi-baris |
| TC-24 | Pilih keperluan "Resep dokter" | Nilai select terkirim ke pesan |
| TC-25 | Klik "Buka di Google Maps" | Peta terbuka di tab baru |
| TC-26 | Buka/tutup 4 FAQ | Hanya satu boleh terbuka, ikon + berubah jadi − |
| TC-27 | Klik nomor telepon | Membuka aplikasi telepon (HP) |
| TC-28 | Klik email | Membuka aplikasi email |
| TC-42 | Klik tab cabang (Sanur/Kuta/Ubud) | Panel detail & embed peta berganti ke cabang terpilih |
| TC-43 | Pindah cabang, lalu lihat kartu "Jam Buka" | Jam buka mengikuti cabang yang sedang dipilih |
| TC-44 | Klik "Chat Cabang {nama}" | WhatsApp terbuka dengan sapaan menyebut nama cabang |
| TC-45 | Klik "Cabang lain … lihat di peta" di footer | Masuk `/kontak` lalu scroll ke section `#lokasi` |

### 3.4 Halaman Beranda & Profil
| ID | Langkah | Expected |
|----|---------|----------|
| TC-29 | Buka `/` | Hero, statistik, 4 kartu promo, layanan, testimoni, CTA tampil |
| TC-30 | Klik "Lihat Promo Bulan Ini" | Masuk `/promo` |
| TC-31 | Klik "Lihat semua promo (8)" | Masuk `/promo` |
| TC-32 | Arahkan kursor ke kartu produk | Efek angkat 3D (hanya di perangkat dengan hover) |
| TC-33 | Buka `/profil` | Cerita, fakta, visi-misi, 4 nilai tampil |
| TC-34 | Klik "Lihat Lokasi" di CTA band | Masuk `/kontak` |

### 3.5 Global
| ID | Langkah | Expected |
|----|---------|----------|
| TC-35 | Scroll halaman | Navbar berubah jadi putihblur + bayangan |
| TC-36 | Klik link eksternal apa pun | `target="_blank"` + `rel="noreferrer"` |
| TC-37 | Tekan Tab berulang | Fokus terlihat jelas, urutan logis, tidak "terjebak" |
| TC-38 | Aktifkan `prefers-reduced-motion` | Semua animasi berhenti |
| TC-39 | Zoom browser 200% | Layout tidak rusak, tidak ada scroll horizontal |
| TC-40 | Buka Beranda di HP 360–414px | Panggung 3D: kartu **tertumpuk rapi**, tidak saling menutupi, tidak meluber keluar layar |
| TC-41 | Cek kartu produk di HP | 1 kolom, tombol "Pesan Promo Ini" tetap penuh & mudah diketuk |

### 3.6 Catatan Temuan (dari Pengujian mockup)
| Temuan | Severity | Status |
|--------|----------|--------|
| Panggung 3D di layar ≤ 560px: kartu melayang saling menutupi & meluber (scene collapses ke 0px) | 🔴 Blocker | ✅ Diperbaiki — jadi `flex-direction: column` pada `home.css` & `mockup.css` |
| `favicon.ico` 404 di mockup | ⚪ Trivial | ✅ Diperbaiki — tambah `favicon.svg` |
| Beranda: produk hanya memenuhi 2 dari 3 tingkat rak (rak terlihat kosong) | 🟠 Major | ✅ Diperbaiki — `stockedRows()` mengisi penuh tiap tingkat |
| Beranda: dinding/plafon terlalu terang sampai putih pucat, kontras datar | 🟠 Major | ✅ Diperbaiki — ambient 0,55→0,22, cahaya plafon 9→4,5, eksposur 1,05→0,85, bloom threshold 0,82→0,93 |
| Beranda: produk melayang/berputar pelan di rak (kesan mainan) | 🟠 Major | ✅ Diperbaiki — objek diam, skala dikompensasi agar dasar tetap menempel papan |
| Klik produk 3D di Beranda → `<StoreHero>` crash (`toLocaleString of undefined`) | 🔴 Blocker | ✅ Diperbaiki — hover kirim objek produk, bukan id string |
| Pengunjung harus klik "MASUK" pada layar pembuka | 🟡 Suggestion | ✅ Diubah — loading otomatis masuk sendiri |
| Progres layar muat selalu 0% (`useProgress` drei di R3F v9) | 🟠 Major | ✅ Diperbaiki — pelacakan via `THREE.DefaultLoadingManager` |
| Toko 3D tidak ada orangnya (kurang hidup) | 🟡 Suggestion | ✅ Ditambahkan — apoteker + 2 pembeli prosedural (`People.jsx`) |
| Pembeli yang baru masuk tampak **raksasa** (berdiri terlalu dekat kamera di titik mulai) | 🟠 Major | ✅ Diperbaiki — titik masuk/keluar dipindah ke tepi bingkai, rute dijaga di z ≤ 0,5 |
| Monitor POS menghalangi tangan & kotak obat apoteker | 🟠 Major | ✅ Diperbaiki — monitor dipindah ke ujung kiri meja (dihitung dari garis pandang kamera) |
| Kamera `autoRotate` menyusur 34° dalam 20 detik → komposisi rusak, orang keluar bingkai | 🟠 Major | ✅ Diperbaiki — kecepatan 0,28→0,1 + pembatasan azimuth ±0,6 rad |
| Animasi orang tampak macet saat diuji | ⚪ Info | ℹ️ Bukan bug — browser headless hanya ±1 fps; uji dengan `/?speed=12` (dev only) |
| Lokasi & peta masih satu titik (Depok) | 🟠 Major | ✅ Diperbarui — Bali, 4 cabang + pemilih cabang & embed peta di `/kontak#lokasi` |

---

## 4. Checklist Aksesibilitas

| No | Item | Status |
|----|------|--------|
| 1 | Semua gambar/ikon dekoratif `aria-hidden` | ⬜ |
| 2 | Setiap halaman punya tepat 1 `h1` | ⬜ |
| 3 | Heading tidak melompat level (h1 → h2 → h3) | ⬜ |
| 4 | Semua `<a>` punya teks yang jelas (bukan "klik di sini") | ⬜ |
| 5 | Tombol icon-only punya `aria-label` | ⬜ |
| 6 | Form: label terhubung dengan input (`for`/`id`) | ⬜ |
| 7 | Fokus keyboard terlihat (outline tidak dihapus) | ⬜ |
| 8 | Kontras teks ≥ 4.5:1 | ⬜ |
| 9 | Target sentuh ≥ 44×44 px | ⬜ |
| 10 | Tidak ada informasi penting yang hanya ditampilkan lewat gambar | ⬜ |

---

## 5. Checklist Performa (Lighthouse)

| Metrik | Target | Catatan |
|--------|--------|---------|
| Performance (mobile) | ≥ 90 | Uji dengan throttling |
| Accessibility | ≥ 90 | |
| Best Practices | ≥ 90 | |
| SEO | ≥ 90 | |
| First Contentful Paint | < 1,8 dtk | |
| Largest Contentful Paint | < 2,5 dtk | |
| Cumulative Layout Shift | < 0,1 | |
| Total Blocking Time | < 200ms | |

---

## 6. Severity & Template Bug

| Severity | Definisi | Contoh |
|----------|----------|--------|
| 🔴 **Blocker** | Situs tidak bisa dipakai / data salah | Halaman tidak terbuka, harga salah |
| 🟠 **Major** | Fitur inti rusak | Filter tidak jalan |
| 🟡 **Minor** | Ada masalah visual kecil | Jarak tidak rapi |
| ⚪ **Trivial** | Typo / Suggesti | Salah ejaan |

**Template laporan:**
```
[ID] [Severity] Judik singkat
Halaman : /promo
Langkah : ketik "vitamin" di pencarian
Harapan : 2 kartu vitamin tampil
Aktual  : 0 kartu, muncul empty state
Perangkat: Chrome 120, Windows 11, 1366×768
Screenshoot: (tautan)
```

---

## 7. Checklist Update Promo (Regresi Cepat)

Setiap kali data promo berubah, cukup cek 6 hal ini — sisanya tidak berubah:

- [ ] Jumlah produk = jumlah di counter
- [ ] Semua kategori baru masih muncul di chip filter
- [ ] Harga promo < harga normal (tidak ada yang terbalik)
- [ ] Badge diskon terhitung benar
- [ ] Tombol WhatsApp memuat nama produk terbaru
- [ ] Tanggal batas promo belum lewat