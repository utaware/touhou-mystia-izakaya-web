import { defineStore } from 'pinia'

import { ingredients, ingredientsNames } from '@/material'
import type { TIngredientsItem } from '@/material'

import { FixLengthArray } from '@/utils/object'
import { getUnionTagsWithNames } from '@/utils/ingredients'

interface State {
  ingredients: TIngredientsItem[],
  ingredientsNames: string[],
  selectRecipeIngredients: FixLengthArray<string>,
}

export const useIngredientsStore = defineStore('ingredients', {
  state: (): State => ({
    ingredients,
    ingredientsNames,
    selectRecipeIngredients: new FixLengthArray(0),
  }),
  getters: {
    // 当前所选食材的全部tags
    currentSelectIngredientsTags (): string[] {
      return this.selectRecipeIngredients.length ? getUnionTagsWithNames(this.selectRecipeIngredients) : []
    }
  },
  actions: {
    initSelectRecipeIngredients (count: number) {
      this.selectRecipeIngredients = new FixLengthArray(count)
    },
    addSelectRecipeIngredients (item: string) {
      this.selectRecipeIngredients.add(item)
    },
    removeSelectRecipeIngredients (index: number) {
      this.selectRecipeIngredients.remove(index)
    }
  }
})

export { type TIngredientsItem }