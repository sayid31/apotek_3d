import { useMemo, useState } from 'react'

import ProductCard from '../components/ProductCard.jsx'
import { PageHero, SectionTitle, CtaBand } from '../components/Ui.jsx'
import { SearchIcon, TagIcon } from '../components/Icons.jsx'
import { categories, promoPeriod, promoProducts } from '../data/products'

export default function Promo() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return promoProducts.filter((product) => {
      const matchCategory = category === 'Semua' || product.category === category
      const matchQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.desc.toLowerCase().includes(q)
      return matchCategory && matchQuery
    })
  }, [query, category])

  return (
    <>
      <PageHero
        eyebrow="Katalog Promo"
        title="Promo khusus bulan ini"
        subtitle={`Kami turunkan harga beberapa obat dan suplemen yang paling sering dicari — berlaku ${promoPeriod}, atau selama stoknya masih ada.`}
      />

      <section className="section container">
        <div className="promo-note">
          <TagIcon size={20} />
          <p>
            <strong>Cara pesan:</strong> klik “Pesan Promo Ini” pada produk — Anda akan
            masuk ke WhatsApp kami dengan detail pesanan yang sudah terisi. Apotekernya akan
            mengecek stok dulu, lalu menghitung ongkir ke alamat Anda. Bisa juga diambil
            langsung di cabang mana pun.
          </p>
        </div>

        <div className="promo-toolbar">
          <label className="search-box">
            <SearchIcon size={18} />
            <input
              type="search"
              placeholder="Cari obat, vitamin, alat kesehatan…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="chips">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip chip--filter ${category === item ? 'is-active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <>
            <p className="promo-count">
              Menampilkan {filtered.length} dari {promoProducts.length} produk promo
            </p>
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <SearchIcon size={40} />
            <h3>Produk tidak ditemukan</h3>
            <p>Coba kata kunci lain atau pilih kategori “Semua”.</p>
            <button
              type="button"
              className="btn btn--soft"
              onClick={() => {
                setQuery('')
                setCategory('Semua')
              }}
            >
              Reset pencarian
            </button>
          </div>
        )}
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle
            eyebrow="Tips Hemat"
            title="Mau tahu promo berikutnya lebih dulu?"
            subtitle="Gabung ke grup WhatsApp pelanggan untuk info diskon, stok obat langka, dan jadwal cek kesehatan gratis."
          />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
