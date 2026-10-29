import { useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBox, useTexture } from '@react-three/drei'

import ProductMesh from './ProductMesh.jsx'
import { Customer, Pharmacist } from './People.jsx'
import { RACK, colorFor, liftFor, stockedRows } from './config'
import { makeSignTexture } from './labelTexture'

/**
 * TOKO APOTEK — interior 3D.
 * Lantai bertekstur (Poly Haven CC0), dinding, plafon dengan panel neon,
 * 2 rak gondola yang terisi penuh, meja kasir, dan plakat brand.
 */

const ROOM = { width: 13, depth: 9, height: 3.4 }

/** Susunan isi rak: 3 tingkat × 6 unit, rapat seperti rak toko asli */
const SHELF = { rows: 3, gap: 0.74, perRow: 6, colGap: 0.7, scale: 0.9 }

/* ------------------------------------------------------------------ */
/*  Penghuni toko: apoteker di kasir + dua pembeli yang keluar-masuk   */
/* ------------------------------------------------------------------ */

const APOTEKER = {
  skin: '#e3ac84',
  hair: '#2b2118',
  shirt: '#ffffff',
  coat: '#f7fbfa',
  badge: true,
  pants: '#33404f',
  shoes: '#1b1b1f',
}

const PEMBELI_1 = {
  skin: '#d9a075',
  hair: '#1e1710',
  shirt: '#5b8fd6',
  pants: '#33415a',
  shoes: '#20242c',
}

const PEMBELI_2 = {
  skin: '#c08552',
  hair: '#2a1c14',
  shirt: '#c9954a',
  pants: '#4a4f5a',
  shoes: '#2a2a31',
}

/** Rute pembeli 1: masuk kanan → pilih obat di rak → antre di ujung kasir → keluar */
const PEMBELI_A = [
  { x: 4.5, z: 1.6, hold: 0.8 },
  { x: 2.4, z: 1.9 },
  { x: 1.3, z: 0.3 },
  { x: 1.5, z: -1.9, hold: 3.4, face: Math.PI },
  { x: 1.2, z: 0.5 },
  { x: 1.62, z: 0.0, hold: 5, face: 1.96 },
  { x: 4.6, z: 2.2 },
]

/** Rute pembeli 2: masuk kiri → lihat rak kiri → berdiri menengok → keluar */
const PEMBELI_B = [
  { x: -3.4, z: 1.8, hold: 0.5 },
  { x: -2.2, z: -0.4 },
  { x: -1.9, z: -1.9, hold: 4.2, face: Math.PI },
  { x: -1.3, z: -1.0 },
  { x: -0.8, z: 0.3, hold: 2.4, face: -0.4 },
  { x: -3.6, z: 2.4 },
]

function Floor() {
  const [diffuse, arm] = useTexture([
    '/textures/tile_diffuse.jpg',
    '/textures/tile_arm.jpg',
  ])

  const map = useMemo(() => {
    const t = diffuse.clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(6, 4)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [diffuse])

  const armMap = useMemo(() => {
    const t = arm.clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(6, 4)
    return t
  }, [arm])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[ROOM.width * 2, ROOM.depth * 2]} />
      <meshStandardMaterial
        map={map}
        roughnessMap={armMap}
        metalnessMap={armMap}
        roughness={0.62}
        metalness={0.05}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}

