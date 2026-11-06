<script setup lang="ts">
import { site } from '#shared/data/site'
</script>

<template>
  <section v-if="site.reviews.length" class="section reviews">
    <div class="wrap">
      <p class="eyebrow" v-reveal>Quem já passou por aqui</p>
      <div class="reviews-grid">
        <figure v-for="(r, i) in site.reviews" :key="r.author" class="review" v-reveal="{ delay: i * 90 }">
          <div class="stars" :aria-label="`${r.rating} de 5 estrelas`">
            <AppIcon v-for="n in r.rating" :key="n" name="star" />
          </div>
          <blockquote>“{{ r.text }}”</blockquote>
          <figcaption>{{ r.author }} · avaliação no Google</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews { background: var(--ivory); }
.reviews-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.review {
  margin: 0;
  padding: 2rem;
  border-radius: var(--radius);
  background: var(--cream);
  box-shadow: inset 0 0 0 1px var(--line);
  transition: transform 0.6s var(--ease), box-shadow 0.6s;
}
.review:hover { transform: translateY(-6px); box-shadow: inset 0 0 0 1px var(--line-strong), 0 30px 50px -35px rgba(42, 32, 26, 0.4); }
.stars { display: flex; gap: 2px; color: var(--clay); }
.stars svg { width: 16px; height: 16px; }
blockquote { margin: 1.2rem 0; font-family: var(--serif); font-size: 1.45rem; line-height: 1.3; color: var(--espresso); }
figcaption { font-size: 0.85rem; color: var(--muted); }
</style>
