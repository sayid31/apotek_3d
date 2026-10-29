import { PageHero, CtaBand } from '../components/Ui.jsx'
import {
  ChatIcon,
  CheckIcon,
  HeartIcon,
  MapPinIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
  UsersIcon,
} from '../components/Icons.jsx'
import { site } from '../data/site'

const valueIcons = { shield: ShieldIcon, chat: ChatIcon, truck: TruckIcon, star: StarIcon }

const facts = [
  { icon: ShieldIcon, value: site.license, label: 'Berizin resmi' },
  { icon: UsersIcon, value: '4 Apoteker', label: 'Siap mendengarkan Anda' },
  { icon: StarIcon, value: '2.500+', label: 'Produk tersedia' },
  {
    icon: MapPinIcon,
    value: `${site.branches.length} Cabang`,
    label: site.branches.map((b) => b.name).join(' · '),
  },
]

export default function Profile() {
  return (
    <>
      <PageHero
        eyebrow="Profil Apotek"
        title="Menemani keluarga Bali sejak 2011"
        subtitle="Berawal dari satu etalase kecil di Teuku Umar, Denpasar — kini ada empat cabang, dengan prinsip yang tidak pernah berubah: orangnya dulu, obatnya kemudian."
      />

      {/* ============ CERITA ============ */}
      <section className="section container">
        <div className="story">
          <div className="story__text">
            <span className="eyebrow">Cerita Kami</span>
            <h2>Dari etalase kecil, jadi tempat pulang warga sekitar</h2>
            <p>
              {site.name} berawal dari kegelisahan seorang apoteker muda pada {site.foundedYear}:
              tetangganya menempuh perjalanan jauh ke rumah sakit hanya untuk membeli obat
              demam. Ia membuka satu etalase kecil di Jl. Teuku Umar dengan 120 item obat dan
              satu kursi untuk duduk sambil bertanya.
            </p>
            <p>
              Hari ini kami bertumbuh menjadi empat cabang dan menampung lebih dari 2.500
              produk — lengkap dengan empat apoteker bersertifikat. Yang tidak berubah adalah
              kebiasaan lama kami: mendengarkan dulu keluhannya, menjelaskan dengan bahasa
              yang manusiawi, dan baru menyarankan obatnya. Kami percaya obat yang tepat
              dimulai dari penjelasan yang tepat, dan penjelasan dimulai dari kesediaan
              mendengar.
            </p>
            <ul className="check-list">
              <li>
                <CheckIcon size={18} /> Konsultasi gratis, tanpa minimum pembelian
              </li>
              <li>
                <CheckIcon size={18} /> Obat disimpan pada suhu terkontrol sesuai standar
              </li>
              <li>
                <CheckIcon size={18} /> Menerima resep dokter dan menyiapkannya di tempat
              </li>
            </ul>
          </div>

          <aside className="story__panel">
            <span className="story__quote">
              <HeartIcon size={26} />
            </span>
            <blockquote>
              “Obat harus sampai ke orang yang membutuhkannya — dengan harga yang tidak
              menyakiti, dan penjelasan yang membuat orang paham tubuhnya sendiri.”
            </blockquote>
            <div className="story__sign">
              <span className="story__avatar">A</span>
              <span>
                <strong>apt. Andini Rahmawati, S.Farm.</strong>
                <em>Pendiri & Apoteker Penanggung Jawab</em>
              </span>
            </div>
          </aside>
        </div>

        <div className="facts-grid">
          {facts.map((fact) => {
            const Icon = fact.icon
            return (
              <div className="fact" key={fact.label}>
                <span className="fact__icon">
                  <Icon size={22} />
                </span>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============ VISI MISI ============ */}
      <section className="section section--tint">
        <div className="container vision">
          <article className="vision__card lift-3d">
            <span className="eyebrow">Visi</span>
            <h3>Menjadi apotek lingkungan paling dipercaya di Bali</h3>
            <p>
              Tempat di mana setiap keluarga merasa aman bertanya soal kesehatan — tanpa
              merasa dihakimi, tanpa ragu soal keaslian obat, dan tanpa takut ada biaya
              tersembunyi di belakangnya.
            </p>
          </article>

          <article className="vision__card vision__card--misi lift-3d">
            <span className="eyebrow">Misi</span>
            <ul>
              <li>Menjamin keaslian setiap produk yang kami simpan di rak.</li>
              <li>Menjelaskan obat dengan bahasa yang mudah dimengerti siapa pun.</li>
              <li>Menjaga harga tetap transparan — tidak ada yang disembunyikan.</li>
              <li>Mendatangi rumah Anda secepat mungkin, kapan pun dibutuhkan.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ============ NILAI ============ */}
      <section className="section container">
        <div className="section-title section-title--center">
          <span className="eyebrow">Nilai Kami</span>
          <h2>Empat prinsip yang tidak kami tawar</h2>
        </div>

        <div className="value-grid">
          {site.values.map((value, index) => {
            const Icon = valueIcons[value.icon] || ShieldIcon
            return (
              <div className="value-card lift-3d" key={value.title}>
                <span className="value-card__icon">
                  <Icon size={24} />
                </span>
                <span className="value-card__num">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============ CABANG ============ */}
      <section className="section section--tint">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="eyebrow">Cabang Kami</span>
            <h2>Empat cabang, satu cara melayani</h2>
            <p>
              Stok kami terhubung antar cabang — kalau obat yang Anda cari tidak ada di satu
              tempat, kami bisa ambilkan dari cabang lain hari itu juga.
            </p>
          </div>

          <div className="value-grid">
            {site.branches.map((branch) => (
              <div className="value-card lift-3d" key={branch.id}>
                <span className="value-card__icon">
                  <MapPinIcon size={24} />
                </span>
                <h3>
                  {branch.name} <em style={{ fontWeight: 400 }}>— {branch.label}</em>
                </h3>
                <p>{branch.address}</p>
                <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>{branch.landmark}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
