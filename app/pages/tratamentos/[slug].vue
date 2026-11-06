<script setup lang="ts">
import { site } from '#shared/data/site'
import { getTreatment, treatments } from '#shared/data/treatments'

const route = useRoute()
const t = getTreatment(String(route.params.slug))
if (!t) throw createError({ statusCode: 404, statusMessage: 'Tratamento não encontrado', fatal: true })

const url = useSiteUrl()
const { href, track } = useBooking()
const others = treatments.filter(x => x.slug !== t.slug)
const path = `/tratamentos/${t.slug}`
// Evita repetir a mesma foto no topo e na seção "depois da sessão"
const afterImg = t.image === '/img/adriana-sorriso.webp' ? '/img/adriana-perfil-luz.webp' : '/img/adriana-sorriso.webp'

useSeoMeta({
  title: t.seoTitle,
  description: t.seoDescription,
  ogTitle: `${t.seoTitle} | Adriana Joca`,
  ogDescription: t.seoDescription,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}${path}#servico`,
        name: t.name,
        serviceType: t.name,
        category: `Estética ${t.category.toLowerCase()}`,
        description: t.seoDescription,
        url: `${url}${path}`,
        image: `${url}${t.image}`,
        provider: { '@id': `${url}/#negocio` },
        areaServed: { '@type': 'City', name: 'Joinville' },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema(url, [
        { name: 'Início', path: '/' },
        { name: 'Tratamentos', path: '/tratamentos' },
        { name: t.name, path },
      ])),
    },
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema(t.faq)) },
  ],
})
</script>

