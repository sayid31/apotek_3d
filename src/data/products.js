// ============================================================
// Katalog khusus PROMO — hanya produk yang sedang diskon
// yang tampil di website. Tambah / hapus item di daftar ini.
// ============================================================

export const promoPeriod = '1 – 31 Oktober 2026'

export const promoProducts = [
  {
    id: 'pr-01',
    name: 'Paracetamol 500 mg — 10 Tablet',
    category: 'Obat Umum',
    icon: 'pill',
    price: 12000,
    originalPrice: 18000,
    until: '31 Okt 2026',
    desc: 'Penurun demam dan pereda nyeri ringan. Cocok untuk sakit kepala maupun nyeri otot.',
  },
  {
    id: 'pr-02',
    name: 'Vitamin C 1000 mg — 30 Tablet',
    category: 'Vitamin & Suplemen',
    icon: 'jar',
    price: 45000,
    originalPrice: 75000,
    until: '31 Okt 2026',
    desc: 'Daya tahan tubuh tetap terjaga. Efisien, cukup satu tablet per hari setelah makan.',
  },
  {
    id: 'pr-03',
    name: 'Sirup Anak Batuk & Pilek 60 ml',
    category: 'Ibu & Anak',
    icon: 'bottle',
    price: 32000,
    originalPrice: 46000,
    until: '25 Okt 2026',
    desc: 'Formula lembut untuk anak usia 2–12 tahun, rasa jeruk yang tidak pahit.',
  },
  {
    id: 'pr-04',
    name: 'Masker Medis 3 Ply — 50 pcs',
    category: 'Alat Kesehatan',
    icon: 'box',
    price: 28000,
    originalPrice: 45000,
    until: '31 Okt 2026',
    desc: 'Filtrasi efektif 95%, nyaman dipakai seharian, karet elastis tidak menekan telinga.',
  },
  {
    id: 'pr-05',
    name: 'Minyak Kayu Putih 100 ml',
    category: 'Perawatan Tubuh',
    icon: 'drop',
    price: 21000,
    originalPrice: 30000,
    until: '31 Okt 2026',
    desc: 'Penghangat tubuh andalan keluarga. Aromanya tahan lama dan tidak lengket.',
  },
  {
    id: 'pr-06',
    name: 'Sunscreen SPF 50+ — 50 ml',
    category: 'Perawatan Tubuh',
    icon: 'tube',
    price: 69000,
    originalPrice: 105000,
    until: '20 Okt 2026',
    desc: 'Perlindungan UVA/UVB harian, finish ringan, cocok untuk aktivitas di luar ruangan.',
  },
  {
    id: 'pr-07',
    name: 'Tensimeter Digital — 1 Unit',
    category: 'Alat Kesehatan',
    icon: 'gauge',
    price: 385000,
    originalPrice: 525000,
    until: '31 Okt 2026',
    desc: 'Ukur tekanan darah sendiri di rumah dengan layar besar dan indikator detak jantung.',
  },
  {
    id: 'pr-08',
    name: 'Susu Nutrisi Lansia — 400 g',
    category: 'Vitamin & Suplemen',
    icon: 'can',
    price: 96000,
    originalPrice: 132000,
    until: '28 Okt 2026',
    desc: 'Tinggi protein dan kalsium untuk menjaga massa otot serta kepadatan tulang.',
  },
]

export const categories = ['Semua', ...new Set(promoProducts.map((p) => p.category))]
