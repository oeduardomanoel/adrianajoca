<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)
useSeoMeta({ title: is404.value ? 'Página não encontrada' : 'Algo deu errado', robots: 'noindex' })
</script>

<template>
  <div>
    <SiteHeader />
    <main class="err wrap">
      <p class="eyebrow">Erro {{ error?.statusCode }}</p>
      <h1 class="err-title">{{ is404 ? 'Essa página' : 'Algo' }} <em>{{ is404 ? 'não existe' : 'deu errado' }}</em></h1>
      <p class="lead">{{ is404 ? 'O link pode ter mudado. Os tratamentos e o agendamento estão na página inicial.' : 'Tente de novo em alguns instantes.' }}</p>
      <button class="btn" @click="clearError({ redirect: '/' })">Voltar para o início</button>
    </main>
  </div>
</template>

<style scoped>
.err { min-height: 90vh; display: grid; align-content: center; justify-items: start; gap: 1.6rem; padding-top: 6rem; }
.err-title { font-size: clamp(3rem, 9vw, 7rem); line-height: 0.95; }
</style>
