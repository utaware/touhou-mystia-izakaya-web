import { defineStore } from 'pinia'

import { union } from 'lodash'

import {
  recipes,
  recipesPositiveTags,
  recipesNegativeTags
} from '@/material'
import type { TRecipeItem } from '@/material'

import { mapSelectOptions, type TSelectOptions } from '@/utils/options'
import {
  filterRecipesWithForm,
  getTableDataWithCustomer,
  sortOrderRecipes,
  composeRecipeTags,
  matchRecipeTagsWithCustomer
} from '@/utils/recipes'
import type { TFilterForm, TRecipeMatchItem, TRecipeMatchResult } from '@/utils/recipes'
import type { TSortOrderValue } from '@/utils/order'

import { useCustomerRareStore, useIngredientsStore } from '@/pinia'

interface State {
  allRecipes: TRecipeItem[],
  recipesPositiveTags: string[],
  recipesNegativeTags: string[],
  currentRecipe: TRecipeMatchItem | null,
  filterForm: TFilterForm,
  sortOrder: TSortOrderValue,
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    allRecipes: recipes,
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
    // 标签匹配 - page
    getRecipesWithCustomerRare (): TRecipeMatchItem[] {
      const { currentCustomer } = useCustomerRareStore()
      return getTableDataWithCustomer(this.allRecipes, currentCustomer)
    },
    // 条件筛选&排序 - table
    getFilterRecipes (): TRecipeMatchItem[] {
      const filterData = filterRecipesWithForm(this.getRecipesWithCustomerRare, this.filterForm)
      const orderData = sortOrderRecipes(filterData, this.sortOrder)
      return orderData
    },
    // 匹配度 - select
    getMatchPointOptions (): TSelectOptions[] {
      const items = this.getRecipesWithCustomerRare.map(
        ({ match_recipe_point }: TRecipeMatchItem) => match_recipe_point
      )
      const options = union(items).sort((a, b) => b - a)
      return mapSelectOptions(options)
    },
    // 当前食材 - preview
    currentRecipeIngredients (): string[] {
      return this.currentRecipe ? this.currentRecipe.ingredients : []
    },
    // 当前正特性标签 - 评分状态
    currentRecipePositiveTags (): string[] {
      return this.currentRecipe ? this.currentRecipe.positive_tags : []
    },
    // 当前菜谱全部tag - 菜谱 + 额外食材
    // 1. 没选菜谱 - []
    // 2. 选了菜谱
    // 2.1 没选食材 - positive_tags
    // 2.2 选了食材 - composeRecipeTags()
    currentRecipeAllTags (): string[] {
      const {
        currentSelectIngredientsTags: extra_ingredients_tags,
        selectRecipeIngredients: extra_ingredients_names,
      } = useIngredientsStore()
      const recipe_positive_tags = this.currentRecipePositiveTags
      const recipe_ingredients_names = this.currentRecipeIngredients
      return composeRecipeTags({
              recipe_positive_tags,
              recipe_ingredients_names,
              extra_ingredients_tags,
              extra_ingredients_names,
            })
    },
    // 当前菜谱匹配的tag - 菜谱 + 额外食材
    currentRecipeMatchTags (): TRecipeMatchResult {
      const { currentCustomer } = useCustomerRareStore()
      return matchRecipeTagsWithCustomer(this.currentRecipeAllTags, currentCustomer)
    },
    // 当前菜谱得分
    currentRecipePoint(): number {
      const { demandRecipeTag } = useCustomerRareStore()
      const demandPoint = this.currentRecipeAllTags.includes(demandRecipeTag) ? 1 : 0
      const { match_like_tags, match_hate_tags } = this.currentRecipeMatchTags
      const like_point = match_like_tags.length
      const hate_point = match_hate_tags.length
      const repeatCalcPoint = match_like_tags.includes(demandRecipeTag)
        ? -1
        : match_hate_tags.includes(demandRecipeTag) ? 1 : 0
      return like_point - hate_point + demandPoint + repeatCalcPoint
    },
  },
  actions: {
    setCurrentRecipe (item: TRecipeMatchItem) {
      this.currentRecipe = item
      const { ingredients: { length } } = item
      const { initSelectRecipeIngredients } = useIngredientsStore()
      initSelectRecipeIngredients(5 - length)
    },
    setFilterForm <T extends TFilterForm, U extends keyof TFilterForm>(key: U, value: T[U]) {
      this.filterForm[key] = value
    },
    setSortOrder (value: TSortOrderValue) {
      this.sortOrder = value
    }
  }
})

export type { TRecipeItem, TRecipeMatchItem, TFilterForm }