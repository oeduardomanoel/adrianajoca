<script setup lang="ts">
// Botão fixo de agendamento.
// Aparece depois do topo, some enquanto o CTA do bloco de agendamento ou o rodapé
// estão na tela (para não duplicar e não sumir no fundo escuro) e, no celular,
// se recolhe enquanto a pessoa rola para baixo lendo.
const { href, track, hasWhatsapp } = useBooking()
const pastHero = ref(false)
const covered = ref(false)
const reading = ref(false)
const show = computed(() => pastHero.value && !covered.value && !reading.value)

const route = useRoute()
let io: IntersectionObserver | null = null
const visible = new Set<Element>()

function observe() {
  io?.disconnect()
  visible.clear()
  covered.value = false
  io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
    covered.value = visible.size > 0
  })
  document.querySelectorAll('.booking-cta, .footer').forEach(el => io!.observe(el))
}

onMounted(() => {
  const mobile = window.matchMedia('(max-width: 640px)')
  let last = window.scrollY
  let idle: ReturnType<typeof setTimeout> | undefined
  onScrollFrame(() => {
    const y = window.scrollY
    pastHero.value = y > window.innerHeight * 0.7
    if (mobile.matches) {
      if (y > last + 4) reading.value = true
      else if (y < last - 4) reading.value = false
      clearTimeout(idle)
      idle = setTimeout(() => { reading.value = false }, 900)
    }
    else {
      reading.value = false
    }
    last = y
  })
  observe()
})

watch(() => route.path, () => nextTick(observe))
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div class="float" :class="{ 'is-on': show }">
    <a :href="href()" target="_blank" rel="noopener" class="float-btn" @click="track('flutuante')">
      <span class="float-icon"><AppIcon :name="hasWhatsapp ? 'whatsapp' : 'instagram'" /></span>
      <span class="float-label">Agendar avaliação</span>
    </a>
  </div>
</template>

<style scoped>
.float {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 90;
  transform: translateY(140%);
  opacity: 0;
  transition: transform 0.6s var(--ease), opacity 0.4s;
  pointer-events: none;
}
.float.is-on { transform: none; opacity: 1; pointer-events: auto; }
.float-btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.45rem 1.3rem 0.45rem 0.45rem;
  border-radius: 999px;
  background: var(--espresso);
  color: var(--ivory);
  font-size: 0.92rem;
  box-shadow: 0 18px 40px -18px rgba(31, 24, 20, 0.7);
  transition: background 0.4s, transform 0.5s var(--ease);
}
.float-btn:is(:hover, :focus-visible) { background: var(--clay-deep); transform: translateY(-3px); }
.float-icon {
  display: grid;
  place-items: center;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--clay);
}
.float-icon svg { width: 21px; height: 21px; }
</style>
