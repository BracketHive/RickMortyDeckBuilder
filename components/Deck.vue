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
    <Alert :is-visible="deckIsFull" text="Adding failed! Cannot add new item, the deck is full" />
    <Draggable v-model="chars" item-key="id" group="deck" class="grid grid-cols-4 xl:grid-cols-8 gap-4 w-10/12 lg:w-10/12 bg-gray-100 p-4 rounded-lg" @change="adjustDeck" @start="deckStore.setDragging(true)" @end="deckStore.setDragging(false)">
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
  </div>
</template>
