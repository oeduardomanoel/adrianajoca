<script setup lang="ts">
import { site, fullAddress } from '#shared/data/site'
import { treatments } from '#shared/data/treatments'

const props = defineProps<{ preselect?: string }>()
const { href, track, hasWhatsapp, channel } = useBooking()

const options = [...treatments.map(t => ({ value: t.slug, label: t.name })), { value: 'nao-sei', label: 'Ainda não sei' }]
const chosen = ref<string>(props.preselect ?? '')

const message = computed(() => {
  const t = treatments.find(x => x.slug === chosen.value)
  if (t) return t.message
  if (chosen.value === 'nao-sei') return 'Oi, Adriana! Vim pelo site. Ainda não sei qual tratamento é o ideal para mim e queria agendar uma avaliação.'
  return 'Oi, Adriana! Vim pelo site e queria agendar uma avaliação.'
})

const mapOn = ref(false)
</script>

<template>
  <section id="agendar" class="booking">
    <div class="wrap booking-grid">
      <div class="booking-main">
        <p class="eyebrow eyebrow--light" v-reveal>Agendamento</p>
        <h2 class="h2 booking-title" v-reveal="'lines'">
          <span class="split-line"><span>Vamos olhar a sua</span></span>
          <span class="split-line"><span style="--d: 110ms">pele <em>de perto?</em></span></span>
        </h2>

        <fieldset class="chips" v-reveal="{ delay: 150 }">
          <legend>O que te trouxe até aqui?</legend>
          <label v-for="o in options" :key="o.value" class="chip" :class="{ 'is-on': chosen === o.value }">
            <input v-model="chosen" type="radio" name="interesse" :value="o.value" class="sr-only">
            {{ o.label }}
          </label>
        </fieldset>

        <div class="booking-cta" v-reveal="{ delay: 250 }">
          <a :href="href(message)" target="_blank" rel="noopener" class="btn btn--light btn-big" @click="track(`agendar:${chosen || 'geral'}`)">
            <AppIcon :name="hasWhatsapp ? 'whatsapp' : 'instagram'" class="btn-icon" />
            Chamar no {{ channel }}
          </a>
          <p v-if="hasWhatsapp" class="booking-note">A mensagem já vai escrita. É só enviar.</p>
          <p v-else class="booking-note">Você cai direto na conversa com a Adriana.</p>
        </div>
      </div>

      <aside class="place" v-reveal="{ type: 'scale', delay: 200 }">
        <div class="map">
          <iframe
            v-if="mapOn" :src="site.mapsEmbed" title="Mapa com a localização da Adriana Joca Estética"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen
          />
          <button v-else class="map-load" @click="mapOn = true">
            <span class="map-pin"><AppIcon name="pin" /></span>
            <span>Carregar mapa</span>
          </button>
        </div>
        <div class="place-info">
          <p class="place-label">Onde fica</p>
          <p class="place-addr">{{ fullAddress() }}</p>
          <a :href="site.mapsUrl" target="_blank" rel="noopener" class="link-line">
            Abrir rota no Google Maps <AppIcon name="arrow-up-right" style="width: 1em; height: 1em" />
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.booking {
  position: relative;
  background:
    radial-gradient(50% 60% at 85% 20%, rgba(168, 114, 90, 0.35), transparent 70%),
    var(--night);
  color: rgba(251, 248, 243, 0.75);
  padding-block: clamp(5rem, 11vw, 9rem);
  overflow: hidden;
}
.booking-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(3rem, 7vw, 6rem);
  align-items: center;
}
.eyebrow--light { color: var(--rose); }
.booking-title { color: var(--ivory); margin: 1.2rem 0 2.6rem; }
.booking-title :deep(em) { color: var(--rose); }

.chips { border: 0; padding: 0; margin: 0 0 2.6rem; display: flex; flex-wrap: wrap; gap: 0.6rem; }
.chips legend { font-size: 0.95rem; margin-bottom: 1.1rem; color: rgba(251, 248, 243, 0.85); }
.chip {
  cursor: pointer;
  padding: 0.65rem 1.15rem;
  border-radius: 999px;
  font-size: 0.92rem;
  box-shadow: inset 0 0 0 1px rgba(251, 248, 243, 0.25);
  transition: background 0.35s, color 0.35s, box-shadow 0.35s, transform 0.4s var(--ease);
  user-select: none;
}
.chip:hover { box-shadow: inset 0 0 0 1px var(--rose); color: var(--ivory); transform: translateY(-2px); }
.chip.is-on { background: var(--rose); color: var(--espresso); box-shadow: none; }
.chip:has(input:focus-visible) { outline: 2px solid var(--rose); outline-offset: 3px; }

.booking-cta { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
.btn-big { padding: 1.2rem 2rem; font-size: 1rem; }
.booking-note { margin: 0; font-size: 0.88rem; color: rgba(251, 248, 243, 0.55); }

.place {
  border-radius: var(--radius);
  overflow: hidden;
  background: rgba(251, 248, 243, 0.05);
  box-shadow: inset 0 0 0 1px rgba(251, 248, 243, 0.12);
}
.map { aspect-ratio: 4 / 3; position: relative; }
.map iframe { width: 100%; height: 100%; border: 0; filter: grayscale(0.4) sepia(0.15); }
.map-load {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.8rem;
  color: var(--ivory);
  font-size: 0.9rem;
  background:
    radial-gradient(circle at 1px 1px, rgba(251, 248, 243, 0.14) 1px, transparent 0) 0 0 / 18px 18px,
    linear-gradient(135deg, rgba(168, 114, 90, 0.35), rgba(31, 24, 20, 0.2));
  transition: background-color 0.4s;
}
.map-pin {
  width: 58px; height: 58px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--ivory);
  color: var(--clay-deep);
  transition: transform 0.6s var(--ease);
}
.map-pin svg { width: 26px; height: 26px; }
.map-load:hover .map-pin { transform: translateY(-6px) scale(1.06); }
.place-info { padding: 1.8rem; }
.place-label { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.5rem; }
.place-addr { font-family: var(--serif); font-size: 1.6rem; line-height: 1.2; color: var(--ivory); margin-bottom: 1.2rem; }
.place .link-line { color: var(--ivory); font-size: 0.92rem; }

@media (max-width: 900px) {
  .booking-grid { grid-template-columns: 1fr; }
}
</style>
