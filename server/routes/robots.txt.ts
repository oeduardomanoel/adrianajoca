export default defineEventHandler((event) => {
  const url = siteUrlFrom(event)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  // Buscadores e assistentes de IA são bem-vindos: queremos ser encontrados e citados.
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# Assistentes e buscadores de IA',
    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot']
      .flatMap(bot => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${url}/sitemap.xml`,
    '',
    `# Resumo para modelos de linguagem: ${url}/llms.txt`,
    '',
  ].join('\n')
})
