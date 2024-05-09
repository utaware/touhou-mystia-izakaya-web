import { defineStore } from 'pinia'

import { useRecipesStore, useIngredientsStore, useBeveragesStore } from '@/pinia'

import { customerPlace, customerRare, customerRareIndexMap } from '@/material'
import type { TCustomerRare } from '@/material'

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
  customer: TCustomerRare[];
  currentCustomerName: string;
  acvitePlace: string[];
  activeCustomerNames: string[];
  // 需求
  demandRecipeTag: string | null;
  demandBeverageTag: string | null;
  // 组合
  bookmark: Tbookmark[];
}

export const useCustomerRareStore = defineStore('customerRare', {
  state: (): State => ({
    customer: customerRare,
    currentCustomerName: '',
    acvitePlace: customerPlace,
    activeCustomerNames: [],
    demandRecipeTag: '',
    demandBeverageTag: '',
    bookmark: [],
  }),
  getters: {
    filterCustomerWithName (state): TCustomerRare[] {
      const { customer, activeCustomerNames } = state
      return customer.filter(({ name }) => activeCustomerNames.includes(name))
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
    currentCustomer (): TCustomerRare {
      const isExsit = Reflect.has(customerRareIndexMap, this.currentCustomerName)
      const index = customerRareIndexMap[this.currentCustomerName]
      return isExsit ? customerRare[index] : customerRare[0]
    },
    // 当前评分 - 菜谱 + 酒水
    currentDemandPoint (): number {
      const { currentRecipePoint } = useRecipesStore()
      const { currentBeveragePoint } = useBeveragesStore()
      return currentRecipePoint + currentBeveragePoint
    },
    // 当前评分上限值
    currentDemandMaxLevel (): number {
      const { demandRecipeTag, demandBeverageTag } = this
      const { currentRecipeAllTags } = useRecipesStore()
      const { currentBeverageAllTags } = useBeveragesStore()
      const is_demand_recipe =  !!demandRecipeTag && currentRecipeAllTags.includes(demandRecipeTag)
      const is_demand_beverage = !!demandBeverageTag && currentBeverageAllTags.includes(demandBeverageTag)
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
    setCurrentCustomer ({ name }: TCustomerRare) {
      this.currentCustomerName = name
    },
    setDemandRecipeTag (tag: string | null) {
      const { setFilterForm } = useRecipesStore()
      this.demandRecipeTag = tag
      tag && setFilterForm('selectedPositiveTags', [tag])
    },
    setDemandBeverageTag (tag: string | null) {
      const { setFilterForm } = useBeveragesStore()
      this.demandBeverageTag = tag
      tag && setFilterForm('selectBeverageTags', [tag])
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
      'acvitePlace',
      'activeCustomerNames',
      'bookmark',
    ]
  },
})

export type { TCustomerRare, Tbookmark }