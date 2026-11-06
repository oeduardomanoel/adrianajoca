<script setup lang="ts">
defineProps<{ name: 'arrow' | 'arrow-up-right' | 'whatsapp' | 'instagram' | 'pin' | 'plus' | 'menu' | 'close' | 'chat' | 'star' }>()
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <template v-if="name === 'arrow'"><path d="M4 12h15M13 6l6 6-6 6" /></template>
    <template v-else-if="name === 'arrow-up-right'"><path d="M7 17 17 7M8 7h9v9" /></template>
    <template v-else-if="name === 'whatsapp'">
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5v.4c0 .5-.3 1-.8 1.2-.8.3-1.8.3-3-.3-1.9-.9-3.5-2.6-4.3-4.3-.5-1-.6-2-.4-2.9z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'instagram'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'pin'"><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></template>
    <template v-else-if="name === 'plus'"><path d="M12 5v14M5 12h14" /></template>
    <template v-else-if="name === 'menu'"><path d="M4 9h16M4 15h16" /></template>
    <template v-else-if="name === 'close'"><path d="M6 6l12 12M18 6 6 18" /></template>
    <template v-else-if="name === 'chat'"><path d="M4 5.5h16v10H9l-5 4z" /></template>
    <template v-else-if="name === 'star'"><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" fill="currentColor" stroke="none" /></template>
  </svg>
</template>