<template>
  <article v-if="t" class="tp">
    <header class="tp-hero">
      <div class="wrap tp-hero-grid">
        <div class="tp-hero-copy">
          <nav class="crumbs" aria-label="Você está em" v-reveal="'fade'">
            <NuxtLink to="/">Início</NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/tratamentos">Tratamentos</NuxtLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{{ t.name }}</span>
          </nav>
          <p class="eyebrow" v-reveal="{ type: 'fade', delay: 80 }">Estética {{ t.category.toLowerCase() }} · Joinville</p>
          <h1 class="tp-title" v-reveal="'lines'">
            <span class="split-line"><span style="--d: 120ms">{{ t.name }}</span></span>
            <span class="split-line"><span style="--d: 220ms"><em>em Joinville</em></span></span>
          </h1>
          <p class="lead" v-reveal="{ delay: 300 }">{{ t.line }}</p>
          <div class="tp-actions" v-reveal="{ delay: 400 }">
            <a :href="href(t.message)" target="_blank" rel="noopener" class="btn" @click="track(`tratamento:${t.slug}`)">
              Agendar avaliação <AppIcon name="arrow" class="btn-icon" />
            </a>
            <a href="#pra-quem" class="link-line">Pra quem é indicado</a>
          </div>
        </div>
        <div class="frame frame--arch tp-hero-img" v-reveal="{ type: 'clip', delay: 150 }">
          <img v-parallax="-0.06" :src="t.image" :alt="t.imageAlt" width="558" height="700" fetchpriority="high">
        </div>
      </div>
    </header>

    <section class="section tp-intro">
      <div class="wrap tp-narrow">
        <p v-for="(p, i) in t.intro" :key="i" class="tp-intro-p" :class="{ 'is-first': i === 0 }" v-reveal="{ delay: i * 100 }">{{ p }}</p>
      </div>
    </section>

    <section id="pra-quem" class="section tp-for">
      <div class="wrap tp-split">
        <div>
          <p class="eyebrow" v-reveal>Indicação</p>
          <h2 class="h2" v-reveal="'lines'">
            <span class="split-line"><span>Para quem</span></span>
            <span class="split-line"><span style="--d: 100ms"><em>costuma ser</em></span></span>
          </h2>
          <p class="tp-note" v-reveal="{ delay: 150 }">A indicação final sempre sai da avaliação. Esses são os casos mais comuns.</p>
        </div>
        <ul class="tp-list">
          <li v-for="(f, i) in t.forWho" :key="f" v-reveal="{ delay: i * 70 }">
            <span class="tp-list-n">{{ String(i + 1).padStart(2, '0') }}</span>{{ f }}
          </li>
        </ul>
      </div>
    </section>

    <section class="section tp-session">
      <div class="wrap">
        <p class="eyebrow" v-reveal>Passo a passo</p>
        <h2 class="h2" v-reveal="'lines'">
          <span class="split-line"><span>Como é a <em>sessão</em></span></span>
        </h2>
        <ol class="tp-steps">
          <li v-for="(s, i) in t.session" :key="s.title" class="tp-step" v-reveal="{ delay: i * 90 }">
            <span class="tp-step-n">{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section tp-after">
      <div class="wrap tp-split">
        <div class="frame tp-after-img" v-reveal="'clip'">
          <img :src="afterImg" alt="Adriana Joca em sua sala de atendimento" width="558" height="692" loading="lazy">
        </div>
        <div>
          <p class="eyebrow" v-reveal>Depois da sessão</p>
          <h2 class="h2" v-reveal="'lines'">
            <span class="split-line"><span>O que esperar</span></span>
            <span class="split-line"><span style="--d: 100ms"><em>nos dias seguintes</em></span></span>
          </h2>
          <ul class="tp-care">
            <li v-for="(a, i) in t.after" :key="a" v-reveal="{ delay: i * 70 }">{{ a }}</li>
          </ul>
          <p class="tp-note" v-reveal>Você recebe as orientações certinhas para o seu caso no dia do atendimento.</p>
        </div>
      </div>
    </section>

    <section class="section tp-faq">
      <div class="wrap tp-split">
        <div>
          <p class="eyebrow" v-reveal>Dúvidas</p>
          <h2 class="h2" v-reveal="'lines'">
            <span class="split-line"><span>Sobre {{ t.name.toLowerCase() }}</span></span>
          </h2>
        </div>
        <FaqList :items="t.faq" />
      </div>
    </section>

    <section class="section tp-more">
      <div class="wrap">
        <p class="eyebrow" v-reveal>Veja também</p>
        <div class="more-grid">
          <NuxtLink v-for="(o, i) in others" :key="o.slug" :to="`/tratamentos/${o.slug}`" class="more-card" v-reveal="{ delay: i * 70 }">
            <div class="frame more-img"><TreatmentVisual :treatment="o" :index="i" /></div>
            <span class="more-cat">{{ o.category }}</span>
            <span class="more-name">{{ o.name }} <AppIcon name="arrow-up-right" /></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <BookingBlock :preselect="t.slug" />

    <p class="sr-only">{{ site.name }}, {{ site.role }} {{ site.council }}, Glória, Joinville, SC.</p>
  </article>
</template>

<style scoped>
.tp-hero {
  padding: clamp(8rem, 16vh, 10rem) 0 clamp(3rem, 6vw, 5rem);
  background: radial-gradient(55% 55% at 85% 25%, rgba(217, 183, 164, 0.45), transparent 70%), var(--cream);
}
.tp-hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; }
.crumbs { display: flex; flex-wrap: wrap; gap: 0.6rem; font-size: 0.82rem; color: var(--muted); margin-bottom: 2rem; }
.crumbs a:hover { color: var(--clay-deep); }
.crumbs [aria-current] { color: var(--espresso); }
.tp-title { font-size: clamp(3rem, 8vw, 7rem); line-height: 0.95; letter-spacing: -0.03em; margin: 1.3rem 0 1.8rem; }
.tp-actions { display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; margin-top: 2.2rem; }
.tp-hero-img { aspect-ratio: 4 / 5; box-shadow: 0 40px 80px -40px rgba(87, 55, 38, 0.45); }
.tp-hero-img img { scale: 1.12; }

