<script setup lang="ts">
import type { Character } from '@/types'
const props = defineProps<{
  isVisible: boolean,
  char?: Character
}>()

const emits = defineEmits(['close'])
</script>

<template>
  <div v-if="isVisible" id="default-modal" tabindex="-1" aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-slate-950/20 flex justify-center items-center w-full md:inset-0 h-screen max-h-full">
    <div class="flex justify-center items-center w-11/12 max-w-2xl">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow w-11/12">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 class="text-2xl font-semibold text-gray-900">{{ char.name }}</h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="default-modal" @click="emits('close')">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->

        <div href="#" class="flex flex-col items-start rounded-lg p-4 bg-white md:flex-row md:max-w-xl">
          <img class="object-cover w-full h-96 md:h-auto md:w-48" :src="char.image" alt="">
          <div class="flex flex-col justify-between p-4 leading-normal">
            <div class="flex justify-start items-center flex-row">
              <span
                :class="[{ 'bg-green-500': char.status === 'Alive', 'bg-red-500': char.status === 'Dead', 'bg-gray-300': char.status === 'unknown' }, 'flex w-3 h-3 me-3 rounded-full']"></span>
              <p>{{ char.status }} - {{ char.species }}</p>
            </div>
            <p class="text-gray-500 mt-3">Origin:</p>
            <h2 class="text-lg">{{ char.origin.name }}</h2>
            <p class="text-gray-500 mt-3">Location:</p>
            <h2 class="text-lg">{{ char.location.name }}</h2>
            <p class="text-gray-500 mt-3">Gender:</p>
            <h2 class="text-lg">{{ char.gender }}</h2>
            <p class="text-gray-500 mt-3">Episodes:</p>
            <div>
              <span v-for="(episode, index) in char.episode" class="text-lg">{{ episode.split('episode/')[1] }}<span v-if="index !== char.episode.length - 1">, </span></span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>
