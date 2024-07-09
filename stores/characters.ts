import { defineStore } from "pinia";
import type { Character } from "@/types";
import { getCharacters, getRandomNumCharacters } from "@/api/character"

export interface CharactersState {
  characters: Character[],
}

export interface CharactersGetters {

}

export interface CharactersActions {
  loadCharacters: () => void,
  loadRandomNumCharacters: (num: number[]) => Character[]
}

export const useCharactersStore = defineStore<string, CharactersState, CharactersGetters, CharactersActions>('characters', {
  state: () => {
    return {
      characters: [],
    }
  },
  getters: {

  },
  actions: {
    async loadCharacters () {
      const { data, error } = await getCharacters();
      if (data) this.characters = data;
      console.log('Characters: ', data)
      if (error) console.log(error)
    },

    async loadRandomNumCharacters (num: number[]) {
      const { data, error } = await getRandomNumCharacters(num);
      if (data) this.characters = data;
      if (error) console.log(error)
    },
  },
  persist: {

  },
})
