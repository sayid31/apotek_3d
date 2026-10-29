# 10 — Rencana 3D (Referensi: Yuya Film Studio)

Target: efek 3D yang **jelas terlihat & immersive**, setara kualitas Awwwards,
menjadi identitas visual website apotek3D.

Referensi utama: **Yuya Film Studio** (yuyafilmstudio.dev, Awwwards Nominee Okt 2026)
— dibangun dengan **Three.js + WebGL + Blender**.

---

## 1. Apa yang Membuat Referensi Itu Terlihat "3D"

| Elemen | Penjelasan |
|--------|------------|
| **WebGL canvas penuh** | Satu `<canvas id="gl">` menutupi seluruh layar; render 3D asli (bukan CSS) |
| **First-person walk (WASD)** | Kamera 3D bisa "dijalanakan" —_depth nyata_ |
| **Mouse look** | Menggeser pandangan seperti game |
| **Rak-rak 3D** | Objek fisik (rak obat) dengan depth, lighting, bayangan |
| **Lighting & material** | PBR material, ambient + directional light |
| **HUD/UI glassmorphism** | Layer UI mengambang di atas canvas 3D |
| **Pick up / rotate objek** | Ambil & putar produk (scroll untuk memutar) |
| **Transisi & partikel** | Animasi masuk, partikel, Efek dramatis |

---

## 2. Kesimpulan: CSS 3D → WebGL (Three.js)

Perbedaannya mendasar:

| Aspek | CSS 3D (sekarang) | WebGL / Three.js (referensi) |
|-------|-------------------|-------------------------------|
| Cara render | Browser render transform CSS | GPU render adegan 3D lewat WebGL |
| Objek | Elemen HTML (div) | Mesh/geometry di ruang 3D |
| Depth | Ilusi 2,5D | Kedalaman 3D asli |
| Interaksi | Hover statis | Kamera bisa bergerak, objek bisa diambil |
| Lighting | Tidak ada (bayangan CSS) | Pencahayaan, bayangan, material |
| Bobot | ~0 KB | 400 KB – 2 MB |
| Performa | Sangat ringan | Butuh GPU, harus di-optimasi |

**Kesimpulan:** kalau targetnya Yuya-level, **wajib pakai Three.js (WebGL)**, bukan
CSS. Ini perubahan arsitektur besar — dari "web profil ringan" jadi "experiential web".

---

## 3. Konsep 3D untuk Apotek (terjemahan ke domain)

Referensinya "studio film yang bisa dimasuki". Untuk apotek, konsepnya:

### Opsi A — "Apotek 3D yang bisa Dijelajahi" ⭐ (paling mirip Yuya)
```
User masuk ke apotek virtual (first-person WASD):
- Koridor + rak-rak obat 3D (berisi produk promo yang bisa diambil)
- Beli/pesan obat: ambil produk dari rak → masuk keranjang 3D
- Ada loket apoteker 3D (reception),eta l embodies "konsultasi"
- Pintu keluar → halaman normal / WhatsApp checkout
```
**Elemen Yuya yang dipakai:** walk, mouse-look, pick-up, glass HUD, minimap.

### Opsi B — "Rak Promo 3D" (lebih ringan, sangat cocok untuk katalog promo)
```
Tidak walk-first-person, tapi:
- Rak obat 3D di layar (rak dengan tingkatan)
- Scroll/drag memutar tampilan rak 360°
- Hover → produk nama & harga muncul (glass HUD)
- Klik produk → detail + tombol pesan WhatsApp
```
**Elemen Yuya yang dipakai:** pick-up/rotate objek, glass HUD, lighting dramatis.
**Lebih ringan, risiko rendah, tetap "3D jelas".**

### Opsi C — "Produk 3D Can Be Rotated" (paling fokus produk)
```
Setiap kartu produk punya model 3D kemasan (bisa dirotasi user):
- GlTF model, tanpa walking
-<object> / model-viewer
```
**Elemen Yuya yang dipakai:** pick-up/rotate. Paling ringan.