.tp-narrow { max-width: 900px; }
.tp-intro-p { font-size: clamp(1.15rem, 1.6vw, 1.4rem); line-height: 1.6; color: var(--muted); }
.tp-intro-p.is-first {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 3.4vw, 2.8rem);
  line-height: 1.2;
  color: var(--espresso);
  margin-bottom: 1.6rem;
}

.tp-for { background: var(--ivory); }
.tp-split { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 3rem clamp(3rem, 8vw, 7rem); align-items: start; }
.tp-split .h2 { margin-top: 1.2rem; }
.tp-note { margin-top: 1.6rem; color: var(--muted); font-size: 0.95rem; max-width: 26em; }
.tp-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.tp-list li {
  display: flex;
  gap: 1.4rem;
  padding: 1.35rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 1.12rem;
  color: var(--espresso);
  transition: padding 0.5s var(--ease), color 0.3s;
}
.tp-list li:hover { padding-left: 0.6rem; color: var(--clay-deep); }
.tp-list-n { font-size: 0.75rem; color: var(--clay); padding-top: 0.35rem; letter-spacing: 0.1em; }

.tp-session .h2 { margin: 1.2rem 0 3.5rem; }
.tp-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.2rem;
}
.tp-step {
  padding: 2rem 1.8rem 2.2rem;
  border-radius: var(--radius);
  background: var(--ivory);
  box-shadow: inset 0 0 0 1px var(--line);
  transition: transform 0.6s var(--ease), background 0.5s, box-shadow 0.6s;
}
.tp-step:hover { transform: translateY(-8px); background: var(--sand); box-shadow: 0 30px 50px -35px rgba(42, 32, 26, 0.45); }
.tp-step-n {
  display: grid;
  place-items: center;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--espresso);
  color: var(--ivory);
  font-family: var(--serif);
  font-size: 1.25rem;
  margin-bottom: 1.6rem;
}
.tp-step h3 { font-size: 1.6rem; margin-bottom: 0.7rem; }
.tp-step p { margin: 0; color: var(--muted); font-size: 0.98rem; }

.tp-after { background: var(--sand); }
.tp-after-img { aspect-ratio: 4 / 5; max-width: 460px; }
.tp-care { list-style: none; padding: 0; margin: 2.2rem 0 0; display: grid; gap: 1rem; }
.tp-care li { position: relative; padding-left: 1.8rem; color: var(--ink); }
.tp-care li::before {
  content: '';
  position: absolute;
  left: 0; top: 0.7em;
  width: 0.8rem; height: 1px;
  background: var(--clay-deep);
}

.more-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
}
.more-card { display: grid; gap: 0.6rem; }
.more-img { aspect-ratio: 4 / 5; }
.more-img :deep(img), .more-img :deep(.tv-card) { transition: transform 1.2s var(--ease); }
.more-card:hover .more-img :deep(img), .more-card:hover .more-img :deep(.tv-card) { transform: scale(1.06); }
.more-img :deep(.tv-name) { font-size: 1.7rem; }
.more-img :deep(.tv-initial) { font-size: 11rem; }
.more-img :deep(.tv-cat) { display: none; }
.more-cat { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay-deep); margin-top: 0.4rem; }
.more-name { display: flex; align-items: center; gap: 0.4rem; font-family: var(--serif); font-size: 1.5rem; color: var(--espresso); line-height: 1.1; }
.more-name svg { width: 16px; height: 16px; opacity: 0; transform: translate(-6px, 6px); transition: all 0.5s var(--ease); }
.more-card:hover .more-name svg { opacity: 1; transform: none; }

@media (max-width: 1000px) {
  .more-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
}
@media (max-width: 900px) {
  .tp-hero-grid, .tp-split { grid-template-columns: 1fr; }
  .tp-hero-img { max-width: 380px; width: 85%; }
}
</style>
