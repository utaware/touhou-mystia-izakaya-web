import { defineStore } from 'pinia'

import { ingredients, ingredientNames } from '@/material'
import type { TIngredientsItem } from '@/material'

import { FixLengthArray } from '@/utils/object'

interface State {
  ingredients: TIngredientsItem[],
  ingredientNames: string[],
  selectRecipeIngredients: FixLengthArray<TIngredientsItem>,
}

export const useIngredientsStore = defineStore('ingredients', {
  state: (): State => ({
    ingredients,
    ingredientNames,
    selectRecipeIngredients: new FixLengthArray(0),
  }),
  getters: {

  },
  actions: {
    initSelectRecipeIngredients (count: number) {
      this.selectRecipeIngredients = new FixLengthArray(count)
    },
    addSelectRecipeIngredients (item: TIngredientsItem) {
      this.selectRecipeIngredients.add(item)
    },
    removeSelectRecipeIngredients (index: number) {
      this.selectRecipeIngredients.remove(index)
    }
  }
})

export { type TIngredientsItem }