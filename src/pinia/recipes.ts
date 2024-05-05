import { defineStore } from 'pinia'

import type { SelectOption } from 'naive-ui'

import {
  recipes,
  tools,
  recipesPositiveTags,
  recipesNegativeTags
} from '@/material'
import type { TRecipeItem } from '@/material'

import { mapSelectOptions } from '@/utils/options'
import { getMatchResult } from '@/utils/tag'
import { filterRecipesWithForm } from '@/utils/recipes'

import { useCustomerRareStore } from '@/pinia'

interface TRecipeMatchItem extends TRecipeItem {
  like_match_tags: string[],
  hate_match_tags: string[],
  badge_text: string,
  match_recipe_point: number,
}

interface TFilterForm {
  selectedPositiveTags: string[],
  selectedNegativeTags: string[],
  selectedTools: string[],
  searchName: string,
}

interface State {
  allRecipes: TRecipeItem[],
  allTools: string[],
  recipesPositiveTags: string[],
  recipesNegativeTags: string[],
  currentRecipe: TRecipeMatchItem | null,
  filterForm: TFilterForm,
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    allRecipes: recipes,
    allTools: tools,
    recipesPositiveTags,
    recipesNegativeTags,
    currentRecipe: null,
    filterForm: {
      selectedPositiveTags: [],
      selectedNegativeTags: [],
      selectedTools: [],
      searchName: '',
    }
  }),
  getters: {
    positiveTagOptions (): SelectOption[] {
      return mapSelectOptions(this.recipesPositiveTags)
    },
    negativeTagOptions (): SelectOption[] {
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
    allToolOptions (state): SelectOption[] {
      return mapSelectOptions(state.allTools)
    },
    getToolIndex (state): (name: string) => number {
      return (name: string): number => state.allTools.indexOf(name)
    },
    getFilterRecipes (): TRecipeMatchItem[] {
      return filterRecipesWithForm(this.getRecipesWithCustomerRare, this.filterForm)
    },
    getMatchPointOptions (): SelectOption[] {
      const items = this.getRecipesWithCustomerRare.map(
        ({ match_recipe_point }: TRecipeMatchItem) => match_recipe_point
      )
      return mapSelectOptions(items)
    }
  },
  actions: {
    setCurrentRecipe (item: TRecipeMatchItem) {
      this.currentRecipe = item
    },
    setFilterForm (item: TFilterForm) {
      this.filterForm = item
    }
  }
})

export type { TRecipeItem, TRecipeMatchItem, TFilterForm }