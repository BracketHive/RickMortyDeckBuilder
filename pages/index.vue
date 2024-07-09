<script setup lang="ts">
useHead({
  title: 'Rick & Morty Deck Builder',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
})
</script>

<template>
  <div>
    <Search /> 
    <CardGrid class="my-20" />
  </div>
</template>
