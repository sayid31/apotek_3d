import { useEffect, useRef } from 'react'

import { subscribeLoad } from './loading'

/**
 * Melaporkan progres pemuatan aset 3D ke komponen di luar <Canvas>.
 *
 * Harus dirender DI DALAM <Canvas> dan DI LUAR <Suspense>, supaya:
 *  1. three.js/drei tidak ikut ter-bundle ke chunk utama aplikasi, dan
 *  2. laporan mulai berjalan sebelum tekstur/HDRI selesai dimuat.
 */
export default function ProgressReporter({ onProgress }) {
  const callback = useRef(onProgress)
  callback.current = onProgress

  useEffect(
    () =>
      subscribeLoad((progress, active) => {
        callback.current?.(progress, active)
      }),
    [],
  )

  return null
}
