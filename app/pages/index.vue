<script setup lang="ts">
import { faq } from '#shared/data/faq'

const url = useSiteUrl()

useSeoMeta({
  title: 'Adriana Joca Estética | Biomédica esteta em Joinville',
  description: 'Estética facial e corporal com a biomédica esteta Adriana Joca (CRBM-5 015629), no Glória, em Joinville. Limpeza de pele, microagulhamento, jato de plasma, lábios, drenagem e ventosaterapia.',
  ogTitle: 'Adriana Joca Estética | Biomédica esteta em Joinville',
  ogDescription: 'Antes de qualquer agulha, ácido ou aparelho, a Adriana olha a sua pele de perto. Estética facial e corporal no Glória, em Joinville.',
})

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(businessSchema(url)) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(personSchema(url)) },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${url}/#site`,
        url,
        name: 'Adriana Joca Estética',
        inLanguage: 'pt-BR',
        publisher: { '@id': `${url}/#negocio` },
      }),
    },
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema(faq)) },
  ],
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeMarquee />
    <HomeManifesto />
    <HomeTreatments />
    <HomeMethod />
    <HomeGallery />
    <HomeAbout />
    <HomeReviews />
    <HomeFaq />
    <BookingBlock />
  </div>
</template>
