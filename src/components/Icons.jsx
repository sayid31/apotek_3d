// Kumpulan ikon SVG inline (gaya outline) + logo apotek3D.
// Sengaja dibuat inline agar website tetap jalan tanpa internet.

function Icon({ size = 24, className = '', children }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cube-top" x1="24" y1="4" x2="44" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3ddfae" />
          <stop offset="1" stopColor="#12b981" />
        </linearGradient>
        <linearGradient id="cube-left" x1="4" y1="15" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f9d76" />
          <stop offset="1" stopColor="#0a7a5b" />
        </linearGradient>
        <linearGradient id="cube-right" x1="44" y1="15" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b8463" />
          <stop offset="1" stopColor="#066048" />
        </linearGradient>
      </defs>
      <path d="M24 4 44 15 24 26 4 15Z" fill="url(#cube-top)" />
      <path d="M4 15 24 26v18L4 33Z" fill="url(#cube-left)" />
      <path d="M44 15 24 26v18l20-11Z" fill="url(#cube-right)" />
      <circle cx="37" cy="37" r="9.5" fill="#ffffff" stroke="#dcefe6" strokeWidth="1.2" />
      <path d="M37 32.5v9M32.5 37h9" stroke="#0f9d76" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- produk ---------- */

export const PillIcon = (p) => (
  <Icon {...p}>
    <rect x="2.6" y="8.6" width="18.8" height="6.8" rx="3.4" transform="rotate(-45 12 12)" />
    <path d="M9.2 9.2l5.6 5.6" />
  </Icon>
)

export const BottleIcon = (p) => (
  <Icon {...p}>
    <path d="M9.5 2.5h5v2.6l1.7 2.3a3.6 3.6 0 0 1 .6 1.9v10.2a2 2 0 0 1-2 2H9.2a2 2 0 0 1-2-2V9.3c0-.7.2-1.4.6-1.9l1.7-2.3V2.5z" />
    <path d="M7.4 13.2h9.2" />
  </Icon>
)

export const JarIcon = (p) => (
  <Icon {...p}>
    <rect x="5" y="8.5" width="14" height="12.5" rx="3" />
    <path d="M6.6 5.5h10.8v3H6.6z" />
    <path d="M9.5 14.5h5" />
  </Icon>
)

export const BoxIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="7" width="18" height="13.5" rx="2.5" />
    <path d="M9 7V5.2A2.2 2.2 0 0 1 11.2 3h1.6A2.2 2.2 0 0 1 15 5.2V7" />
    <path d="M12 10.6v6M9 13.6h6" />
  </Icon>
)

export const DropIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3s6 6.4 6 10.8a6 6 0 1 1-12 0C6 9.4 12 3 12 3z" />
    <path d="M9.4 14.6a2.6 2.6 0 0 0 2.6 2.6" />
  </Icon>
)

export const TubeIcon = (p) => (
  <Icon {...p}>
    <path d="M8.5 8.5h7v11a1.8 1.8 0 0 1-1.8 1.8h-3.4A1.8 1.8 0 0 1 8.5 19.5v-11z" />
    <path d="M9.5 8.5v-3a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v3" />
    <path d="M8.5 13h7" />
  </Icon>
)

export const GaugeIcon = (p) => (
  <Icon {...p}>
    <path d="M3.5 17a9 9 0 1 1 17 0" />
    <path d="M12 12.5l4-3.2" />
    <circle cx="12" cy="14" r="1.6" />
  </Icon>
)

export const CanIcon = (p) => (
  <Icon {...p}>
    <rect x="6.5" y="3.5" width="11" height="17" rx="2.4" />
    <path d="M6.5 7.5h11M6.5 16.5h11" />
  </Icon>
)

export const productIcons = {
  pill: PillIcon,
  bottle: BottleIcon,
  jar: JarIcon,
  box: BoxIcon,
  drop: DropIcon,
  tube: TubeIcon,
  gauge: GaugeIcon,
  can: CanIcon,
}

/* ---------- UI & info ---------- */

export const ChatIcon = (p) => (
  <Icon {...p}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-4.7A8.4 8.4 0 1 1 20.5 11.6z" />
    <path d="M8.6 10.4c.3-.6.9-.9 1.6-.7l.9.2c.5.1.9.5 1.1 1l-.1.8c-.1.4-.3.7-.7.9-.3.2-.5.6-.4.9.4 1.2 1.4 2.2 2.6 2.6.3.1.7-.1.9-.4.2-.3.5-.6.9-.7.8-.1 1.3.3 1.5.8l.2.9c.2.6-.1 1.2-.7 1.5-.8.4-1.8.5-2.7.2-2.4-.7-4.4-2.7-5.1-5.1-.3-.9-.2-1.9.2-2.7z" />
  </Icon>
)

