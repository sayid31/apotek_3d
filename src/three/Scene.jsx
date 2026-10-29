import { Canvas } from '@react-three/fiber'
import { MeshReflectorMaterial, OrbitControls } from '@react-three/drei'

import Dust from './Dust.jsx'
import Lights from './Lights.jsx'
import PharmacyRack from './PharmacyRack.jsx'
import { SCENE } from './config'

/**
 * Scene 3D "Rak Promo" — padanan Opsi B pada docs/10-rencana-3d.md.
 * Semua geometry prosedural, tanpa aset eksternal (aman offline).
 */
export default function Scene({
  products,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
  onClear,
  autoRotate,
  isMobile,
}) {
  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={
        isMobile
          ? { position: [0, 0.7, 8.4], fov: 58 }
          : { position: [0, 0.9, 5.6], fov: 42 }
      }
      onPointerMissed={onClear}
    >
      <color attach="background" args={[SCENE.background]} />
      <fog attach="fog" args={[SCENE.background, SCENE.fogNear, SCENE.fogFar]} />

      <Lights />
      <Dust count={isMobile ? 60 : 140} />

      <PharmacyRack
        products={products}
        hoveredId={hoveredId}
        selectedId={selectedId}
        onHover={onHover}
        onSelect={onSelect}
      />

      {/* lantai reflektif */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          resolution={isMobile ? 256 : 512}
          blur={[300, 90]}
          mixBlur={1}
          mixStrength={38}
          roughness={0.85}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.35}
          color={SCENE.background}
          metalness={0.55}
          mirror={0.35}
        />
      </mesh>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={isMobile ? 5.5 : 3.4}
        maxDistance={isMobile ? 12 : 8.5}
        minPolarAngle={Math.PI / 3.1}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}