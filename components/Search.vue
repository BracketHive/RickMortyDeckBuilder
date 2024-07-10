<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters'

const charStore = useCharactersStore()
const characters = computed(() => charStore.getCharacters)

const searchQuery = ref('')

const getFilteredCharacters = () => {
  let query = searchQuery.value.toLowerCase()

  // Call search api after 3 characters are typed
  if (searchQuery.value.length > 2) {
    charStore.clearCharacters()
    charStore.searchCharacters('name', searchQuery.value)
    if (['alive', 'dead', 'unknown'].includes(query)) charStore.searchCharacters('status', searchQuery.value)
    charStore.searchCharacters('species', searchQuery.value)
    charStore.searchCharacters('type', searchQuery.value)
    if (['male', 'female', 'genderless', 'unknown'].includes(query)) charStore.searchCharacters('gender', searchQuery.value)
  }
  else if (searchQuery.value.length === 0) {
    charStore.loadRandomNumCharacters();
  }
}
</script>

<template>
  <form class="max-w-md mx-auto mt-5">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input v-model="searchQuery" type="search" id="default-search"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
        placeholder="Search haracters..." required @input="getFilteredCharacters" />
    </div>
  </form>
</template>
