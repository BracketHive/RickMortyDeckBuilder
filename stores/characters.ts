import { defineStore } from "pinia";
import type { Character } from "@/types";
import { getCharacters, getRandomNumCharacters } from "@/api/character"

export interface CharactersState {
  characters: Character[],
}

export interface CharactersGetters {
  getCharacters: (state: CharactersState) => Character[]
}

export interface CharactersActions {
  loadCharacters: () => void,
  loadRandomNumCharacters: () => Character[]
}

export const useCharactersStore = defineStore<string, CharactersState, CharactersGetters, CharactersActions>('characters', {
  state: () => {
    return {
      characters: [],
    }
  },
  getters: {
    getCharacters(state: CharactersState) {
      return state.characters;
    }
  },
  actions: {
    async loadCharacters() {
      const { data, error } = await getCharacters();
      if (data) this.characters = data;
      if (error) console.log(error)
    },

    async loadRandomNumCharacters() {
      const randomNums = []
      for (let i = 0; i < 9; i++) {
        randomNums.push(Math.floor(Math.random() * 826) + 1)
      }

      const { data, error } = await getRandomNumCharacters(randomNums);
      if (data) this.characters = data;
      if (error) console.log(error)
    },
  },
})
