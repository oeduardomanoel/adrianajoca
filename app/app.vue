<script setup lang="ts">
import { site } from '#shared/data/site'

const url = useSiteUrl()
const route = useRoute()

useHead({
  titleTemplate: t => (t && !t.includes(site.shortName) ? `${t} | ${site.name}` : t || site.name),
  link: [{ rel: 'canonical', href: computed(() => `${url}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`) }],
})

useSeoMeta({
  ogSiteName: site.name,
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogUrl: computed(() => `${url}${route.path}`),
  ogImage: `${url}/og.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Adriana Joca, biomédica esteta em Joinville',
  twitterCard: 'summary_large_image',
  twitterImage: `${url}/og.jpg`,
})
</script>

<template>
  <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo">
    <NuxtPage />
  </main>
  <SiteFooter />
  <BookingFloat />
</template>
