<script setup lang="ts">
import { site, instagramUrl } from '#shared/data/site'
import { treatments } from '#shared/data/treatments'

definePageMeta({ layout: 'blank' })

const url = useSiteUrl()
const { href, track, hasWhatsapp } = useBooking()
const waMessage = 'Oi, Adriana! Vim pelo Instagram e queria agendar uma avaliação.'

useSeoMeta({
  title: 'Links | Adriana Joca Estética',
  description: 'Agende sua avaliação, conheça os tratamentos e veja como chegar. Adriana Joca, biomédica esteta em Joinville.',
  ogTitle: 'Adriana Joca | Biomédica esteta em Joinville',
  ogDescription: 'Agende sua avaliação, conheça os tratamentos e veja como chegar.',
  robots: 'noindex, follow',
})

const links = [
  { to: '/tratamentos', icon: 'grid', title: 'Conheça os tratamentos', sub: 'Facial e corporal, com indicação depois da avaliação' },
  { to: '/#como-funciona', icon: 'steps', title: 'Como funciona o atendimento', sub: 'Do primeiro oi ao acompanhamento' },
  { to: '/#duvidas', icon: 'question', title: 'Dúvidas frequentes', sub: 'O que perguntam antes de marcar' },
  { href: site.mapsUrl, icon: 'pin', title: 'Como chegar', sub: `${site.address.neighborhood}, ${site.address.city}` },
] as const

// Compartilhar o próprio link (menu nativo no celular, cópia no desktop)
const copied = ref(false)
async function share() {
  const data = { title: 'Adriana Joca Estética', text: 'Biomédica esteta em Joinville', url: `${url}/links` }
  try {
    if (navigator.share) await navigator.share(data)
    else {
      await navigator.clipboard.writeText(data.url)
      copied.value = true
      setTimeout(() => (copied.value = false), 2200)
    }
  }
  catch { /* a pessoa fechou o menu de compartilhar */ }
}
</script>

<template>
  <div class="lk">
    <span class="lk-mono" aria-hidden="true">AJ</span>

    <div class="lk-col">
      <div class="lk-top" v-reveal="'fade'">
        <NuxtLink to="/" class="lk-brand" aria-label="Ir para o site">
          <span class="lk-brand-dot">AJ</span>
          <span>adrianajoca.estetica</span>
        </NuxtLink>
        <button class="lk-share" :aria-label="copied ? 'Link copiado' : 'Compartilhar esta página'" @click="share">
          <AppIcon :name="copied ? 'check' : 'share'" />
        </button>
      </div>

      <header class="lk-hero">
        <div class="lk-photo-wrap">
          <div class="frame frame--arch lk-photo" v-reveal="{ type: 'clip', delay: 100 }">
            <img
              src="/img/adriana-perfil-luz.webp" alt="Adriana Joca, biomédica esteta"
              width="558" height="744" fetchpriority="high"
            >
          </div>
          <span class="lk-badge" v-reveal="{ type: 'scale', delay: 700 }">
            <i aria-hidden="true" />{{ site.council }}
          </span>
        </div>

        <p class="eyebrow lk-eyebrow" v-reveal="{ type: 'fade', delay: 300 }">Glória · Joinville / SC</p>
        <h1 class="lk-name" v-reveal="'lines'">
          <span class="split-line"><span style="--d: 380ms">Adriana <em>Joca</em></span></span>
        </h1>
        <p class="lk-bio" v-reveal="{ delay: 500 }">
          Biomédica esteta. Estética facial e corporal, sempre com avaliação antes de qualquer protocolo.
        </p>
      </header>

      <a
        :href="href(waMessage)" target="_blank" rel="noopener" class="lk-cta"
        v-reveal="{ delay: 620 }" @click="track('bio:agendar')"
      >
        <span class="lk-cta-icon"><AppIcon :name="hasWhatsapp ? 'whatsapp' : 'instagram'" /></span>
        <span class="lk-cta-text">
          <strong>Agendar avaliação</strong>
          <small>{{ hasWhatsapp ? 'Direto com a Adriana, no WhatsApp' : 'Direto com a Adriana' }}</small>
        </span>
        <AppIcon name="arrow" class="lk-cta-arrow" />
      </a>

      <NuxtLink to="/#sobre" class="lk-feature" v-reveal="{ delay: 720 }" @click="track('bio:sobre')">
        <span class="lk-feature-img"><img src="/img/adriana-blazer.webp" alt="" width="930" height="728" loading="lazy"></span>
        <span class="lk-feature-text">
          <span class="lk-kicker">Sobre</span>
          <span class="lk-feature-title">Quem cuida da sua pele <em>é biomédica</em></span>
        </span>
        <AppIcon name="arrow-up-right" class="lk-feature-arrow" />
      </NuxtLink>

      <nav class="lk-links" aria-label="Links">
        <template v-for="(l, i) in links" :key="l.title">
          <a
            v-if="'href' in l" :href="l.href" target="_blank" rel="noopener" class="lk-link"
            v-reveal="{ delay: 800 + i * 70 }" @click="track(`bio:${l.icon}`)"
          >
            <span class="lk-link-icon"><AppIcon :name="l.icon" /></span>
            <span class="lk-link-text"><strong>{{ l.title }}</strong><small>{{ l.sub }}</small></span>
            <AppIcon name="arrow-up-right" class="lk-link-arrow" />
          </a>
          <NuxtLink
            v-else :to="l.to" class="lk-link"
            v-reveal="{ delay: 800 + i * 70 }" @click="track(`bio:${l.icon}`)"
          >
            <span class="lk-link-icon"><AppIcon :name="l.icon" /></span>
            <span class="lk-link-text"><strong>{{ l.title }}</strong><small>{{ l.sub }}</small></span>
            <AppIcon name="arrow-up-right" class="lk-link-arrow" />
          </NuxtLink>
        </template>
      </nav>

      <section class="lk-treat" aria-labelledby="lk-treat-title">
        <p id="lk-treat-title" class="lk-label" v-reveal>Tratamentos</p>
        <div class="lk-grid">
          <NuxtLink
            v-for="(t, i) in treatments" :key="t.slug" :to="`/tratamentos/${t.slug}`" class="lk-tile"
            v-reveal="{ delay: i * 60 }" @click="track(`bio:tratamento:${t.slug}`)"
          >
            <span class="lk-tile-cat">{{ t.category }}</span>
            <span class="lk-tile-name">{{ t.name }}</span>
          </NuxtLink>
        </div>
      </section>

      <footer class="lk-foot" v-reveal="'fade'">
        <NuxtLink to="/" class="link-line">Ver o site completo</NuxtLink>
        <p>{{ site.name }} · {{ site.role }} · {{ site.council }}</p>
        <a :href="instagramUrl" target="_blank" rel="noopener" class="lk-ig" aria-label="Instagram">
          <AppIcon name="instagram" />
        </a>
      </footer>
    </div>

    <Transition name="toast">
      <p v-if="copied" class="lk-toast" role="status">Link copiado</p>
    </Transition>
  </div>
