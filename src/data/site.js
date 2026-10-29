// ============================================================
// Informasi utama apotek — ubah data di sini untuk menyesuaikan
// Catatan: alamat, nomor, dan izin di bawah masih CONTOH (placeholder)
//          dan menunggu data asli pemilik apotek.
// ============================================================

/** Daftar cabang. Setiap cabang punya koordinat → peta otomatis dibangun dari situ. */
const branches = [
  {
    id: 'denpasar',
    name: 'Denpasar',
    label: 'Cabang Pusat',
    area: 'Denpasar Barat',
    address: 'Jl. Teuku Umar Barat No. 88, Dauh Puri Kauh, Denpasar Barat, Bali 80111',
    landmark: 'Seberang Pasar Badung, 5 menit dari Renon',
    note: 'Rumah kami yang pertama. Buka paling pagi, untuk Anda yang butuh obat sebelum matahari jadi terik.',
    hours: [
      { day: 'Senin – Minggu', time: '07.00 – 23.00' },
      { day: 'Antar obat darurat', time: '24 jam', highlight: true },
    ],
    lat: -8.6594,
    lng: 115.2115,
  },
  {
    id: 'sanur',
    name: 'Sanur',
    label: 'Cabang Pesisir',
    area: 'Denpasar Selatan',
    address: 'Jl. Danau Tamblingan No. 45, Sanur, Denpasar Selatan, Bali 80228',
    landmark: 'Dua menit dari Pantai Matahari Terbit',
    note: 'Dekat sekali dengan warga Sanur — banyak yang mampir sepulang jalan pagi, masih mengenakan sandal.',
    hours: [
      { day: 'Senin – Minggu', time: '08.00 – 22.00' },
      { day: 'Antar obat darurat', time: '24 jam', highlight: true },
    ],
    lat: -8.6879,
    lng: 115.2624,
  },
  {
    id: 'kuta',
    name: 'Kuta',
    label: 'Cabang Tuban',
    area: 'Kuta, Badung',
    address: 'Jl. Raya Tuban No. 20, Tuban, Kuta, Badung, Bali 80361',
    landmark: '10 menit dari Bandara Ngurah Rai',
    note: 'Paling ramai selepas matahari terbenam. Kami bertahan buka sampai larut untuk warga sekitar dan tamu yang baru mendarat.',
    hours: [
      { day: 'Senin – Minggu', time: '08.00 – 00.00' },
      { day: 'Antar obat darurat', time: '24 jam', highlight: true },
    ],
    lat: -8.7456,
    lng: 115.172,
  },
  {
    id: 'ubud',
    name: 'Ubud',
    label: 'Cabang Gianyar',
    area: 'Ubud, Gianyar',
    address: 'Jl. Raya Sanggingan No. 88, Ubud, Gianyar, Bali 80571',
    landmark: 'Arah Kintamani, sebelum Jembatan Campuhan',
    note: 'Cabang paling tenang. Sering jadi tempat bertanya panjang lebar soal herbal, suplemen, dan cara merawat orang tua di rumah.',
    hours: [
      { day: 'Senin – Minggu', time: '08.00 – 21.00' },
      { day: 'Antar obat darurat', time: '24 jam', highlight: true },
    ],
    lat: -8.5107,
    lng: 115.2589,
  },
]

const withMaps = (branch) => ({
  ...branch,
  mapsEmbed: `https://maps.google.com/maps?q=${branch.lat},${branch.lng}&z=16&ie=UTF8&iwloc=&output=embed`,
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`,
})

export const cabang = branches.map(withMaps)

export const site = {
  name: 'apotek3D',
  tagline: 'Apotek Keluarga Terpercaya',
  city: 'Bali',
  address: branches[0].address,
  phoneDisplay: '+62 812-3456-7890',
  phoneRaw: '6281234567890',
  whatsapp: '6281234567890',
  email: 'halo@apotek3d.id',
  instagram: '@apotek3d',
  foundedYear: 2011,
  license: 'Izin SIP No. 503/1234/DPMPTSP/2024',
  mapsEmbed: withMaps(branches[0]).mapsEmbed,
  mapsLink: withMaps(branches[0]).mapsLink,
  branches: cabang,

  hours: [
    { day: 'Senin – Sabtu', time: '07.00 – 23.00' },
    { day: 'Minggu', time: '08.00 – 22.00' },
    { day: 'Antar obat darurat', time: '24 jam via WhatsApp', highlight: true },
  ],

  stats: [
    { value: '15', suffix: 'thn', label: 'Menemani keluarga Bali' },
    { value: '12.000+', label: 'Pelanggan yang kembali lagi' },
    { value: '2.500+', label: 'Produk tersedia' },
    { value: '4.9', suffix: '/5', label: 'Penilaian pelanggan' },
  ],

  services: [
    {
      icon: 'chat',
      title: 'Konsultasi Apoteker',
      desc: 'Bingung memilih obat? Ceritakan dulu keluhannya — apoteker kami akan mendengarkan, menjelaskan, dan baru menyarankan. Gratis, tanpa perlu beli apa pun.',
    },
    {
      icon: 'truck',
      title: 'Antar ke Rumah',
      desc: 'Obat yang Anda pesan kami antar sendiri, rata-rata 30 menit area Denpasar dan sekitarnya. Gratis untuk belanja di atas Rp100.000.',
    },
    {
      icon: 'shield',
      title: 'Obat Asli, Tanpa Negosiasi',
      desc: 'Yang kami simpan adalah obat yang kami berikan kepada keluarga kami sendiri: asli, berizin, dan disimpan pada suhu yang seharusnya.',
    },
    {
      icon: 'calendar',
      title: 'Promo Tiap Bulan',
      desc: 'Selalu ada yang harganya kami turunkan, karena tahu ada keluarga yang menunggu sampai gajian. Cek halaman Promo untuk yang sedang berjalan.',
    },
  ],

  testimonials: [
    {
      name: 'Rina Kurnia',
      role: 'Ibu dua anak, Sanur',
      text: 'Saya chat jam 11 malam karena anak saya demam. Apotekernya menelepon dulu, menanyakan usianya sebelum menghitung dosisnya. Sampai rumah obatnya masih dingin.',
    },
    {
      name: 'Bagas Pratama',
      role: 'Pekerja, Kuta',
      text: 'Saya langganan vitamin di sini. Harganya jujur, dan kalau stok habis mereka menelepon memberi tahu — bukan diam-diam mengganti merek.',
    },
    {
      name: 'Siti Aminah',
      role: 'Guru SMA, Ubud',
      text: 'Ibu saya tidak lancar membaca tulisan kecil di box obat. Tiap habis beli, apoteker menuliskan cara pakainya di kertas kecil dengan tulisan tangan.',
    },
  ],

  values: [
    {
      icon: 'shield',
      title: 'Amanah',
      desc: 'Obat asli berizin, tidak ditawar. Resep dan cerita kesehatan Anda kami simpan rapat-rapat.',
    },
    {
      icon: 'chat',
      title: 'Mendengar Dulu',
      desc: 'Sebelum menyarankan, kami mendengarkan. Tidak ada pertanyaan yang dianggap bodoh di depan meja kami.',
    },
    {
      icon: 'truck',
      title: 'Datang Saat Dibutuhkan',
      desc: 'Yang mendesak didahulukan — termasuk mengantar tengah malam kalau memang bisa kami lakukan.',
    },
    {
      icon: 'star',
      title: 'Konsisten',
      desc: 'Harga transparan dan cara melayani yang sama sejak 2011, di cabang mana pun Anda mampir.',
    },
  ],
}
