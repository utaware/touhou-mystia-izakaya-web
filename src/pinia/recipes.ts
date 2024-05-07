import { defineStore } from 'pinia'

import type { SelectOption } from 'naive-ui'

import { union } from 'lodash'

import {
  recipes,
  allTools,
  recipesPositiveTags,
  recipesNegativeTags
} from '@/material'
import type { TRecipeItem } from '@/material'

import { mapSelectOptions } from '@/utils/options'
import { filterRecipesWithForm, matchRecipesWithCustomer, sortOrderRecipes } from '@/utils/recipes'
import type { TFilterForm, TRecipeMatchItem } from '@/utils/recipes'
import type { TSortOrderValue } from '@/utils/order'

import { useCustomerRareStore, useIngredientsStore } from '@/pinia'

interface State {
  allRecipes: TRecipeItem[],
  allTools: string[],
  recipesPositiveTags: string[],
  recipesNegativeTags: string[],
  currentRecipe: TRecipeMatchItem | null,
  filterForm: TFilterForm,
  sortOrder: TSortOrderValue,
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    allRecipes: recipes,
    allTools,
    recipesPositiveTags,
    recipesNegativeTags,
    currentRecipe: null,
    filterForm: {
      selectedPositiveTags: [],
      selectedNegativeTags: [],
      selectedTools: [],
      selectedMatchPoints: [],
      searchName: '',
    },
    sortOrder: 'desc',
  }),
  getters: {
    // 正特性标签 - select
    positiveTagOptions (): SelectOption[] {
      return mapSelectOptions(this.recipesPositiveTags)
    },
    // 负特性标签 - select
    negativeTagOptions (): SelectOption[] {
      return mapSelectOptions(this.recipesNegativeTags)
    },
    // 标签匹配 - page
    getRecipesWithCustomerRare (): TRecipeMatchItem[] {
      const { currentCustomer } = useCustomerRareStore()
      return matchRecipesWithCustomer(this.allRecipes, currentCustomer)
    },
    // 厨具选项 - select
    allToolOptions (state): SelectOption[] {
      return mapSelectOptions(state.allTools)
    },
    // 条件筛选&排序 - table
    getFilterRecipes (): TRecipeMatchItem[] {
      const filterData = filterRecipesWithForm(this.getRecipesWithCustomerRare, this.filterForm)
      const orderData = sortOrderRecipes(filterData, this.sortOrder)
      return orderData
    },
    // 匹配度 - select
    getMatchPointOptions (): SelectOption[] {
      const items = this.getRecipesWithCustomerRare.map(
        ({ match_recipe_point }: TRecipeMatchItem) => match_recipe_point
      )
      const options = union(items).sort((a, b) => b - a)
      return mapSelectOptions(options)
    },
    // 食材 - preview
    currentRecipeIngredients (): string[] {
      return this.currentRecipe ? this.currentRecipe.ingredients : []
    }
  },
  actions: {
    setCurrentRecipe (item: TRecipeMatchItem) {
      this.currentRecipe = item
      const { ingredients: { length } } = item
      const { initSelectRecipeIngredients } = useIngredientsStore()
      initSelectRecipeIngredients(5 - length)
    },
    setFilterForm (item: TFilterForm) {
      this.filterForm = item
    },
    setSortOrder (value: TSortOrderValue) {
      this.sortOrder = value
    }
  }
})

export type { TRecipeItem, TRecipeMatchItem, TFilterForm }