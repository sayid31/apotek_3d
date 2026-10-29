import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import {
  Environment,
  OrbitControls,
  AdaptiveDpr,
  Preload,
} from '@react-three/drei'
import {
  Bloom,
  EffectComposer,
  N8AO,
  SMAA,
  ToneMapping,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'

import Store from './Store.jsx'
import ProgressReporter from './ProgressReporter.jsx'

/**
 * Scene "Toko Apotek" — dipakai sebagai hero 3D di Beranda.
 * Sumber cahaya: HDRI Poly Haven (CC0) + panel neon di plafon.
 */
export default function StoreScene({
  products,
  hoveredKey,
  selectedKey,
  onHover,
  onSelect,
  onClear,
  autoRotate = true,
  isMobile = false,
  cameraPreset = 'interior',
  onProgress,
}) {
  const cams = {
    // interior: kamera persis seperti versi yang disetujui (v5)
    interior: { position: [0.2, 1.62, 5.4], target: [0, 1.15, -1.6], fov: 48 },
    aisle: { position: [-0.2, 1.5, 2.2], target: [0, 1.15, -1.6], fov: 62 },
    // showcase (HP): menyudut ke arah kasir, tempat apoteker & pembeli beraktivitas
    showcase: { position: [3.0, 1.55, 5.2], target: [1.4, 1.1, -1.4], fov: 50 },
  }
  const camera = cams[cameraPreset] || cams.interior

  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.4] : [1, 1.75]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={camera}
      onPointerMissed={onClear}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 0.85
        // three 0.186 menghapus PCFSoftShadowMap — tetapkan tipe yang masih ada
        gl.shadowMap.type = THREE.PCFShadowMap
      }}
    >
      <color attach="background" args={['#0d1a16']} />
      <fog attach="fog" args={['#0d1a16', 14, 34]} />

      {/* luar Suspense supaya progres terukur sejak aset mulai diunduh */}
      {onProgress && <ProgressReporter onProgress={onProgress} />}

      <Suspense fallback={null}>
        {/* HDRI gratis (Poly Haven, CC0) untuk pencahayaan + refleksi */}
        <Environment files="/hdri/studio_small_08_1k.hdr" background={false} />

        <ambientLight intensity={0.22} color="#dff4ec" />

        {/* cahaya matahari lembut dari jendela depan */}
        <directionalLight
          position={[6, 9, 7]}
          intensity={0.95}
          color="#fff8ee"
          castShadow
          shadow-mapSize={isMobile ? 1024 : 2048}
          shadow-camera-near={1}
          shadow-camera-far={40}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.0006}
        />

        <Store
          products={products}
          hoveredKey={hoveredKey}
          selectedKey={selectedKey}
          onHover={onHover}
          onSelect={onSelect}
        />

        {/* ---------- efek sinematik ---------- */}
        <EffectComposer multisampling={0} enableNormalPass>
          <N8AO aoRadius={0.9} intensity={2.2} distanceFalloff={0.6} />
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.93}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
          <ToneMapping mode={ToneMappingMode.AGX} />
          <Vignette eskil={false} offset={0.22} darkness={0.62} />
          <SMAA />
        </EffectComposer>

        <Preload all />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        target={camera.target || [0, 1.15, -1.6]}
        minDistance={1.6}
        maxDistance={8}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 2.04}
        // batasi arah horizontal: kamera tetap di depan toko, tak menyusuri sisi
        minAzimuthAngle={-0.6}
        maxAzimuthAngle={0.6}
        autoRotate={autoRotate}
        autoRotateSpeed={0.1}
      />

      <AdaptiveDpr pixelated />
    </Canvas>
  )
}