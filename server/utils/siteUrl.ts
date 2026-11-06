import type { H3Event } from 'h3'

export function siteUrlFrom(event: H3Event) {
  return String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
}
