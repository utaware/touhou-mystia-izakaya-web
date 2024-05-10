import { defineStore } from 'pinia'

import { useRecipesStore } from '@/pinia'

import { ingredients, ingredientsNames } from '@/material'
import type { TIngredientsItem } from '@/material'

import { FixLengthArray } from '@/utils/object'
import { getUnionTagsWithNames, getValidIngredients, type TIngredientResult } from '@/utils/ingredients'

interface State {
  ingredients: TIngredientsItem[],
  ingredientsNames: string[],
  extraIngredientsNames: FixLengthArray,
}

export const useIngredientsStore = defineStore('ingredients', {
  state: (): State => ({
    ingredients,
    ingredientsNames,
    extraIngredientsNames: new FixLengthArray(0),
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
      this.extraIngredientsNames.add(item)
    },
    removeExtraIngredients (index: number) {
      this.extraIngredientsNames.remove(index)
    },
    setExtraIngredients (max: number, init: string[]) {
      this.extraIngredientsNames = new FixLengthArray(max, init)
    },
  }
})

export { type TIngredientsItem }