/**
 * Dados do negócio. É aqui que se troca telefone, endereço e links.
 * Tudo que estiver vazio ('') some do site automaticamente, sem quebrar nada.
 */
export const site = {
  name: 'Adriana Joca Estética',
  shortName: 'Adriana Joca',
  professional: 'Adriana Joca',
  role: 'Biomédica Esteta',
  council: 'CRBM-5 015629',
  tagline: 'Estética facial e corporal em Joinville',

  // WhatsApp só com números, com DDI e DDD. Ex.: '5547999998888'.
  // Enquanto estiver vazio, os botões de agendamento abrem o Direct do Instagram.
  whatsapp: '',

  instagram: 'adrianajoca.estetica',
  facebook: '', // URL completa da página, se quiser exibir
  bioLink: 'https://bio.site/adrianajoca.estetica',

  address: {
    street: '', // Ex.: 'Rua Exemplo, 123, sala 4'
    neighborhood: 'Glória',
    city: 'Joinville',
    state: 'SC',
    postalCode: '',
    country: 'BR',
  },
  // Coordenadas exatas do Google Maps (clique com o botão direito no pin). Ex.: { lat: -26.30, lng: -48.86 }
  geo: null as null | { lat: number; lng: number },

  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Adriana+Joca+Est%C3%A9tica+Facial+e+Corporal+Joinville',
  mapsEmbed: 'https://www.google.com/maps?q=Adriana+Joca+Est%C3%A9tica+Facial+e+Corporal+Joinville&output=embed',

  // Formato schema.org. Deixe [] se preferir não exibir horário.
  hours: [] as { days: string[]; opens: string; closes: string }[],

  // Avaliações reais do Google. Cole aqui as que a Adriana autorizar (nome, texto, nota).
  // A seção de depoimentos só aparece quando houver pelo menos uma.
  reviews: [] as { author: string; text: string; rating: number }[],
} as const

export type Site = typeof site

export const instagramUrl = `https://www.instagram.com/${site.instagram}/`
export const instagramDm = `https://ig.me/m/${site.instagram}`

export function fullAddress() {
  const a = site.address
  return [a.street, a.neighborhood, `${a.city} - ${a.state}`, a.postalCode].filter(Boolean).join(', ')
}
