<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters'
import type { Character } from '@/types'

const charStore = useCharactersStore()

const characters = computed(() => charStore.getCharacters)

const loading = ref(false)
const timeout = ref(0)
const showModal = ref(false)
const selectedChar = ref()

const toggleModal = (char: Character) => {
  showModal.value = !showModal.value
  selectedChar.value = char
}

// Getting characters and calculating the time that shuffle is disabled
const shuffleChars = async () => {
  loading.value = true
  await charStore.loadRandomNumCharacters().then(() => {
    loading.value = false
  })

  timeout.value = 15
  let intervalId = setInterval(() => timeout.value -= 1, 1000);

  setTimeout(function () {
    clearInterval(intervalId);
  }, 15000);
}

onMounted(() => {
  charStore.loadRandomNumCharacters();
})
</script>

<template>
  <div class="flex flex-col justify-center items-center w-auto">
    <button :disabled="timeout" type="button"
      :class="[{ 'cursor-not-allowed': timeout, 'bg-blue-300': timeout }, 'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-1 my-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900']"
      @click="shuffleChars">
      <span v-if="!loading">{{ timeout !== 0 ? timeout : '' }} Shuffle</span>
      <span v-if="loading">
        <Spinner />
        Shuffling...
      </span>
    </button>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="char in characters">
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
          <img class="object-fill w-full rounded-t-lg h-100 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            :src="char.image" alt="">
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer hover:text-purple-700" @click="toggleModal(char)">{{ char.name }}</h5>
            <div class="flex justify-start items-center flex-row">
              <span
                :class="[{ 'bg-green-500': char.status === 'Alive', 'bg-red-500': char.status === 'Dead', 'bg-gray-300': char.status === 'unknown' }, 'flex w-3 h-3 me-3 rounded-full']"></span>
              <p>{{ char.status }} - {{ char.species }}</p>
            </div>
            <p class="text-gray-500 mt-3">Origin:</p>
            <h2 class="text-lg">{{ char.origin.name }}</h2>
            <p class="text-gray-500 mt-3">Location:</p>
            <h2 class="text-lg">{{ char.location.name }}</h2>
          </div>
        </div>
      </div>

      <Modal :is-visible="showModal" :char="selectedChar" @close="toggleModal()" />
    </div>
  </div>
</template>
