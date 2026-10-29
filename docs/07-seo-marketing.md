# 07 — Rencana SEO & Marketing

Tujuan: membuat orang yang **mencari** apotek atau promo obat menemukan apotek3D,
dan mengukur berapa banyak orang yang benar-benar menghubungi lewat WhatsApp.

---

## 1. Persona & Kebutuhan Pencarian

| Persona | Kebutuhan | Halaman yang dituju |
|---------|------------|---------------------|
| **Ibu rumah tangga** (35–50 th) | Cari obat anak & vitamin, promo, harga | `/promo` → WhatsApp |
| **Pekerja kantoran** (25–40 th) | Beli cepat saat Practitioners sakit, antar | `/` → tombol Chat |
| **Warga tua** (50+) | Butuh apotek dekat & apoteker sabar | `/kontak`, `/profil` |
| **Warga baru area Cimanggis** | Cek jam buka dan lokasi | `/kontak` (peta) |

---

## 2. Target Keyword

### 2.1 Keyword utama (halaman tujuan)
| Keyword | Intent | Halaman |
|---------|--------|---------|
| apotek Cimanggis | lokal/navigasi | `/` |
| apotek Depok | lokal/navigasi | `/` |
| promo obat Depok | transaksional | `/promo` |
| promo vitamin Depok | transaksional | `/promo` |
| apotek antar 24 jam Depok | transaksional | `/` + `/kontak` |
| apotek grab & go Cimanggis | informasi | `/kontak` |

### 2.2 Keyword pendukung (untuk konten blog di versi 2)
`cara baca label obat` · `kapan harus ke dokter` · `cara simpan obat di rumah` ·
`manfaat vitamin D` · `obat tercepat untuk klien`

---

## 3. Meta per Halaman (siap pakai)

> Panjang ideal: title ≤ 60 karakter, description 140–160 karakter.

| Route | `<title>` | Meta description |
|-------|-----------|------------------|
| `/` | `apotek3D — Apotek Keluarga Terpercaya di Cimanggis, Depok` | `apotek3D melayani warga Cimanggis sejak 2011. Konsultasi gratis dengan apoteker bersertifikat, promo obat & vitamin tiap bulan, dan antar cepat area Depok.` |
| `/promo` | `Promo Obat & Vitamin Oktober 2026 — apotek3D` | `Lihat promo obat, vitamin, dan alat kesehatan yang sedang berjalan di apotek3D Cimanggis. Diskon hingga 40%, berlaku sampai 31 Oktober 2026 atau hingga stok habis.` |
| `/profil` | `Profil Apotek — 15 Tahun Melayani Warga Depok — apotek3D` | `Kenali apotek3D: apotek keluarga sejak 2011 dengan 4 apoteker bersertifikat, izin resmi, dan ribuan produk asli. Baca sejarah dan prinsip pelayanan kami.` |
| `/kontak` | `Kontak & Lokasi Apotek Cimanggis — apotek3D` | `Alamat, jam buka, nomor WhatsApp, dan peta lokasi apotek3D di Jl. Melati No. 24 Cimanggis, Depok. Konsultasi dan pemesanan obat setiap hari.` |
| 404 | `Halaman Tidak Ditemukan — apotek3D` | `Halaman yang Anda cari tidak ditemukan. Kembali ke beranda atau lihat promo terkini apotek3D.` |

---

## 4. Struktur SEO Per Halaman

| Halaman | H1 | Target kata kunci |
|---------|----|-------------------|
| `/` | Obat asli, harga jujur, diantar cepat ke rumah Anda. | apotek Cimanggis, apotek Depok |
| `/promo` | Promo khusus bulan ini | promo obat Depok, promo vitamin |
| `/profil` | Melayani keluarga Depok sejak 2011 | apotek Cimanggis yang sudah lama berdiri |
| `/kontak` | Mampir atau chat kapan saja | alamat apotek Cimanggis, jam buka apotek Depok |

**Aturan penempatan kata kunci:**
- Satu kali di H1, satu kali di 100–200 kata pertama, dua kali di body dengan variasi.
- **Jangan** mengulang kata kunci di setiap kartu produk (risiko keyword stuffing).
- Gunakan variasi: `apotek`, `toko obat`, `rumah sakit kecil` (jangan), `apotek terdekat`.

---

## 5. SEO Teknis (checklist pra-launch)

- [ ] Judul & deskripsi unik per halaman (tabel di atas)
- [ ] `lang="id"` pada `<html>`
- [ ] Struktur heading: satu `h1` per halaman, lalu `h2`, lalu `h3`
- [ ] `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://apotek3d.id/sitemap.xml
  ```
- [ ] `public/sitemap.xml` berisi 4 URL dengan `<lastmod>`
- [ ] Open Graph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`
- [ ] `<link rel="canonical">` per halaman
- [ ] Schema.org JSON-LD `Pharmacy` (alamat, geo, jam buka, telepon)
- [ ] Favicon + `theme-color`
- [ ] Gambar dengan `alt` deskriptif
- [ ] Tidak adaBroken internal link; semua CTA punya tujuan jelas
- [ ] Halaman bisa di-crawl tanpa JavaScript? → **tidak**, pastikan **prerender** (lihat §8)

### Contoh JSON-LD
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  "name": "apotek3D",
  "image": "https://apotek3d.id/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Melati No. 24, Kec. Cimanggis",
    "addressLocality": "Depok",
    "addressRegion": "Jawa Barat",
    "postalCode": "16454",
    "addressCountry": "ID"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -6.3900, "longitude": 106.8700 },
  "telephone": "+62-812-3456-7890",
  "openingHours": ["Mo-Fr 08:00-22:00", "Sa 08:00-23:00", "Su 09:00-21:00"],
  "url": "https://apotek3d.id"
}
</script>
```

