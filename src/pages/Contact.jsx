import { useState } from 'react'

import { PageHero, SectionTitle, CtaBand } from '../components/Ui.jsx'
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '../components/Icons.jsx'
import { site } from '../data/site'
import { waLink } from '../lib/format'

const faqs = [
  {
    q: 'Apakah bisa beli obat tanpa resep dokter?',
    a: 'Obat bebas (OB) dan obat terbatas (OTC) bisa langsung dibeli. Untuk obat keras (K) kami minta salinan resep dokter — ini bukan peraturan yang bisa kami kesampingkan, demi keselamatan Anda juga.',
  },
  {
    q: 'Berapa lama pesanan diantar?',
    a: 'Untuk area Denpasar dan sekitarnya rata-rata 30 menit sejak pesanan dikonfirmasi. Lewat malam, layanan antar tetap jalan lewat WhatsApp dengan sedikit tambahan biaya kurir.',
  },
  {
    q: 'Metode pembayaran apa yang diterima?',
    a: 'Tunai, kartu debit, QRIS, transfer bank, dan dompet digital (GoPay, OVO, DANA, ShopeePay). Untuk pesanan antar, boleh bayar saat barang diterima atau transfer di muka — sesuai kenyamanan Anda.',
  },
  {
    q: 'Apakah menerima resep dokter dari rumah sakit?',
    a: 'Bisa. Kirim fotonya lewat WhatsApp, lalu apoteker kami mengecek ketersediaan obatnya dan mengabari estimasi waktu penyiapan. Kalau ada obat yang tidak tersedia, kami bantu carikan alternatifnya.',
  },
]

const waNumber = site.whatsapp

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', topic: 'Konsultasi obat', message: '' })
  const [notice, setNotice] = useState('')
  const [activeId, setActiveId] = useState(site.branches[0].id)

  const active = site.branches.find((b) => b.id === activeId) || site.branches[0]

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.message.trim()) {
      setNotice('Mohon isi nama dan kebutuhan Anda terlebih dahulu.')
      return
    }

    const text = [
      'Halo apotek3D, saya mau bertanya.',
      '',
      `Nama: ${form.name}`,
      `No. HP: ${form.phone || '-'}`,
      `Topik: ${form.topic}`,
      `Pesan: ${form.message}`,
    ].join('\n')

    window.open(waLink(waNumber, text), '_blank', 'noopener,noreferrer')
    setNotice('Terima kasih! WhatsApp Anda akan terbuka dengan pesan yang sudah kami siapkan.')
  }

  return (
    <>
      <PageHero
        eyebrow="Kontak & Lokasi"
        title="Empat cabang, satu nomor yang diangkat"
        subtitle="Kalau ada yang mau ditanyakan — soal obat, resep, atau sekadar ragu memilih — chat saja. Yang menjawab apoteker kami, bukan robot."
      />

      {/* ============ KONTAK UTAMA ============ */}
      <section className="section container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-card__icon">
                <MapPinIcon size={22} />
              </div>
              <div>
                <h3>Cabang Denpasar (Pusat)</h3>
                <p>{site.address}</p>
                <p>
                  <a href="#lokasi">Lihat semua cabang di peta ↓</a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <PhoneIcon size={22} />
              </div>
              <div>
                <h3>Telepon & WhatsApp</h3>
                <p>
                  <a href={`tel:${site.phoneRaw}`}>{site.phoneDisplay}</a>
                </p>
                <p>Satu nomor untuk semua cabang — yang angkat tetap apoteker kami.</p>
              </div>
            </div>

            <div className="contact-card contact-card--hours">
              <div className="contact-card__icon">
                <ClockIcon size={22} />
              </div>
              <div>
                <h3>Jam Buka</h3>
                <ul>
                  {active.hours.map((row) => (
                    <li key={row.day} className={row.highlight ? 'is-highlight' : ''}>
                      <span>{row.day}</span>
                      <strong>{row.time}</strong>
                    </li>
                  ))}
                </ul>
                <p>
                  <em>
                    Di luar jam buka, WhatsApp kami tetap hidup — obat darurat tetap kami
                    antar.
                  </em>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <MailIcon size={22} />
              </div>
              <div>
                <h3>Email & Instagram</h3>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <p>
                  <a
                    href={`https://instagram.com/${site.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {site.instagram}
                  </a>{' '}
                  — kabar promo dan tips kesehatan mingguan.
                </p>
              </div>
            </div>
          </div>

          {/* ---- Formulir ---- */}
          <div className="contact-form">
            <h2>Kirim Pesan</h2>
            <p>
              Isi formulir di bawah, atau langsung saja chat WhatsApp — biasanya lebih cepat
              dijawab.
            </p>

            {notice && <p className="form-notice">{notice}</p>}

            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <label className="field">
                  <span>Nama</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Nama Anda"
                  />
                </label>
                <label className="field">
                  <span>No. HP</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="08xx xxxx xxxx"
                  />
                </label>
              </div>

              <label className="field">
                <span>Topik</span>
                <select value={form.topic} onChange={update('topic')}>
                  <option>Konsultasi obat</option>
                  <option>Tanya promo</option>
                  <option>Pesanan antar</option>
                  <option>Lainnya</option>
                </select>
              </label>

              <label className="field">
                <span>Pesan</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Ceritakan kebutuhan Anda…"
                />
              </label>

              <button className="btn btn--brand" type="submit">
                <WhatsAppIcon size={18} /> Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ LOKASI & CABANG ============ */}
      <section className="section section--tint" id="lokasi">
        <div className="container">
          <SectionTitle
            eyebrow="Lokasi Kami"
            title="Mampir ke cabang terdekat dari rumah Anda"
            subtitle="Empat cabang di Bali, semuanya terhubung ke satu sistem stok. Kalau obat yang Anda cari tidak ada di satu cabang, kami bisa ambilkan dari cabang lain."
          />

          <div className="branch-tabs" role="tablist" aria-label="Pilih cabang">
            {site.branches.map((b) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={b.id === activeId}
                className={b.id === activeId ? 'branch-tab is-active' : 'branch-tab'}
                onClick={() => setActiveId(b.id)}
              >
                <strong>{b.name}</strong>
                <span>{b.label}</span>
              </button>
            ))}
          </div>

          <div className="branch-detail">
            <div className="branch-detail__info">
              <h3>{active.name}</h3>
              <p className="branch-detail__address">{active.address}</p>
              <p className="branch-detail__landmark">{active.landmark}</p>
              <p className="branch-detail__note">{active.note}</p>

              <div className="contact-card--hours">
                <ul>
                  {active.hours.map((row) => (
                    <li key={row.day} className={row.highlight ? 'is-highlight' : ''}>
                      <span>{row.day}</span>
                      <strong>{row.time}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="branch-detail__actions">
                <a
                  className="btn btn--brand"
                  href={waLink(waNumber, `Halo apotek3D, saya mau tanya soal cabang ${active.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={18} /> Chat Cabang {active.name}
                </a>
                <a
                  className="btn btn--soft"
                  href={active.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka di Google Maps →
                </a>
              </div>
            </div>

            <div className="map-frame branch-detail__map">
              <iframe
                key={active.id}
                title={`Peta cabang apotek3D ${active.name}`}
                src={active.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section container">
        <SectionTitle
          eyebrow="Tanya Jawab"
          title="Pertanyaan yang sering kami terima"
          subtitle="Kalau belum terjawab di sini, chat saja — tidak ada pertanyaan yang dianggap sepele."
        />
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.q} className="faq__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
