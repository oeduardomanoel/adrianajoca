// Um único listener de scroll + requestAnimationFrame para o site todo.
type Fn = () => void
const subs = new Set<Fn>()
let ticking = false
let bound = false

function run() {
  ticking = false
  subs.forEach(fn => fn())
}
function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(run)
  }
}

export function onScrollFrame(fn: Fn) {
  if (import.meta.server) return () => {}
  if (!bound) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    bound = true
  }
  subs.add(fn)
  requestAnimationFrame(fn)
  return () => subs.delete(fn)
}

export function prefersReducedMotion() {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Progresso 0→1 de um elemento atravessando a viewport (ou fixado, se sticky). */
export function useSectionProgress(target: Ref<HTMLElement | null>, mode: 'pass' | 'pin' = 'pass') {
  const progress = ref(0)
  let off: (() => void) | undefined
  onMounted(() => {
    off = onScrollFrame(() => {
      const el = target.value
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = mode === 'pin'
        ? -r.top / Math.max(1, r.height - vh)
        : (vh - r.top) / (vh + r.height)
      progress.value = Math.min(1, Math.max(0, p))
    })
  })
  onBeforeUnmount(() => off?.())
  return progress
}
