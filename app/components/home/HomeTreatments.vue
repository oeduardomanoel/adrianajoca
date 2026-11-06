<script setup lang="ts">
import { treatments } from '#shared/data/treatments'
</script>

<template>
  <section id="tratamentos" class="section treatments">
    <div class="wrap">
      <header class="t-head">
        <div>
          <p class="eyebrow" v-reveal>Tratamentos</p>
          <h2 class="h2" v-reveal="'lines'">
            <span class="split-line"><span>O que dá para</span></span>
            <span class="split-line"><span style="--d: 110ms"><em>cuidar por aqui</em></span></span>
          </h2>
        </div>
        <p class="lead" v-reveal="{ delay: 200 }">
          Rosto e corpo, sempre com indicação feita depois da avaliação. Escolha um tratamento para ver
          como funciona, para quem é e o que esperar dos dias seguintes.
        </p>
      </header>

      <ol class="t-list">
        <li v-for="(t, i) in treatments" :key="t.slug" v-reveal="{ delay: i * 70 }">
          <NuxtLink :to="`/tratamentos/${t.slug}`" class="t-row">
            <span class="t-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="t-name">{{ t.name }}</span>
            <span class="t-line">{{ t.line }}</span>
            <span class="t-meta" aria-hidden="true">
              <span class="t-cat">{{ t.category }}</span>
              <span class="t-cta">Ver tratamento</span>
            </span>
            <span class="t-arrow"><AppIcon name="arrow-up-right" /></span>
          </NuxtLink>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.t-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 2rem 4rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}
.t-head .h2 { margin-top: 1.2rem; }

.t-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }

.t-row {
  position: relative;
  display: grid;
  grid-template-columns: 3.5rem 1.25fr 1.5fr 9rem 3rem;
  grid-template-areas: 'num name line meta arrow';
  align-items: center;
  gap: 1.5rem;
  padding: clamp(1.5rem, 3vw, 2.3rem) 0;
  border-bottom: 1px solid var(--line);
  isolation: isolate;
  transition: opacity 0.6s var(--ease);
}

/* Fundo areia que sobe de baixo, como uma cortina */
.t-row::before {
  content: '';
  position: absolute;
  inset: -1px calc(var(--gutter) * -0.5);
  z-index: -1;
  background: var(--sand);
  border-radius: 14px;
  clip-path: inset(100% 0 0 0 round 14px);
  transition: clip-path 0.75s var(--ease);
}

/* Linha fina que cresce sob o nome */
.t-name::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.35rem;
  width: 100%;
  height: 1px;
  background: var(--clay);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s var(--ease) 0.08s;
}

.t-num {
  grid-area: num;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--clay-deep);
  transition: transform 0.6s var(--ease);
}
.t-name {
  position: relative;
  grid-area: name;
  justify-self: start;
  font-family: var(--serif);
  font-size: clamp(1.9rem, 3.6vw, 3.1rem);
  line-height: 1;
  color: var(--espresso);
  transition: transform 0.7s var(--ease), color 0.5s;
}
.t-line {
  grid-area: line;
  color: var(--muted);
  font-size: 0.98rem;
  max-width: 30em;
  transition: color 0.5s, transform 0.7s var(--ease);
}

/* Categoria sai, "Ver tratamento" entra no mesmo lugar */
.t-meta {
  grid-area: meta;
  justify-self: end;
  position: relative;
  display: grid;
  overflow: hidden;
  height: 1.9rem;
}
.t-cat, .t-cta {
  grid-area: 1 / 1;
  align-self: center;
  justify-self: end;
  white-space: nowrap;
  transition: transform 0.6s var(--ease), opacity 0.4s;
}
.t-cat {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px var(--line-strong);
}
.t-cta {
  font-size: 0.88rem;
  font-weight: 450;
  color: var(--espresso);
  transform: translateY(110%);
  opacity: 0;
}

.t-arrow {
  grid-area: arrow;
  justify-self: end;
  width: 46px; height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  transition: background 0.45s, color 0.45s, box-shadow 0.45s, transform 0.7s var(--ease);
}
.t-arrow svg { width: 18px; height: 18px; }

/* ---- Estados de hover e foco ---- */
@media (hover: hover) {
  .t-list:has(.t-row:hover) .t-row:not(:hover) :is(.t-name, .t-line) { opacity: 0.5; }
}
.t-name, .t-line { transition: opacity 0.5s var(--ease), transform 0.7s var(--ease), color 0.5s; }
.t-row:hover::before, .t-row:focus-visible::before { clip-path: inset(0 0 0 0 round 14px); }
.t-row:hover .t-name, .t-row:focus-visible .t-name { transform: translateX(0.8rem); color: var(--clay-deep); }
.t-row:hover .t-name::after, .t-row:focus-visible .t-name::after { transform: scaleX(1); }
.t-row:hover .t-num, .t-row:focus-visible .t-num { transform: translateX(0.3rem); }
.t-row:hover .t-line, .t-row:focus-visible .t-line { color: var(--ink); transform: translateX(0.4rem); }
.t-row:hover .t-cat, .t-row:focus-visible .t-cat { transform: translateY(-110%); opacity: 0; }
.t-row:hover .t-cta, .t-row:focus-visible .t-cta { transform: none; opacity: 1; }
.t-row:hover .t-arrow, .t-row:focus-visible .t-arrow {
  background: var(--espresso);
  color: var(--ivory);
  box-shadow: none;
  transform: rotate(45deg);
}
.t-row:focus-visible { outline: none; }

@media (max-width: 900px) {
  .t-head { grid-template-columns: 1fr; }
  .t-row {
    grid-template-columns: 2.2rem 1fr 2.6rem;
    grid-template-areas:
      'num name arrow'
      '. line line'
      '. meta meta';
    gap: 0.5rem 0.8rem;
    align-items: start;
    padding: 1.5rem 0;
  }
  .t-num { padding-top: 0.55rem; }
  .t-name { font-size: 1.85rem; }
  .t-line { font-size: 0.93rem; line-height: 1.5; }
  .t-meta { justify-self: start; margin-top: 0.2rem; }
  .t-cat, .t-cta { justify-self: start; }
  .t-cat { font-size: 0.6rem; }
  .t-arrow { width: 38px; height: 38px; }
  .t-row:active::before { clip-path: inset(0 0 0 0 round 14px); }
}
</style>
