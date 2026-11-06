import { site, instagramUrl, fullAddress } from '#shared/data/site'
import { treatments } from '#shared/data/treatments'
import { faq } from '#shared/data/faq'

export default defineEventHandler((event) => {
  const url = siteUrlFrom(event)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const body = treatments.map(t => `## ${t.name} (estética ${t.category.toLowerCase()})

URL: ${url}/tratamentos/${t.slug}

${t.intro.join('\n\n')}

### Para quem costuma ser indicado
${t.forWho.map(f => `- ${f}`).join('\n')}

### Como é a sessão
${t.session.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

### Depois da sessão
${t.after.map(a => `- ${a}`).join('\n')}

### Perguntas frequentes
${t.faq.map(f => `**${f.q}**\n${f.a}`).join('\n\n')}
`).join('\n')

  return `# ${site.name}: conteúdo completo

> ${site.professional}, ${site.role.toLowerCase()} (${site.council}). Estética facial e corporal em ${fullAddress()}. Instagram: ${instagramUrl}

Observação: a indicação de qualquer tratamento depende de avaliação presencial. Resultados variam de pessoa para pessoa.

# Perguntas gerais

${faq.map(f => `**${f.q}**\n${f.a}`).join('\n\n')}

# Tratamentos

${body}`
})
