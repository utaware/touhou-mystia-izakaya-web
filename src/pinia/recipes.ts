import { defineStore } from 'pinia'

import {
  recipes,
  tools,
  recipesPositiveTags,
  recipesNegativeTags
} from '@/material'
import type { TRecipeItem } from '@/material'

import { mapSelectOptions, getMatchResult } from '@/utils'
import type { TOptionItem } from '@/utils'

import { useCustomerRareStore } from '@/pinia'

interface TRecipeMatchItem extends TRecipeItem {
  like_match_tags: string[],
  hate_match_tags: string[],
  badge_text: string,
  match_recipe_point: number,
}

interface State {
  allRecipes: TRecipeItem[],
  allTools: string[],
  recipesPositiveTags: string[],
  recipesNegativeTags: string[],
  currentRecipe: TRecipeItem,
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    allRecipes: recipes,
    allTools: tools,
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
        return {
          ...item,
          like_match_tags,
          hate_match_tags,
          match_recipe_point,
          badge_text
        }
      })
      return result
    },
    allToolOptions (state): TOptionItem[] {
      return mapSelectOptions(state.allTools)
    },
    getToolIndex (state): (name: string) => number {
      return (name: string): number => state.allTools.indexOf(name)
    },
  },
  actions: {
    setCurrentRecipe (item: TRecipeItem) {
      this.currentRecipe = item
    }
  }
})

export type { TRecipeItem, TRecipeMatchItem }