---

## 4. Rekomendasi

Untuk **apotek3D**, saya sarankan dua tahap:

### Tahap 1 — "Rak Promo 3D" (Opsi B) ⭐ Rekomendasi
Alasan:
- Scope jauh lebih kecil daripada first-person walk (Yuya full).
- Tetap sangat "3D" & jelas terlihat (paling memenuhi permintaanmu).
- Tetap bisa dipakai untuk konten nyata (katalog promo).
- Risiko performa & development jauh lebih rendah.

**Teknik:** Three.js + React Three Fiber, rak dengan model sederhana (Box + Text),
produk diambil dari `products.js` yang sudah ada.

### Tahap 2 (opsional) — First-person walk ala Yuya (Opsi A)
Kalau Tahap 1 sukses & owners mau "WOW factor" maksimal, baru_naik ke walk 3D
utuh (coridor apotek). Ini proyek 3–4 minggu, perlu model 3D dari desainer.

---

## 5. Arsitektur Teknis (untuk Opsi B / Yuya-level)

### Stack tambahan
| Layer | Pilihan | Alasan |
|-------|---------|--------|
| 3D engine | **Three.js** (+ WebGL) | Standar industri, dipakai Yuya |
| React binding | **React Three Fiber (R3F)** | Idiomatik React, deklaratif |
| Helper | `@react-three/drei` | Environment, OrbitControls, Text |
| State 3D | `@react-three/fiber` |-zustand` (opsional) |
| Model 3D | Box/primitive dulu → glTF asset nanti | Mulai tanpa model eksternal |
| Animasi | `@react-three/drei` + `framer-motion` (UI) | Transisi halus |
| Build | Tetap **Vite** | three + R3F jalan di Vite |

### Rendering pipeline
```
<App> (React)
 └── <Canvas> (R3F, mode WebGL)
      ├── <Lights> (ambient + directional)
      ├── <Environment> (preset: city/studio untuk lighting/refleksi)
      ├── <PharmacyRack> (rak obat 3D)
      │     ├── <Shelf> × N (rax geometries)
      │     ├── <Product> × M (dari data/products.js, bisa dipick)
      │     └── <Highlight> (hover glow)
      ├── <CameraRig> (kontrol drag/rotate)
      └── <Html> (label harga via drei/Html — overlay DOM di atas canvas)
 └── HUD React biasa (glassmorphism, di luar canvas)
```

### Struktur folder tambahan
```
src/
├── three/                      # 🆕 modul 3D
│   ├── Scene.jsx               # <Canvas> root
│   ├── Lights.jsx
│   ├── PharmacyRack.jsx        # rak + produk
│   ├── ProductMesh.jsx         # 1 produk (bisa rotate/drag)
│   ├── CameraRig.jsx           # kontrol kamera
│   └── config.js               # konstanta 3D (ukuran, warna, posisi)
└── styles/
    └── three.css               # gaya canvas + HUD 3D
