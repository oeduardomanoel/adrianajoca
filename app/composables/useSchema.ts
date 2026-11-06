import { site, instagramUrl } from '#shared/data/site'
import { treatments } from '#shared/data/treatments'

export function useSiteUrl() {
  return String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
}

/** Entidade principal do negócio para o Google e para IAs (schema.org). */
export function businessSchema(url: string) {
  const a = site.address
  const sameAs = [instagramUrl, site.facebook, site.bioLink].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'HealthAndBeautyBusiness'],
    '@id': `${url}/#negocio`,
    name: site.name,
    alternateName: 'Adriana Joca | Estética Facial e Corporal Joinville',
    description: 'Estética facial e corporal com a biomédica esteta Adriana Joca (CRBM-5 015629), no bairro Glória, em Joinville (SC). Limpeza de pele, microagulhamento, jato de plasma, tratamentos para lábios, drenagem linfática e ventosaterapia.',
    url,
    image: `${url}/img/adriana-perfil-luz.webp`,
    logo: `${url}/apple-touch-icon.png`,
    priceRange: '$$',
    ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(a.street ? { streetAddress: a.street } : {}),
      addressLocality: a.city,
      addressRegion: a.state,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: a.country,
    },
    ...(site.geo ? { geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
    areaServed: [
      { '@type': 'City', name: 'Joinville' },
      { '@type': 'Place', name: 'Glória, Joinville' },
    ],
    hasMap: site.mapsUrl,
    sameAs,
    founder: { '@id': `${url}/#adriana` },
    employee: { '@id': `${url}/#adriana` },
    ...(site.hours.length
      ? {
          openingHoursSpecification: site.hours.map(h => ({
            '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
          })),
        }
      : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tratamentos',
      itemListElement: treatments.map(t => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: t.name, url: `${url}/tratamentos/${t.slug}` },
      })),
    },
    ...(site.reviews.length
      ? {
          review: site.reviews.map(r => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.author },
            reviewBody: r.text,
            reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
          })),
        }
      : {}),
  }
}

export function personSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}/#adriana`,
    name: site.professional,
    jobTitle: site.role,
    description: `Biomédica esteta registrada no Conselho Regional de Biomedicina da 5ª Região (${site.council}). Atende em Joinville (SC).`,
    image: `${url}/img/adriana-blazer.webp`,
    worksFor: { '@id': `${url}/#negocio` },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Registro profissional',
      name: site.council,
      recognizedBy: { '@type': 'Organization', name: 'Conselho Regional de Biomedicina 5ª Região' },
    },
    knowsAbout: ['Estética facial', 'Estética corporal', ...treatments.map(t => t.name)],
    sameAs: [instagramUrl],
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

export function breadcrumbSchema(url: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: `${url}${it.path}`,
    })),
  }
}
