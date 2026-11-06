import type { Directive } from 'vue'

type RevealValue = string | { type?: string; delay?: number } | undefined

function parse(v: RevealValue) {
  if (!v) return { type: 'up', delay: 0 }
  if (typeof v === 'string') return { type: v, delay: 0 }
  return { type: v.type ?? 'up', delay: v.delay ?? 0 }
}

// Elementos com clip-path totalmente fechado nunca "intersectam" (o Chrome considera o recorte),
// então nesses casos observamos o pai e aplicamos a classe no filho.
let io: IntersectionObserver | null = null
const targets = new Map<Element, Set<HTMLElement>>()

function observer() {
  if (io) return io
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      targets.get(e.target)?.forEach(el => el.setAttribute('data-in', ''))
      targets.delete(e.target)
      io!.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 })
  return io
}

function watch(el: HTMLElement, type: string) {
  const watched = type === 'clip' && el.parentElement ? el.parentElement : el
  const set = targets.get(watched) ?? new Set<HTMLElement>()
  set.add(el)
  targets.set(watched, set)
  observer().observe(watched)
}

export default defineNuxtPlugin((nuxtApp) => {
  const reveal: Directive<HTMLElement, RevealValue> = {
    getSSRProps(binding) {
      const { type, delay } = parse(binding.value)
      return {
        ...(type === 'lines' ? { 'data-lines': '' } : { 'data-reveal': type }),
        ...(delay ? { style: `--d:${delay}ms` } : {}),
      }
    },
    mounted(el, binding) {
      const { type, delay } = parse(binding.value)
      if (type === 'lines') el.setAttribute('data-lines', '')
      else el.setAttribute('data-reveal', type)
      if (delay) el.style.setProperty('--d', `${delay}ms`)
      if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
        el.setAttribute('data-in', '')
        return
      }
      watch(el, type)
    },
    unmounted(el) {
      targets.forEach((set, key) => {
        set.delete(el)
        if (!set.size) { targets.delete(key); io?.unobserve(key) }
      })
    },
  }

  // v-parallax="0.12" : desloca o elemento conforme ele cruza a tela
  const offs = new WeakMap<HTMLElement, () => void>()
  const parallax: Directive<HTMLElement, number | undefined> = {
    mounted(el, binding) {
      if (prefersReducedMotion()) return
      const speed = binding.value ?? 0.12
      // Mede o pai (que não se move) e usa a propriedade `translate`,
      // que soma com `transform`/`scale` em vez de sobrescrever as animações de entrada.
      const ref = el.parentElement ?? el
      const off = onScrollFrame(() => {
        const r = ref.getBoundingClientRect()
        const vh = window.innerHeight
        if (r.bottom < -200 || r.top > vh + 200) return
        const center = r.top + r.height / 2 - vh / 2
        el.style.translate = `0 ${(-center * speed).toFixed(1)}px`
      })
      offs.set(el, off)
    },
    unmounted(el) {
      offs.get(el)?.()
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('parallax', parallax)
})
