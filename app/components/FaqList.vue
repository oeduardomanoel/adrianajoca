<script setup lang="ts">
defineProps<{ items: { q: string; a: string }[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="(it, i) in items" :key="it.q" class="faq-item" v-reveal="{ delay: i * 60 }">
      <summary>
        <h3 class="faq-q">{{ it.q }}</h3>
        <span class="faq-icon" aria-hidden="true"><AppIcon name="plus" /></span>
      </summary>
      <div class="faq-a"><p>{{ it.a }}</p></div>
    </details>
  </div>
</template>

<style scoped>
.faq { border-top: 1px solid var(--line); }
.faq-item { border-bottom: 1px solid var(--line); interpolate-size: allow-keywords; }
.faq-item::details-content {
  block-size: 0;
  overflow: hidden;
  transition: block-size 0.6s var(--ease), content-visibility 0.6s allow-discrete;
}
.faq-item[open]::details-content { block-size: auto; }
summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.6rem 0;
  cursor: pointer;
  list-style: none;
}
summary::-webkit-details-marker { display: none; }
.faq-q {
  font-size: clamp(1.3rem, 2.1vw, 1.75rem);
  line-height: 1.2;
  transition: color 0.3s, transform 0.5s var(--ease);
}
summary:is(:hover, :focus-visible) .faq-q { color: var(--clay-deep); transform: translateX(6px); }
summary:focus-visible { outline: none; }
summary:focus-visible .faq-icon { box-shadow: inset 0 0 0 1px var(--clay-deep), 0 0 0 3px rgba(168, 114, 90, 0.25); }
.faq-icon {
  flex: none;
  width: 42px; height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  transition: transform 0.5s var(--ease), background 0.4s, color 0.4s;
}
.faq-icon svg { width: 18px; height: 18px; }
.faq-item[open] .faq-icon { transform: rotate(45deg); background: var(--espresso); color: var(--ivory); }
.faq-a { padding: 0 3.5rem 1.8rem 0; color: var(--muted); max-width: 46em; }
.faq-a p { margin: 0; }
</style>
