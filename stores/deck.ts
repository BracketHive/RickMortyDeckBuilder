import { defineStore } from "pinia";
import type { Character } from "@/types";
import { getCharacters } from "@/api/character"

export interface DeckState {
  deck: Character[],
  dragging: boolean
}

export interface DeckGetters {
  getDeck: (state: DeckState) => Character[],
  setDragging: (state: DeckState) => (v: boolean) => void,
  getDragging: (state: DeckState) => boolean
}

export interface DeckActions {
  loadDeck: () => void,
  modifyDeck: (task: string, action: any) => void
}

export const useDeckStore = defineStore<string, DeckState, DeckGetters, DeckActions>('deck', {
  state: () => {
    return {
      deck: [],
      dragging: false
    }
  },
  getters: {
    getDeck(state: DeckState) {
      return state.deck;
    },

    setDragging: (state: DeckState) => (v: boolean) => state.dragging = v,

    getDragging(state: DeckState) {
      return state.dragging
    },
  },
  actions: {
    async loadDeck() {
      const { data, error } = await getCharacters();
      if (data && this.deck.length === 0) this.deck = data.splice(0, 8);
      if (error) console.log(error)
    },

    modifyDeck(task: string, action: any) {
      if (task === 'added') this.deck.splice(action.newIndex, 0, action.element)
      if (task === 'moved') this.deck.splice(action.newIndex, 0, this.deck.splice(action.oldIndex, 1)[0])
      if (task === 'removed') this.deck.splice(action.oldIndex, 1)
    }
  },
  persist: {
    paths: ['deck']
  },
})
