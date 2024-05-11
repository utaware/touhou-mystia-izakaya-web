import { defineStore } from 'pinia'

import {
  recipes,
  recipesPositiveTags,
  recipesNegativeTags,
  getIndexWithName,
  mapSelectOptions,
} from '@/material'
import type { TRecipeItem, TSelectOptions, TSortOrderValue } from '@/material'

import { getUnionKeys } from '@/utils/material'
import {
  filterRecipesWithForm,
  getTableDataWithCustomer,
  composeRecipeTags,
  matchRecipeTagsWithCustomer,
  getEmptyIngredientsCount,
  getExtraIngredientsCount,
} from '@/utils/recipes'
import type { TFilterForm, TRecipeMatchItem, TRecipeMatchResult } from '@/utils/recipes'

import { useCustomerRareStore, useIngredientsStore } from '@/pinia'

import { orderBy } from 'lodash'

interface State {
  recipes: TRecipeItem[];
  recipesPositiveTags: string[];
  recipesNegativeTags: string[];
  currentRecipe: null | TRecipeMatchItem;
  currentRecipeName: string;
  filterForm: TFilterForm;
  sortOrder: TSortOrderValue;
}

export const useRecipesStore = defineStore('recipes', {
  state: (): State => ({
    recipes,
    recipesPositiveTags,
    recipesNegativeTags,
    currentRecipe: null,
    currentRecipeName: '',
    filterForm: {
      selectedPositiveTags: [],
      selectedNoPositiveTags: [],
      selectedNegativeTags: [],
      selectedNoNegativeTags: [],
      selectedIngredients: [],
      selectedNoIngredients: [],
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
    // 当前食材 - preview
    currentRecipeIngredients (): string[] {
      return this.currentRecipe ? this.currentRecipe.ingredients : []
    },
    // 当前正特性标签 - 评分状态
    currentRecipePositiveTags (): string[] {
      return this.currentRecipe ? this.currentRecipe.positive_tags : []
    },
    // 当前食材剩余空位数量
    currentRecipeEmptyCount (): number {
      const { extraIngredientsNames } = useIngredientsStore()
      return getEmptyIngredientsCount(
        this.currentRecipeIngredients.length,
        extraIngredientsNames.length
      )
    },
    // 当前菜谱全部tag - 菜谱 + 额外食材
    currentRecipeAllTags (): string[] {
      const {
        extraIngredientsNames,
        extraIngredientsTags,
      } = useIngredientsStore()
      const recipePositiveTags = this.currentRecipePositiveTags
      const recipeIngredientsNames = this.currentRecipeIngredients
      return composeRecipeTags({
              recipePositiveTags,
              recipeIngredientsNames,
              extraIngredientsNames,
              extraIngredientsTags,
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
    setCurrentRecipe ({
      name,
      ingredients,
      extra = [],
    }: {
      name: string,
      ingredients: string[],
      extra?: string[],
    }) {
      const { setExtraIngredients } = useIngredientsStore()
      const index = getIndexWithName('recipes', name)
      const item = this.getRecipesWithCustomerRare[index]
      this.currentRecipe = item
      this.currentRecipeName = name
      const max = getExtraIngredientsCount(ingredients.length)
      setExtraIngredients(max, extra)
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