import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

/**
 * FIGUR MANUSIA 3D — dibangun prosedural dari primitif.
 *
 * Prinsip anti-"mainan":
 *  · proporsi manusia dewasa (tinggi ±1,7 m, kepala ±1/7 badan)
 *  · duduk/berdiri di lantai, bukan melayang (cakar kaki persis di y = 0)
 *  · berjalan dengan siklus kaki–tangan berlawanan + ayunan lutut + bob badan
 *  · diam bernapas & menoleh pelan, bukan patung kaku
 */

const TAU = Math.PI * 2

/** Kecepatan animasi orang. Mode pengembangan: buka `/?speed=12` untuk mempercepat
 *  gerakan saat menguji lewat browser headless (yang hanya ±1 fps).
 *  Di produksi selalu 1. */
const TS = (() => {
  if (!import.meta.env.DEV) return 1
  const v = Number(new URLSearchParams(window.location.search).get('speed'))
  return Number.isFinite(v) && v > 0 ? Math.min(v, 20) : 1
})()

const shortestAngle = (from, to) => {
  let d = (to - from) % TAU
  if (d > Math.PI) d -= TAU
  if (d < -Math.PI) d += TAU
  return d
}

const mix = (a, b, k) => a + (b - a) * k

function useRig() {
  return useMemo(
    () => ({
      body: { current: null },
      torso: { current: null },
      head: { current: null },
      armL: { current: null },
      armR: { current: null },
      foreL: { current: null },
      foreR: { current: null },
      thighL: { current: null },
      thighR: { current: null },
      shinL: { current: null },
      shinR: { current: null },
      handBox: { current: null },
    }),
    [],
  )
}

const setX = (node, value) => {
  if (node?.current) node.current.rotation.x = value
}

const setY = (node, value) => {
  if (node?.current) node.current.rotation.y = value
}

/* ------------------------------------------------------------------ */
/*  Badan                                                               */
/* ------------------------------------------------------------------ */

