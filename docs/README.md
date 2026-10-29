# 📐 Dokumen Rancangan — Website `apotek3D`

Dokumen ini adalah **acuan utama** sebelum dan selama pengembangan website.
Setiap keputusan desain/teknis harus merujuk ke sini. Perubahan besar wajib
didokumentasikan ulang di bagian terkait.

| # | Dokumen | Isi | Status |
|---|---------|-----|--------|
| 01 | [Workflow](01-workflow.md) | Alur kerja pengembangan, sitemap, user flow | 🟨 Menunggu review |
| 02 | [Wireframe](02-wireframe.md) | Sketsa tata letak tiap halaman (desktop & mobile) | 🟨 Menunggu review |
| 03 | [Design System](03-design-system.md) | Warna, tipografi, spasi, komponen, efek 3D | 🟨 Menunggu review |
| 04 | [Arsitektur Teknis](04-arsitektur-teknis.md) | Stack, struktur folder, routing, SEO, performa | 🟨 Menunggu review |
| 05 | [Roadmap & Checklist](05-roadmap.md) | Jadwal, definition of done, risiko | 🟨 Menunggu review |
| 06 | [Konten & Copywriting](06-konten-copywriting.md) | Naskah final semua teks, disclaimer obat, aset | 🟨 Menunggu review |
| 07 | [SEO & Marketing](07-seo-marketing.md) | Keyword, meta per halaman, kalender konten, KPI | 🟨 Menunggu review |
| 08 | [Testing & QA](08-testing-qa.md) | 39 test case, matriks browser, checklist aksesibilitas | 🟨 Menunggu review |
| 09 | [Deploy & Maintenance](09-deploy-maintenance.md) | Hosting, SOP update promo, backup, monitoring | 🟨 Menunggu review |
| 10 | [Rencana 3D](10-rencana-3d.md) | Upgrade ke Three.js/WebGL ala Yuya Film Studio + toko 3D di Beranda | 🟩 Terimplementasi |

**Urutan baca yang disarankan:** 01 → 02 → 03 → 06 → 09.
**Referensi cepat saat coding:** 03 (token & komponen) + 04 (struktur) + 02 (tata letak).

---

## 🎯 Ringkasan Proyek

| Aspek | Keputusan |
|-------|-----------|
| **Nama** | apotek3D |
| **Jenis** | Company profile apotek + katalog **khusus produk promo** |
| **Target pengguna** | Warga Depok (Cimanggis sekitarnya) yang mencari obat/vitamin & promo |
| **Tujuan utama** | ① Bangun kepercayaan pada apotek ② Dorong chat/pesan via WhatsApp ③ Tampilkan promo berjalan |
| **Teknologi** | React + Vite (SPA), React Router, CSS murni berbasis design tokens |
| **Bahasa konten** | Indonesia |
| **Backend** | Tidak ada di versi 1 — data promo berupa file statis |
| **Kanal konversi** | Transaksi dialihkan ke WhatsApp (tanpa payment gateway) |
| **Estimasi biaya** | Rp200.000–450.000/tahun (domain saja, hosting gratis) |

### Halaman yang dibangun (versi 1)

| Halaman | Route | Fungsi |
|---------|-------|--------|
| Beranda | `/` | Kesan pertama, ringkasan promo, layanan, testimoni |
| Promo | `/promo` | **Katalog khusus produk yang sedang promo** + pencarian & filter |
| Profil | `/profil` | Cerita, visi-misi, izin, nilai apotek |
| Kontak | `/kontak` | Alamat, jam buka, form pesan → WhatsApp, peta, FAQ |
| 404 | `*` | Halaman tidak ditemukan |

---

## 📌 10 Keputusan Rancangan (ringkasan)

| # | Keputusan | Alasan |
|---|-----------|--------|
| 1 | **Alur: Hero → Promo → WhatsApp** | tanpa keranjang, konversi langsung ke WhatsApp |
| 2 | Halaman Promo **hanya** berisi produk yang sedang promo | sesuai scope yang diminta |
| 3 | **Mobile-first**, urutan DOM = urutan baca | mayoritas traffic dari HP |
| 4 | Warna primer **hijau apotek** (`#0F9D76`), oranye hanya untuk badge promo | oranye = urgensi, tidak dipakai untuk navigasi |
| 5 | Efek 3D **ringan**: kubus berputar, kartu melayang, angkat saat hover | reinforce nama "3D" tanpa mengorbankan performa |
| 6 | **Tanpa foto produk** di v1 → ikon vektor + gradien per kategori | bebas hak cipta, nyaris tanpa beban loading |
| 7 | Konten **terpusat di `src/data/*.js`** | update promo bulanan cukup 1 file |
| 8 | **Tanpa backend** di v1 | biaya & risiko minimal, cepat luncur |
| 9 | Disclaimer obat **wajib** (footer + halaman promo) | menjaga tanggung jawab etis & hukum |
| 10 | Deploy **Netlify/Cloudflare gratis** + domain `.id` | total biaya < Rp500rb/tahun |

---

## ✅ Status & Catatan

- **Fase saat ini:** Perencanaan (Fase 1). Kode di `/src` masih **draft/kerangka**
  dan akan disesuaikan mengikuti wireframe (02) serta design system (03).
- **Konten masih placeholder**: nomor WhatsApp, alamat, nomor izin SIP, dan
  testimoni harus diganti dengan data asli sebelum luncur.
  Daftar lengkap kebutuhan konten ada di `01-workflow.md` (Fase 0) dan
  `05-roadmap.md` bagian 5.
- **Langkah berikutnya:** review dokumen ini → kumpulkan konten asli →
  finalisasi desain visual → implementasi.