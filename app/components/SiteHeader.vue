<script setup lang="ts">
const { href, track } = useBooking()
const open = ref(false)
const hidden = ref(false)
const solid = ref(false)
const route = useRoute()

const links = [
  { label: 'Tratamentos', to: '/#tratamentos' },
  { label: 'Como funciona', to: '/#como-funciona' },
  { label: 'Sobre a Adriana', to: '/#sobre' },
  { label: 'Dúvidas', to: '/#duvidas' },
]

let last = 0
onMounted(() => {
  onScrollFrame(() => {
    const y = window.scrollY
    solid.value = y > 40
    hidden.value = !open.value && y > 400 && y > last
    last = y
  })
})

watch(() => route.fullPath, () => { open.value = false })
watch(open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
  const { $lenis } = useNuxtApp()
  v ? $lenis?.stop() : $lenis?.start()
})
</script>

<template>
  <header class="header" :class="{ 'is-hidden': hidden, 'is-solid': solid || open, 'is-open': open }">
    <div class="wrap header-in">
      <NuxtLink to="/" class="logo" aria-label="Adriana Joca Estética, página inicial">
        <BrandMark />
      </NuxtLink>

      <nav class="nav" aria-label="Principal">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
      </nav>

      <div class="header-cta">
        <a :href="href()" target="_blank" rel="noopener" class="btn btn-sm" @click="track('header')">
          Agendar avaliação
        </a>
        <button class="burger" :aria-expanded="open" aria-controls="menu-mobile" @click="open = !open">
          <span class="sr-only">{{ open ? 'Fechar menu' : 'Abrir menu' }}</span>
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-show="open" id="menu-mobile" class="menu">
        <nav class="wrap menu-in" aria-label="Menu">
          <NuxtLink
            v-for="(l, i) in links" :key="l.to" :to="l.to" class="menu-link"
            :style="{ '--i': i }" @click="open = false"
          >
            <span class="menu-num">0{{ i + 1 }}</span>{{ l.label }}
          </NuxtLink>
          <a :href="href()" target="_blank" rel="noopener" class="btn menu-btn" @click="track('menu')">
            Agendar avaliação <AppIcon name="arrow" class="btn-icon" />
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  transition: transform 0.6s var(--ease), background-color 0.4s, box-shadow 0.4s;
}
.header.is-solid {
  background: color-mix(in srgb, var(--cream) 82%, transparent);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  box-shadow: 0 1px 0 var(--line);
}
.header.is-hidden { transform: translateY(-100%); }
.header-in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: 78px;
}
.logo { position: relative; z-index: 2; }
.nav { display: flex; gap: 2.2rem; }
.nav-link {
  position: relative;
  font-size: 0.9rem;
  color: var(--ink);
  padding: 0.3rem 0;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 1px;
  background: var(--clay);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease);
}
.nav-link:hover::after { transform: scaleX(1); }
.nav-link:hover { color: var(--clay-deep); }
.header-cta { display: flex; align-items: center; gap: 0.75rem; }
.btn-sm { padding: 0.8rem 1.3rem; font-size: 0.85rem; }
.burger {
  display: none;
  width: 46px; height: 46px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  place-items: center;
}
.burger svg { width: 20px; height: 20px; }

.menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: var(--cream);
  padding-top: 110px;
}
.menu-in { display: flex; flex-direction: column; }
.menu-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--line);
  font-family: var(--serif);
  font-size: clamp(2rem, 9vw, 2.8rem);
  color: var(--espresso);
  transition: transform 0.7s var(--ease) calc(var(--i) * 60ms), opacity 0.7s var(--ease) calc(var(--i) * 60ms);
}
.menu-num { font-family: var(--sans); font-size: 0.75rem; color: var(--clay); letter-spacing: 0.1em; }
.menu-btn { margin-top: 2rem; align-self: flex-start; }
.menu-enter-active, .menu-leave-active { transition: opacity 0.4s var(--ease); }
.menu-enter-from, .menu-leave-to { opacity: 0; }
.menu-enter-from .menu-link { transform: translateY(24px); opacity: 0; }

@media (max-width: 960px) {
  .nav { display: none; }
  .burger { display: grid; }
}
@media (max-width: 520px) {
  .header-cta .btn-sm { display: none; }
  .header-in { height: 68px; }
}
</style>
