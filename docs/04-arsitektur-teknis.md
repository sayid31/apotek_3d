# 04 — Arsitektur Teknis

## 1. Stack Teknologi

| Lapisan | Pilihan | Alasan |
|---------|---------|--------|
| Framework | **React 19** | Komponen reusable, ekosistem matang |
| Build tool | **Vite 8** | Dev server super cepat, konfigurasi minimal |
| Routing | **React Router v7** (`react-router-dom`) | Client-side routing untuk 4 halaman |
| Styling | **CSS murni** + custom properties (design tokens) | Ringan, penuh kendali, tanpa dependensi build tambahan |
| State | `useState` / `useMemo` lokal | Skala kecil — tidak perlu Redux/Zustand |
| Backend | **Tidak ada** (versi 1) | CTA dialihkan ke WhatsApp |
| Data promo | File JS statis | Mudah diedit, bisa diganti CMS nanti |
| Ikon | SVG inline | Offline-safe, tanpa library ikon |

**Tidak dipakai (dan alasannya):**
- `tailwindcss` — desain sudah distandarkan lewat design tokens.
- `framer-motion` — animasi cukup dengan CSS (`transform`/`opacity`).
- State manager — tidak ada data global yang kompleks.
- Image optimizer — versi 1 tidak memakai foto.

---

## 2. Struktur Folder

```
apotek3D/
├── index.html                  # HTML shell + font preconnect
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg             # logo kubus 3D
├── docs/                       # 📐 rancangan proyek
│   ├── README.md
│   ├── 01-workflow.md
│   ├── 02-wireframe.md
│   ├── 03-design-system.md
│   ├── 04-arsitektur-teknis.md
│   └── 05-roadmap.md
├── src/
│   ├── main.jsx                # entry point + import CSS
│   ├── App.jsx                 # routing + layout global
│   │
│   ├── components/             # komponen bisa dipakai lintas halaman
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx     # ⭐ komponen inti
│   │   ├── Ui.jsx              # SectionTitle, PageHero, CtaBand
│   │   └── Icons.jsx           # seluruh ikon SVG inline + Logo
│   │
│   ├── pages/                  # satu file per route
│   │   ├── Home.jsx
│   │   ├── Promo.jsx
│   │   ├── Profile.jsx
│   │   └── Contact.jsx
│   │
│   ├── data/                   # ⚡ sumber konten (edit di sini)
│   │   ├── site.js             # identitas, kontak, jam buka, testimoni
│   │   └── products.js         # daftar produk PROMO + periode
│   │
│   ├── lib/
│   │   └── format.js           # formatRupiah, discountPercent, waLink
│   │
│   └── styles/                 # CSS per blok, urut import
│       ├── global.css          # reset, token, tombol, utilitas
│       ├── layout.css          # navbar, footer, page hero, CTA band
│       ├── components.css      # kartu, statistik, testimoni, promo
│       ├── home.css            # hero & panggung 3D
│       └── pages.css           # profil & kontak
└── dist/                       # hasil build (di-gitignore)
```

**Aturan penamaan:**
- Kompone: `PascalCase.jsx` · file halaman juga `PascalCase`
- CSS class: `blok__elemen--modifikasi` (BEM longgar)
- Data: `camelCase` pada field object

---

## 3. Data Flow

```
┌─────────────────────┐
│  src/data/*.js      │  ← sumber kebenaran konten (satu-satunya tempat edit)
└──────────┬──────────┘
           │  import
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│  pages/*.jsx        │────▶│  components/*.jsx   │  presentasikan
└─────────────────────┘     └──────────┬──────────┘
           │                           │
           │  helper                   │  helper
           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐
│  lib/format.js      │     │  styles/*.css       │
│  formatRupiah()     │     │  design tokens      │
│  discountPercent()  │     └─────────────────────┘
│  waLink()           │
└─────────────────────┘
```

**Skema data produk** (`src/data/products.js`):
```js
{
  id: 'pr-01',              // unik
  name: 'Paracetamol 500 mg — 10 Tablet',
  category: 'Obat Umum',    // dipakai filter chip (harus konsisten)
  icon: 'pill',             // kunci → productIcons di Icons.jsx
  price: 12000,             // harga promo  (angka, bukan string)
  originalPrice: 18000,     // harga normal → diskon dihitung otomatis
  until: '31 Okt 2026',     // batas waktu promo
  desc: '…',                // ≤ 120 karakter
}
```
> Diskon `-%`, "Hemat Rp…" **dihitung otomatis** dari `price`/`originalPrice`
> — tidak perlu diisi manual.

**Skema data situs** (`src/data/site.js`): `name, address, phoneDisplay,
phoneRaw, whatsapp, email, foundedYear, license, mapsEmbed, mapsLink, hours[],
stats[], services[], testimonials[], values[]`.

