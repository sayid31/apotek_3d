import { orderMessage, discountPercent, formatRupiah, waLink } from '../lib/format'
import { site } from '../data/site'
import { productIcons, TagIcon, WhatsAppIcon } from './Icons.jsx'

export default function ProductCard({ product }) {
  const Icon = productIcons[product.icon] || productIcons.pill
  const off = discountPercent(product)

  return (
    <article className="product-card lift-3d">
      <div className={`product-card__media media--${product.icon}`}>
        <span className="product-card__badge">-{off}%</span>
        <Icon size={72} />
        <span className="product-card__until">s.d. {product.until}</span>
      </div>

      <div className="product-card__body">
        <span className="chip chip--category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-card__desc">{product.desc}</p>

        <div className="product-card__price">
          <strong>{formatRupiah(product.price)}</strong>
          <s>{formatRupiah(product.originalPrice)}</s>
          <span className="product-card__save">
            <TagIcon size={14} /> Hemat {formatRupiah(product.originalPrice - product.price)}
          </span>
        </div>

        <a
          className="btn btn--brand btn--block"
          href={waLink(site.whatsapp, orderMessage(product))}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon size={18} /> Pesan Promo Ini
        </a>
      </div>
    </article>
  )
}
