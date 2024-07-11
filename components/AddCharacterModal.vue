<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters'
import { useDeckStore } from '@/stores/deck'
import moment from 'moment'
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';

const props = defineProps<{
  isVisible: boolean
}>()

const emits = defineEmits(['close', 'fullDeck'])

const charStore = useCharactersStore()
const deckStore = useDeckStore()
const deck = computed(() => deckStore.getDeck)
const charCount = computed(() => charStore.getCount)

const character = ref({
  id: charCount.value + 1,
  name: '',
  image: '',
  status: '',
  species: '',
  location: {
    name: '',
    url: ''
  },
  gender: '',
  created: ''
})

// Custom validator for specific rules
const capitalAndSpecialChars = (value) => {
  if (!value) return true;
  const lengthValid = value.length >= 3 && value.length <= 80;
  const firstLetterCapital = /^[A-Z]/.test(value);
  const validChars = /^[A-Za-z0-9-& ()]+$/.test(value);

  return lengthValid && firstLetterCapital && validChars;
};

function isHttpsUrl(input) {
  // Regular expression pattern to match HTTPS URLs
  const regex = /^https:\/\/.+/i;

  // Test the input against the regex pattern
  return regex.test(input);
}

const rules = {
  name: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(80),
    capitalAndSpecialChars
  },

  image: {
    isHttpsUrl
  },
};

const v$ = useVuelidate(rules, character.value);

const nameError = computed(() => {
  if (v$.value.name.required.$invalid) return 'Name is required.';
  if (v$.value.name.minLength.$invalid) return 'Name must be at least 3 characters.';
  if (v$.value.name.maxLength.$invalid) return 'Name must be at most 80 characters.';
  if (v$.value.name.capitalAndSpecialChars.$invalid) return 'Name must start with a capital letter and contain only allowed special characters: - & ( ).';
});

const imageError = computed(() => {
  if (v$.value.image.isHttpsUrl.$invalid) return 'Image url must be https'
})


const submitForm = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    character.value.created = moment().format()
    if (deck.value.length < 8) deckStore.createCharacter(character.value)
    else {
      emits('fullDeck', true)
      emits('close')
    }
    emits('close')
  } else {
    alert('Please correct the errors in the form.');
  }
};
</script>

<template>
  <div v-if="isVisible" id="crud-modal" tabindex="-1" aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-slate-950/80 flex justify-center items-center w-full md:inset-0 h-screen max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 class="text-lg font-semibold text-gray-900">
            Create new character
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-toggle="crud-modal" @click="emits('close')">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
        <!-- Modal body -->
        <form ref="form" class="p-4 md:p-5" @submit.prevent="submitForm">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input v-model="character.name" type="text" name="name" id="name"
                :class="[{ 'border-red-500': v$.name.$error }, 'border-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5']"
                placeholder="Type name" />
              <span v-if="v$.name.$error" class="text-red-500">{{ nameError }}</span>
            </div>
            <div class="col-span-2">
              <label for="image" class="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
              <input v-model="character.image" type="text" name="image" id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type image URL" required>
              <span v-if="v$.image.$error" class="text-red-500">{{ imageError }}</span>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Status</label>
              <select v-model="character.status" id="status"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                <option value="">Select status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="species" class="block mb-2 text-sm font-medium text-gray-900">Species</label>
              <input v-model="character.species" type="text" name="species" id="species"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type species" required>
            </div>
            <div class="col-span-2">
              <label for="location" class="block mb-2 text-sm font-medium text-gray-900">Location</label>
              <input v-model="character.location.name" type="text" name="location" id="location"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type location" required>
            </div>
            <div class="col-span-2">
              <label for="gender" class="block mb-2 text-sm font-medium text-gray-900">Gender</label>
              <select v-model="character.gender" id="gender"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
          <button type="submit"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add new character
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
