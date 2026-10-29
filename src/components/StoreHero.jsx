import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'

import StoreScene from '../three/StoreScene.jsx'
import { ArrowIcon, WhatsAppIcon } from './Icons.jsx'
import { site } from '../data/site'
import { waLink } from '../lib/format'

/**
 * Hero Beranda: teks marketing di atas toko apotek 3D sungguhan.
 */
export default function StoreHero({ products, isMobile = false, onProgress }) {
  // hover/pilih disimpan per UNIT (bukan per SKU), karena satu produk
  // dipajang di beberapa posisi rak
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)

  const show = selected?.product ?? hover?.product ?? null

  return (
    <section className="store-hero">
      <div className="store-hero__canvas">
        <Suspense fallback={null}>
          <StoreScene
            products={products}
            hoveredKey={hover?.key}
            selectedKey={selected?.key}
            onHover={(key, product) => setHover(key && product ? { key, product } : null)}
            onSelect={(key, product) =>
              setSelected((prev) => (prev?.key === key ? null : { key, product }))
            }
            onClear={() => setSelected(null)}
            isMobile={isMobile}
            cameraPreset={isMobile ? 'showcase' : 'interior'}
            onProgress={onProgress}
          />
        </Suspense>
      </div>

      <div className="store-hero__overlay">
        <div className="store-hero__copy">
          <span className="eyebrow">Apotek keluarga Bali sejak {site.foundedYear}</span>
          <h1>
            Apotek 3D
            <em> — masuk ke toko kami tanpa datang</em>
          </h1>
          <p className="store-hero__lead">
            Jelajahi rak obat kami dalam 3D, dari mana pun Anda berada. Ambil produk yang
            Anda cari, lalu pesan — obatnya kami siapkan dan antar ke rumah.
          </p>

          <div className="store-hero__actions">
            <Link className="btn btn--brand btn--lg" to="/promo">
              Lihat Promo Bulan Ini <ArrowIcon size={18} />
            </Link>
            <a
              className="btn btn--white btn--lg"
              href={waLink(site.whatsapp, 'Halo apotek3D, saya mau tanya soal obat.')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={18} /> Tanya Apoteker
            </a>
          </div>

          <p className="store-hero__hint">
            Seret untuk melihat rak · klik produk untuk detail
          </p>
        </div>

        {show && (
          <aside className="store-hero__card">
            <span className="chip chip--category">{show.category}</span>
            <h3>{show.name}</h3>
            <p>{show.desc}</p>
            <div className="store-hero__price">
              <strong>
                Rp{show.price.toLocaleString('id-ID')}
              </strong>
              <s>Rp{show.originalPrice.toLocaleString('id-ID')}</s>
            </div>
            <a
              className="btn btn--brand btn--block"
              href={waLink(site.whatsapp, `Halo apotek3D, saya mau pesan *${show.name}* (Rp${show.price.toLocaleString('id-ID')}). Masih tersedia?`)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={18} /> Pesan Produk Ini
            </a>
          </aside>
        )}
      </div>
    </section>
  )
}