```

---

## 6. Trade-offs & Risiko (jujur)

| Aspek | Dampak | Mitigasi |
|-------|--------|----------|
| Bobot JS | +150–400 KB (three) | Lazy-load 3D hanya saat halaman Promo dibuka |
| GPU | Butuh perangkat decent | Deteksi WebGL → fallback grid 2D yang sekarang |
| Mobile | Berat di HP lama | Turunkan kualitas / fewer objects di mobile, atau sembunyikan 3D |
| Waktu dev | +1–2 minggu (Opsi B), +3–4 (Opsi A full) | Mulai Tahap 1 dulu |
| Aksesibilitas | 3D murni sulit diakses | Sediakan jalur 2D (katalog biasa) yang selalu ada |
| SEO | Konten di canvas tak ter-index | Pastikan data produk tetap ada di DOM/HTML |

**Aturan emas:** 3D = **bonus**, bukan syarat. Selalu ada versi 2D yang berfungsi.
Grid promo yang sekarang tetap dipertahankan sebagai fallback.

---

## 7. Strategi "Yuya-level" tapi Realistis

Kualitas Yuya datang dari: model 3D yang detail (Blender), lighting sinematik,
motion design yang dikurasi, dan development berbulan-bulan. Untuk apotek3D kita
mencapai dampak serupa lewat:

1. **Lighting dramatis** (sama: dramatic rim light, ambient gelap) → produk terasa nyata.
2. **Pick-up & rotate produk** (interaksiYuya yang paling ikonik).
3. **Glassmorphism HUD** (styleYuya).
4. **Partikel halus** (floating dust, sesuai "apotek bersih").
5. **Transisi mulus** masuk ke scene 3D.

---

## 8. Rekomendasi Final & Pertanyaan

**Rekomendasi: Opsi B "Rak Promo 3D"** di halaman `/promo`, menggunakan
Three.js + React Three Fiber, dengan grid 2D sebagai fallback.

**Yang perlu diputuskan:**
1. Setuju Opsi B, atau mau Opsi A (full first-person ala Yuya, lebih berat)?
2. Asal model 3D produk: pakai bentuk sederhana dulu (kotak/pil generik), atau
   ada file 3D kemasan asli yang bisa dipakai?
3. Mau saya susun **rencana implementasi + mockup upgraded** dulu (tetap fase
   perencanaan), atau langsung eksekusi?

---

## 9. PROTOTIPE SUDAH DIBUAT (hasil pengujian)

Prototipe **Opsi B sudah jadi dan terverifikasi** di browser.
Buka **`/prototipe-3d`** — route terpisah, mudah dihapus bila tidak jadi dipakai.

### Yang dibangun
| File | Isi |
|------|-----|
| `src/three/Scene.jsx` | Root `<Canvas>` WebGL, kamera, OrbitControls, lantai reflektif |
| `src/three/PharmacyRack.jsx` | Rak obat 3D (3 baris, tiang, dinding, garis cahaya tepi) |
| `src/three/ProductMesh.jsx` | Bentuk 3D per jenis produk (8 bentuk prosedural) |
| `src/three/Lights.jsx` | Key light + rim light hijau + fill hangat (ala studio sinematik) |
| `src/three/Dust.jsx` | Debu melayang (particle) untuk kesan volume |
| `src/three/config.js` | Token warna per kategori + layout rak |
| `src/pages/Prototype3D.jsx` | Halaman + HUD glassmorphism ala Yuya |
| `src/styles/three.css` | Gaya HUD & loader |

### Hasil pengujian di browser
| Aspek | Hasil |
|-------|-------|
| Render WebGL | Canvas 1440x900, scene 3D asli — berhasil |
| Error konsol | **0 error** (2 warning deprecation dari library Three.js) |
| Interaksi klik | Raycast benar, HUD menampilkan produk yang diklik |
| Highlight produk | Membesar 1,22x + emissive + cincin cahaya |
| Auto-rotate | speed 0,5, bisa dimatikan lewat tombol HUD |
| Tampilan HP 390px | Kamera menyesuaikan (FOV 58 derajat, jarak 8,4) — semua produk terlihat |
| Scroll horizontal | Tidak ada |

### Bobot bundle (hasil build)
| Chunk | Ukuran | Kapan dimuat |
|-------|--------|--------------|
| Aplikasi utama | 93 KB gzip | Selalu |
| Chunk 3D (Three.js) | 253 KB gzip | **Hanya saat `/prototipe-3d` dibuka** (lazy load) |

> Ini membuktikan prinsip "3D = bonus, bukan syarat" berjalan: pengunjung yang
> hanya mau membaca promo **tidak pernah** mengunduh Three.js.

### Keputusan setelah melihat prototipe
1. **Cukup ini?** (Opsi B) -> jadikan fitur resmi di `/promo`
2. **Masih kurang, mau Opsi A?** (ruang apotek yang bisa dijelajahi WASD)
3. **Mau dipoles?** -> model kemasan lebih detail, backdrop apotek 3D, efek
   partikel, transisi masuk, ambient suara

**Status prototipe:** Selesai & teruji. Belum disatukan ke halaman `/promo`.

---

## 10. IMPLEMENTASI 3D DI BERANDA (status terkini)

Keputusan pengguna: 3D pindah ke **Beranda**, dan halaman pembuka harus
**WOW + masuk otomatis** tanpa klik.

### File yang ditambah/diubah
| File | Isi |
|------|-----|
| `src/three/Store.jsx` | Interior toko: lantai bertekstur, dinding, plafon neon, 2 rak gondola **terisi penuh**, meja kasir, plakat brand, **apoteker + 2 pembeli** |
| `src/three/People.jsx` | Figur manusia prosedural: apoteker (mengangkat kotak obat) + pembeli (jalan mengikuti rute) |
| `src/three/StoreScene.jsx` | `<Canvas>` + HDRI + post-processing (N8AO, Bloom, AGX, Vignette, SMAA) |
| `src/three/labelTexture.js` | Label kemasan digambar `<canvas>`: merek, nama produk, harga, barcode |
| `src/three/loading.js` | Pelacak progres via `THREE.DefaultLoadingManager` |
| `src/three/ProgressReporter.jsx` | Meneruskan progres ke luar `<Canvas>` |
| `src/components/Preloader.jsx` | Layar muat (ring + persentase), **masuk otomatis** + efek iris |
| `src/components/StoreHero.jsx` | Hero Beranda + kartu detail produk saat diklik |
| `src/styles/store.css` | Gaya hero & layar muat |
| `public/hdri/studio_small_08_1k.hdr` | HDRI CC0 (Poly Haven) untuk pencahayaan & refleksi |
| `public/textures/tile_*.jpg` | Tekstur lantai keramik CC0 (Poly Haven) |

### Layar muat pembuka
Desain sengaja **minim teks** (hanya merek, persentase, satu baris pendek),
tapi animasinya dibuat mewah: ring progres, cincin putus-putus berputar,
lambang apotek berdenyut, kisi lantai perspektif, sapuan cahaya, bar progres.
Selesai memuat → jeda 0,6 dtk → **iris menutup ke tengah** → situs terbuka
sendiri. Tampil maksimal 1× per sesi; ada failsafe 9 dtk & pintasan Enter/Esc.

### Hasil pengujian
| Aspek | Hasil |
|-------|-------|
| Build | ✅ Sukses — aplikasi utama **94 KB gzip** (Three.js tetap di chunk lazy) |
| Error konsol | ✅ **0 error**, 0 page error |
| Masuk otomatis | ✅ Loader hilang sendiri, hero 3D tampil, scroll body terbuka kembali |
| Klik produk | ✅ Raycast benar → kartu detail (kategori, nama, harga, tombol WhatsApp) |
| Isi rak | ✅ 3 tingkat × 6 unit per rak, produk duduk tepat di papan (tidak melayang) |
| HP 390px | ✅ Loader selesai, canvas tampil, tanpa scroll horizontal |

### Bug yang ditemukan & diperbaiki
1. `useProgress` drei tidak pernah bergerak di R3F v9 → diganti pelacakan via
   `THREE.DefaultLoadingManager`.
2. Meng-import drei **di luar** `<Canvas>` menarik seluruh three.js ke bundle
   utama (93 → 524 KB gzip) → dipindah ke `ProgressReporter` di dalam Canvas
   dan **di luar** `<Suspense>`.
3. Handler hover mengirim id string, bukan objek produk → `show.price.toLocaleString`
   melempar error dan seluruh `<StoreHero>` unmount saat produk diklik.
4. `PCFSoftShadowMap` dihapus pada three 0.186 → set `gl.shadowMap.type = PCFShadowMap`.

**Status:** 🟩 3D Beranda + layar muat otomatis **diimplementasikan & teruji**.
Prototype route `/prototipe-3d` masih ada (belum dihapus).

## 11. ORANG DI DALAM TOKO (apoteker + pembeli)

Permintaan pengguna: *"kurang ada orang nya di 3D nya — orangnya ngambil obat jadi
kasir, terus kayak ada pembeli keluar masuk gitu."*

### Pendekatan
Figur manusia **prosedural** (`src/three/People.jsx`) — dibangun dari primitif
three.js, bukan model GLB. Alasan: karakter rigged gratis berkualitas sulit
dijamin lisensinya dan menambah bobot unduhan; figur prosedural justru menyatu
dengan gaya semi-realistis toko dan tidak menambah aset sama sekali.

### Anatomi (tinggi ±1,7 m, proporsi orang dewasa)
kepala r 0,098 (±1/7 tinggi badan) + rambut + mata · leher silinder ·
dada RoundedBox 0,33 × 0,52 × 0,19 · panggul · lengan (atas + siku + bawah +
tangan) · kaki (paha + lutut + betis + sepatu). Kaki menempel tepat di **y = 0**
— tidak ada yang melayang.

### Gerak
- **Berjalan:** kaki–tangan berlawanan arah, lutut menekuk saat kaki melangkah,
  badan mengangkat ±1,7 cm (bob), torso condong 4°, kecepatan 0,72–0,8 m/dtk.
- **Diam:** napas pelan + kepala menoleh ±20°, bukan patung kaku.
- **Berhenti/melanjutkan:** pose jalan ⇄ pose diam disambung halus ±0,2 dtk.

### Peran & rute
| Figur | Posisi/rute | Aktivitas |
|-------|-------------|-----------|
| Apoteker (jas putih + lencana salib) | belakang kasir `(2,76 · −0,47)` | tangan di meja → **mengangkat kotak obat setinggi dada** → menaruhnya lagi (siklus ±10 dtk), menoleh sesekali |
| Pembeli 1 (biru) | sisi kanan | masuk → memilih obat di rak kanan (3,4 dtk) → antre di ujung kasir (5 dtk) → keluar |
| Pembeli 2 (kuning) | sisi kiri | masuk → lihat rak kiri (4,2 dtk) → berdiri menengok (2,4 dtk) → keluar |

### Penyesuaian komposisi yang dilakukan
1. Meja kasir digeser dari `z 1,4` → `z 0,4` agar apoteker tidak terpotong tepi bingkai.
2. Monitor POS dipindah ke ujung kiri meja — sebelumnya tepat menghalangi garis
   pandang kamera ke tangan & kotak obat apoteker (dihitung, bukan menebak).
3. Kamera interior dikembalikan **persis** ke preset v5 yang disetujui
   (posisi `0,2 · 1,62 · 5,4`, target `0 · 1,15 · −1,6`, fov 48).
4. `autoRotate` diperlambat 0,28 → **0,1** dan arah horizontal dibatasi ±0,6 rad.
   Sebelumnya kamera menyusur 34° dalam 20 detik sehingga komposisi rusak dan
   orang-orang keluar bingkai.
5. Preset HP (`showcase`) diarahkan ke area kasir agar apoteker + pembeli ikut
   terlihat di layar sempit (potret hanya ±19° horizontal).

### Hasil pengujian
| Aspek | Hasil |
|-------|-------|
| Error konsol | ✅ 0 error |
| Gerak pembeli | ✅ rute, berhenti, menghadap, keluar-masuk terverifikasi |
| Ukuran figur | ✅ 200–290 px — seimbang dengan rak (tidak ada lagi figur raksasa) |
| Antre di kasir | ✅ berdiri di ujung meja, tidak menutupi panel merek |
| HP 390px | ✅ apoteker + pembeli terlihat di area kasir |

**Catatan pengujian:** browser headless di lingkungan dev menjalankan
`requestAnimationFrame` hanya ±1 fps sehingga animasi tampak macet di titik mula.
Untuk mengujinya buka `/?speed=12` — saklar ini **hanya aktif di mode dev** dan
di produksi selalu 1.