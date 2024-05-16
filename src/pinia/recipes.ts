import { defineStore } from 'pinia'

import {
  recipes,
  recipesPositiveTags,
  recipesNegativeTags,
  getIndexWithName,
  mapSelectOptions,
} from '@/material'
import type {
  TRecipeState,
  TRecipeMatchItem,
  TRecipeMatchResult,
  TRecipeFilterForm,
  TSelectOptions,
  TSortOrderValue
} from '@/material'

import { getUnionKeys } from '@/utils/material'
import {
  filterRecipesWithForm,
  getTableDataWithCustomer,
  composeRecipeTags,
  matchRecipeTagsWithCustomer,
  getEmptyIngredientsCount,
  getExtraIngredientsCount,
  getRecipePoint,
} from '@/utils/recipes'

import { useCustomerRareStore, useIngredientsStore } from '@/pinia'

import { cloneDeep } from 'lodash'

export const useRecipesStore = defineStore('recipes', {
  state: (): TRecipeState => ({
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
      return filterRecipesWithForm(this.getRecipesWithCustomerRare, this.filterForm)
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
      const { currentRecipeAllTags, currentRecipeMatchTags } = this
      const { match_like_tags, match_hate_tags } = currentRecipeMatchTags
      return getRecipePoint({
        match_like_tags,
        match_hate_tags,
        recipeAllTags: currentRecipeAllTags,
        demandRecipeTag,
      })
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
      const clone = cloneDeep(item)
      this.currentRecipe = clone
      this.currentRecipeName = name
      const max = getExtraIngredientsCount(ingredients.length)
      setExtraIngredients(max, extra)
    },
    setFilterForm <T extends TRecipeFilterForm, U extends keyof TRecipeFilterForm>(key: U, value: T[U]) {
      this.filterForm[key] = value
    },
    setSortOrder (value: TSortOrderValue) {
      this.sortOrder = value
    }
  }
})