function Figure({ rig, palette, box = null }) {
  const { skin, hair, shirt, pants, shoes, coat = null, badge = false } = palette
  const top = coat || shirt

  return (
    <group ref={rig.body}>
      {/* leher */}
      <mesh position={[0, 1.46, 0]} castShadow>
        <cylinderGeometry args={[0.042, 0.048, 0.12, 10]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>

      {/* kepala + rambut + mata */}
      <group ref={rig.head} position={[0, 1.6, 0]}>
        <mesh scale={[0.95, 1.02, 0.98]} castShadow>
          <sphereGeometry args={[0.098, 20, 16]} />
          <meshStandardMaterial color={skin} roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.028, -0.036]} scale={[1.0, 0.97, 1.0]} castShadow>
          <sphereGeometry args={[0.098, 20, 16]} />
          <meshStandardMaterial color={hair} roughness={0.95} />
        </mesh>
        <mesh position={[-0.038, 0.012, 0.088]}>
          <sphereGeometry args={[0.013, 8, 8]} />
          <meshStandardMaterial color="#242a2e" roughness={0.35} />
        </mesh>
        <mesh position={[0.038, 0.012, 0.088]}>
          <sphereGeometry args={[0.013, 8, 8]} />
          <meshStandardMaterial color="#242a2e" roughness={0.35} />
        </mesh>
      </group>

      {/* badan atas (dada & perut) */}
      <group ref={rig.torso} position={[0, 1.17, 0]}>
        <RoundedBox args={[0.33, 0.52, 0.19]} radius={0.045} smoothness={3} castShadow>
          <meshStandardMaterial color={top} roughness={0.72} />
        </RoundedBox>

        {coat && (
          /* kerah baju kerja apoteker */
          <mesh position={[0, 0.2, 0.088]} rotation={[0.28, 0, 0]}>
            <boxGeometry args={[0.15, 0.09, 0.03]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
        )}

        {badge && (
          /* lencana salib hijau */
          <mesh position={[-0.09, 0.1, 0.096]}>
            <boxGeometry args={[0.065, 0.065, 0.02]} />
            <meshStandardMaterial color="#0f9d76" roughness={0.5} />
          </mesh>
        )}
      </group>

      {/* panggul */}
      <RoundedBox
        args={[0.3, 0.2, 0.185]}
        radius={0.035}
        smoothness={3}
        position={[0, 0.95, 0]}
        castShadow
      >
        <meshStandardMaterial color={pants} roughness={0.82} />
      </RoundedBox>

      {/* kaki */}
      {[-1, 1].map((s) => (
        <group key={`leg${s}`} position={[s * 0.085, 0.9, 0]}>
          <group ref={s < 0 ? rig.thighL : rig.thighR}>
            <mesh position={[0, -0.21, 0]} castShadow>
              <capsuleGeometry args={[0.068, 0.28, 4, 10]} />
              <meshStandardMaterial color={pants} roughness={0.85} />
            </mesh>

            <group position={[0, -0.42, 0]} ref={s < 0 ? rig.shinL : rig.shinR}>
              <mesh position={[0, -0.2, 0]} castShadow>
                <capsuleGeometry args={[0.056, 0.28, 4, 10]} />
                <meshStandardMaterial color={pants} roughness={0.85} />
              </mesh>
              <RoundedBox
                args={[0.1, 0.15, 0.24]}
                radius={0.028}
                smoothness={2}
                position={[0, -0.4, 0.045]}
                castShadow
              >
                <meshStandardMaterial color={shoes} roughness={0.55} />
              </RoundedBox>
            </group>
          </group>
        </group>
      ))}

      {/* lengan */}
      {[-1, 1].map((s) => (
        <group key={`arm${s}`} position={[s * 0.185, 1.35, 0]} rotation={[0, 0, s * 0.06]}>
          <group ref={s < 0 ? rig.armL : rig.armR}>
            <mesh position={[0, -0.14, 0]} castShadow>
              <capsuleGeometry args={[0.044, 0.19, 4, 8]} />
              <meshStandardMaterial color={top} roughness={0.75} />
            </mesh>

            <group position={[0, -0.28, 0]} ref={s < 0 ? rig.foreL : rig.foreR}>
              <mesh position={[0, -0.13, 0]} castShadow>
                <capsuleGeometry args={[0.039, 0.18, 4, 8]} />
                <meshStandardMaterial color={skin} roughness={0.8} />
              </mesh>
              <mesh position={[0, -0.27, 0]} castShadow>
                <sphereGeometry args={[0.046, 10, 8]} />
                <meshStandardMaterial color={skin} roughness={0.8} />
              </mesh>

              {/* kotak obat di tangan (diaktifkan apoteker saat mengangkat) */}
              {box && s > 0 && (
                <mesh ref={rig.handBox} position={[0, -0.29, 0.045]} visible={false} castShadow>
                  <boxGeometry args={[0.12, 0.095, 0.085]} />
                  <meshStandardMaterial color={box} roughness={0.68} />
                </mesh>
              )}
            </group>
          </group>
        </group>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Apoteker — berdiri di belakang kasir, meraih & menyerahkan obat     */
/* ------------------------------------------------------------------ */

export function Pharmacist({ position, rotation = -0.5, palette, phase = 0, box = '#19c08a' }) {
  const root = useRef()
  const rig = useRig()
  const counterBox = useRef(null)

  useFrame((state, delta) => {
    if (!root.current) return

    const t = state.clock.elapsedTime * TS + phase
    // 0 = tangan di meja kasir, 1 = kotak obat diangkat setinggi dada
    const up = Math.pow((Math.sin(t * 0.6) + 1) / 2, 1.7)

    setX(rig.armR, mix(-0.45, -0.35, up))
    setX(rig.foreR, mix(-1.25, -1.9, up))
    setX(rig.armL, -0.45)
    setX(rig.foreL, -1.25)
    setX(rig.thighL, 0.02)
    setX(rig.thighR, -0.02)
    setX(rig.shinL, 0.05)
    setX(rig.shinR, 0.05)

    // menoleh pelan menyapa pembeli
    setY(rig.head, Math.sin(t * 0.34 + phase) * 0.3)
    setX(rig.torso, 0.02 + Math.sin(t * 1.25) * 0.012)

    if (rig.body.current) rig.body.current.position.y = Math.sin(t * 1.25) * 0.006

    const holding = up > 0.45
    if (rig.handBox.current) rig.handBox.current.visible = holding
    if (counterBox.current) counterBox.current.visible = !holding
  })

  return (
    <group ref={root} position={position} rotation={[0, rotation, 0]}>
      <Figure rig={rig} palette={palette} box={box} />

      {/* kotak obat di atas meja kasir — "dipungut" apoteker */}
      <mesh ref={counterBox} position={[0.28, 1.135, 0.35]} castShadow>
        <boxGeometry args={[0.13, 0.1, 0.09]} />
        <meshStandardMaterial color={box} roughness={0.68} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Pembeli — berjalan mengikuti titik rute, berhenti melihat rak       */
/* ------------------------------------------------------------------ */

export function Customer({ path, speed = 0.78, phase = 0, palette }) {
  const root = useRef()
  const rig = useRig()

  const state = useRef({ i: 0, hold: 0, walking: false, blend: 0 })

  useFrame((s, delta) => {
    const g = root.current
    if (!g) return

    const dt = Math.min(delta, 0.06) * TS
    const t = s.clock.elapsedTime * TS + phase
    const st = state.current
    const node = path[st.i]

    /* ---------- rute ---------- */
    if (st.hold > 0) {
      st.hold -= dt
      st.walking = false
      if (node.face !== undefined) {
        g.rotation.y += shortestAngle(g.rotation.y, node.face) * Math.min(dt * 3, 1)
      }
    } else {
      const dx = node.x - g.position.x
      const dz = node.z - g.position.z
      const dist = Math.hypot(dx, dz)

      if (dist < 0.14) {
        st.hold = node.hold || 0
        st.i = (st.i + 1) % path.length
        st.walking = st.hold <= 0
      } else {
        st.walking = true
        const step = Math.min(speed * dt, dist)
        g.position.x += (dx / dist) * step
        g.position.z += (dz / dist) * step
        g.rotation.y +=
          shortestAngle(g.rotation.y, Math.atan2(dx, dz)) * Math.min(dt * 4.5, 1)
      }
    }

    /* ---------- gerak tubuh ---------- */
    st.blend += ((st.walking ? 1 : 0) - st.blend) * Math.min(dt * 5, 1)
    const b = st.blend
    const stride = t * 5.4
    const sn = Math.sin(stride)

    setX(rig.thighL, mix(0, -sn * 0.5, b))
    setX(rig.thighR, mix(0, sn * 0.5, b))
    setX(rig.shinL, mix(0.06, Math.max(0, Math.sin(stride + 1.15)) * 0.8, b))
    setX(rig.shinR, mix(0.06, Math.max(0, Math.sin(stride + 1.15 + Math.PI)) * 0.8, b))
    setX(rig.armL, mix(-0.14, sn * 0.38, b))
    setX(rig.armR, mix(-0.14, -sn * 0.38, b))
    setX(rig.foreL, mix(-0.38, -0.3 - Math.max(0, sn) * 0.3, b))
    setX(rig.foreR, mix(-0.38, -0.3 - Math.max(0, -sn) * 0.3, b))

    setX(rig.torso, mix(0.02, 0.07, b))
    setY(rig.head, (1 - b) * Math.sin(t * 0.42 + phase) * 0.35)

    if (rig.body.current) {
      rig.body.current.position.y =
        Math.abs(Math.sin(stride)) * 0.017 * b + Math.sin(t * 1.25) * 0.005 * (1 - b)
    }
  })

  return (
    <group ref={root} position={[path[0].x, 0, path[0].z]}>
      <Figure rig={rig} palette={palette} />
    </group>
  )
}