function Walls() {
  const w = ROOM.width
  const d = ROOM.depth
  const h = ROOM.height

  return (
    <group>
      {/* dinding belakang */}
      <mesh position={[0, h / 2, -d / 2]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#eaf1ef" roughness={0.94} />
      </mesh>

      {/* dinding kiri & kanan */}
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color="#e3ebe9" roughness={0.94} />
      </mesh>
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color="#e3ebe9" roughness={0.94} />
      </mesh>

      {/* dinding depan (menghadap jalan) */}
      <mesh position={[0, h / 2, d / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#eaf1ef" roughness={0.94} />
      </mesh>

      {/* skirting dinding */}
      <mesh position={[0, 0.07, -d / 2 + 0.02]}>
        <boxGeometry args={[w, 0.14, 0.04]} />
        <meshStandardMaterial color="#0b8463" roughness={0.5} />
      </mesh>

      {/* plafon */}
      <mesh position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#f2f6f5" roughness={1} />
      </mesh>

      {/* panel neon di plafon */}
      {[-4, -1.4, 1.2, 3.8].map((x) =>
        [-2.2, 1.6].map((z) => (
          <group key={`${x}-${z}`} position={[x, h - 0.04, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.5, 0.42]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#e8fff6"
                emissiveIntensity={1.5}
                toneMapped={false}
              />
            </mesh>
            <pointLight
              position={[0, -0.35, 0]}
              intensity={4.5}
              distance={6.5}
              decay={2}
              color="#f2fffb"
            />
          </group>
        )),
      )}
    </group>
  )
}

/** Rak gondola: tiap tingkat diisi penuh, tiang besi, strip LED tepi */
function Gondola({
  position,
  rotation = 0,
  products = [],
  onHover,
  onSelect,
  hoveredKey,
  selectedKey,
}) {
  const rows = stockedRows(products, {
    rows: SHELF.rows,
    perRow: SHELF.perRow,
    gap: SHELF.colGap,
  })

  const topY = (rows.length - 1) * SHELF.gap
  const seed = products.length

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* papan rak tiap tingkat */}
      {rows.map((_, i) => (
        <group key={`board-${i}`} position={[0, i * SHELF.gap, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[RACK.shelfWidth, 0.055, RACK.shelfDepth]} />
            <meshStandardMaterial color="#f2f6f5" roughness={0.45} metalness={0.1} />
          </mesh>
          {/* strip LED tepi rak */}
          <mesh position={[0, -0.035, RACK.shelfDepth / 2 - 0.02]}>
            <boxGeometry args={[RACK.shelfWidth - 0.1, 0.012, 0.012]} />
            <meshBasicMaterial color="#9df0d5" toneMapped={false} />
          </mesh>

          {/* rail label harga — penanda rak apotek */}
          <mesh position={[0, -0.052, RACK.shelfDepth / 2 + 0.006]} receiveShadow>
            <boxGeometry args={[RACK.shelfWidth, 0.05, 0.02]} />
            <meshStandardMaterial color="#0f9d76" roughness={0.42} metalness={0.15} />
          </mesh>
          <mesh position={[0, -0.052, RACK.shelfDepth / 2 + 0.017]}>
            <boxGeometry args={[RACK.shelfWidth - 0.14, 0.03, 0.004]} />
            <meshStandardMaterial color="#f7faf9" roughness={0.55} />
          </mesh>
        </group>
      ))}

      {/* papan bawah rak (dekat lantai) */}
      <mesh position={[0, -0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[RACK.shelfWidth, 0.06, RACK.shelfDepth]} />
        <meshStandardMaterial color="#f2f6f5" roughness={0.5} />
      </mesh>

      {/* panel belakang rak — menutup seluruh tingkat, agak gelap
          supaya kemasan putih di depannya menonjol */}
      <mesh position={[0, topY / 2 - 0.08, -RACK.shelfDepth / 2 - 0.02]} receiveShadow>
        <boxGeometry args={[RACK.shelfWidth, topY + 0.6, 0.03]} />
        <meshStandardMaterial color="#9db5ae" roughness={0.88} />
      </mesh>

      {/* tiang samping */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (RACK.shelfWidth / 2 + 0.03), topY / 2 - 0.22, 0]}
          castShadow
        >
          <boxGeometry args={[0.06, topY + 1.05, RACK.shelfDepth + 0.04]} />
          <meshStandardMaterial color="#c3d2ce" roughness={0.35} metalness={0.75} />
        </mesh>
      ))}

      {/* isi rak */}
      {rows.map((row, rowIndex) =>
        row.map(({ product, x, index, instanceKey, jitterZ }) => {
          const lift = liftFor(product.icon)
          const boardY = rowIndex * SHELF.gap

          return (
            <ProductMesh
              key={instanceKey}
              product={product}
              instanceKey={instanceKey}
              position={{
                x,
                y: boardY + lift * SHELF.scale + 0.006,
                z: 0.02 + jitterZ,
              }}
              hovered={hoveredKey === instanceKey}
              selected={selectedKey === instanceKey}
              onHover={(productId) =>
                onHover(productId ? instanceKey : null, productId ? product : null)
              }
              onSelect={(picked) => onSelect(instanceKey, picked)}
              seed={seed + rowIndex * 6 + index}
              scale={SHELF.scale}
            />
          )
        }),
      )}
    </group>
  )
}

