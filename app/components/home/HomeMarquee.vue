<script setup lang="ts">
import { treatments } from '#shared/data/treatments'
</script>

<template>
  <nav class="strip" aria-label="Tratamentos">
    <ul class="wrap strip-list">
      <li v-for="(t, i) in treatments" :key="t.slug" v-reveal="{ type: 'fade', delay: i * 80 }">
        <NuxtLink :to="`/tratamentos/${t.slug}`" class="strip-link">{{ t.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.strip {
  border-block: 1px solid var(--line);
  background: var(--ivory);
}
.strip-list {
  list-style: none;
  margin-block: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.6rem 0;
  padding-block: 1.6rem;
}
.strip-list li { display: flex; align-items: center; }
.strip-list li + li::before {
  content: '';
  width: 4px; height: 4px;
  margin-inline: clamp(1rem, 2.4vw, 2rem);
  border-radius: 50%;
  background: var(--clay);
  opacity: 0.6;
}
.strip-link {
  position: relative;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  color: var(--espresso);
  transition: color 0.4s;
}
.strip-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0.05em;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s var(--ease);
}
.strip-link:is(:hover, :focus-visible) { color: var(--clay-deep); }
.strip-link:is(:hover, :focus-visible)::after { transform: scaleX(1); transform-origin: left; }
@media (max-width: 640px) {
  .strip-list { gap: 0.4rem 0; padding-block: 1.3rem; }
  .strip-list li + li::before { margin-inline: 0.75rem; }
}
</style>
