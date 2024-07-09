<script setup lang="ts">
  import { useCharactersStore } from '@/stores/characters'

  const charStore = useCharactersStore()
  const chars = computed(() => charStore.getCharacters.slice(0, 8))
const num = ref(8)
</script>

<template>
  <div class="flex flex-row my-8 justify-center items-center">
    <div class="grid grid-cols-8 gap-4 bg-gray-100 p-4 rounded-lg">
      <div v-for="char in chars" class="w-52 max-w-sm bg-white border border-gray-200 rounded-lg">
        <div>
          <img class="rounded-t-lg w-52" :src="char.image" alt="" />
        </div>
        <div class="p-5">
          <a href="#">
            <h5 class="text-lg font-bold text-gray-900">{{ char.name }}</h5>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
