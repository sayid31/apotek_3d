// ============================================================
// Konstanta & konfigurasi scene 3D
// Sumber data produk tetap: src/data/products.js
// ============================================================

export const SCENE = {
  background: '#06120f',
  fog: '#06120f',
  fogNear: 7,
  fogFar: 20,
  accent: '#14b884',
  accentLight: '#6fe0bd',
  gold: '#c9a96e',
}

// Warna per kategori — dipakai material & pencahayaan rak
export const CATEGORY_COLORS = {
  'Obat Umum': '#19c08a',
  'Vitamin & Suplemen': '#f0b429',
  'Ibu & Anak': '#ff8a5c',
  'Alat Kesehatan': '#6aa9ff',
  'Perawatan Tubuh': '#b085ff',
}

export const colorFor = (category) => CATEGORY_COLORS[category] || SCENE.accent

/**
 * Tinggi dasar (bottom) tiap bentuk kemasan, dalam satuan lokal.
 * Dipakai supaya produk DUDUK TEPAT di papan rak — bukan melayang atau
 * tenggelam ke dalam papan.
 */
export const PRODUCT_LIFT = {
  pill: 0.26,
  bottle: 0.23,
  jar: 0.18,
  box: 0.17,
  drop: 0.26,
  tube: 0.23,
  gauge: 0.17,
  can: 0.18,
}

export const liftFor = (icon) => PRODUCT_LIFT[icon] ?? 0.19

// Konfigurasi rak: 3 baris, jarak & tinggi
export const RACK = {
  shelves: 3,
  shelfGap: 0.86,
  shelfWidth: 4.4,
  shelfDepth: 0.72,
  shelfThickness: 0.07,
  columnGap: 1.46,
  baseY: -0.35,
}

// Bagi produk ke beberapa baris rak
export function layoutProducts(products, shelves = RACK.shelves) {
  const perShelf = Math.ceil(products.length / shelves)
  const rows = []

  for (let i = 0; i < shelves; i += 1) {
    const items = products.slice(i * perShelf, (i + 1) * perShelf)
    if (items.length === 0) continue

    const offset = (items.length - 1) / 2
    rows.push(
      items.map((product, index) => ({
        product,
        x: (index - offset) * RACK.columnGap,
        y: i * RACK.shelfGap,
        index,
      })),
    )
  }

  return rows
}

/**
 * Susun produk agar MENGISI seluruh tingkat rak, seperti toko sungguhan.
 *
 * Stok fisik memang diulang (banyak unit per SKU), jadi setiap baris diisi
 * penuh dengan pola bergeser supaya tidak terlihat seperti salinan mesin.
 * `instanceKey` unik per posisi supaya hover/pilih hanya menyorot satu unit.
 */
export function stockedRows(products, { rows = 3, perRow = 6, gap = 0.7 } = {}) {
  const list = (products || []).filter(Boolean)
  if (!list.length) return []

  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: perRow }, (_, c) => {
      const product = list[(r + c) % list.length]
      return {
        product,
        x: (c - (perRow - 1) / 2) * gap,
        index: c,
        instanceKey: `${product.id}-r${r}c${c}`,
        // geser kedalaman kecil: rak terlihat "dihuni", bukan rapi sempurna
        jitterZ: ((((r * 5 + c * 11) % 7) - 3) * 0.015),
      }
    }),
  )
}