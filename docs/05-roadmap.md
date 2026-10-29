# 05 — Roadmap, Checklist & Risiko

## 1. Roadmap (estimasi)

| Fase | Aktivitas | Estimasi | Keluaran |
|------|-----------|----------|----------|
| **0** Brief & kumpul konten | Interaksi awal + permintaan aset | Selesai | Daftar konten asli |
| **1** Rancangan | Workflow, wireframe, design system, arsitektur | **Sekarang** | Folder `docs/` ✅ |
| **1.5** Review | Diskusi & revisi rancangan bersama pemilik | 1× putaran | Persetujuan rancangan |
| **2** Desain visual | Mockup hi-fi mobile-first → desktop | 2–3 hari kerja | Mockup 4 halaman |
| **3a** Fondasi | Setup, design tokens, Navbar, Footer, komponen dasar | 1 hari | Kerangka jalan |
| **3b** Halaman | Beranda → Promo → Kontak → Profil → 404 | 2–3 hari | Semua halaman hidup |
| **3c** Interaksi | Filter, form → WhatsApp, animasi 3D, responsif | 1 hari | Fitur lengkap |
| **4** Testing | Fungsional, lintas browser, aksesibilitas, Lighthouse | 1 hari | Laporan testing |
| **5** Deploy | Hosting, domain, SEO teknis, GA4 | 1 hari | Website live |
| **5+** Maintenance | Update promo tiap bulan | Rutin | Promo selalu segar |

> Total estimasi fase 2–5: **± 8–10 hari kerja** (belum termasuk revisi besar).

---

## 2. Prioritas (MoSCoW)

### 🟥 Wajib (MVP — versi 1)
- [ ] 4 halaman + 404 dengan navigasi mulus
- [ ] Halaman Promo hanya menampilkan produk yang **sedang promo**
- [ ] Filter kategori + pencarian + empty state
- [ ] Setiap kartu produk punya tombol → WhatsApp dengan pesan terisi
- [ ] Informasi kontak lengkap: alamat, telepon, email, jam buka, peta
- [ ] Form kontak → WhatsApp (validasi nama & pesan)
- [ ] Responsif 360–1440px
- [ ] Konten asli (bukan placeholder) saat launch

### 🟧 Sebaiknya ada
- [ ] FAQ akordeon di halaman kontak
- [ ] Testimoni & statistik kredibilitas
- [ ] Efek 3D (kubus, kartu melayang, angkat hover) + `prefers-reduced-motion`
- [ ] Meta per halaman + Open Graph
- [ ] `sitemap.xml` & `robots.txt`
- [ ] Schema.org `Pharmacy` JSON-LD

### 🟦 Bisa menyusul (versi 2)
- [ ] Galeri foto apotek & tim
- [ ] Cari seluruh produk (tidak hanya promo)
- [ ] Pemesanan via keranjang + pembayaran online
- [ ] CMS sederhana (Google Sheets / Supabase) untuk update promo
- [ ] Notifikasi otomatis WhatsApp (Cloud API)
- [ ] Pilihan cabang & jarak antar
- [ ] Mode gelap

---

## 3. Definition of Done (DoD)

### Per halaman
- [ ] Tampil benar di 360 / 768 / 1024 / 1440 px
- [ ] Tidak ada error di konsol browser
- [ ] 1 `h1`, heading berurutan tanpa lompatan
- [ ] Semua tombol/link berfungsi & punya tujuan jelas
- [ ] Fokus keyboard terlihat, urutan tab logis

### Per fitur
- [ ] Input valid ditolak dengan pesan yang jelas
- [ ] State kosong (empty/error) ditampilkan dengan baik
- [ ] Tautan eksternal `target="_blank" rel="noreferrer"`

### Sebelum rilis
- [ ] Build produksi sukses (`npm run build`)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90
- [ ] Diuji di Chrome, Edge, Firefox, dan 1 HP nyata
- [ ] Seluruh konten placeholder sudah diganti data asli
- [ ] Domain aktif + HTTPS + SPA fallback terkonfigurasi

---

## 4. Risiko & Mitigasi

| # | Risiko | Dampak | Mitigasi |
|---|--------|--------|----------|
| 1 | Konten masih placeholder (alamat, WA, izin) | 🔴 Tinggi | Kumpulkan data asli sebelum fase deploy |
| 2 | Tidak ada foto produk asli | 🟡 Sedang | Desain memakai ikon vektor + gradasi (sudah disiapkan); foto opsional di v2 |
| 3 | SPA error 404 saat refresh / dibagikan | 🔴 Tinggi | Salin `index.html` → `404.html` / aktifkan SPA fallback |
| 4 | Google Fonts & Maps butuh internet | 🟡 Sedang | Fallback font sistem; peta bisa diganti tautan statis bila gagal |
| 5 | Perubahan promo rutin tiap bulan | 🟡 Sedang | Konten terpusat di `data/products.js`, prosedur di dok. 04 §9 |
| 6 | Respons cepat WhatsApp di luar jam buka | 🟢 Rendah | Cantumkan jam buka & "24 jam via WA" yang jujur di footer |
| 7 | Spam/form disalahgunakan | 🟢 Rendah | Form hanya membuka WhatsApp (tanpa endpoint server) |
| 8 | Scope creep (fitur baru di tengah jalan) | 🟡 Sedang | Semua ide masuk daftar "Bisa menyusul" → evaluasi setelah v1 rilis |

---

## 5. Pertanyaan yang Perlu Dijawab Pemilik Apotek

Sebelum masuk fase desain visual:

1. **Nama & identitas:** Nama resmi apotek untuk footer/legalitas? Logo final sudah ada?
2. **Kontak:** Nomor WhatsApp & telepon yang benar-benar aktif?
3. **Lokasi:** Alamat persis + apakah ada 2 cabang (ditulis "2 cabang" di profil)?
4. **Jam buka:** Benar seperti `Sen–Jum 08.00–22.00` dll.? Ada layanan 24 jam?
5. **Legalitas:** Nomor izin SIP yang boleh ditampilkan publik?
6. **Promo:** Daftar produk promo bulan ini (nama, harga normal, harga promo, batas waktu)?
7. **Testimoni:** Boleh memakai testimoni contoh, atau wajib ulasan asli?
8. **Foto:** Ada foto storefront/tim yang boleh dipakai?
9. **Kanal lain:** Perlu tombol Instagram/TikTok di footer?
10. **Target utama:** Fokus ke **datang ke toko** atau **pesan-antar**? (menentukan hierarki CTA)

---

## 6. Langkah Selanjutnya

```
1. ✅ Rancangan dibuat (docs/)
2. ⬜  Review bersama pemilik → revisi bila perlu
3. ⬜  Kumpulkan jawaban bagian 5 (konten asli)
4. ⬜  Finalisasi desain visual (mockup)
5. ⬜  Lanjutkan implementasi mengikuti wireframe & design system
6. ⬜  Testing → Deploy → Live
```
