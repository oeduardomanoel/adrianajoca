// Domínio final: defina NUXT_PUBLIC_SITE_URL na Vercel (ex.: https://adrianajoca.com.br).
// Sem isso, usa o domínio de produção que a própria Vercel informa no build.
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  || 'http://localhost:3000'
).replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },

  css: [
    '@fontsource/cormorant-garamond/400.css',
    '@fontsource/cormorant-garamond/500.css',
    '@fontsource/cormorant-garamond/400-italic.css',
    '@fontsource/cormorant-garamond/500-italic.css',
    '@fontsource-variable/jost/index.css',
    'lenis/dist/lenis.css',
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    public: {
      siteUrl,
      // Opcional: sobrescreve o WhatsApp de shared/data/site.ts sem mexer no código
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#F5EFE6' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'geo.region', content: 'BR-SC' },
        { name: 'geo.placename', content: 'Joinville' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        // Marca o <html> como "js" antes da pintura: só assim os elementos animados começam escondidos.
        // Sem JS (ou para robôs), todo o conteúdo fica visível.
        { innerHTML: 'document.documentElement.classList.add("js")', tagPriority: 'critical' },
      ],
    },
  },

  routeRules: {
    '/**': { prerender: true },
    // Atalho para a bio do Instagram
    '/bio': { redirect: { to: '/links', statusCode: 301 } },
    '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/links', '/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt'],
    },
  },

  experimental: {
    viewTransition: true,
  },
})
