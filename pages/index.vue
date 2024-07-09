<script setup lang="ts">
  import { useCharactersStore } from '@/stores/characters'
useHead({
  title: 'Rick & Morty Deck Builder',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
})

const charStore = useCharactersStore();
const charStoreData = computed(() => charStore.loadCharacters())
console.log(charStoreData.value.results)
</script>

<template>
  <h1>Hello</h1>
</template>