</template>

<style scoped>
.lk {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  padding: max(1rem, env(safe-area-inset-top)) 1rem max(2.5rem, env(safe-area-inset-bottom));
  background:
    radial-gradient(70% 45% at 50% 18%, rgba(217, 183, 164, 0.55), transparent 70%),
    radial-gradient(60% 40% at 0% 100%, rgba(234, 223, 206, 0.95), transparent 70%),
    var(--cream);
}
/* Monograma gigante e quase invisível ao fundo, visível só em telas largas */
.lk-mono {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--serif);
  font-style: italic;
  font-size: min(68vw, 60rem);
  line-height: 1;
  color: var(--espresso);
  opacity: 0.035;
  pointer-events: none;
  user-select: none;
}
.lk-col { position: relative; max-width: 440px; margin: 0 auto; }

/* topo */
.lk-top { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0 1.4rem; }
.lk-brand { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.82rem; color: var(--muted); }
.lk-brand:hover { color: var(--espresso); }
.lk-brand-dot {
  width: 30px; height: 30px; border-radius: 50%;
  display: grid; place-items: center;
  background: var(--espresso); color: var(--ivory);
  font-family: var(--serif); font-style: italic; font-size: 0.85rem;
}
.lk-share {
  width: 40px; height: 40px; border-radius: 50%;
  display: grid; place-items: center;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  background: color-mix(in srgb, var(--ivory) 60%, transparent);
  transition: background 0.4s, color 0.4s, transform 0.5s var(--ease);
}
.lk-share svg { width: 18px; height: 18px; }
.lk-share:is(:hover, :focus-visible) { background: var(--espresso); color: var(--ivory); transform: translateY(-2px); }

