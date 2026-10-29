import * as THREE from 'three'

import { colorFor } from './config'

/**
 * Membuat tekstur label kemasan via <canvas>.
 *
 * Ini yang paling menentukan: tanpa label, produk 3D hanya terlihat seperti
 * silinder/kotak plastik warna solid (tampak "mainan"). Dengan label berisi
 * merek, nama produk, dan harga, produk langsung terbaca sebagai kemasan asli.
 */

const cache = new Map()

function wrapText(ctx, text, maxWidth, maxLines = 3) {
  const words = String(text).split(' ')
  const lines = []
  let line = ''

  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
      if (lines.length === maxLines) break
    } else {
      line = test
    }
  }
  if (lines.length < maxLines && line) lines.push(line)
  return lines
}

function drawCross(ctx, x, y, size, color) {
  const t = size * 0.3
  ctx.fillStyle = color
  ctx.fillRect(x - t / 2, y - size / 2, t, size)
  ctx.fillRect(x - size / 2, y - t / 2, size, t)
}

export function makeLabelTexture(product, { promo = true } = {}) {
  const key = `${product.id}-${promo}`
  if (cache.has(key)) return cache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  const accent = colorFor(product.category)
  const dark = '#0a1f1a'
  const paper = '#f7faf9'

  // ---------- latar kertas (putih pharmaceutical) ----------
  ctx.fillStyle = paper
  ctx.fillRect(0, 0, 512, 512)

  // ---------- pita warna kategori di atas & bawah ----------
  ctx.fillStyle = accent
  ctx.fillRect(0, 0, 512, 96)
  ctx.fillRect(0, 430, 512, 82)

  // ---------- logo & nama brand ----------
  drawCross(ctx, 56, 48, 30, '#ffffff')
  ctx.fillStyle = '#ffffff'
  ctx.font = '800 34px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.fillText('apotek3D', 84, 60)

  ctx.font = '600 19px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.globalAlpha = 0.85
  ctx.fillText('APOTEK KELUARGA', 84, 84)
  ctx.globalAlpha = 1

  // ---------- kategori ----------
  ctx.fillStyle = dark
  ctx.font = '700 20px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.fillText(product.category.toUpperCase(), 40, 150)

  // ---------- garis pemisah ----------
  ctx.fillStyle = accent
  ctx.fillRect(40, 164, 120, 4)

  // ---------- nama produk (wrap) ----------
  ctx.fillStyle = dark
  ctx.font = '800 40px "Plus Jakarta Sans", Arial, sans-serif'
  const nameLines = wrapText(ctx, product.name, 430, 3)
  nameLines.forEach((line, i) => ctx.fillText(line, 40, 224 + i * 46))

  // ---------- garis tipis dekoratif ----------
  ctx.strokeStyle = 'rgba(16,32,27,.18)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(40, 350)
  ctx.lineTo(472, 350)
  ctx.stroke()

  // ---------- harga ----------
  const rupiah = (n) => `Rp${n.toLocaleString('id-ID')}`
  ctx.fillStyle = dark
  ctx.font = '800 44px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.fillText(rupiah(product.price), 40, 400)

  if (promo) {
    ctx.fillStyle = '#c2410c'
    ctx.font = '700 24px "Plus Jakarta Sans", Arial, sans-serif'
    ctx.fillText(`hemat ${rupiah(product.originalPrice - product.price)}`, 40, 424)
  }

  // ---------- pita bawah ----------
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 22px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.fillText('BPOM · ASLI · DIGARANSI', 40, 480)

  // ---------- garis barcode dekoratif ----------
  let bx = 330
  for (let i = 0; i < 26; i += 1) {
    const w = 2 + (i % 3)
    ctx.fillStyle = i % 2 === 0 ? dark : 'transparent'
    ctx.fillRect(bx, 452, w, 34)
    bx += w + 4
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true

  cache.set(key, texture)
  return texture
}

/** Tekstur plakat/signage untuk dinding toko */
export function makeSignTexture(title = 'apotek3D', subtitle = 'APOTEK KELUARGA SEJAK 2011') {
  const key = `sign-${title}`
  if (cache.has(key)) return cache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  const grad = ctx.createLinearGradient(0, 0, 1024, 0)
  grad.addColorStop(0, '#eafaf3')
  grad.addColorStop(1, '#cdf5e6')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 256)

  ctx.fillStyle = '#064e3c'
  ctx.fillRect(0, 232, 1024, 24)

  drawCross(ctx, 110, 116, 60, '#0f9d76')

  ctx.fillStyle = '#064e3c'
  ctx.font = '800 96px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.fillText(title, 180, 132)

  ctx.font = '600 34px "Plus Jakarta Sans", Arial, sans-serif'
  ctx.fillStyle = '#0b8463'
  ctx.fillText(subtitle, 184, 186)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  cache.set(key, texture)
  return texture
}