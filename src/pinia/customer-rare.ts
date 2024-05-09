import { defineStore } from 'pinia'

import { useRecipesStore, useIngredientsStore, useBeveragesStore } from '@/pinia'

import { customerPlace, customerRare, type TCustomerRare } from '@/material'

import { matchRecipeAndIngredients, type TRecipeMatchResult } from '@/utils/recipes'

import { getEvaluateColor, getMaxLevel } from '@/utils'

import { findIndex, pullAt } from 'lodash'

interface Tbookmark {
  customer: string,
  recipe: string,
  beverage: string,
  uuid: string,
  ingredients: string[],
}

interface State {
  allPlace: string[],
  allCustomer: TCustomerRare[],
  currentCustomer: TCustomerRare;
  acvitePlace: string[],
  activeCustomerNames: string[],
  // 需求
  demandRecipeTag: string,
  demandBeverageTag: string,
  // 组合
  bookmark: Tbookmark[],
}

export const useCustomerRareStore = defineStore('customerRare', {
  state: (): State => ({
    allPlace: customerPlace,
    allCustomer: customerRare,
    currentCustomer: customerRare[0],
    acvitePlace: customerPlace,
    activeCustomerNames: [],
    demandRecipeTag: '',
    demandBeverageTag: '',
    bookmark: [],
  }),
  getters: {
    filterCustomerWithName (state): TCustomerRare[] {
      const { allCustomer, activeCustomerNames } = state
      return allCustomer.filter(({ name }) => activeCustomerNames.includes(name))
    },
    getRecipeMatchTags (): TRecipeMatchResult | null {
      const { currentRecipe } = useRecipesStore()
      const { currentCustomer } = useCustomerRareStore()
      const { selectRecipeIngredients, currentSelectIngredientsTags } = useIngredientsStore()
      return currentRecipe
        ? matchRecipeAndIngredients({
            customer: currentCustomer,
            recipe: currentRecipe,
            extra_ingredients_tags: currentSelectIngredientsTags,
            extra_ingredients_names: selectRecipeIngredients,
          })
        : null
    },
    // 当前评分 - 菜谱 + 酒水
    currentDemandPoint (): number {
      const { currentRecipePoint } = useRecipesStore()
      const { currentBeveragePoint } = useBeveragesStore()
      return currentRecipePoint + currentBeveragePoint
    },
    // 当前评分上限值
    currentDemandMaxLevel (): number {
      const { currentRecipeAllTags } = useRecipesStore()
      const { currentBeverageAllTags } = useBeveragesStore()
      const { demandRecipeTag, demandBeverageTag } = this
      const is_demand_recipe = currentRecipeAllTags.includes(demandRecipeTag)
      const is_demand_beverage = currentBeverageAllTags.includes(demandBeverageTag)
      return getMaxLevel({ is_demand_recipe, is_demand_beverage })
    },
    // 预计评价颜色
    getPreviewColor (): string {
      return getEvaluateColor(this.currentDemandPoint, this.currentDemandMaxLevel)
    },
    // 当前角色书签
    getCurrentBookmark (): Tbookmark[] {
      const { name } = this.currentCustomer
      return this.bookmark.filter(({ customer }) => customer === name)
    }
  },
  actions: {
    setActiveCustomer (value: string[]) {
      this.activeCustomerNames = value
    },
    setActivePlace (value: string[]) {
      this.acvitePlace = value
    },
    setCurrentCustomer (item: TCustomerRare) {
      this.currentCustomer = item
    },
    setDemandRecipeTag (item: string) {
      this.demandRecipeTag = item
    },
    setDemandBeverageTag (item: string) {
      this.demandBeverageTag = item
    },
    saveBookmark (item: Tbookmark) {
      this.bookmark.push(item)
    },
    deleteBookmark (uuid: string) {
      const index = findIndex(this.bookmark, { uuid })
      pullAt(this.bookmark, index)
    }
  },
  persist: {
    // 仅存储稀客相关选择
    paths: [
      'currentCustomer',
      'acvitePlace',
      'activeCustomerNames',
      'bookmark',
    ]
  },
})

export type { TCustomerRare, Tbookmark }