import { defineStore } from 'pinia'

import { recipes, recipesPositiveTags, recipesNegativeTags } from '@/material'
import type { TRecipeItem } from '@/material'

import { mapSelectOptions, getMatchResult } from '@/utils'
import type { TOptionItem } from '@/utils'

import { useCustomerRareStore } from '@/pinia'

import { orderBy } from 'lodash'
interface TRecipeMatchItem extends TRecipeItem {
  like_match_tags: string[],
  hate_match_tags: string[],
  badge_text: string,
  match_recipe_point: number,
}

interface State {
  allRecipes: TRecipeItem[],
  recipesPositiveTags: string[],
  recipesNegativeTags: string[],
  currentRecipe: TRecipeItem,
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    allRecipes: recipes,
    recipesPositiveTags,
    recipesNegativeTags,
    currentRecipe: recipes[0],
  }),
  getters: {
    positiveTagOptions (): TOptionItem[] {
      return mapSelectOptions(this.recipesPositiveTags)
    },
    negativeTagOptions (): TOptionItem[] {
      return mapSelectOptions(this.recipesNegativeTags)
    },
    getRecipesWithCustomerRare (state): TRecipeMatchItem[] {
      const { currentCustomer } = useCustomerRareStore()
      const { like_tags, hate_tags } = currentCustomer
      const result = state.allRecipes.map((item: TRecipeItem) => {
        const { positive_tags } = item
        const { isMatch: like_match_tags } = getMatchResult(like_tags, positive_tags)
        const { isMatch: hate_match_tags } = getMatchResult(hate_tags, positive_tags)
        const match_recipe_point = like_match_tags.length - hate_match_tags.length
        const badge_text = String(match_recipe_point)
        return { ...item, like_match_tags, hate_match_tags, match_recipe_point, badge_text }
      })
      const order = orderBy(result, ['match_recipe_point'], ['desc'])
      return order
    }
  },
  actions: {
    setCurrentRecipe (item: TRecipeItem) {
      this.currentRecipe = item
    }
  }
})

export { type TRecipeItem }