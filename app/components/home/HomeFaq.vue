<script setup lang="ts">
import { faq } from '#shared/data/faq'
</script>

<template>
  <section id="duvidas" class="section">
    <div class="wrap faq-grid">
      <div>
        <p class="eyebrow" v-reveal>Dúvidas frequentes</p>
        <h2 class="h2" v-reveal="'lines'">
          <span class="split-line"><span>Antes de</span></span>
          <span class="split-line"><span style="--d: 110ms"><em>marcar</em></span></span>
        </h2>
      </div>
      <FaqList :items="faq" />
    </div>
  </section>
</template>

<style scoped>
.faq-grid { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 3rem clamp(3rem, 8vw, 8rem); }
.faq-grid .h2 { margin-top: 1.2rem; }
@media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr; } }
</style>
