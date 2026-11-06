import { treatments } from '#shared/data/treatments'

export default defineEventHandler((event) => {
  const url = siteUrlFrom(event)
  const today = new Date().toISOString().slice(0, 10)
  const pages = [
    { loc: '/', priority: '1.0', freq: 'weekly', image: '/img/adriana-perfil-luz.webp' },
    { loc: '/tratamentos', priority: '0.9', freq: 'monthly', image: '/img/microagulhamento.webp' },
    ...treatments.map(t => ({ loc: `/tratamentos/${t.slug}`, priority: '0.8', freq: 'monthly', image: t.image })),
  ]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(p => `  <url>
    <loc>${url}${p.loc === '/' ? '/' : p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
    <image:image><image:loc>${url}${p.image}</image:loc></image:image>
  </url>`).join('\n')}
</urlset>
`
})
