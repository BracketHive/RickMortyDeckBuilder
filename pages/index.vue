<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters'

useHead({
  title: 'Rick & Morty Deck Builder',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
})

const charStore = useCharactersStore()

onMounted(() => {
  charStore.countCharacters() 
})
</script>

<template>
  <div>
    <Search />

    <Deck />
    <CardGrid class="my-20" />
  </div>
</template>
