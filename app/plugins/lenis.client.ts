import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { provide: { lenis: null as Lenis | null } }
  }

  const lenis = new Lenis({
    lerp: 0.11,
    smoothWheel: true,
    anchors: { offset: -80 },
    autoRaf: true,
  })

  nuxtApp.hook('page:finish', () => {
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true })
  })

  return { provide: { lenis: lenis as Lenis | null } }
})
