<script setup lang="ts">
import type { Treatment } from '#shared/data/treatments'

// Foto real do procedimento quando existe. Quando não existe, um card tipográfico
// na identidade do site, para nunca associar o tratamento a uma foto de outro.
const props = withDefaults(defineProps<{
  treatment: Treatment
  index?: number
  size?: 'lg' | 'sm'
  lazy?: boolean
}>(), { index: 0, size: 'lg', lazy: true })

const tone = computed(() => (props.index % 2 ? 'sand' : 'night'))
const initial = computed(() => props.treatment.name.charAt(0))
</script>

<template>
  <img
    v-if="treatment.photo" :src="treatment.photo" :alt="treatment.imageAlt"
    class="tv-img" width="558" height="700" :loading="lazy ? 'lazy' : 'eager'"
  >
  <div v-else class="tv-card" :class="[`tv-card--${tone}`, `tv-card--${size}`]" role="img" :aria-label="treatment.name">
    <span class="tv-initial" aria-hidden="true">{{ initial }}</span>
    <template v-if="size === 'lg'">
      <span class="tv-cat">{{ treatment.category }}</span>
      <span class="tv-name">{{ treatment.name }}</span>
      <span class="tv-foot">Ver como funciona</span>
    </template>
  </div>
</template>

<style scoped>
.tv-img { width: 100%; height: 100%; object-fit: cover; }

.tv-card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.4rem;
  isolation: isolate;
}
.tv-card--night {
  background:
    radial-gradient(90% 70% at 85% 10%, rgba(168, 114, 90, 0.55), transparent 65%),
    var(--night);
  color: var(--ivory);
}
.tv-card--sand {
  background:
    radial-gradient(90% 70% at 15% 90%, rgba(217, 183, 164, 0.75), transparent 65%),
    var(--sand);
  color: var(--espresso);
}
.tv-initial {
  position: absolute;
  right: -0.08em;
  bottom: -0.28em;
  z-index: -1;
  font-family: var(--serif);
  font-style: italic;
  font-size: 15rem;
  line-height: 1;
  opacity: 0.14;
}
.tv-cat {
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.75;
}
.tv-name {
  font-family: var(--serif);
  font-style: italic;
  font-size: 2.3rem;
  line-height: 1;
}
.tv-foot {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  padding-top: 0.8rem;
  border-top: 1px solid currentColor;
  opacity: 0.7;
}
.tv-card--night .tv-name { color: var(--rose); }
.tv-card--sm { padding: 0; justify-content: center; align-items: center; }
.tv-card--sm .tv-initial {
  position: static;
  font-size: 2.6rem;
  opacity: 0.85;
}
</style>
