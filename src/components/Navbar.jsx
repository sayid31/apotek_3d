import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { site } from '../data/site'
import { waLink } from '../lib/format'
import { CloseIcon, Logo, MenuIcon } from './Icons.jsx'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/promo', label: 'Promo' },
  { to: '/profil', label: 'Profil' },
  { to: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="brand">
          <Logo size={36} />
          <span className="brand__text">
            apotek<span>3D</span>
          </span>
        </Link>

        <nav className={`navbar__menu ${open ? 'is-open' : ''}`} aria-label="Menu utama">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="btn btn--brand navbar__wa"
            href={waLink(site.whatsapp, 'Halo apotek3D, saya mau tanya-tanya soal obat.')}
            target="_blank"
            rel="noreferrer"
          >
            Chat Kami
          </a>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
