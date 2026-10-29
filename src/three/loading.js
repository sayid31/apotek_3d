import * as THREE from 'three'

/**
 * Pelacak progres pemuatan aset 3D berbasis THREE.DefaultLoadingManager.
 *
 * Kenapa tidak memakai useProgress dari drei: pada R3F v9 nilai progresnya
 * tidak pernah bergerak, dan meng-import drei di luar <Canvas> akan menarik
 * seluruh three.js ke bundle utama. DefaultLoadingManager adalah API publik
 * three.js yang menagih setiap TextureLoader/RGBELoader di dalam scene.
 */

const state = { progress: 0, active: false }
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn(state.progress, state.active))
}

const manager = THREE.DefaultLoadingManager

manager.onStart = () => {
  state.active = true
  emit()
}

manager.onProgress = (url, loaded, total) => {
  state.active = true
  if (total > 0) state.progress = Math.min(99, (loaded / total) * 100)
  emit()
}

manager.onLoad = () => {
  state.active = false
  state.progress = 100
  emit()
}

manager.onError = () => {
  emit()
}

/** Berlangganan progres. Langsung memanggil fn dengan status terakhir. */
export function subscribeLoad(fn) {
  listeners.add(fn)
  fn(state.progress, state.active)
  return () => listeners.delete(fn)
}
