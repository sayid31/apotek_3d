import { SCENE } from './config'

/**
 * Pencahayaan sinematik ala studio:
 * - ambient redup supaya produk terlihat "timbul"
 * - key light dari atas-depan
 * - rim light hijau dari belakang (menandai siluet)
 * - fill light hangat dari samping
 */
export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.45} color="#12513f" />

      {/* key light */}
      <directionalLight
        position={[4.5, 7, 5]}
        intensity={2.1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
      />

      {/* rim light hijau dari belakang */}
      <pointLight position={[-4, 1.4, -3.2]} intensity={26} distance={14} color={SCENE.accent} />
      <pointLight position={[4.2, -0.4, -2.6]} intensity={16} distance={12} color={SCENE.accentLight} />

      {/* fill light hangat */}
      <spotLight
        position={[0, 5.5, 3.5]}
        angle={0.6}
        penumbra={0.9}
        intensity={22}
        distance={16}
        color={SCENE.gold}
      />

      {/* pencahayaan dasar produk agar tidak gelap */}
      <hemisphereLight args={['#a9f0da', '#061a14', 0.75]} />
    </>
  )
}