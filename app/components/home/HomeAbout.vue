<script setup lang="ts">
import { site } from '#shared/data/site'
</script>

<template>
  <section id="sobre" class="section about">
    <div class="wrap about-grid">
      <div class="about-media">
        <div class="frame about-main" v-reveal="'clip'">
          <img v-parallax="-0.05" src="/img/adriana-blazer.webp" alt="Adriana Joca de blazer preto consultando um tablet" width="930" height="728" loading="lazy">
        </div>
        <figure class="about-polaroid about-polaroid--a" v-reveal="{ type: 'scale', delay: 200 }">
          <div class="frame"><img src="/img/formatura.webp" alt="Adriana Joca de beca no dia da formatura" width="498" height="744" loading="lazy"></div>
          <figcaption>Dia da formatura</figcaption>
        </figure>
        <figure class="about-polaroid about-polaroid--b" v-reveal="{ type: 'scale', delay: 350 }">
          <div class="frame"><img src="/img/bioage.webp" alt="Adriana Joca no evento de 25 anos da Bioage Skincare" width="558" height="676" loading="lazy"></div>
          <figcaption>Evento de 25 anos da Bioage</figcaption>
        </figure>
      </div>

      <div class="about-copy">
        <p class="eyebrow" v-reveal>Sobre a Adriana</p>
        <h2 class="h2" v-reveal="'lines'">
          <span class="split-line"><span>Quem cuida da</span></span>
          <span class="split-line"><span style="--d: 110ms">sua pele <em>é biomédica</em></span></span>
        </h2>
        <div class="about-text" v-reveal="{ delay: 150 }">
          <p>
            A Adriana Joca é biomédica esteta, com registro no Conselho Regional de Biomedicina ({{ site.council }}).
            Na prática, isso quer dizer formação em saúde por trás de cada procedimento: anatomia, fisiologia da pele
            e biossegurança pesando na hora de decidir o que fazer e, principalmente, o que não fazer.
          </p>
          <p>
            Ela atende no Glória, em Joinville, e segue de olho no que há de novo no setor, como no evento de 25 anos
            da Bioage Skincare. Quem acompanha o Instagram dela já viu: o procedimento aparece como ele é, da maca
            ao resultado.
          </p>
        </div>

        <dl class="about-facts" v-reveal="{ delay: 250 }">
          <div>
            <dt>Registro</dt>
            <dd>{{ site.council }}</dd>
          </div>
          <div>
            <dt>Atendimento</dt>
            <dd>Facial e corporal</dd>
          </div>
          <div>
            <dt>Onde</dt>
            <dd>Glória, Joinville</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 8vw, 7rem);
  align-items: center;
}
.about-media { position: relative; padding-bottom: 6rem; }
.about-main { aspect-ratio: 4 / 4.4; }
.about-main img { scale: 1.1; object-position: 45% 30%; }
.about-polaroid {
  position: absolute;
  margin: 0;
  padding: 0.6rem 0.6rem 0.9rem;
  background: var(--ivory);
  border-radius: 6px;
  box-shadow: 0 30px 50px -30px rgba(42, 32, 26, 0.45);
  transition: transform 0.7s var(--ease);
}
.about-polaroid .frame { border-radius: 3px; aspect-ratio: 4 / 5; }
.about-polaroid figcaption {
  margin-top: 0.6rem;
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--muted);
  text-align: center;
}
.about-polaroid--a { width: 36%; left: -4%; bottom: 0; rotate: -5deg; }
.about-polaroid--b { width: 34%; right: 6%; bottom: -2rem; rotate: 4deg; }
.about-polaroid:hover { transform: translateY(-10px) rotate(2deg); z-index: 2; }

.about-copy .h2 { margin: 1.2rem 0 2rem; }
.about-text { color: var(--muted); font-size: 1.08rem; max-width: 34em; }
.about-facts {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 1rem 2.6rem;
  margin: 2.6rem 0 0;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.about-facts dt { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay-deep); }
.about-facts dd { margin: 0.4rem 0 0; font-family: var(--serif); font-size: 1.45rem; color: var(--espresso); }

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-media { order: 2; max-width: 520px; }
  .about-facts { grid-template-columns: 1fr 1fr; }
}
</style>
