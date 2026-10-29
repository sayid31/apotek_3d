# 09 — Rencana Deploy & Maintenance

---

## 1. Pilihan Hosting

| Platform | Gratis | HTTPS | SPA fallback | Deploy | Cocok untuk |
|----------|--------|-------|--------------|--------|-------------|
| **Netlify** ⭐ | ✅ | ✅ | Otomatis | Drag & drop / Git | Paling mudah |
| **Vercel** | ✅ | ✅ | Otomatis | Git | Blog/Next, baik juga |
| **Cloudflare Pages** | ✅ | ✅ | Otomatis | Git | Cepat + CDN global |
| GitHub Pages | ✅ | ✅ | Perlu file `404.html` | Git | Kalau sudah terbiasa |
| cPanel/Hostinger | ❌ (≈Rp150rb/bln) | Manual | `.htaccess` manual | FTP/SSH | Kalau butuh email & hosting |

**Rekomendasi:** mulai dengan **Netlify** (gratis, HTTPS otomatis, bisa
dibatalkan kapan saja). Pindah ke cPanel hanya jika apotek butuh email
`@apotek3d.id`.

### Pengaturan domain
```
apotek3d.id  →  Netlify (DNS A / CNAME)
www.apotek3d.id  →  redirect ke apotek3d.id
```
- Beli domain di Registrar lokal (mis. Cloudflare Registrar, Namecheap, IDN).
- Aktifkan HTTPS gratis (Let's Encrypt, otomatis di Netlify).
- Wajib: **SPA fallback** — di Netlify sudah otomatis; di platform lain buat
  file `404.html` yang isinya salinan `index.html`.

---

## 2. Checklist Deploy

```
□ 1. npm run build            → pastikan tidak ada error
□ 2. Cek hasil di dist/       → buka index.html via server lokal
□ 3. npm run preview          → uji build produksi, bukan dev
□ 4. Git commit & push        → pesan: "release: v1.0.0 (12 Okt 2026)"
□ 5. Deploy ke Netlify        → drag folder dist/ atau hubungkan repo
□ 6. Pasang domain            → isi DNS, tunggu propagasi (±24 jam)
□ 7. Cek HTTPS                → buka https://apotek3d.id
□ 8. Uji 4 URL                → / , /promo, /profil, /kontak
□ 9. Uji refresh di /promo    → pastikan tidak 404 (SPA fallback)
□ 10. Kirim tautan ke 5 penguji (keluarga, tetangga, pelanggan) → minta feedback
```

---

## 3. Manajemen Versi (Git)

| Branch | Nama | Kegunaan |
|--------|------|----------|
| `main` | Stabil | Kode yang sedang live |
| `develop` | Pengembangan | Untuk fitur baru |
| `fix/deskripsi` | Perbaikan | Bugfix kecil |

**Alur kerja:**
```
develop → (selesai & dites) → main → deploy otomatis
```
Commit message format: `feat:`, `fix:`, `content:`, `style:`, `docs:`
contoh: `content: update promo Oktober 2026`

> **Before every deploy:** `git pull` → `npm install` → `npm run build` → tes → push.

---

## 4. Backup & Rollback

| Aspek | Strategi |
|-------|----------|
| Kode | GitHub = backup otomatis (history lengkap) |
| Konten | `data/site.js` & `data/products.js` di dalam repo → aman |
| Gambar | Disimpan juga di Google Drive (repo hanya untuk aset kecil) |
| Rollback | `git revert` commit yang bermasalah, lalu push ulang |
| Rutin | Tidak perlu backup manual untuk konten — sudah ada di git |

---

## 5. SOP Update Promo Bulanan (10 menit)

**Kapan:** tanggal 28–31 setiap bulan (untuk promo bulan depan).

```
□ 1. Buka src/data/products.js
□ 2. Ganti promoPeriod  → "1 – 30 November 2026"
□ 3. Update / tambah / hapus objek produk
     • id unik (pr-01, pr-02, …)
     • price < originalPrice
     • until = tanggal batas promo
     • category dari daftar baku
     • icon dari: pill·bottle·jar·box·drop·tube·gauge·can
□ 4. Cek cepat (checklist regresi di docs/08 §7)
□ 5. npm run build → preview → cek tampilan
□ 6. git commit "content: promo November 2026" → push → deploy
□ 7. Broadcast pengumuman ke grup WhatsApp pelanggan + posting Instagram
```

---

## 6. Monitoring Pasca-Launch

| Yang dipantau | Alat | Frekuensi |
|---------------|------|-----------|
| Website hidup | UptimeRobot (gratis, alert email) | Otomatis |
| Kunjungan & klik WhatsApp | Google Analytics 4 | Mingguan |
| Error & kecepatan | PageSpeed Insights | Bulanan |
| Konten | Cek manual tanggal promo | Bulanan |
| Ulasan pelanggan | Google Business Profile | Mingguan |

**Respons cepat atas umpan balik:**
| Keluhan | Tindakan |
|---------|----------|
| "Produk tidak tersedia" | Update diskon di `products.js`, deploy ulang |
| "Nomor WhatsApp tidak aktif" | Ganti `whatsapp` di `site.js`, deploy |
| "Harga tidak sesuai" | Tambah catatan promo berlaku + koreksi data |
| "Tampilan di HP agak kram" | Catat, perbaiki di iterasi berikutnya |

---

## 7. Estimasi Biaya

| Item | Estimasi |
|------|----------|
| Hosting (Netlify free tier) | Rp0 |
| Domain `.id` (tahun pertama) | Rp150.000 – Rp250.000/tahun |
| Domain (perpanjangan) | Rp150.000 – Rp300.000/tahun |
| Google Business Profile | Rp0 |
| Google Analytics | Rp0 |
| **Total tahun pertama** | **± Rp200.000 – Rp450.000** |
| Galeri foto produk (opsional) | Rp0 (foto sendiri) |

> Tanpa biaya bulanan. Semua aset tetap milik klien — kode ada di repo klien.

---

## 8. Backlog Perawatan (prioritas bila ada waktu)

| Prioritas | Item | Estimasi |
|-----------|------|----------|
| 🔴 | Prerender untuk SEO | 1–2 jam |
| 🔴 | Google Business Profile aktif | 1 jam |
| 🟠 | Foto asli di halaman Profil | 2–3 jam |
| 🟠 | Halaman "Semua Produk" (bukan hanya promo) | 4–6 jam |
| 🟡 | Blog SEO (artikel kesehatan) | 2 jam/artikel |
| 🟡 | Animasi transisi antar halaman | 2 jam |
| 🟢 | Mode gelap | 3 jam |
| 🟢 | Blog / landing artikel | 4 jam |