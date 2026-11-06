<script setup lang="ts">
import { site } from '#shared/data/site'

const { href, track } = useBooking()
const badge = ref<SVGElement | null>(null)

onMounted(() => {
  if (prefersReducedMotion()) return
  onScrollFrame(() => {
    if (badge.value) badge.value.style.transform = `rotate(${window.scrollY * 0.12}deg)`
  })
})
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow" v-reveal="{ type: 'fade', delay: 100 }">Glória · Joinville / SC</p>

        <h1 class="hero-title" v-reveal="'lines'">
          <span class="split-line"><span style="--d: 150ms">Estética facial</span></span>
          <span class="split-line"><span style="--d: 260ms"><em>e corporal</em> com</span></span>
          <span class="split-line"><span style="--d: 370ms">olhar de biomédica.</span></span>
        </h1>

        <p class="lead hero-lead" v-reveal="{ delay: 520 }">
          A Adriana Joca é biomédica esteta ({{ site.council }}). Antes de qualquer agulha, ácido ou aparelho,
          ela olha a sua pele de perto e explica o que faz sentido para você.
        </p>

        <div class="hero-actions" v-reveal="{ delay: 640 }">
          <a :href="href()" target="_blank" rel="noopener" class="btn" @click="track('hero')">
            Agendar minha avaliação <AppIcon name="arrow" class="btn-icon" />
          </a>
          <NuxtLink to="/#tratamentos" class="link-line">Ver tratamentos</NuxtLink>
        </div>

        <div class="hero-proof" v-reveal="{ type: 'fade', delay: 800 }">
          <img src="/img/avatar.webp" alt="" width="280" height="280" class="hero-avatar">
          <p>
            <strong>+1.500 pessoas</strong> acompanham os bastidores<br>
            no Instagram <a :href="`https://www.instagram.com/${site.instagram}/`" target="_blank" rel="noopener">@{{ site.instagram }}</a>
          </p>
        </div>
      </div>

      <div class="hero-visual">
        <div class="frame frame--arch hero-main" v-reveal="{ type: 'clip', delay: 200 }">
          <img
            v-parallax="-0.06"
            src="/img/adriana-perfil-luz.webp"
            alt="Adriana Joca, biomédica esteta, em sua sala de atendimento com luz natural"
            width="558" height="744" fetchpriority="high"
          >
        </div>

        <div class="frame hero-small" v-reveal="{ type: 'scale', delay: 650 }" v-parallax="0.1">
          <img src="/img/dermapen.webp" alt="Caneta de microagulhamento nas mãos da Adriana" width="556" height="672" loading="lazy">
        </div>

        <div class="hero-badge" v-reveal="{ type: 'fade', delay: 900 }">
          <svg ref="badge" viewBox="0 0 200 200" class="hero-badge-ring" aria-hidden="true">
            <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#circ">Biomédica esteta · {{ site.council }} · Joinville ·</textPath></text>
          </svg>
          <span class="hero-badge-core">AJ</span>
        </div>
      </div>
    </div>

    <a href="#manifesto" class="hero-scroll" aria-label="Rolar para baixo">
      <span />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  padding-top: clamp(7rem, 14vh, 9.5rem);
  padding-bottom: 5rem;
  display: flex;
  align-items: center;
  background:
    radial-gradient(60% 50% at 82% 30%, rgba(217, 183, 164, 0.45), transparent 70%),
    radial-gradient(40% 40% at 10% 90%, rgba(234, 223, 206, 0.9), transparent 70%),
    var(--cream);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
}
.hero-title {
  font-size: var(--fs-hero);
  line-height: 0.95;
  margin: 1.6rem 0 2rem;
  letter-spacing: -0.03em;
}
.hero-lead { margin-bottom: 2.4rem; }
.hero-actions { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
.hero-proof {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 3rem;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--muted);
}
.hero-proof p { margin: 0; }
.hero-proof strong { color: var(--espresso); font-weight: 500; }
.hero-proof a { color: var(--clay-deep); }
.hero-proof a:hover { text-decoration: underline; }
.hero-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 3px var(--cream), 0 0 0 4px var(--rose);
}

.hero-visual { position: relative; padding: 0 0 3rem 3rem; }
.hero-main { aspect-ratio: 3 / 4; box-shadow: 0 40px 80px -40px rgba(87, 55, 38, 0.45); }
.hero-main img { scale: 1.12; }
.hero-small {
  position: absolute;
  left: -1rem;
  bottom: 0;
  width: 40%;
  aspect-ratio: 4 / 5;
  border: 6px solid var(--cream);
  border-radius: 14px;
  box-shadow: 0 30px 50px -30px rgba(42, 32, 26, 0.5);
}
.hero-badge {
  position: absolute;
  top: 6%;
  right: -2.2rem;
  width: 132px; height: 132px;
  display: grid;
  place-items: center;
}
.hero-badge-ring {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  font-family: var(--sans);
  font-size: 13.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  fill: var(--espresso);
}
.hero-badge-core {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--espresso);
  color: var(--ivory);
  display: grid;
  place-items: center;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.5rem;
}
.hero-scroll {
  position: absolute;
  left: 50%;
  bottom: 1.6rem;
  width: 1px;
  height: 56px;
  background: var(--line);
  overflow: hidden;
}
.hero-scroll span {
  position: absolute;
  inset: 0;
  background: var(--clay);
  animation: drip 2.2s var(--ease-in-out) infinite;
}
@keyframes drip {
  0% { transform: translateY(-100%); }
  60%, 100% { transform: translateY(100%); }
}

@media (max-width: 900px) {
  .hero { min-height: auto; padding-top: 7.5rem; }
  .hero-grid { grid-template-columns: 1fr; }
  .hero-visual { max-width: 420px; width: 88%; margin: 1rem auto 0; padding: 0 0 2.5rem 2rem; }
  .hero-badge { right: -1.2rem; width: 104px; height: 104px; }
  .hero-badge-core { width: 50px; height: 50px; font-size: 1.2rem; }
  .hero-scroll { display: none; }
}
</style>
