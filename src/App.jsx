import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Promo from './pages/Promo.jsx'
import Profile from './pages/Profile.jsx'
import Contact from './pages/Contact.jsx'

// Three.js hefty (+1 MB) — hanya dimuat saat prototipe 3D dibuka
const Prototype3D = lazy(() => import('./pages/Prototype3D.jsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Tautan ber-hash (mis. /kontak#lokasi) di-scroll ke elemennya
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function NotFound() {
  return (
    <section className="section container notfound">
      <span className="notfound__code">404</span>
      <h1>Halaman tidak ditemukan</h1>
      <p>Halaman yang kamu tuju sudah dipindah atau tidak pernah ada.</p>
      <a className="btn btn--brand" href="/">
        Kembali ke Beranda
      </a>
    </section>
  )
}

export default function App() {
  const { pathname } = useLocation()
  // Halaman 3D memakai layar penuh: tanpa navbar & footer
  const isFullscreen = pathname === '/prototipe-3d'

  return (
    <>
      <ScrollToTop />
      {!isFullscreen && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/kontak" element={<Contact />} />
          <Route
            path="/prototipe-3d"
            element={
              <Suspense
                fallback={
                  <div className="three-page">
                    <div className="three-loader">
                      <div className="three-loader__inner">
                        <div className="three-loader__bar">
                          <i />
                        </div>
                        <p className="hud__hint" style={{ marginTop: 12 }}>
                          Memuat mesin 3D…
                        </p>
                      </div>
                    </div>
                  </div>
                }
              >
                <Prototype3D />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </>
  )
}