/** Meja kasir + monitor + barcode scanner */
function Counter() {
  const sign = useMemo(() => makeSignTexture(), [])

  return (
    <group position={[3.2, 0, 0.4]} rotation={[0, -0.5, 0]}>
      {/* badan meja */}
      <RoundedBox
        args={[2.6, 1.05, 0.8]}
        radius={0.04}
        smoothness={3}
        position={[0, 0.53, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#f7faf9" roughness={0.35} metalness={0.06} />
      </RoundedBox>

      {/* aksen hijau pada meja */}
      <mesh position={[0, 1.06, 0.02]}>
        <boxGeometry args={[2.62, 0.05, 0.84]} />
        <meshStandardMaterial color="#0f9d76" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* panel depan brand */}
      <mesh position={[0, 0.55, 0.41]}>
        <planeGeometry args={[1.9, 0.5]} />
        <meshStandardMaterial map={sign} roughness={0.6} />
      </mesh>

      {/* monitor kasir — dipindah ke ujung kiri agar tak menutupi apoteker */}
      <group position={[-1.08, 1.06, -0.05]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.3, 0.03, 0.24]} />
          <meshStandardMaterial color="#33403c" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.28, 0]} rotation={[-0.12, 0.2, 0]} castShadow>
          <boxGeometry args={[0.44, 0.32, 0.03]} />
          <meshStandardMaterial color="#1b2422" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.28, 0.02]} rotation={[-0.12, 0.2, 0]}>
          <planeGeometry args={[0.39, 0.27]} />
          <meshStandardMaterial
            color="#0e3b30"
            emissive="#0f9d76"
            emissiveIntensity={0.45}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* kotak pemindai barcode di meja kasir */}
      <RoundedBox
        args={[0.2, 0.14, 0.16]}
        radius={0.02}
        smoothness={2}
        position={[-0.2, 1.14, 0.14]}
        castShadow
      >
        <meshStandardMaterial color="#22302c" roughness={0.5} />
      </RoundedBox>
    </group>
  )
}

/** Tanaman dekoratif di sudut ruangan */
function CornerProps() {
  return (
    <group position={[-5.2, 0, -3.2]}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.17, 0.44, 20]} />
        <meshStandardMaterial color="#d9c7b4" roughness={0.85} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[Math.sin(i * 1.7) * 0.12, 0.55 + i * 0.13, Math.cos(i * 1.3) * 0.12]}
          rotation={[Math.sin(i) * 0.4, i, Math.cos(i) * 0.3]}
          castShadow
        >
          <planeGeometry args={[0.42, 0.16]} />
          <meshStandardMaterial
            color="#2f8f63"
            roughness={0.75}
            side={2}
            transparent
            alphaTest={0.35}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Store({
  products,
  hoveredKey,
  selectedKey,
  onHover,
  onSelect,
}) {
  const [left, right] = useMemo(
    () => [products.slice(0, 4), products.slice(4, 8)],
    [products],
  )

  const accent = colorFor(products[0]?.category)

  return (
    <group>
      <Floor />
      <Walls />

      {/* plakat brand di dinding belakang */}
      <mesh position={[0, 2.35, -ROOM.depth / 2 + 0.03]}>
        <planeGeometry args={[3.4, 0.85]} />
        <meshStandardMaterial map={useMemo(() => makeSignTexture(), [])} roughness={0.55} />
      </mesh>

      {/* rak kiri & kanan */}
      <Gondola
        position={[-2.6, 0, -2.9]}
        products={left}
        hoveredKey={hoveredKey}
        selectedKey={selectedKey}
        onHover={onHover}
        onSelect={onSelect}
      />
      <Gondola
        position={[1.9, 0, -2.9]}
        products={right}
        hoveredKey={hoveredKey}
        selectedKey={selectedKey}
        onHover={onHover}
        onSelect={onSelect}
      />

      {/* sorot lembut dari arah rak */}
      <pointLight position={[-2.6, 2.1, -2.2]} intensity={3.5} distance={6} color={accent} />
      <pointLight position={[1.9, 2.1, -2.2]} intensity={3.5} distance={6} color="#cfe9ff" />

      <Counter />

      {/* ---- orang di dalam toko ---- */}
      <Pharmacist position={[2.76, 0, -0.47]} rotation={-0.5} phase={0} palette={APOTEKER} />

      <Customer path={PEMBELI_A} speed={0.8} phase={0} palette={PEMBELI_1} />
      <Customer path={PEMBELI_B} speed={0.72} phase={6} palette={PEMBELI_2} />

      <CornerProps />
    </group>
  )
}