---

## 6. SEO Lokal (paling penting untuk apotek)

| Item | Tindakan | Prioritas |
|------|----------|-----------|
| **Google Business Profile** | Daftar & verifikasi alamat, jam buka, foto toko, kategori "Apotek" | 🔴 Wajib |
| **Konsistensi NAP** | Alamat & nomor HP **harus sama persis** di website, GBP, Instagram, peta | 🔴 Wajib |
| Ulasan GBP | Ajak pelangganreviews (target 50 ulasan, balas semua) | 🔴 Wajib |
| Backlink lokal | Daftar di direktori apotek/obat Indonesia, komiteRT/RW | 🟡 Sebaiknya |
| Kode pos | Pastikan sesuai wilayah (Cimanggis 16454) | 🟡 |

---

## 7. Content Calendar (promo & kanal)

### 7.1 Ritme Bulanan
| Waktu | Aksi | Kanal |
|-------|------|-------|
| Tanggal 25 (bulan sebelumnya) | Susun daftar promo bulan depan | Internal |
| Tanggal 28 | Update `data/products.js` + deploy | Website |
| Tanggal 1 | Broadcast pengumuman promo | WhatsApp grup, Instagram story |
| Tanggal 1–7 | Posting katalog promo | Instagram (feed + story) |
| Tanggal 15 | Promo tengah bulan (1 produkAMILY) | WhatsApp + Instagram |
| Tanggal 25 | Rekap & evaluation | Internal + laporan |

### 7.2 Konten Bernilai (Instagram, 2×/minggu)
| Jenis | Contoh |
|-------|--------|
| Tips kesehatan singkat | "3 tanda Pilek perlu ke dokter" |
| penjelasan produk | "Beda OB, OTC, dan obat K" |
| Promo kilat | "Flash sale 6 jam, Senin 09.00" |
| Sosmed apotek | Foto tim, cerita dibalik layar |

---

## 8. Catatan Penting: SPA & SEO

Website ini **Single Page Application** (React). Mesin pencari modern bisa
mengeksekusi JavaScript, tapi agar **100% aman**:

| Opsi | Cara | Rekomendasi |
|------|------|-------------|
| **Prerender** | `vite-plugin-prerender` / `vite-ssg` saat build | ⭐ Paling aman untuk 4 halaman |
| SSG | Ubah ke Next.js/Astro | Kalau website tumbuh jadi 10+ halaman |
| Hosting edge | Cloudflare Workers prerender | Alternatif |

> Untuk versi 1 dengan 4 halaman, **prerender** sudah lebih dari cukup.
> SEO lokal + Google Business Profile akan lebih besar pengaruhnya
> daripada rendering.

---

## 9. Tracking & KPI

### 9.1 Event yang Dicatat (Google Analytics 4 / Plausible)
| Event | Kapan fires | Untuk apa |
|-------|-------------|-----------|
| `klik_promo_produk` | Klik tombol "Pesan Promo Ini" | Produk mana yang unemang |
| `klik_chat_navbar` | Klik "Chat Kami" di navbar | Efektivitas CTA utama |
| `klik_promo_beranda` | Klik "Lihat Promo Bulan Ini" | Minat promo |
| `submit_form_kontak` | Kirim form kontak | Peminat NON-promo |
| `buka_peta` | Klik "Buka di Google Maps" | Visitor yang mau datang |
| `scroll_50_promo` | Scroll 50% halaman promo | Kualitas traffic |

*(Implementasi analytics bisa ditunda sampai setelah launch — jangan menambah bobot*
halaman di v1.)*

### 9.2 KPI 30 Hari Pertama
| KPI | Target |
|-----|--------|
| Kunjungan | ≥ 300 kunjungan unik |
| Klik WhatsApp | ≥ 40 (rasio konversi ≈ 13%) |
| Halaman Promo dibuka | ≥ 30% dari kunjungan |
| Pembeli baru lewat klik WhatsApp | ≥ 20 transaksi |
| Organic traffic | ≥ 25% dari total |

---

## 10. Kesimpulan & Peluang Pertumbuhan

| Ide | Dampak | Effort | Kapan |
|-----|--------|--------|-------|
| Update SEO title bulanan | Sedang | Rendah | Bulanan |
| Post IG 2×/minggu | Tinggi | Sedang | Mulai v1 |
| Google Business Profile | Tinggi | Rendah | Sebelum launch |
| Google Ads lokal (budget kecil) | Tinggi | Sedang | Setelah v1 stabil |
| Blog SEO (5 artikel/bulan) | Tinggi | Tinggi | Semester 2 |
| WhatsApp broadcast (grup pelanggan) | Tinggi | Rendah | Mulai v1 |