# 03 — Design System `apotek3D`

Sumber kebenaran untuk semua keputusan visual. Nilai di sini dipakai sebagai
**design token** di `src/styles/global.css`.

---

## 1. Brand & Kepribadian Visual

| Aspek | Keputusan |
|-------|-----------|
| Nama | **apotek3D** (huruf kecil semua, `3D` sebagai aksen) |
| Positioning | Apotek keluarga terdekat yang bisa dipercaya & dijangkau |
| Kepribadian | **Hangat · Terpercaya · Bersih · Modern** |
| Makna "3D" | Dimainkan lewat **efek kedalaman**: kubus berputar, kartu melayang, angkat saat hover — bukan 3D modeling berat (biar ringan) |
| Tone copy | Bahasa Indonesia santai-ramah, hindari jargon medis berlebihan |

---

## 2. Warna (Color Palette)

### 2.1 Primer — hijau apotek
| Token | Hex | Pemakaian |
|-------|-----|-----------|
| `--brand-50` | `#EAFaf3` | Latar lembut, background chip, hover nav |
| `--brand-100` | `#CDF5E6` | Border lembut, latar ikon |
| `--brand-200` | `#A8EED3` | Border aktif |
| `--brand-300` | `#6FE0BD` | Aksen di latar gelap (footer/hero) |
| `--brand-500` | `#14B884` | Aksen terang, gradien tombol, fokus input |
| `--brand-600` | `#0F9D76` | **Warna utama** — tombol, nav aktif, tautan |
| `--brand-700` | `#0B8463` | Teks tombol lembut, ikon |
| `--brand-800` | `#0A6A51` | Teks harga/judul di atas terang |
| `--brand-900` | `#064E3C` | Footer, page hero |
| `--brand-950` | `#04372B` | Ujung gelap gradien |

**Gradien utama:**
```css
/* tombol primer */
linear-gradient(135deg, #14B884, #0B8463)

/* page hero / CTA band */
linear-gradient(135deg, #0B8463 0%, #064E3C 55%, #04372B 100%)
```

### 2.2 Aksen — promo (oranye)
| Token | Hex | Pemakaian |
|-------|-----|-----------|
| `--accent` | `#FF7A45` | Badge diskon, sorotan hemat |
| `--accent-strong` | `#F4511E` | Teks hemat rupiah, angka penting |
| `--accent-soft` | `#FFF0EA` | Latar chip "Hemat Rp…" |

> Aturan: **maksimal 1 elemen oranye per layar** selain badge diskon.
> Oranye = urgensi promo, tidak dipakai untuk navigasi.

### 2 Netral
| Token | Hex | Pemakaian |
|-------|-----|-----------|
| `--ink` | `#10201B` | Judul, teks utama |
| `--ink-soft` | `#2F463E` | Teks paragraf pendukung |
| `--muted` | `#63776F` | Deskripsi, label |
| `--line` | `#E3ECE8` | Garis pemisah, border kartu |
| `--bg` | `#FFFFFF` | Latar halaman |
| `--surface` | `#F6FAF8` | Seksi bertint, latar input |
| `--surface-2` | `#EDF6F2` | Chip kategori, latar kosong |

### 2.4 Bantuan
| Token | Hex | Pemakaian |
|-------|-----|-----------|
| `--star` | `#F7B500` | Bintang rating |

### 2.5 Kontras (WCAG AA — wajib)
| Kombinasi | Rasio | Status |
|-----------|-------|--------|
| `#10201B` di `#FFFFFF` | 16.1:1 | ✅ AAA |
| `#63776F` di `#FFFFFF` | 5.2:1 | ✅ AA (teks biasa) |
| `#FFFFFF` di `#0F9D76` | 3.6:1 | ✅ AA besar / UI |
| `#0B8463` di `#EAFaf3` | 5.4:1 | ✅ AA |
| `#F4511E` di `#FFF0EA` | 4.0:1 | ✅ AA besar |

---

## 3. Tipografi

**Font:** `Plus Jakarta Sans` (Google Fonts) → fallback `system-ui, sans-serif`
Bobot dipakai: 400 (badan), 500, 600 (semi-bold), 700 (bold), 800 (judul).
*Mengapa:* sans humanis yang bersahabat tapi tetap profesional — cocok untuk
layanan kesehatan.

### Skala tipe
| Elemen | Ukuran | Weight | Line-height | Catatan |
|--------|--------|--------|-------------|---------|
| H1 hero | `clamp(2.15rem, 4.4vw, 3.35rem)` | 800 | 1.10 | letter-spacing `-0.035em` |
| H1 page hero | `clamp(2rem, 4.6vw, 3rem)` | 800 | 1.15 | putih di latar gelap |
| H2 seksi | `clamp(1.8rem, 3vw, 2.4rem)` | 800 | 1.20 | |
| H3 judul kartu | `1.00–1.10rem` | 700–800 | 1.40 | |
| Lead / paragraf hero | `1.06rem` | 400 | 1.65 | `--muted` |
| Badan | `1rem` | 400 | 1.60 | |
| Deskripsi kartu | `0.87rem` | 400 | 1.55 | maks 2 baris (clamp) |
| Label / chip | `0.80rem` | 700 | 1.40 | |
| Eyebrow | `0.76rem` | 800 | 1.40 | UPPERCASE, letter-spacing `0.14em` |

