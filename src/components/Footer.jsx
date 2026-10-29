import { Link } from 'react-router-dom'

import { site } from '../data/site'
import { waLink } from '../lib/format'
import { ClockIcon, Logo, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand">
            <Logo size={38} />
            <span className="brand__text">
              apotek<span>3D</span>
            </span>
          </Link>
          <p>
            Apotek keluarga yang menemani warga Bali sejak {site.foundedYear}. Konsultasi
            dengan apoteker bersertifikat — bukan robot — dan obat kami antar sendiri ke
            rumah Anda.
          </p>
          <a
            className="btn btn--ghost-light"
            href={waLink(site.whatsapp, 'Halo apotek3D, saya mau konsultasi.')}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={18} /> Konsultasi Sekarang
          </a>
        </div>

        <div className="footer__col">
          <h4>Navigasi</h4>
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/promo">Promo</Link>
            </li>
            <li>
              <Link to="/profil">Profil Apotek</Link>
            </li>
            <li>
              <Link to="/kontak">Kontak & Lokasi</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Hubungi Kami</h4>
          <ul className="footer__contact">
            <li>
              <MapPinIcon size={17} />
              <span>{site.address}</span>
            </li>
            <li>
              <MapPinIcon size={17} />
              <span>
                Cabang lain: {site.branches.map((b) => b.name).join(' · ')} —{' '}
                <Link to="/kontak#lokasi">lihat di peta</Link>
              </span>
            </li>
            <li>
              <PhoneIcon size={17} />
              <a href={`tel:+${site.phoneRaw}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <MailIcon size={17} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Jam Buka</h4>
          <ul className="footer__hours">
            {site.hours.map((item) => (
              <li key={item.day} className={item.highlight ? 'is-highlight' : ''}>
                <ClockIcon size={16} />
                <span>
                  {item.day}
                  <strong>{item.time}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. Seluruh hak cipta dilindungi.
        </span>
        <span>{site.license}</span>
      </div>
    </footer>
  )
}
