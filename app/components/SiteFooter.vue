<script setup lang="ts">
import { site, instagramUrl, fullAddress } from '#shared/data/site'
import { treatments } from '#shared/data/treatments'

const { href, track, channel } = useBooking()
// O CTA grande fica no bloco de agendamento logo acima; o rodapé só organiza os links.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <BrandMark class="footer-brand" />
          <p class="footer-text">
            {{ site.role }} · {{ site.council }}<br>
            {{ fullAddress() }}
          </p>
        </div>

        <nav aria-label="Tratamentos">
          <p class="footer-title">Tratamentos</p>
          <ul>
            <li v-for="t in treatments" :key="t.slug">
              <NuxtLink :to="`/tratamentos/${t.slug}`" class="footer-link">{{ t.name }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="footer-title">Contato</p>
          <ul>
            <li>
              <a :href="href()" target="_blank" rel="noopener" class="footer-link" @click="track('footer-contato')">{{ channel }}</a>
            </li>
            <li><a :href="instagramUrl" target="_blank" rel="noopener" class="footer-link">@{{ site.instagram }}</a></li>
            <li v-if="site.facebook"><a :href="site.facebook" target="_blank" rel="noopener" class="footer-link">Facebook</a></li>
            <li><a :href="site.mapsUrl" target="_blank" rel="noopener" class="footer-link">Ver no Google Maps</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} {{ site.name }}. Joinville, Santa Catarina.</p>
        <p>Resultados variam de pessoa para pessoa. Todo tratamento começa por uma avaliação.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--night);
  color: rgba(251, 248, 243, 0.72);
  padding: 0 0 3rem;
  border-top: 1px solid rgba(251, 248, 243, 0.1);
  position: relative;
  overflow: hidden;
}
.footer :deep(.brand-name) { color: var(--ivory); }
.footer :deep(.brand-sub) { color: rgba(251, 248, 243, 0.5); }
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 3rem;
  padding-block: 4rem 3.5rem;
}
.footer-text { margin-top: 1.4rem; font-size: 0.95rem; line-height: 1.8; }
.footer-title {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 1.1rem;
}
.footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.55rem; }
.footer-link { transition: color 0.3s, padding 0.4s var(--ease); }
.footer-link:hover { color: var(--ivory); padding-left: 0.4rem; }
.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem 2rem;
  flex-wrap: wrap;
  padding-top: 2rem;
  border-top: 1px solid rgba(251, 248, 243, 0.12);
  font-size: 0.8rem;
  color: rgba(251, 248, 243, 0.45);
}
.footer-bottom p { margin: 0; }
@media (max-width: 800px) {
  .footer { padding-bottom: 6.5rem; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-grid > :first-child { grid-column: 1 / -1; }
}
</style>
