import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

import { colorFor, liftFor } from './config'
import { makeLabelTexture } from './labelTexture'

/**
 * Bentuk kemasan 3D. Setiap bentuk memakai TEKSTUR LABEL yang dicetak di canvas
 * (merek + nama produk + harga + barcode), sehingga terlihat seperti kemasan
 * farmasi sungguhan — bukan silinder/kotak plastik warna polos.
 */
function Shape({ product, color, hovered }) {
  const label = useMemo(() => makeLabelTexture(product), [product])

  // kemasan diberi rona warna kategori supaya tidak menyatu dengan dinding putih
  const tint = useMemo(
    () => new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.74),
    [color],
  )

  const materialProps = (overrides = {}) => ({
    map: label,
    color: tint,
    emissive: color,
    emissiveIntensity: hovered ? 0.32 : 0.05,
    roughness: 0.42,
    metalness: 0.08,
    ...overrides,
  })

  switch (product.icon) {
    case 'pill':
      return (
        <group rotation={[0, 0, Math.PI / 5]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.15, 0.26, 6, 16]} />
            <meshStandardMaterial {...materialProps({ roughness: 0.5 })} />
          </mesh>
          <mesh position={[0, 0, 0.13]} rotation={[0, 0, Math.PI / 5]}>
            <planeGeometry args={[0.2, 0.3]} />
            <meshStandardMaterial {...materialProps({ transparent: true, side: 2 })} />
          </mesh>
        </group>
      )

    case 'bottle':
      return (
        <group>
          <mesh castShadow position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.15, 0.16, 0.34, 28]} />
            <meshStandardMaterial {...materialProps({ roughness: 0.3 })} />
          </mesh>
          <mesh castShadow position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.07, 0.09, 0.12, 18]} />
            <meshStandardMaterial color="#f2f6f5" roughness={0.35} />
          </mesh>
          <mesh castShadow position={[0, 0.23, 0]}>
            <cylinderGeometry args={[0.082, 0.082, 0.06, 18]} />
            <meshStandardMaterial color="#0a6a51" roughness={0.35} metalness={0.35} />
          </mesh>
        </group>
      )

    case 'jar':
      return (
        <group>
          <mesh castShadow position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.26, 30]} />
            <meshStandardMaterial {...materialProps({ roughness: 0.3 })} />
          </mesh>
          <mesh castShadow position={[0, 0.11, 0]}>
            <cylinderGeometry args={[0.19, 0.19, 0.07, 30]} />
            <meshStandardMaterial color="#0b8463" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      )

    case 'box':
      return (
        <RoundedBox args={[0.34, 0.34, 0.16]} radius={0.012} smoothness={3} castShadow>
          <meshStandardMaterial {...materialProps({ roughness: 0.62 })} />
        </RoundedBox>
      )

    case 'drop':
      return (
        <group>
          <mesh castShadow scale={[1, 1.32, 1]} position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.16, 26, 26]} />
            <meshStandardMaterial {...materialProps({ roughness: 0.22 })} />
          </mesh>
          <mesh castShadow position={[0, 0.21, 0]}>
            <coneGeometry args={[0.07, 0.17, 18]} />
            <meshStandardMaterial {...materialProps({ roughness: 0.5 })} />
          </mesh>
        </group>
      )

    case 'tube':
      return (
        <group>
          <mesh castShadow position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.075, 0.15, 0.36, 22]} />
            <meshStandardMaterial {...materialProps({ roughness: 0.55 })} />
          </mesh>
          <mesh castShadow position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.055, 0.08, 0.1, 18]} />
            <meshStandardMaterial color="#f4511e" roughness={0.45} />
          </mesh>
        </group>
      )

    case 'gauge':
      return (
        <group>
          <RoundedBox args={[0.32, 0.34, 0.11]} radius={0.02} smoothness={3} castShadow>
            <meshStandardMaterial {...materialProps({ roughness: 0.45 })} />
          </RoundedBox>
          <mesh castShadow position={[0, 0.04, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.095, 0.095, 0.035, 26]} />
            <meshStandardMaterial color="#f7faf9" roughness={0.25} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.04, 0.089]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.03, 0.062, 20]} />
            <meshStandardMaterial color="#0f9d76" emissive="#0f9d76" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )

    case 'can':
    default:
      return (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.36, 28]} />
            <meshStandardMaterial {...materialProps({ metalness: 0.45, roughness: 0.28 })} />
          </mesh>
          <mesh castShadow position={[0, 0.185, 0]}>
            <cylinderGeometry args={[0.168, 0.168, 0.02, 28]} />
            <meshStandardMaterial color="#cfd6d4" roughness={0.25} metalness={0.85} />
          </mesh>
          <mesh position={[0, -0.185, 0]}>
            <cylinderGeometry args={[0.168, 0.168, 0.018, 28]} />
            <meshStandardMaterial color="#cfd6d4" roughness={0.25} metalness={0.85} />
          </mesh>
        </group>
      )
  }
}

export default function ProductMesh({
  product,
  position,
  hovered,
  selected,
  onHover,
  onSelect,
  seed = 0,
  scale = 1,
}) {
  const group = useRef()
  const color = colorFor(product.category)
  const lift = liftFor(product.icon)
  const active = hovered || selected

  const targetScale = useMemo(() => scale * (active ? 1.18 : 1), [active, scale])

  // posisi hadap statis: produk diam di rak, bukan berputar pelan (kesan mainan)
  const baseRotation = useMemo(() => ((((seed * 37) % 11) - 5) * 0.045), [seed])

  useFrame((state, delta) => {
    const mesh = group.current
    if (!mesh) return

    const next = mesh.scale.x + (targetScale - mesh.scale.x) * Math.min(delta * 9, 1)
    mesh.scale.setScalar(next)

    // kompensasi skala: dasar produk tetap menempel di papan walau membesar
    mesh.position.y = position.y + (next - scale) * lift

    // berputar hanya saat dipilih pengunjung
    mesh.rotation.y = selected ? mesh.rotation.y + delta * 0.9 : baseRotation
  })

  return (
    <group
      ref={group}
      position={[position.x, position.y, position.z]}
      scale={scale}
      onPointerOver={(event) => {
        event.stopPropagation()
        onHover(product.id)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        onHover(null)
      }}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(product)
      }}
    >
      <Shape product={product} color={color} hovered={active} />

      {/* cincin cahaya tepat di permukaan papan rak */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -lift, 0]}>
        <ringGeometry args={[0.17, active ? 0.3 : 0.23, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.5 : 0.14}
          side={2}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}