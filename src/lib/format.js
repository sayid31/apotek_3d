// Helper kecil untuk format dan tautan

export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export const discountPercent = (product) =>
  Math.round((1 - product.price / product.originalPrice) * 100)

export const waLink = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`

export const orderMessage = (product) =>
  `Halo ${'apotek3D'}, saya mau pesan *${product.name}* dengan harga promo ${formatRupiah(
    product.price,
  )}. Masih tersedia? Terima kasih.`
