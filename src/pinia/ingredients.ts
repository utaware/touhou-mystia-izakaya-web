import { defineStore } from 'pinia'

import { ingredients, type TIngredientsItem } from '@/material'

export { type TIngredientsItem }

export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    ingredients
  }),
  getters: {
    ingredientNames (state): string[] {
      return state.ingredients.map(({ name }) => name)
    },
    getIngredientIndex (): (name: string) => number {
      return (name) => this.ingredientNames.indexOf(name)
    }
  }
})