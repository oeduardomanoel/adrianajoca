<script setup lang="ts">
import { treatments } from '#shared/data/treatments'

const url = useSiteUrl()

useSeoMeta({
  title: 'Tratamentos faciais e corporais em Joinville',
  description: 'Limpeza de pele, microagulhamento, jato de plasma, tratamentos para lábios, drenagem linfática e ventosaterapia com a biomédica esteta Adriana Joca, no Glória, em Joinville.',
  ogTitle: 'Tratamentos | Adriana Joca Estética',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Tratamentos da Adriana Joca Estética',
        itemListElement: treatments.map((t, i) => ({
          '@type': 'ListItem', position: i + 1, name: t.name, url: `${url}/tratamentos/${t.slug}`,
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema(url, [
        { name: 'Início', path: '/' },
        { name: 'Tratamentos', path: '/tratamentos' },
      ])),
    },
  ],
})
</script>

<template>
  <div class="tl">
    <div class="wrap tl-head">
      <h1 class="tl-title" v-reveal="'lines'">
        <span class="split-line"><span>Tratamentos em</span></span>
        <span class="split-line"><span style="--d: 110ms"><em>Joinville</em></span></span>
      </h1>
    </div>
    <HomeTreatments />
    <BookingBlock />
  </div>
</template>

<style scoped>
.tl-head { padding-top: clamp(8rem, 16vh, 10rem); }
.tl-title { font-size: clamp(3rem, 8vw, 7rem); line-height: 0.95; letter-spacing: -0.03em; }
.tl :deep(.treatments) { padding-top: 3rem; }
</style>
