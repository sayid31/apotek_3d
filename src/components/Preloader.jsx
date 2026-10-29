import { useEffect, useRef, useState } from 'react'

import { Logo } from './Icons.jsx'

/**
 * Layar muat pembuka.
 *
 * Sederhana — hanya merek, persentase, dan satu baris pendek — tetapi
 * animasinya dibuat mewah (ring progres, kisi bergerak, sapuan cahaya).
 * Selesai memuat akan MASUK OTOMATIS ke website, tanpa perlu klik.
 */

const MIN_VISIBLE_MS = 1500 // tampilan minimum supaya animasinya kebaca
const HOLD_MS = 620 // jeda "100%" sebelum layar naik
const EXIT_MS = 750 // durasi animasi keluar
const FAILSAFE_MS = 9000 // jaring pengaman, jangan pernah menggantung
const CREEP_MS = 2600 // progres "merangkak" selagi chunk 3D diunduh

const RING_R = 76
const RING_CIRC = 2 * Math.PI * RING_R

export default function Preloader({ onEnter, progress = 0, active = false }) {
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState('load') // load | hold | leave

  const target = useRef(0)
  const shown = useRef(0)
  const startedAt = useRef(performance.now())

  // progres yang dituju: nilai nyata, dirangkak agar tak pernah membeku
  const real = Math.max(0, Math.min(100, Number(progress) || 0))
  const creep = Math.min(72, ((performance.now() - startedAt.current) / CREEP_MS) * 72)
  target.current = Math.max(real, real > 0 ? real : creep)

  // animasi angka yang halus (naik saja, tidak pernah mundur)
  useEffect(() => {
    let frame
    const tick = () => {
      const diff = target.current - shown.current
      shown.current = diff > 0 ? shown.current + Math.max(diff * 0.12, 0.35) : target.current
      if (shown.current > 100) shown.current = 100
      setPct(shown.current)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  // penentuan "selesai": progres penuh + tampilan minimum, atau failsafe
  useEffect(() => {
    if (phase !== 'load') return undefined

    const elapsed = performance.now() - startedAt.current
    const complete = (real >= 99.5 && !active) || elapsed >= FAILSAFE_MS

    if (complete && elapsed < MIN_VISIBLE_MS) {
      const wait = MIN_VISIBLE_MS - elapsed
      const timer = setTimeout(() => setPhase('hold'), wait)
      return () => clearTimeout(timer)
    }
    if (complete) setPhase('hold')
    return undefined
  }, [real, active, phase])

  // hold sebentar (angka 100%) lalu tutup layar
  useEffect(() => {
    if (phase !== 'hold') return undefined
    target.current = 100
    const timer = setTimeout(() => setPhase('leave'), HOLD_MS)
    return () => clearTimeout(timer)
  }, [phase])

  // animasi keluar selesai -> panggil onEnter (masuk ke website)
  useEffect(() => {
    if (phase !== 'leave') return undefined
    const timer = setTimeout(() => onEnter?.(), EXIT_MS)
    return () => clearTimeout(timer)
  }, [phase, onEnter])

  // pintasan: Enter / Esc langsung lewati
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape') setPhase('leave')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const value = Math.round(pct)

  return (
    <div className={`loader ${phase === 'leave' ? 'is-leave' : ''}`}>
      <div className="loader__top">
        <span className="loader__brand">
          <Logo size={20} /> apotek3D
        </span>
        <span>TOKO APOTEK 3D</span>
      </div>

      <div className="loader__center">
        <div className="loader__ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle className="loader__ring-base" cx="100" cy="100" r={RING_R} />
            <circle className="loader__ring-dash" cx="100" cy="100" r={RING_R + 14} />
            <circle
              className="loader__ring-arc"
              cx="100"
              cy="100"
              r={RING_R}
              strokeDasharray={RING_CIRC}
              strokeDashoffset={RING_CIRC * (1 - Math.min(pct, 100) / 100)}
            />
          </svg>
          <span className="loader__core">
            <Logo size={34} />
          </span>
        </div>

        <strong className="loader__pct">
          {value}
          <em>%</em>
        </strong>

        <span className="loader__hint">
          {value >= 100 ? 'toko siap dibuka' : 'menyiapkan toko 3D'}
        </span>
      </div>

      <div className="loader__foot">
        <div className="loader__bar">
          <i style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      </div>
    </div>
  )
}