export const TruckIcon = (p) => (
  <Icon {...p}>
    <path d="M2.5 6.5h10.5v10H2.5z" />
    <path d="M13 9.5h3.8l2.7 3v4H13z" />
    <circle cx="7" cy="18.5" r="1.9" />
    <circle cx="17" cy="18.5" r="1.9" />
  </Icon>
)

export const ShieldIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3l7.5 3v5.2c0 4.6-3.2 8.7-7.5 10.3C7.7 19.9 4.5 15.8 4.5 11.2V6L12 3z" />
    <path d="M9 12.2l2.1 2.1 4-4.2" />
  </Icon>
)

export const CalendarIcon = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.6h17M8.5 3.5v3M15.5 3.5v3" />
  </Icon>
)

export const StarIcon = (p) => (
  <Icon {...p}>
    <path
      d="M12 3.6l2.6 5.2 5.8.8-4.2 4 1 5.8L12 16.7l-5.2 2.7 1-5.8-4.2-4 5.8-.8L12 3.6z"
      fill="currentColor"
      fillOpacity="0.15"
    />
  </Icon>
)

export const ClockIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </Icon>
)

export const PhoneIcon = (p) => (
  <Icon {...p}>
    <path d="M6.4 3.5h3l1.5 3.8-1.9 1.2a11 11 0 0 0 5.5 5.5l1.2-1.9 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2z" />
  </Icon>
)

export const MailIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3.8 7.2L12 12.6l8.2-5.4" />
  </Icon>
)

export const MapPinIcon = (p) => (
  <Icon {...p}>
    <path d="M19.5 10.3c0 5.6-7.5 11.2-7.5 11.2S4.5 15.9 4.5 10.3a7.5 7.5 0 1 1 15 0z" />
    <circle cx="12" cy="10.2" r="2.7" />
  </Icon>
)

export const WhatsAppIcon = (p) => (
  <Icon {...p}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-4.7A8.4 8.4 0 1 1 20.5 11.6z" />
    <path d="M8.9 8.4c.2-.4.7-.5 1-.3l.8.5c.3.2.4.6.3.9l-.2.6c-.1.3 0 .6.2.8.6.9 1.4 1.6 2.3 2.1.3.2.6.2.8 0l.5-.4c.3-.2.6-.2.9 0l1 .8c.3.3.3.7.1 1-.4.6-1.1 1-1.8.9-2.7-.3-5.5-3-6-5.8-.1-.7.2-1.4.8-1.8l.5-.3z" fill="currentColor" stroke="none" />
  </Icon>
)

export const SearchIcon = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M16.2 16.2L20.5 20.5" />
  </Icon>
)

export const TagIcon = (p) => (
  <Icon {...p}>
    <path d="M20.4 13.2l-7.2 7.2a1.9 1.9 0 0 1-2.7 0L3 12.9V3.5h9.4l8 8a1.9 1.9 0 0 1 0 1.7z" />
    <circle cx="7.6" cy="7.6" r="1.4" />
  </Icon>
)

export const UsersIcon = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M17 14.6a5.5 5.5 0 0 1 3.5 4.9" />
  </Icon>
)

export const ArrowIcon = (p) => (
  <Icon {...p}>
    <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
  </Icon>
)

export const MenuIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)

export const CloseIcon = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
)

export const HeartIcon = (p) => (
  <Icon {...p}>
    <path d="M20.4 6.6a5 5 0 0 0-7.1 0L12 7.9l-1.3-1.3a5 5 0 1 0-7.1 7.1L12 21.5l8.4-7.8a5 5 0 0 0 0-7.1z" />
    <path d="M3.8 12.7h3.6l1.3-2.2 1.9 4.4 1.4-2.7h1.6" />
  </Icon>
)

export const CheckIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M8.4 12.2l2.5 2.5 4.7-5" />
  </Icon>
)

export const QuoteIcon = (p) => (
  <Icon {...p}>
    <path d="M9.5 6.5C7 7.6 5.5 10 5.5 12.7c0 2.6 1.6 4.3 3.7 4.3 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.2-3-3.2h-.4c.3-1.5 1.4-2.9 3-3.7l-2.6-1.6z" fill="currentColor" stroke="none" />
    <path d="M18 6.5c-2.5 1.1-4 3.5-4 6.2 0 2.6 1.6 4.3 3.7 4.3 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.2-3-3.2h-.4c.3-1.5 1.4-2.9 3-3.7L18 6.5z" fill="currentColor" stroke="none" />
  </Icon>
)
