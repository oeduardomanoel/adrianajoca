<script setup lang="ts">
import { treatments } from '#shared/data/treatments'

// Prévia da foto que acompanha o cursor (só em telas com mouse).
const active = ref<number | null>(null)
const preview = ref<HTMLElement | null>(null)
let x = 0, y = 0, cx = 0, cy = 0, raf = 0

function onMove(e: MouseEvent) {
  x = e.clientX
  y = e.clientY
}
function loop() {
  cx += (x - cx) * 0.14
  cy += (y - cy) * 0.14
  if (preview.value) {
    const tilt = Math.max(-8, Math.min(8, (x - cx) * 0.08))
    preview.value.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(32px, -55%) rotate(${tilt}deg)`
  }
  raf = requestAnimationFrame(loop)
}
function enter(i: number, e: MouseEvent) {
  if (active.value === null) { cx = e.clientX; cy = e.clientY }
  active.value = i
}

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(raf)
  }
})
</script>

<template>
  <section id="tratamentos" class="section treatments">
    <div class="wrap">
      <header class="t-head">
        <div>
          <p class="eyebrow" v-reveal>Tratamentos</p>
          <h2 class="h2" v-reveal="'lines'">
            <span class="split-line"><span>O que dá para</span></span>
            <span class="split-line"><span style="--d: 110ms"><em>cuidar por aqui</em></span></span>
          </h2>
        </div>
        <p class="lead" v-reveal="{ delay: 200 }">
          Rosto e corpo, sempre com indicação feita depois da avaliação. Escolha um tratamento para ver
          como funciona, para quem é e o que esperar dos dias seguintes.
        </p>
      </header>

      <ol class="t-list" @mouseleave="active = null">
        <li v-for="(t, i) in treatments" :key="t.slug" v-reveal="{ delay: i * 70 }">
          <NuxtLink
            :to="`/tratamentos/${t.slug}`" class="t-row" :class="{ 'is-dim': active !== null && active !== i }"
            @mouseenter="enter(i, $event)"
          >
            <span class="t-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="t-thumb"><img :src="t.image" :alt="t.imageAlt" width="120" height="150" loading="lazy"></span>
            <span class="t-name">{{ t.name }}</span>
            <span class="t-line">{{ t.line }}</span>
            <span class="t-cat">{{ t.category }}</span>
            <span class="t-arrow"><AppIcon name="arrow-up-right" /></span>
          </NuxtLink>
        </li>
      </ol>
    </div>

    <div ref="preview" class="t-preview" :class="{ 'is-on': active !== null }" aria-hidden="true">
      <img
        v-for="(t, i) in treatments" :key="t.slug" :src="t.image" alt=""
        :class="{ 'is-active': active === i }" loading="lazy"
      >
    </div>
  </section>
</template>

<style scoped>
.t-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 2rem 4rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}
.t-head .h2 { margin-top: 1.2rem; }
.t-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.t-row {
  position: relative;
  display: grid;
  grid-template-columns: 3.5rem 1.3fr 1.6fr 6rem 3rem;
  grid-template-areas: 'num name line cat arrow';
  align-items: center;
  gap: 1.5rem;
  padding: clamp(1.4rem, 3vw, 2.2rem) 0;
  border-bottom: 1px solid var(--line);
  isolation: isolate;
  transition: opacity 0.5s var(--ease), padding 0.6s var(--ease);
}
.t-row::before {
  content: '';
  position: absolute;
  inset: 0 calc(var(--gutter) * -0.5);
  background: var(--ivory);
  border-radius: 14px;
  transform: scaleY(0.6);
  opacity: 0;
  transition: transform 0.6s var(--ease), opacity 0.4s;
  z-index: -1;
}
.t-row:hover::before { transform: none; opacity: 1; }
.t-row.is-dim { opacity: 0.35; }
.t-num { grid-area: num; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--clay); }
.t-thumb { display: none; }
.t-name {
  grid-area: name;
  font-family: var(--serif);
  font-size: clamp(1.9rem, 3.6vw, 3.1rem);
  line-height: 1;
  color: var(--espresso);
  transition: transform 0.6s var(--ease), color 0.4s;
}
.t-row:hover .t-name { transform: translateX(0.6rem); color: var(--clay-deep); font-style: italic; }
.t-line { grid-area: line; color: var(--muted); font-size: 0.98rem; max-width: 30em; }
.t-cat {
  grid-area: cat;
  justify-self: start;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px var(--line-strong);
}
.t-arrow {
  grid-area: arrow;
  justify-self: end;
  width: 46px; height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  transition: background 0.4s, color 0.4s, transform 0.6s var(--ease);
}
.t-arrow svg { width: 18px; height: 18px; }
.t-row:hover .t-arrow { background: var(--espresso); color: var(--ivory); transform: rotate(45deg); }

.t-preview {
  position: fixed;
  top: 0; left: 0;
  z-index: 50;
  width: 260px;
  aspect-ratio: 4 / 5;
  pointer-events: none;
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  scale: 0.6;
  transition: opacity 0.4s var(--ease), scale 0.6s var(--ease);
  box-shadow: 0 40px 70px -30px rgba(42, 32, 26, 0.55);
}
.t-preview.is-on { opacity: 1; scale: 1; }
.t-preview img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.15);
  transition: opacity 0.45s var(--ease), transform 0.8s var(--ease);
}
.t-preview img.is-active { opacity: 1; transform: none; }

@media (hover: none), (pointer: coarse) {
  .t-preview { display: none; }
}

@media (max-width: 900px) {
  .t-head { grid-template-columns: 1fr; }
  .t-row {
    grid-template-columns: 84px 1fr 2.6rem;
    grid-template-areas:
      'thumb name arrow'
      'thumb line line'
      'thumb cat cat';
    gap: 0.4rem 1rem;
    align-items: start;
  }
  .t-num { display: none; }
  .t-thumb {
    grid-area: thumb;
    display: block;
    width: 84px;
    aspect-ratio: 4 / 5;
    border-radius: 10px;
    overflow: hidden;
    background: var(--sand);
  }
  .t-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .t-name { font-size: 1.75rem; }
  .t-line { font-size: 0.92rem; line-height: 1.5; }
  .t-cat { margin-top: 0.3rem; font-size: 0.62rem; }
  .t-arrow { width: 38px; height: 38px; }
}
</style>
