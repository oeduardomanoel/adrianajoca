<script setup lang="ts">
import { site, instagramUrl } from '#shared/data/site'

const items = [
  { src: '/img/atendimento-lupa.webp', w: 558, h: 586, alt: 'Adriana aplicando produto no rosto da paciente sob a luz da lupa', cap: 'Leitura da pele com lupa, antes de decidir qualquer etapa.' },
  { src: '/img/microagulhamento.webp', w: 558, h: 676, alt: 'Microagulhamento facial com caneta', cap: 'Microagulhamento: profundidade ajustada a cada região do rosto.' },
  { src: '/img/antes-depois-acne.webp', w: 556, h: 746, alt: 'Comparação de textura de pele com marcas de acne, antes e depois', cap: 'Antes e depois publicado no perfil. Resultados variam de pessoa para pessoa.' },
  { src: '/img/extracao.webp', w: 558, h: 676, alt: 'Extração de cravos com luvas durante limpeza de pele', cap: 'Extração feita com calma, poro por poro.' },
  { src: '/img/limpeza-de-pele.webp', w: 558, h: 586, alt: 'Paciente relaxada durante limpeza de pele', cap: 'Limpeza de pele, do começo ao calmante final.' },
  { src: '/img/ventosas.webp', w: 484, h: 474, alt: 'Ventosas preparadas para atendimento corporal', cap: 'Estética corporal com ventosaterapia.' },
]

const section = ref<HTMLElement | null>(null)
const rail = ref<HTMLElement | null>(null)
const progress = useSectionProgress(section, 'pin')
const pinned = ref(false)
const distance = ref(0)

function measure() {
  pinned.value = window.matchMedia('(min-width: 901px)').matches && !prefersReducedMotion()
  if (rail.value) distance.value = Math.max(0, rail.value.scrollWidth - window.innerWidth)
}
onMounted(() => {
  measure()
  window.addEventListener('resize', measure, { passive: true })
})
onBeforeUnmount(() => { if (import.meta.client) window.removeEventListener('resize', measure) })

const sectionStyle = computed(() => pinned.value ? { height: `calc(100vh + ${distance.value}px)` } : {})
const railStyle = computed(() => pinned.value ? { transform: `translate3d(${-progress.value * distance.value}px, 0, 0)` } : {})
</script>

<template>
  <section ref="section" class="gallery" :class="{ 'is-pinned': pinned }" :style="sectionStyle" aria-labelledby="bastidores">
    <div class="gallery-sticky">
      <div class="wrap gallery-head">
        <div>
          <p class="eyebrow" v-reveal>Bastidores</p>
          <h2 id="bastidores" class="h2" v-reveal="'lines'">
            <span class="split-line"><span>Um pouco do dia a dia</span></span>
            <span class="split-line"><span style="--d: 110ms"><em>na maca</em></span></span>
          </h2>
        </div>
        <div class="gallery-progress" aria-hidden="true">
          <span :style="{ transform: `scaleX(${pinned ? progress : 1})` }" />
        </div>
      </div>

      <div ref="rail" class="rail" :style="railStyle">
        <figure v-for="(it, i) in items" :key="it.src" class="card" :style="{ '--r': i % 2 ? '1.5deg' : '-1.5deg' }">
          <div class="frame card-img">
            <img :src="it.src" :alt="it.alt" :width="it.w" :height="it.h" loading="lazy">
          </div>
          <figcaption>
            <span class="card-num">{{ String(i + 1).padStart(2, '0') }}</span>{{ it.cap }}
          </figcaption>
        </figure>

        <a :href="instagramUrl" target="_blank" rel="noopener" class="card card--cta">
          <AppIcon name="instagram" class="cta-icon" />
          <span class="cta-title">Mais no<br><em>Instagram</em></span>
          <span class="link-line">@{{ site.instagram }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery { position: relative; background: var(--cream); padding-block: clamp(5rem, 10vw, 8rem); }
.gallery.is-pinned { padding: 0; }
.is-pinned .gallery-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.gallery-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: clamp(2rem, 4vh, 3.5rem);
}
.gallery-head .h2 { margin-top: 1rem; }
.gallery-progress { width: 180px; height: 1px; background: var(--line-strong); }
.gallery-progress span { display: block; height: 100%; background: var(--clay-deep); transform-origin: left; }

.rail {
  display: flex;
  gap: clamp(1.2rem, 2.5vw, 2.2rem);
  padding-inline: var(--gutter);
  width: max-content;
  will-change: transform;
}
.card { margin: 0; width: clamp(240px, 24vw, 340px); flex: none; }
.card-img {
  aspect-ratio: 4 / 5;
  transition: transform 0.8s var(--ease), box-shadow 0.8s var(--ease);
}
.card:hover .card-img {
  transform: rotate(var(--r)) translateY(-6px);
  box-shadow: 0 30px 50px -30px rgba(42, 32, 26, 0.5);
}
.card:hover .card-img img { transform: scale(1.06); }
.card figcaption {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--muted);
}
.card-num { color: var(--clay); font-size: 0.75rem; padding-top: 0.15rem; letter-spacing: 0.1em; }

.card--cta {
  aspect-ratio: 4 / 5;
  align-self: flex-start;
  border-radius: var(--radius);
  background: var(--espresso);
  color: var(--ivory);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  transition: background 0.5s;
}
.card--cta:hover { background: var(--clay-deep); }
.cta-icon { width: 34px; height: 34px; }
.cta-title { font-family: var(--serif); font-size: 2.6rem; line-height: 1; }
.cta-title em { color: var(--rose); }

@media (max-width: 900px) {
  .gallery-progress { display: none; }
  .rail {
    width: auto;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    scrollbar-width: none;
  }
  .rail::-webkit-scrollbar { display: none; }
  .card { width: 72vw; max-width: 300px; scroll-snap-align: center; }
}
</style>
