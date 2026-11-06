import { site, instagramDm } from '#shared/data/site'

const DEFAULT_MSG = 'Oi, Adriana! Vim pelo site e queria agendar uma avaliação.'

export function useBooking() {
  const config = useRuntimeConfig()
  const number = String(config.public.whatsapp || site.whatsapp || '').replace(/\D/g, '')
  const hasWhatsapp = number.length >= 12

  function href(message = DEFAULT_MSG) {
    return hasWhatsapp
      ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
      : instagramDm
  }

  function track(label: string) {
    if (import.meta.server) return
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
    w.dataLayer?.push({ event: 'agendamento_click', label, canal: hasWhatsapp ? 'whatsapp' : 'instagram' })
    w.gtag?.('event', 'agendamento_click', { label })
  }

  return {
    href,
    track,
    hasWhatsapp,
    channel: hasWhatsapp ? 'WhatsApp' : 'Direct do Instagram',
  }
}
