import { Link } from 'react-router-dom'

import { site } from '../data/site'
import { waLink } from '../lib/format'
import { ArrowIcon } from './Icons.jsx'

export function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="page-hero__orb page-hero__orb--one" />
      <div className="page-hero__orb page-hero__orb--two" />
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="section container">
      <div className="cta-band">
        <div className="cta-band__text">
          <h2>Kalau malam-malam ada yang sakit di rumah?</h2>
          <p>
            Chat daftar belanjaannya ke WhatsApp — kami siapkan, dan kalau toko sudah tutup
            pun tetap kami antar. Anda tidak perlu menunggu pagi dengan cemas.
          </p>
        </div>
        <div className="cta-band__actions">
          <a
            className="btn btn--white"
            href={waLink(site.whatsapp, 'Halo apotek3D, saya mau pesan obat.')}
            target="_blank"
            rel="noreferrer"
          >
            <ArrowIcon size={18} /> Pesan via WhatsApp
          </a>
          <Link className="btn btn--outline-white" to="/kontak">
            Lihat Lokasi
          </Link>
        </div>
      </div>
    </section>
  )
}
