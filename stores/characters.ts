import { defineStore } from "pinia";
import type { Character } from "@/types";
import { getCharacters, getRandomNumCharacters, filterCharacters } from "@/api/character"

export interface CharactersState {
  characters: Character[],
  charCount: number
}

export interface CharactersGetters {
  getCharacters: (state: CharactersState) => Character[],
  getCount: (state: CharactersState) => number
}

export interface CharactersActions {
  countCharacters: () => void,
  loadRandomNumCharacters: () => Character[],
  searchCharacters: (param?: string, value?: string) => Character[],
  clearCharacters: () => void,
}

export const useCharactersStore = defineStore<string, CharactersState, CharactersGetters, CharactersActions>('characters', {
  state: () => {
    return {
      characters: [],
      charCount: 0
    }
  },
  getters: {
    getCharacters(state: CharactersState) {
      return state.characters;
    },

    getCount(state: CharactersState) {
      return state.charCount
    },
  },
  actions: {
    async countCharacters() {
      const { data, error } = await getCharacters();
      if (data) {
        // @ts-ignore
         this.charCount = data.info.count;
      }
      if (error) console.log(error)
    },

    async loadRandomNumCharacters() {
      const randomNums = []
      if(this.charCount === 0) {
        await this.countCharacters()
      }

      for (let i = 0; i < 9; i++) {
        randomNums.push(Math.floor(Math.random() * this.charCount) + 1)
      }

      const { data, error } = await getRandomNumCharacters(randomNums);
      if (data) this.characters = data;
      if (error) console.log(error)
    },

    clearCharacters() {
      this.characters = []
    },

    async searchCharacters(param?: string, value?: string) {
      const { data, error } = await filterCharacters(param, value);
      if (error) console.log(error)
      if (data) {
          for (let i = 0; i < data.length; i++) {
            this.characters.push(data[i])
          }
      }
    },
  },

  persist: {
    paths: ['charCount']
  },
})
