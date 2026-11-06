<script setup lang="ts">
import { treatments } from '#shared/data/treatments'

// A faixa inclina levemente conforme a velocidade do scroll.
const track = ref<HTMLElement | null>(null)
onMounted(() => {
  if (prefersReducedMotion()) return
  let last = window.scrollY
  let skew = 0
  onScrollFrame(() => {
    const y = window.scrollY
    const v = Math.max(-12, Math.min(12, (y - last) * 0.25))
    last = y
    skew += (v - skew) * 0.3
    if (track.value) track.value.style.transform = `skewX(${(-skew * 0.4).toFixed(2)}deg)`
  })
})
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div ref="track" class="marquee-skew">
      <div class="marquee-row">
        <template v-for="n in 2" :key="n">
          <span v-for="t in treatments" :key="`${n}-${t.slug}`" class="marquee-item">
            {{ t.name }}<i>✦</i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  padding: 1.6rem 0;
  border-block: 1px solid var(--line);
  background: var(--ivory);
}
.marquee-skew { transition: transform 0.3s ease-out; }
.marquee-row {
  display: flex;
  width: max-content;
  animation: slide 38s linear infinite;
}
.marquee:hover .marquee-row { animation-play-state: paused; }
.marquee-item {
  display: inline-flex;
  align-items: center;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  color: var(--espresso);
  white-space: nowrap;
  padding-right: 2.2rem;
}
.marquee-item i {
  font-style: normal;
  font-size: 0.45em;
  color: var(--clay);
  padding-left: 2.2rem;
}
@keyframes slide {
  to { transform: translateX(-50%); }
}
</style>
