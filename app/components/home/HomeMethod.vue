<script setup lang="ts">
const { href, track } = useBooking()

const steps = [
  {
    title: 'Você chama',
    text: 'Pelo WhatsApp ou pelo Direct. Conta o que te incomoda com as suas palavras, sem precisar saber o nome de nenhum tratamento.',
  },
  {
    title: 'Avaliação',
    text: 'A Adriana analisa a sua pele de perto e pergunta da rotina, dos produtos que você usa e do que já tentou. É a etapa mais importante de todas.',
  },
  {
    title: 'Plano sob medida',
    text: 'Você sai entendendo o que vai ser feito, quantas sessões fazem sentido e quais cuidados levar para casa. Tudo explicado antes de começar.',
  },
  {
    title: 'Acompanhamento',
    text: 'A cada sessão a pele é reavaliada e o protocolo ajustado. Fotos ajudam a enxergar a evolução que o espelho às vezes esconde.',
  },
]

const list = ref<HTMLElement | null>(null)
const progress = useSectionProgress(list)
const fill = computed(() => Math.min(1, Math.max(0, (progress.value - 0.25) / 0.5)))
</script>

<template>
  <section id="como-funciona" class="section method">
    <div class="wrap method-grid">
      <div class="method-side">
        <div class="method-sticky">
          <p class="eyebrow" v-reveal>Como funciona</p>
          <h2 class="h2" v-reveal="'lines'">
            <span class="split-line"><span>Do primeiro oi</span></span>
            <span class="split-line"><span style="--d: 110ms">ao <em>resultado</em></span></span>
          </h2>
          <p class="lead" v-reveal="{ delay: 200 }">
            Sem pacote empurrado e sem protocolo de prateleira. Cada etapa existe para você tomar a decisão com calma.
          </p>
          <a v-reveal="{ delay: 300 }" :href="href()" target="_blank" rel="noopener" class="btn" @click="track('como-funciona')">
            Quero começar <AppIcon name="arrow" class="btn-icon" />
          </a>
        </div>
      </div>

      <ol ref="list" class="steps" :style="{ '--fill': fill }">
        <li v-for="(s, i) in steps" :key="s.title" class="step" :data-lit="fill * steps.length > i + 0.15 ? '' : undefined">
          <span class="step-dot"><span class="step-n">{{ i + 1 }}</span></span>
          <div v-reveal>
            <h3 class="step-title">{{ s.title }}</h3>
            <p class="step-text">{{ s.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.method { background: var(--sand); }
.method-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(3rem, 8vw, 8rem);
}
.method-sticky { position: sticky; top: 130px; display: grid; gap: 1.6rem; justify-items: start; }
.steps {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: clamp(3rem, 7vw, 5.5rem);
  padding-block: 1rem;
}
.steps::before, .steps::after {
  content: '';
  position: absolute;
  left: 27px;
  top: 0; bottom: 0;
  width: 1px;
}
.steps::before { background: var(--line-strong); }
.steps::after {
  background: var(--clay-deep);
  transform-origin: top;
  transform: scaleY(var(--fill, 0));
  transition: transform 0.25s linear;
}
.step { position: relative; display: grid; grid-template-columns: 56px 1fr; gap: 1.8rem; }
.step-dot {
  position: relative;
  z-index: 1;
  width: 56px; height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
  font-family: var(--serif);
  font-size: 1.5rem;
  background: var(--sand);
  color: var(--clay-deep);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  isolation: isolate;
}
/* Preenchimento que sobe de baixo, no mesmo ritmo da linha de progresso */
.step-dot::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--espresso);
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.8s var(--ease-in-out);
}
.step-n { transition: color 0.5s var(--ease-in-out) 0.15s; }
.step[data-lit] .step-dot::before { clip-path: inset(0 0 0 0); }
.step[data-lit] .step-n { color: var(--ivory); }
.step-title { font-size: var(--fs-h3); margin: 0.6rem 0 0.8rem; }
.step-text { color: var(--muted); max-width: 32em; margin: 0; }

@media (max-width: 900px) {
  .method-grid { grid-template-columns: 1fr; }
  .method-sticky { position: static; }
}
</style>
