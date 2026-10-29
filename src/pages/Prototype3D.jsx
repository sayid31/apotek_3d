import { Suspense, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Scene from '../three/Scene.jsx'
import { Logo, WhatsAppIcon } from '../components/Icons.jsx'
import { promoProducts } from '../data/products'
import { site } from '../data/site'
import { discountPercent, formatRupiah, orderMessage, waLink } from '../lib/format'

/**
 * PROTOTYPE — "Rak Promo 3D" (Opsi B pada docs/10-rencana-3d.md).
 * Halaman ini terpisah agar mudah dihapus bila tidak jadi dipakai.
 */
export default function Prototype3D() {
  const [hoveredId, setHoveredId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 720px)')
    setIsMobile(media.matches)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) setAutoRotate(false)

    const timer = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(timer)
  }, [])

  const hovered = useMemo(
    () => promoProducts.find((product) => product.id === hoveredId) || null,
    [hoveredId],
  )

  const show = selected || hovered
  const off = show ? discountPercent(show) : 0

  return (
    <div className="three-page">
      <div className="three-page__canvas">
        <Suspense fallback={null}>
          <Scene
            products={promoProducts}
            hoveredId={hoveredId}
            selectedId={selected?.id}
            onHover={setHoveredId}
            onSelect={(product) => setSelected(product?.id === selected?.id ? null : product)}
            onClear={() => setSelected(null)}
            autoRotate={autoRotate}
            isMobile={isMobile}
          />
        </Suspense>
      </div>

      {/* ================= HUD ================= */}
      <div className="hud">
        <div className="hud__row">
          <div className="hud__brand glass">
            <Logo size={32} />
            <span className="brand__text">
              apotek<span>3D</span>
            </span>
            <span className="tag">PROTOTIPE 3D</span>
          </div>

          <Link className="hud__back glass" to="/promo">
            ← Kembali ke Promo 2D
          </Link>
        </div>

        <div className="hud__row" style={{ alignItems: 'flex-end' }}>
          <div className="hud__panel glass">
            <h3>Kontrol</h3>
            <div className="control-row">
              <kbd>DRAG</kbd>
              <span>Memutar rak 360°</span>
            </div>
            <div className="control-row">
              <kbd>SCROLL</kbd>
              <span>Zoom lebih dekat / jauh</span>
            </div>
            <div className="control-row">
              <kbd>KLIK</kbd>
              <span>Ambil &amp; lihat detail produk</span>
            </div>
            <div className="control-row">
              <kbd>KLIK</kbd>
              <span>Area kosong — lepas pilihan</span>
            </div>

            <div className="hud__toggle">
              <button
                type="button"
                className={autoRotate ? 'is-on' : ''}
                onClick={() => setAutoRotate((v) => !v)}
              >
                Putar otomatis: {autoRotate ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {show ? (
            <div className="hud__card glass">
              <span className="chip chip--category">{show.category}</span>
              <h4>{show.name}</h4>
              <p>{show.desc}</p>
              <div className="price">
                <strong>{formatRupiah(show.price)}</strong>
                <s>{formatRupiah(show.originalPrice)}</s>
                <span className="chip" style={{ background: 'rgba(244,81,30,.18)', color: '#ffb59a' }}>
                  -{off}%
                </span>
              </div>
              <a
                className="btn btn--brand btn--block"
                href={waLink(site.whatsapp, orderMessage(show))}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={18} /> Pesan via WhatsApp
              </a>
            </div>
          ) : (
            <div className="hud__card glass">
              <h4 style={{ marginTop: 0 }}>Rak Promo 3D</h4>
              <p>
                Arahkan kursor ke produk untuk melihat detailnya, atau klik untuk
                mengunci produk terpilih.
              </p>
              <span className="hud__hint">8 produk promo · Three.js / WebGL</span>
            </div>
          )}
        </div>
      </div>

      {/* ================= LOADER ================= */}
      <div className={`three-loader ${ready ? 'is-done' : ''}`}>
        <div className="three-loader__inner">
          <span className="hud__hint" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            apotek3D
          </span>
          <div className="three-loader__bar">
            <i />
          </div>
          <p className="hud__hint" style={{ marginTop: 12 }}>
            Menyiapkan rak obat 3D…
          </p>
        </div>
      </div>
    </div>
  )
}