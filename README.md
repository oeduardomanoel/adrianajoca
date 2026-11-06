# Adriana Joca Estética

Site da Adriana Joca, biomédica esteta (CRBM-5 015629) em Joinville. Feito em Nuxt 4, com todas as páginas pré-renderizadas (HTML estático) e pronto para a Vercel.

## Rodar local

```bash
npm install
npm run dev
```

## Publicar na Vercel

1. Importe o repositório na Vercel. O framework (Nuxt) é detectado sozinho.
2. Em **Settings → Environment Variables**, cadastre:
   - `NUXT_PUBLIC_SITE_URL` com o domínio final, sem barra no fim (ex.: `https://adrianajoca.com.br`)
   - `NUXT_PUBLIC_WHATSAPP` com o número, só dígitos, com 55 e DDD (ex.: `5547999998888`)
3. Faça o deploy. Se mudar alguma variável, rode um novo deploy, porque o sitemap e o canonical são gerados no build.

Sem `NUXT_PUBLIC_WHATSAPP`, os botões de agendamento abrem o Direct do Instagram. Sem `NUXT_PUBLIC_SITE_URL`, o site usa o domínio de produção da Vercel.

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| WhatsApp, endereço, horários, avaliações do Google, Facebook | `shared/data/site.ts` |
| Tratamentos (textos, indicações, cuidados, perguntas) | `shared/data/treatments.ts` |
| Perguntas frequentes da home | `shared/data/faq.ts` |
| Fotos | `public/img/` |

A seção de depoimentos só aparece quando houver avaliações reais em `site.reviews`.

## Pendências antes de ir ao ar

- [x] Número do WhatsApp (em `shared/data/site.ts`; confirme se falta o 9 depois do DDD)
- [ ] Endereço completo e CEP (`site.address`) e coordenadas (`site.geo`)
- [ ] Horário de atendimento (`site.hours`)
- [ ] Trocar as fotos de `public/img/` pelas originais em alta resolução, com os mesmos nomes. As atuais foram recortadas dos prints do Instagram
- [ ] Revisar com a Adriana o texto de **Lábios** e **Ventosaterapia** (confirmar quais protocolos ela faz)
- [ ] Colar 3 a 6 avaliações reais do Google em `site.reviews`

## Link da bio do Instagram

`/links` é a página de links para a bio, no estilo Linktree, com a mesma identidade do site. `/bio` redireciona para ela.

Para medir quem vem do Instagram, use na bio: `https://SEU-DOMINIO/links?utm_source=instagram&utm_medium=bio`

## SEO e GEO

- Meta tags, Open Graph e canonical em todas as páginas
- JSON-LD: `BeautySalon`, `Person` (com o registro no CRBM), `Service` por tratamento, `FAQPage` e `BreadcrumbList`
- `/sitemap.xml` com imagens, `/robots.txt` liberando buscadores e IAs (GPTBot, ClaudeBot, PerplexityBot etc.)
- `/llms.txt` e `/llms-full.txt` no padrão llmstxt.org, para assistentes de IA entenderem e citarem o negócio
- Uma página por tratamento (`/tratamentos/microagulhamento` etc.), focada em busca local "tratamento + Joinville"

## Estrutura

```
app/
  components/        header, footer, botão flutuante, bloco de agendamento
  components/home/   seções da página inicial
  composables/       agendamento (WhatsApp/Instagram), schema.org, scroll
  plugins/           animações de scroll (v-reveal, v-parallax) e Lenis
  pages/             home, /tratamentos e /tratamentos/[slug]
server/routes/       robots.txt, sitemap.xml, llms.txt, llms-full.txt
shared/data/         todo o conteúdo editável
```

As animações respeitam `prefers-reduced-motion` e, sem JavaScript, todo o conteúdo aparece normalmente.
