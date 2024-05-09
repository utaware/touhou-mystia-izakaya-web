import { defineStore } from 'pinia'

import {
  recipes,
  recipesPositiveTags,
  recipesNegativeTags,
  recipesIndexMaps,
  mapSelectOptions,
} from '@/material'
import type { TRecipeItem, TSelectOptions } from '@/material'

import { getUnionKeys } from '@/utils'
import {
  filterRecipesWithForm,
  getTableDataWithCustomer,
  composeRecipeTags,
  matchRecipeTagsWithCustomer
} from '@/utils/recipes'
import type { TFilterForm, TRecipeMatchItem, TRecipeMatchResult } from '@/utils/recipes'
import type { TSortOrderValue } from '@/utils/order'

import { useCustomerRareStore, useIngredientsStore } from '@/pinia'

import { orderBy } from 'lodash'

interface State {
  recipes: TRecipeItem[];
  recipesPositiveTags: string[];
  recipesNegativeTags: string[];
  currentRecipeName: string;
  filterForm: TFilterForm;
  sortOrder: TSortOrderValue;
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    recipes,
    recipesPositiveTags,
    recipesNegativeTags,
    currentRecipeName: '',
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
      return getTableDataWithCustomer(this.recipes, currentCustomer)
    },
    // 条件筛选&排序 - table
    getRecipesTableData (): TRecipeMatchItem[] {
      const filterData = filterRecipesWithForm(this.getRecipesWithCustomerRare, this.filterForm)
      return orderBy(filterData, ['match_recipe_point'], this.sortOrder)
    },
    // 匹配度选项 - select
    getMatchPointOptions (): TSelectOptions[] {
      const items = getUnionKeys(this.getRecipesWithCustomerRare, 'match_recipe_point').sort((a, b) => b - a)
      return mapSelectOptions(items)
    },
    // 当前菜谱
    currentRecipe (): TRecipeMatchItem | null {
      const index = recipesIndexMaps[this.currentRecipeName]
      return index ? this.getRecipesWithCustomerRare[index] : null
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
      const tag = demandRecipeTag || ''
      const demandPoint = this.currentRecipeAllTags.includes(tag) ? 1 : 0
      const { match_like_tags, match_hate_tags } = this.currentRecipeMatchTags
      const like_point = match_like_tags.length
      const hate_point = match_hate_tags.length
      const repeatCalcPoint = match_like_tags.includes(tag)
        ? -1
        : match_hate_tags.includes(tag) ? 1 : 0
      return like_point - hate_point + demandPoint + repeatCalcPoint
    },
  },
  actions: {
    setCurrentRecipe ({ name, ingredients }: TRecipeMatchItem) {
      this.currentRecipeName = name
      const { length } = ingredients
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