Aturan:
- Judul **max 2 baris** di kartu; paragraf **max 65 karakter/baris** (`max-width: 65ch`).
- Harga selalu `font-weight: 800` + warna `--brand-800`.
- Harga coret (`<s>`) `0.88rem` warna `#9AADA6`.

---

## 4. Spasi, Radius, Bayangan

**Base unit: 4px.** Skala: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 60 · 78`

| Konteks | Nilai |
|---------|-------|
| Lebar container | `min(100% - 40px, 1180px)` (mobile: `100% - 28px`) |
| Padding seksi vertikal | `78px` desktop / `60px` mobile |
| Gap grid produk | `24px` |
| Padding kartu | `20–26px` |
| Padding form | `34px` (mobile `26px 20px`) |

**Radius**
| Token | Nilai | Dipakai untuk |
|-------|-------|---------------|
| `--radius-sm` | `12px` | Input, textarea |
| `--radius` | `18px` | Kartu, panel |
| `--radius-lg` | `26px` | Kartu besar, hero card, peta, CTA band |
| pill | `999px` | Semua tombol, chip, badge, navbar link |

**Bayangan**
| Token | Nilai | Dipakai untuk |
|-------|-------|---------------|
| `--shadow-sm` | `0 2px 10px rgba(16,32,27,.06)` | Kartu netral |
| `--shadow-md` | `0 20px 40px -26px rgba(16,32,27,.4)` | Card terangkat, form |
| `--shadow-lg` | `0 40px 70px -40px rgba(6,78,60,.55)` | CTA band, hover 3D |

---

## 5. Komponen

### 5.1 Tombol
| Varian | Latar | Teks | Penggunaan |
|--------|-------|------|------------|
| `btn--brand` | gradien hijau | putih | **Aksi utama** (1 per seksi) |
| `btn--soft` | `--brand-50` + border `--brand-100` | `--brand-700` | Aksi sekunder |
| `btn--white` | putih | `--brand-800` | Di atas latar gelap |
| `btn--outline-white` | transparan + border putih 45% | putih | Di atas latar gelap |
| `btn--ghost-light` | transparan + border putih 30% | putih | Footer |

Ukuran: default `0.72rem 1.3rem` · `--lg` `0.95rem 1.7rem` · `--block` lebar penuh.
Semua `border-radius: 999px`, `font-weight: 700`.
**Hover:** `translateY(-3px)` + bayangan lebih dalam (220ms).

### 5.2 Chip
| Varian | Tampilan |
|--------|----------|
| `chip--category` | latar `--surface-2`, teks `--brand-700` — label kategori di kartu |
| `chip--filter` | putih + border tipis; **aktif** = hijau penuh + teks putih |

### 5.3 Kartu Produk *(komponen utama)*
```
╭─ media (tinggi 168px, gradasi per kategori) ─────────────╮
│  [badge -40%]                          s.d. 31 Okt 2026  │
│                        ▢ ikon produk 72px                │
├──────────────────────────────────────────────────────────┤
│  [kategori]                                                │
│  Nama produk (2 baris)                                     │
│  deskripsi (2 baris, terpotong)                            │
│  Rp12.000   Rp18.000   [🏷 Hemat Rp6.000]                 │
│  [● Pesan Promo Ini] (blok)                                │
╰──────────────────────────────────────────────────────────╯
```
Latar media per ikon: pill hijau · bottle oranye · jar biru · box merah muda ·
drop biru · tube kuning · gauge toska · can ungu (semua gradasi sangat terang).

### 5.4 Kartu lain
| Komponen | Ciri khas |
|----------|-----------|
| Statistik | Strip hijau tua overlap ke atas hero, pembatas vertikal tipis |
| Layanan | Putih, border tipis, ikon dalam kotak gradasi 54px |
| Testimoni | Bintang emas, kutipan, avatar inisial gradasi + garis putus |
| Fakta | Ikon lingkaran `--brand-50`, rata tengah |
| Visi/Misi | Misi memakai checklist lingkaran hijau (SVG embedded) |
| Nilai | Ikon kotak gradasi + nomor `01–04` raksasa transparan di sudut |
| Kontak | Ikon kotak 46px + hover `translateY(-4px)` |
| FAQ | `<details>` — tanda `+` berputar jadi `−` saat terbuka |
| CTA band | Kartu gradien hijau, ornamen lingkaran, 2 tombol |

### 5.5 Form
- Input: latar `--surface`, border `--line`, radius `12px`, padding `0.8rem 1rem`.
- **Focus:** border `--brand-500` + ring `0 0 0 4px rgba(20,184,132,.15)` (wajib terlihat).
- Label di atas input, `0.83rem / 700 / --ink-soft`.
- Notifikasi validasi: kotak `--brand-50` border `--brand-100`.

### 5.6 Navbar
- Tinggi `16px 0` → `10px 0` saat scroll.
- Transparan saat di atas → `rgba(255,255,255,.86)` + `backdrop-filter: blur(14px)` saat scroll.
- Nav aktif: pil hijau penuh.
- Mobile: panel slide-down dari atas (`translateY(-105%) → 0`, 350ms), kunci scroll body.

---

## 6. Efek 3D & Animasi *(identitas visual)*

| Efek | Teknis | Lokasi |
|------|--------|--------|
| **Kubus berputar** | `transform-style: preserve-3d` + 6 face + `@keyframes spinCube` 16s linear | Hero beranda |
| **Kartu melayang** | `translateY(±12px)` ±14px, beda delay (0.6s / 1.2s) | 3 kartu hero |
| **Angkat 3D** | `perspective(950px) rotateX(3.5deg) rotateY(-4.5deg) translateY(-8px)` | Semua kartu saat hover |
| **Overlap strip** | statistik `margin-top: -46px` di atas hero | Beranda |
| **Pulse titik** | `::after` membesar + fade, 1.8s | Status pesanan |
| **Rise in** | `opacity 0→1` + `translateY(26px)→0` | Konten hero |

**Aturan wajib:**
1. Animasi hanya pada `transform` & `opacity` (hindari jank).
2. Semua animasi dimatikan saat `prefers-reduced-motion: reduce`.
3. Panggung 3D dekoratif → `aria-hidden="true"`.
4. Hover 3D **tidak dipakai di touch device** (matikan via `@media (hover: hover)`).
5. Durasi: transisi UI `200–350ms`, animasi dekoratif `5–16s`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Ikonografi & Imagery

| Keputusan | Detail |
|-----------|--------|
| Gaya ikon | Outline, stroke `1.8`, `stroke-linecap: round`, viewBox `24×24` |
| Sumber | **SVG inline** (`src/components/Icons.jsx`) — tanpa library, offline-safe |
| Ukuran | Ikon UI 16–26px · ikon produk 72px |
| Foto produk | **Tidak memakai foto** di versi 1 → memakai ikon vektor + latar gradasi per kategori (konsisten & bebas hak cipta) |
| Foto ke depannya | Jika ada foto asli: rasio 4:3, latar polos, kompresi WebP ≤ 80KB |
| Logo | Kubus isometrik 3 warna hijau + badge silang farmasi |

---

## 8. Responsif

| Breakpoint | Lebar | Perubahan utama |
|------------|-------|-----------------|
| Desktop | ≥ 1081px | Grid 4 kolom, hero 2 kolom, footer 4 kolom |
| Laptop | 901–1080px | Produk 3 kolom |
| Tablet | ≤ 900px | Navbar hamburger, hero 1 kolom, statistik 2 kolom, footer 2 kolom |
| HP | ≤ 560px | Container `100% - 28px`, produk 1 kolom, form 1 kolom, tombol hero lebar penuh |

**Prinsip:** mobile-first, urutan DOM = urutan baca, target sentuh **min. 44×44px**.

---

## 9. Aksesibilitas (WCAG 2.1 AA)

- [ ] Kontras teks ≥ 4.5:1 (teks biasa) / ≥ 3:1 (teks besar & UI)
- [ ] Semua interaktif bisa dijangkau **Tab** + indikator fokus terlihat
- [ ] Struktur heading berurutan `h1 → h2 → h3` (1 `h1` per halaman)
- [ ] `<nav aria-label>`, `<button>` untuk aksi, `<a>` untuk navigasi
- [ ] Icon-only button punya `aria-label`
- [ ] Dekoratif 3D diberi `aria-hidden="true"`
- [ ] `lang="id"` pada `<html>`
- [ ] Form: `<label>` terhubung ke input, pesan error terbaca mesin baca layar
- [ ] Menghormati `prefers-reduced-motion`

---

## 10. Copywriting (panduan singkat)

| Elemen | Rumus | Contoh |
|--------|-------|--------|
| H1 | Masalah + manfaat + bukti | "Obat asli, harga jujur, diantar cepat" |
| CTA utama | Kata kerja + objek + nilai | "Lihat Promo Bulan Ini" |
| CTA WhatsApp | Kata kerja + kanal | "Pesan Promo Ini" |
| Eyebrow | Kategori/kredibilitas | "Apotek keluarga sejak 2011" |
| Deskripsi kartu | Manfaat, ≤ 120 karakter | "Penurun demam & pereda nyeri ringan…" |

Hindari: janji berlebihan ("obat paling ampuh"), jargon tanpa penjelasan,
dan kata serap tak perlu ("promo menarik terbaik").
