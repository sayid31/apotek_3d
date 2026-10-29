import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Preloader from '../components/Preloader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { SectionTitle, CtaBand } from '../components/Ui.jsx'
import {
  ArrowIcon,
  CalendarIcon,
  ChatIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
  WhatsAppIcon,
} from '../components/Icons.jsx'
import { promoPeriod, promoProducts } from '../data/products'
import { site } from '../data/site'
import { waLink } from '../lib/format'

// Toko 3D + Three.js (+700 KB) dimuat terpisah agar halaman lain tetap ringan
const StoreHero = lazy(() => import('../components/StoreHero.jsx'))

const serviceIcons = { chat: ChatIcon, truck: TruckIcon, shield: ShieldIcon, calendar: CalendarIcon }

// Halaman pembuka hanya sekali per sesi
const BRIEF_KEY = 'apotek3d-brief-seen'

/** Fallback sementara selagi mesin 3D dimuat (selalu ada isi halaman) */
function StaticHero({ isMobile }) {
  return (
    <section className="store-hero store-hero--static">
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
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [load3d, setLoad3d] = useState({ progress: 0, active: false })

  // nilai identik tidak memicu render ulang, agar tidak loop tak berujung
  const handleProgress = useCallback((progress, active) => {
    setLoad3d((prev) =>
      prev.progress === progress && prev.active === active ? prev : { progress, active },
    )
  }, [])

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 980px)').matches)

    const seen = sessionStorage.getItem(BRIEF_KEY)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!seen && !reduced) {
      setShowLoader(true)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // dipanggil sendiri oleh layar muat setelah proses loading selesai
  const enterSite = useCallback(() => {
    sessionStorage.setItem(BRIEF_KEY, '1')
    document.body.style.overflow = ''
    setShowLoader(false)
  }, [])

  const featured = promoProducts.slice(0, 4)

  return (
    <>
      {/* ============ LAYAR MUAT (masuk otomatis) ============ */}
      {showLoader && (
        <Preloader
          progress={load3d.progress}
          active={load3d.active}
          onEnter={enterSite}
        />
      )}

      {/* ============ HERO TOKO 3D ============ */}
      <Suspense fallback={<StaticHero isMobile={isMobile} />}>
        <StoreHero
          products={promoProducts}
          isMobile={isMobile}
          onProgress={handleProgress}
        />
      </Suspense>

      {/* ============ STATISTIK ============ */}
      <section className="stats">
        <div className="container stats__grid">
          {site.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>
                {stat.value}
                {stat.suffix && <em>{stat.suffix}</em>}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PROMO UNGGULAN ============ */}
      <section className="section container">
        <SectionTitle
          eyebrow="Promo Berjalan"
          title="Penawaran spesial bulan ini"
          subtitle={`Pilihan obat dan suplemen paling dicari, khusus dengan harga promo ${promoPeriod}.`}
        />

        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="section__more">
          <Link className="btn btn--soft" to="/promo">
            Lihat semua promo ({promoProducts.length})
          </Link>
        </div>
      </section>

      {/* ============ LAYANAN ============ */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle
            eyebrow="Layanan Kami"
            title="Bukan sekadar tempat beli obat"
            subtitle="Empat hal kecil yang selalu kami jaga, dan yang akhirnya membuat pelanggan kembali lagi."
          />

          <div className="service-grid">
            {site.services.map((service) => {
              const Icon = serviceIcons[service.icon] || ShieldIcon
              return (
                <article className="service-card lift-3d" key={service.title}>
                  <span className="service-card__icon">
                    <Icon size={26} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONI ============ */}
      <section className="section container">
        <SectionTitle
          eyebrow="Kata Pelanggan"
          title="Dipercaya ribuan keluarga"
          subtitle="Ulasan asli dari pelanggan yang rutin belanja di apotek3D."
        />

        <div className="testimonial-grid">
          {site.testimonials.map((item) => (
            <figure className="testimonial lift-3d" key={item.name}>
              <div className="testimonial__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <blockquote>“{item.text}”</blockquote>
              <figcaption>
                <span className="testimonial__avatar">{item.name.charAt(0)}</span>
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}