---

## 4. Routing

| Path | Komponen | `<title>` |
|------|----------|-----------|
| `/` | `Home` | apotek3D — Apotek Keluarga Terpercaya |
| `/promo` | `Promo` | Promo Bulan Ini — apotek3D |
| `/profil` | `Profile` | Profil Apotek — apotek3D |
| `/kontak` | `Contact` | Kontak & Lokasi — apotek3D |
| `*` | `NotFound` (inline) | Halaman Tidak Ditemukan — apotek3D |

**Perilaku global di `App.jsx`:**
- `ScrollToTop` → `window.scrollTo(0,0)` saat `pathname` berubah.
- `Navbar` + `<main>` + `Footer` di luar `<Routes>` (tidak di-render ulang).

### ⚠ Catatan hosting SPA
Sebelum deploy, **salin `index.html` ke `404.html`** atau aktifkan
*SPA fallback* di platform hosting (Netlify/Vercel sudah otomatis),
agar refresh di `/promo` tidak error 404.

---

## 5. Integrasi WhatsApp (pengganti checkout)

```js
// lib/format.js
waLink(number, message) =
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`
```

| Sumber | Isi pesan |
|--------|-----------|
| Navbar "Chat Kami" | Sapaan umum |
| Kartu produk | `Halo apotek3D, saya mau pesan *{nama}* dengan harga promo {harga}. Masih tersedia?` |
| Form kontak | Nama + no. HP + topik + pesan (format rapi, multi-baris) |
| CTA band | Sapaan umum |

Semua tautan memakai `target="_blank" rel="noreferrer"`.

**Ke depan (versi 2, opsional):** WhatsApp Cloud API untuk balasan otomatis,
atau form → Google Sheets / EmailJS.

---

## 6. SEO

### Saat ini (versi 1)
- `lang="id"`, `<title>` unik, `<meta name="description">` di `index.html`
- `theme-color` hijau, favicon SVG
- Struktur heading berurutan, teks konten asli (bukan gambar)
- Semua link navigasi memakai `<a href>` (bisa di-crawl Google)

### Yang perlu ditambahkan sebelum launch
- [ ] `react-helmet-async` (atau `useEffect` set `document.title`) → judul & meta per halaman
- [ ] `public/robots.txt` + `public/sitemap.xml`
- [ ] Open Graph & Twitter Card (`og:title`, `og:description`, `og:image`)
- [ ] `og:image` 1200×630 (kartu promo / logo)
- [ ] Schema.org `LocalBusiness` / `Pharmacy` JSON-LD di `index.html`
  (alamat, jam buka, telepon, koordinat → memicu *rich result* pencarian lokal)
- [ ] Halaman kanonis (`<link rel="canonical">`)

---

## 7. Performa

| Target | Nilai |
|--------|-------|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1,8s (4G) |
| Total JS (gzip) | < 100KB |
| CLS | < 0,1 |

**Strategi:**
1. Font Google dengan `preconnect` + `display=swap` (hindari *font blocking*).
2. CSS dipisah per blok — Vite menggabungkan & mengompres saat build.
3. Tidak ada library berat (ikon inline, tanpa animasi library).
4. Iframe peta memakai `loading="lazy"`.
5. Panggung 3D hanya `transform`/`opacity` (GPU-accelerated).
6. Saat konten promo membesar (> 30 item): tambahkan `React.lazy` +
   `Suspense` per route (code splitting otomatis per halaman).

**Keterbatasan yang disadari:**
- Google Maps & Google Fonts butuh internet → sediakan fallback warna/`font-family` sistem.
- Tanpa foto produk, beban jaringan sangat kecil (justru keunggulan).

---

## 8. Keamanan

- Tidak ada input yang dieksekusi sebagai HTML → risiko XSS sangat rendah
  (React melakukan escaping otomatis).
- Form kontak **tidak mengirim ke server** → tidak ada endpoint yang bisa diserang.
- Pesan dialihkan lewat `wa.me` yang sudah di-`encodeURIComponent`.
- Tanpa penyimpanan data pribadi pengguna (tidak ada cookie tracking).
- Wajib: `rel="noreferrer"` pada semua `target="_blank"`.

---

## 9. Alur Menambah Produk Promo

1. Buka `src/data/products.js`.
2. Salin satu objek, ganti `id` (wajib unik) dan data produk.
3. Pilih `icon` yang tersedia: `pill · bottle · jar · box · drop · tube · gauge · can`.
   Tambahkan gaya baru bila perlu di `components.css` (`.media--namaikon`).
4. Simpan → produk langsung tampil (hot reload saat dev).
5. Untuk menghapus promo: hapus objeknya — **jangan** sisakan produk tanpa promo
   di halaman Promo (melanggar scope halaman ini).
