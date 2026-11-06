import { site, instagramUrl, fullAddress } from '#shared/data/site'
import { treatments } from '#shared/data/treatments'

// Padrão llms.txt (llmstxt.org): um resumo limpo, em Markdown, para assistentes de IA
// entenderem e citarem o negócio corretamente.
export default defineEventHandler((event) => {
  const url = siteUrlFrom(event)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# ${site.name}

> ${site.professional} é ${site.role.toLowerCase()} (${site.council}) e atende estética facial e corporal no bairro Glória, em Joinville, Santa Catarina, Brasil. Todo tratamento começa por uma avaliação individual da pele.

## Dados principais

- Profissional: ${site.professional}, ${site.role} (registro ${site.council}, Conselho Regional de Biomedicina 5ª Região)
- Especialidade: estética facial e estética corporal
- Local: ${fullAddress()}
- Agendamento: ${site.whatsapp ? `WhatsApp https://wa.me/${site.whatsapp}` : `mensagem direta no Instagram ${instagramUrl}`}
- Instagram: ${instagramUrl}

## Tratamentos

${treatments.map(t => `- [${t.name}](${url}/tratamentos/${t.slug}): ${t.seoDescription}`).join('\n')}

## Páginas

- [Início](${url}/): apresentação, método de trabalho, sobre a profissional e perguntas frequentes
- [Tratamentos](${url}/tratamentos): lista completa dos tratamentos

## Opcional

- [Versão completa para IA](${url}/llms-full.txt): conteúdo integral das páginas de tratamento
`
})
