<script setup lang="ts">
// Botão fixo de agendamento. Aparece depois que a pessoa passa do topo
// e some quando o bloco final de agendamento está visível (para não duplicar).
const { href, track, hasWhatsapp } = useBooking()
const show = ref(false)

onMounted(() => {
  onScrollFrame(() => {
    const y = window.scrollY
    const booking = document.getElementById('agendar')
    let covering = false
    if (booking) {
      const r = booking.getBoundingClientRect()
      covering = r.top < window.innerHeight * 0.85 && r.bottom > 0
    }
    show.value = y > window.innerHeight * 0.7 && !covering
  })
})
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
  transition: transform 0.7s var(--ease), opacity 0.5s;
  pointer-events: none;
}
.float.is-on { transform: none; opacity: 1; pointer-events: auto; }
.float-btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.5rem 1.4rem 0.5rem 0.5rem;
  border-radius: 999px;
  background: var(--espresso);
  color: var(--ivory);
  font-size: 0.92rem;
  box-shadow: 0 18px 40px -18px rgba(31, 24, 20, 0.7);
  transition: background 0.4s, transform 0.5s var(--ease);
}
.float-btn:hover { background: var(--clay-deep); transform: translateY(-3px); }
.float-icon {
  display: grid;
  place-items: center;
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--clay);
}
.float-icon svg { width: 22px; height: 22px; }
@media (max-width: 640px) {
  .float { left: 1rem; right: 1rem; }
  .float-btn { justify-content: center; padding: 0.5rem; }
  .float-label { padding-right: 0.8rem; }
}
</style>
