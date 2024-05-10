import { defineStore } from 'pinia'

import { useRecipesStore } from '@/pinia'

import { ingredients, ingredientsNames } from '@/material'
import type { TIngredientsItem } from '@/material'

import { getUnionTagsWithNames, getValidIngredients, type TIngredientResult } from '@/utils/ingredients'

interface State {
  ingredients: TIngredientsItem[],
  ingredientsNames: string[],
  extraMaxCount: number,
  extraIngredientsNames: string[],
}

export const useIngredientsStore = defineStore('ingredients', {
  state: (): State => ({
    ingredients,
    ingredientsNames,
    extraMaxCount: 0,
    extraIngredientsNames: [],
  }),
  getters: {
    // 当前所选食材的全部tags
    extraIngredientsTags (): string[] {
      return this.extraIngredientsNames.length ? getUnionTagsWithNames(this.extraIngredientsNames) : []
    },
    // 黑暗料理
    getVariousIngredients (): TIngredientResult {
      const { currentRecipe } = useRecipesStore()
      return currentRecipe
        ? getValidIngredients(this.ingredients, currentRecipe)
        : { normal: this.ingredients, danger: [] }
    },
  },
  actions: {
    addExtraIngredients (item: string) {
      const { extraMaxCount, extraIngredientsNames } = this
      const len = extraIngredientsNames.length
      if (len < extraMaxCount) {
        this.extraIngredientsNames.push(item)
      }
    },
    removeExtraIngredients (index: number) {
      this.extraIngredientsNames.splice(index, 1)
    },
    setExtraIngredients (max: number, extra: string[]) {
      this.extraMaxCount = max
      this.extraIngredientsNames = [ ...extra ]
    },
  }
})

export { type TIngredientsItem }