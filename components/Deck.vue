<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useDeckStore } from '@/stores/deck'

const deckStore = useDeckStore()
const chars = computed(() => deckStore.getDeck)
const deckIsFull = ref(false)

const adjustDeck = (e) => {
  if (Object.keys(e)[0] === 'added' && chars.value.length === 8) {
    deckIsFull.value = true
    setTimeout(() => {
      deckIsFull.value = false
    }, 3000)
  }
  else {
    deckIsFull.value = false
    deckStore.modifyDeck(Object.keys(e)[0], e[Object.keys(e)[0]])
  }
}

onMounted(() => {
  deckStore.loadDeck()
})
</script>

<template>
  <div class="flex flex-row my-8 justify-center items-center">
    <Draggable v-model="chars" item-key="id" group="deck"
      class="grid grid-cols-4 xl:grid-cols-8 gap-4 w-10/12 lg:w-10/12 bg-gray-100 p-4 rounded-lg" @change="adjustDeck" @start="deckStore.setDragging(true)" @end="deckStore.setDragging(false)">
      <template #item="{ element: char }">
        <div class="w-auto max-w-sm bg-white border border-gray-200 rounded-lg">
          <div>
            <img class="rounded-t-lg w-auto" :src="char.image" alt="" />
          </div>
          <div class="p-5">
            <div>
              <h5 class="text-lg font-bold text-gray-900">{{ char.name }}</h5>
            </div>
          </div>
        </div>
      </template>
    </Draggable>
    <div v-if="deckIsFull"
      class="absolute top-4 right-4 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
      <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium text-xl">Adding failed! Cannot add new item, the deck is full</span>
      </div>
    </div>
  </div>
</template>
