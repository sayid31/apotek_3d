import ProductMesh from './ProductMesh.jsx'
import { RACK, colorFor, layoutProducts } from './config'

/**
 * Rak apotek 3D — versi "Opsi B": rak promo yang bisa diputar & diambil.
 * Rak dibuat dari geometry sederhana (bukan model eksternal) supaya ringan.
 */
export default function PharmacyRack({ products, hoveredId, selectedId, onHover, onSelect }) {
  const rows = layoutProducts(products)
  const totalHeight = (RACK.shelves - 1) * RACK.shelfGap

  return (
    <group position={[0, -totalHeight / 2, 0]}>
      {/* papan rak */}
      {Array.from({ length: RACK.shelves }).map((_, i) => (
        <group key={`shelf-${i}`} position={[0, i * RACK.shelfGap, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry
              args={[RACK.shelfWidth, RACK.shelfThickness, RACK.shelfDepth]}
            />
            <meshStandardMaterial color="#164034" roughness={0.5} metalness={0.28} />
          </mesh>

          {/* garis cahaya tepi rak */}
          <mesh position={[0, RACK.shelfThickness / 2 + 0.004, RACK.shelfDepth / 2]}>
            <boxGeometry args={[RACK.shelfWidth, 0.008, 0.008]} />
            <meshBasicMaterial color="#14b884" transparent opacity={0.85} />
          </mesh>
        </group>
      ))}

      {/* dinding belakang */}
      <mesh position={[0, totalHeight / 2, -RACK.shelfDepth / 2 - 0.06]} receiveShadow>
        <boxGeometry args={[RACK.shelfWidth + 0.5, totalHeight + 1.5, 0.08]} />
        <meshStandardMaterial color="#0f3229" roughness={0.75} metalness={0.12} />
      </mesh>

      {/* tiang samping */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * (RACK.shelfWidth / 2 + 0.16),
            totalHeight / 2,
            0,
          ]}
          castShadow
        >
          <boxGeometry args={[0.12, totalHeight + 1.5, RACK.shelfDepth + 0.16]} />
          <meshStandardMaterial color="#164034" roughness={0.45} metalness={0.38} />
        </mesh>
      ))}

      {/* produk di rak */}
      {rows.map((row, rowIndex) =>
        row.map(({ product, x, index }) => (
          <ProductMesh
            key={product.id}
            product={product}
            position={{ x, y: rowIndex * RACK.shelfGap + 0.28, z: 0.06 }}
            hovered={hoveredId === product.id}
            selected={selectedId === product.id}
            onHover={onHover}
            onSelect={onSelect}
            seed={rowIndex * 3 + index}
          />
        )),
      )}

      {/* alas panggung dengan cahaya */}
      <mesh position={[0, -0.68, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[RACK.shelfWidth + 1.4, 1.1]} />
        <meshBasicMaterial color={colorFor(rows[0]?.[0]?.product.category)} transparent opacity={0.1} />
      </mesh>
    </group>
  )
}