import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Debu halus melayang — memberi kesan volume &Kedalaman udara,
 * sekaligus menunjukkan bahwa scene benar-benar 3D (parallax).
 */
export default function Dust({ count = 140 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 12
      array[i * 3 + 1] = (Math.random() - 0.5) * 6
      array[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return array
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.02
    ref.current.position.y = Math.sin(t * 0.2) * 0.12
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#8ff0d4"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}