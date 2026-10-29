// Kontrol mockup: ganti lebar frame + tampilkan/sembunyikan anotasi
const stage = document.getElementById('stage')
const buttons = document.querySelectorAll('[data-set-view]')
const annoToggle = document.getElementById('anno')

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    stage.dataset.view = button.dataset.setView
    buttons.forEach((b) => b.classList.toggle('is-active', b === button))
  })
})

annoToggle?.addEventListener('change', () => {
  stage.classList.toggle('is-annotated', annoToggle.checked)
})

// Dukungan: buka halaman tertentu lewat ?page=promo&view=mobile
const params = new URLSearchParams(window.location.search)
const page = params.get('page')
const view = params.get('view')

if (view) {
  stage.dataset.view = view
  buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.setView === view))
}

if (page) {
  const target = document.getElementById(page)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}