/* hero */
.lk-hero { text-align: center; }
.lk-photo-wrap { position: relative; width: 184px; margin: 0 auto 1.6rem; }
.lk-photo { aspect-ratio: 4 / 5; box-shadow: 0 30px 60px -32px rgba(87, 55, 38, 0.55); }
.lk-photo img { object-position: 50% 30%; }
.lk-badge {
  position: absolute;
  left: 50%; bottom: -0.9rem;
  translate: -50% 0;
  display: inline-flex; align-items: center; gap: 0.45rem;
  white-space: nowrap;
  padding: 0.42rem 0.85rem;
  border-radius: 999px;
  background: var(--ivory);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--espresso);
  box-shadow: 0 10px 24px -14px rgba(42, 32, 26, 0.5), inset 0 0 0 1px var(--line);
}
.lk-badge i { width: 6px; height: 6px; border-radius: 50%; background: var(--clay); }
.lk-eyebrow { justify-content: center; margin-top: 0.8rem; }
.lk-name {
  font-size: clamp(2.9rem, 13vw, 3.6rem);
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0.9rem 0 0.9rem;
}
.lk-bio { color: var(--muted); font-size: 0.98rem; line-height: 1.6; max-width: 30ch; margin: 0 auto 1.8rem; }

/* CTA principal */
.lk-cta {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.65rem 1.2rem 0.65rem 0.65rem;
  border-radius: 999px;
  background: var(--espresso);
  color: var(--ivory);
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 20px 40px -22px rgba(31, 24, 20, 0.8);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.lk-cta::before {
  content: '';
  position: absolute; inset: 0; z-index: -1;
  background: var(--clay-deep);
  transform: translateX(-101%);
  transition: transform 0.7s var(--ease);
}
/* brilho discreto que passa de tempos em tempos, chamando o olho para o botão principal */
.lk-cta::after {
  content: '';
  position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(105deg, transparent 40%, rgba(255, 240, 225, 0.16) 50%, transparent 60%);
  background-size: 250% 100%;
  animation: glint 5.5s var(--ease-in-out) 2.2s infinite;
}
@keyframes glint {
  0% { background-position: 130% 0; }
  30%, 100% { background-position: -30% 0; }
}
.lk-cta:is(:hover, :focus-visible)::before { transform: none; }
.lk-cta:is(:hover, :focus-visible) { transform: translateY(-2px); box-shadow: 0 26px 46px -24px rgba(135, 85, 63, 0.9); }
.lk-cta:active { transform: scale(0.98); }
.lk-cta-icon {
  flex: none;
  width: 48px; height: 48px; border-radius: 50%;
  display: grid; place-items: center;
  background: var(--clay);
}
.lk-cta-icon svg { width: 24px; height: 24px; }
.lk-cta-text { display: grid; gap: 0.1rem; flex: 1; min-width: 0; }
.lk-cta-text strong { font-weight: 500; font-size: 1.02rem; letter-spacing: 0.01em; }
.lk-cta-text small { font-size: 0.76rem; color: rgba(251, 248, 243, 0.65); }
.lk-cta-arrow { width: 20px; height: 20px; flex: none; transition: transform 0.5s var(--ease); }
.lk-cta:hover .lk-cta-arrow { transform: translateX(4px); }

/* card em destaque */
.lk-feature {
  display: flex; align-items: center; gap: 0.9rem;
  margin-top: 0.8rem;
  padding: 0.6rem 1rem 0.6rem 0.6rem;
  border-radius: 20px;
  background: var(--ivory);
  box-shadow: inset 0 0 0 1px var(--line);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.lk-feature:is(:hover, :focus-visible) { transform: translateY(-2px); box-shadow: inset 0 0 0 1px var(--line-strong), 0 20px 36px -26px rgba(42, 32, 26, 0.45); }
.lk-feature-img { flex: none; width: 74px; height: 74px; border-radius: 14px; overflow: hidden; background: var(--sand); }
.lk-feature-img img { width: 100%; height: 100%; object-fit: cover; object-position: 42% 25%; transition: transform 1s var(--ease); }
.lk-feature:hover .lk-feature-img img { transform: scale(1.08); }
.lk-feature-text { flex: 1; display: grid; gap: 0.25rem; }
.lk-kicker { font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--clay-deep); }
.lk-feature-title { font-family: var(--serif); font-size: 1.32rem; line-height: 1.1; color: var(--espresso); }
.lk-feature-title em { color: var(--clay-deep); }
.lk-feature-arrow { width: 18px; height: 18px; flex: none; color: var(--muted); transition: transform 0.5s var(--ease), color 0.3s; }
.lk-feature:hover .lk-feature-arrow { transform: rotate(45deg); color: var(--espresso); }

/* lista de links */
.lk-links { margin-top: 1.6rem; border-top: 1px solid var(--line); }
.lk-link {
  position: relative;
  display: flex; align-items: center; gap: 0.9rem;
  padding: 0.95rem 0.2rem;
  border-bottom: 1px solid var(--line);
  isolation: isolate;
}
.lk-link::before {
  content: '';
  position: absolute; inset: 0 -0.6rem; z-index: -1;
  border-radius: 14px;
  background: var(--sand);
  clip-path: inset(100% 0 0 0 round 14px);
  transition: clip-path 0.6s var(--ease);
}
.lk-link:is(:hover, :focus-visible)::before, .lk-link:active::before { clip-path: inset(0 0 0 0 round 14px); }
.lk-link-icon {
  flex: none;
  width: 40px; height: 40px; border-radius: 50%;
  display: grid; place-items: center;
  color: var(--clay-deep);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  transition: background 0.4s, color 0.4s, box-shadow 0.4s;
}
.lk-link-icon svg { width: 18px; height: 18px; }
.lk-link:is(:hover, :focus-visible) .lk-link-icon { background: var(--espresso); color: var(--ivory); box-shadow: none; }
.lk-link-text { flex: 1; display: grid; gap: 0.1rem; min-width: 0; }
.lk-link-text strong { font-weight: 450; color: var(--espresso); font-size: 0.98rem; }
.lk-link-text small { font-size: 0.78rem; color: var(--muted); }
.lk-link-arrow { width: 16px; height: 16px; flex: none; color: var(--muted); transition: transform 0.5s var(--ease), color 0.3s; }
.lk-link:is(:hover, :focus-visible) .lk-link-arrow { transform: translate(2px, -2px); color: var(--espresso); }
.lk-link:focus-visible, .lk-tile:focus-visible, .lk-feature:focus-visible, .lk-cta:focus-visible { outline: 2px solid var(--clay); outline-offset: 3px; }

/* grade de tratamentos */
.lk-treat { margin-top: 2.2rem; }
.lk-label {
  font-size: 0.68rem; letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--clay-deep); text-align: center; margin-bottom: 1rem;
}
.lk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.lk-tile {
  position: relative;
  display: grid; gap: 0.3rem;
  min-height: 92px;
  align-content: end;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: color-mix(in srgb, var(--ivory) 70%, transparent);
  box-shadow: inset 0 0 0 1px var(--line);
  overflow: hidden;
  isolation: isolate;
  transition: color 0.45s, transform 0.5s var(--ease), box-shadow 0.45s;
}
.lk-tile::before {
  content: '';
  position: absolute; inset: 0; z-index: -1;
  background: var(--espresso);
  clip-path: circle(0% at 100% 0%);
  transition: clip-path 0.7s var(--ease);
}
.lk-tile:is(:hover, :focus-visible)::before, .lk-tile:active::before { clip-path: circle(150% at 100% 0%); }
.lk-tile:is(:hover, :focus-visible) { color: var(--ivory); transform: translateY(-2px); box-shadow: none; }
.lk-tile-cat { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay-deep); transition: color 0.45s; }
.lk-tile:is(:hover, :focus-visible) .lk-tile-cat { color: var(--rose); }
.lk-tile-name { font-family: var(--serif); font-size: clamp(1.08rem, 4.4vw, 1.28rem); line-height: 1.05; color: inherit; }
.lk-tile:not(:hover):not(:focus-visible) .lk-tile-name { color: var(--espresso); }

/* rodapé */
.lk-foot { margin-top: 2.4rem; display: grid; justify-items: center; gap: 0.9rem; text-align: center; }
.lk-foot p { margin: 0; font-size: 0.72rem; color: var(--muted); letter-spacing: 0.04em; }
.lk-ig {
  width: 38px; height: 38px; border-radius: 50%;
  display: grid; place-items: center;
  color: var(--muted);
  box-shadow: inset 0 0 0 1px var(--line);
  transition: color 0.3s, box-shadow 0.3s;
}
.lk-ig svg { width: 18px; height: 18px; }
.lk-ig:hover { color: var(--espresso); box-shadow: inset 0 0 0 1px var(--line-strong); }

.lk-toast {
  position: fixed;
  left: 50%; bottom: max(1.2rem, env(safe-area-inset-bottom));
  translate: -50% 0;
  margin: 0;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  background: var(--espresso);
  color: var(--ivory);
  font-size: 0.85rem;
}
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s, transform 0.4s var(--ease); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }

@media (min-width: 720px) {
  .lk { padding-top: 2.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .lk-cta::after { animation: none; }
}
</style>
