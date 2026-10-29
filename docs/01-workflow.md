# 01 — Workflow Pengembangan

## 1. Alur Kerja (Software Development Lifecycle)

Setiap fase punya **keluaran (output)** yang harus diterima pemilik proyek
sebelum fase berikutnya dimulai.

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  FASE 0     │ → │  FASE 1     │ → │  FASE 2     │ → │  FASE 3     │
│  Brief &    │   │  Rancangan  │   │  Desain     │   │  Implementasi│
│  Kumpul     │   │  (docs/)    │   │  Visual     │   │  (coding)   │
│  Konten     │   │  ← SEKARANG │   │  (mockup)   │   │             │
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
                                                              ↓
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  FASE 5     │ ← │  FASE 4     │ ← │             │
│  Deploy &   │   │  Testing &  │   │             │
│  Maintenance│   │  Revisi     │   │             │
└─────────────┘   └─────────────┘   └─────────────┘
```

### Fase 0 — Brief & Pengumpulan Konten
**Kegiatan:**
- Tentukan tujuan bisnis, target audiens, dan fitur wajib (sudah dilakukan).
- Kumpulkan aset nyata dari pemilik apotek.

**Konten yang wajib dikumpulkan:**
- [ ] Logo resmi (format PNG/SVG transparan) — jika tidak ada, pakai logo vektor bawaan
- [ ] Foto storefront, interior, tim apoteker
- [ ] Alamat lengkap + titik koordinat Google Maps
- [ ] Nomor WhatsApp/telepon asli, email resmi
- [ ] Jam operasional & hari libur
- [ ] Nomor izin SIP apotek
- [ ] Daftar produk promo bulan ini (nama, harga normal, harga promo, batas waktu)
- [ ] Nama & foto testimoni asli (atau izin memakai testimoni contoh)

**Output:** `konten-brief.md` (checklist terisi)

---

### Fase 1 — Rancangan ✅ *(fase saat ini)*
**Kegiatan:**
- Information architecture / sitemap (dokumen 01)
- Wireframe lo-fi tiap halaman (dokumen 02)
- Design system (dokumen 03)
- Arsitektur teknis (dokumen 04)
- Roadmap (dokumen 05)

**Output:** folder `docs/` — lalu **review & persetujuan pemilik proyek**.

---

### Fase 2 — Desain Visual
**Kegiatan:**
- Mengubah wireframe + design system menjadi mockup hi-fi (Figma / sketsa digital)
- Menyusun halaman mobile-first terlebih dahulu
- Review bersama pemilik → maksimal 2 putaran revisi

**Output:** mockup final 4 halaman (desktop + mobile) yang disetujui.

---

### Fase 3 — Implementasi
**Urutan pengerjaan (task breakdown):**

1. Setup proyek: Vite + React Router + design tokens CSS
2. Komponen global: `Navbar`, `Footer`, `Button`, `SectionTitle`
3. Halaman statis urut prioritas: **Beranda → Promo → Kontak → Profil → 404**
4. Komponen khusus: kartu produk, filter/pencarian, form kontak → WhatsApp
5. Responsif (360 / 768 / 1024 / 1440 px)
6. Aksesibilitas: keyboard nav, kontras warna, ARIA, `prefers-reduced-motion`
7. SEO on-page: judul, meta deskripsi, Open Graph, `sitemap.xml`, `robots.txt`

**Output:** build produksi di `dist/` tanpa error konsol.

---

### Fase 4 — Testing & Revisi

| Jenis | Detail |
|-------|--------|
| Fungsional | Filter kategori, pencarian, empty state, form kontak, link WhatsApp, embed peta |
| Responsif | 360px (HP), 768px (tablet), 1024px (laptop), 1440px (desktop) |
| Browser | Chrome, Edge, Firefox, Safari |
| Performa | Lighthouse: performa & SEO ≥ 90 |
| Aksesibilitas | WAVE / Lighthouse ≥ 90 |
| Konten | Cek ejaan, harga, nomor telepon, tanggal promo |

**Output:** `laporan-testing.md` + daftar bug.

---

### Fase 5 — Deploy & Maintenance

| Item | Pilihan |
|------|---------|
| Hosting | Netlify / Vercel / Cloudflare Pages (gratis, cocok untuk SPA) |
| Domain | `apotek3d.id` (atau domain yang dimiliki) |
| CI/CD | Push ke GitHub → deploy otomatis |
| Analitik | Google Analytics 4 atau Plausible (privacy-friendly) |
| Maintenance | Update data promo **tiap awal bulan**, update konten sesuai kebutuhan |

---

## 2. Information Architecture (Sitemap)

```
apotek3D
│
├── 🏠 Beranda .............................. /
│     ├─ Hero + CTA utama
│     ├─ Strip statistik
│     ├─ Promo unggulan (4 produk teratas) ──→ /promo
│     ├─ Layanan kami (4 kartu)
│     ├─ Testimoni (3 ulasan)
│     └─ CTA band "pesan via WhatsApp"
│
├── 🏷️ Promo ............................... /promo
│     ├─ Page hero (periode promo)
│     ├─ Cara pesan (info bar)
│     ├─ Pencarian + filter kategori
│     ├─ Grid produk promo (8 item)
│     ├─ Empty state (tidak ada hasil)
│     └─ CTA band
│
├── 🏥 Profil ................................ /profil
│     ├─ Page hero
│     ├─ Cerita apotek + kutipan pendiri
│     ├─ Fakta (izin, apoteker, produk, cabang)
│     ├─ Visi & Misi
│     ├─ Nilai (4 kartu)
│     └─ CTA band
│
├── 📞 Kontak ................................ /kontak
│     ├─ Page hero
│     ├─ Kartu info: alamat, telepon, email, jam buka
│     ├─ Form pesan → WhatsApp
│     ├─ Embed Google Maps
│     ├─ FAQ (akordeon)
│     └─ CTA band
│
└── ❌ 404 ................................... * (route tak dikenal)
```

**Elemen global (muncul di semua halaman):**

| Elemen | Perilaku |
|--------|----------|
| Navbar | Fixed di atas, berubah jadi transparan-opak saat scroll; menu mobile slide-down; tombol CTA "Chat Kami" |
| Footer | 4 kolom: brand, navigasi, kontak, jam buka + bar copyright & izin |
| CTA band | Ajakan pesan via WhatsApp, muncul di akhir halaman utama |
| ScrollToTop | Otomatis scroll ke atas saat ganti halaman |
| Tautan WhatsApp | Selalu `target="_blank"` + `rel="noreferrer"` |

---

## 3. User Flow (Alur Pengguna)

### Flow A — Cari promo lalu pesan *(alur utama / conversion)*
```
Buka Beranda
   │
   ├─ Lihat hero → klik [Lihat Promo Bulan Ini]
   ▼
