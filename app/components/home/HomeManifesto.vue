<script setup lang="ts">
// Texto que "acende" palavra por palavra conforme a pessoa rola.
const text = 'Antes de escolher um tratamento, a Adriana quer entender a sua pele: como ela reage, o que você já tentou, o que te incomoda quando olha no espelho. O protocolo vem depois. Sempre.'
const accent = new Set(['entender', 'sua', 'pele:', 'depois.', 'Sempre.'])
const words = text.split(' ')

const el = ref<HTMLElement | null>(null)
const progress = useSectionProgress(el)
const ready = ref(false)
onMounted(() => { ready.value = !prefersReducedMotion() })

// Uma única variável CSS (--lit) controla todas as palavras; o Vue não re-renderiza cada span.
// Começa a acender quando a seção entra e termina antes do meio da tela.
const lit = computed(() => ready.value
  ? ((progress.value - 0.18) / 0.42) * words.length
  : words.length + 1)
</script>

<template>
  <section id="manifesto" ref="el" class="section manifesto">
    <div class="wrap manifesto-in">
      <p class="eyebrow" v-reveal>O jeito de trabalhar</p>
      <p class="manifesto-text" :style="{ '--lit': lit.toFixed(2) }">
        <span
          v-for="(w, i) in words" :key="i" class="w"
          :class="{ 'w--accent': accent.has(w) }"
          :style="{ '--i': i }"
        >{{ `${w} ` }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.manifesto-in { max-width: 1100px; }
.manifesto-text {
  margin-top: 2.4rem;
  font-family: var(--serif);
  font-size: clamp(2rem, 4.6vw, 4rem);
  line-height: 1.12;
  letter-spacing: -0.015em;
  color: var(--espresso);
}
.w {
  opacity: clamp(0.16, calc(var(--lit) - var(--i) + 1), 1);
  transition: opacity 0.25s linear;
}
.w--accent { font-style: italic; color: var(--clay-deep); }
@media (prefers-reduced-motion: reduce) {
  .w { opacity: 1 !important; }
}
</style>