Halaman Promo
   │
   ├─ (opsional) ketik kata kunci / pilih kategori
   ├─ Lihat kartu produk: harga promo, diskon %, sisa waktu
   ▼
Klik [Pesan Promo Ini]
   ▼
Tab WhatsApp terbuka (pesan sudah terisi otomatis:
nama produk + harga + sapaan)
   ▼
Apoteker konfirmasi stok & ongkir → transaksi selesai
```
**KPI:** jumlah klik tombol WhatsApp per minggu.

### Flow B — Ragu, perlu bukti dulu
```
Buka Beranda → scroll: statistik + testimoni
   → klik [Profil] → baca cerita, izin, nilai
   → klik [Kontak] → cek alamat + peta + jam buka
   → datang ke toko
```

### Flow C — Tanya obat spesifik
```
Buka /kontak → isi form (nama, topik, pesan)
   → [Kirim via WhatsApp] → pesan terformat terkirim
```

### Flow D — Mobil (sumber traffic utama)
```
Google Search "apotek dekat saya" / "promo vitamin Depok"
   → landing di /promo atau /
   → navbar menawarkan tombol [Chat Kami] sejak detik pertama
```

---

## 4. Prinsip Pengambilan Keputusan Desain

1. **Mobile-first** — mayoritas pengunjung datang dari HP.
2. **Satu tujuan per halaman** — jangan biarkan pengguna bingung mau ke mana.
3. **WhatsApp sebagai kanal konversi** — tanpa keranjang belanja di versi 1.
4. **Kredibilitas di atas ornamen** — izin, apoteker bersertifikat, dan asal-usul
   produk lebih penting daripada dekorasi.
5. **Promo harus terasa hidup** — tampilkan batas waktu & jumlah hemat rupiah.
