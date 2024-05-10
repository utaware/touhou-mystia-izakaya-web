import { defineStore } from 'pinia'

import { useRecipesStore, useIngredientsStore, useBeveragesStore } from '@/pinia'

import { customerPlace, customerRare } from '@/material'
import type { TCustomerRare } from '@/material'

import { matchRecipeAndIngredients, type TRecipeMatchResult } from '@/utils/recipes'

import { getEvaluateColor, getMaxLevel, generatorUid } from '@/utils'

import { findIndex, pullAt } from 'lodash'

interface Tbookmark {
  customer: string,
  recipe: string,
  beverage: string,
  uuid: string,
  // 自身的食材
  ingredients: string[],
  // 额外的食材
  extra: string[],
}

interface State {
  customer: TCustomerRare[];
  currentCustomer: TCustomerRare;
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
    currentCustomer: customerRare[0],
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
      const { extraIngredientsNames, extraIngredientsTags } = useIngredientsStore()
      return currentRecipe
        ? matchRecipeAndIngredients({
            customer: currentCustomer,
            recipe: currentRecipe,
            extraIngredientsNames,
            extraIngredientsTags,
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
    // bookmark - 保存按钮是否禁用
    getSaveButtonIsDisabled (): boolean {
      const { currentRecipeName } = useRecipesStore()
      const { currentBeverageName } = useBeveragesStore()
      return !(currentBeverageName && currentRecipeName)
    },
    // 当前角色书签
    getCurrentBookmark (): Tbookmark[] {
      return this.bookmark.filter(({ customer }) => customer === this.currentCustomerName)
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
      const { name } = item
      this.currentCustomer = item
      this.currentCustomerName = name
    },
    setDemandRecipeTag (tag: string | null) {
      const { setFilterForm } = useRecipesStore()
      this.demandRecipeTag = tag
      setFilterForm('selectedPositiveTags', tag ? [tag] : [])
    },
    setDemandBeverageTag (tag: string | null) {
      const { setFilterForm } = useBeveragesStore()
      this.demandBeverageTag = tag
      setFilterForm('selectBeverageTags', tag ? [tag] : [])
    },
    saveBookmark () {
      const { currentRecipe } = useRecipesStore()
      const { currentBeverage } = useBeveragesStore()
      const { extraIngredientsNames } = useIngredientsStore()
      if (!currentRecipe || !currentBeverage) {
        return false
      }
      const { name: recipe, ingredients } = currentRecipe
      const { name: beverage } = currentBeverage
      const extra = extraIngredientsNames
      const customer = this.currentCustomerName
      const uuid = generatorUid()
      const bookmark: Tbookmark = { customer, recipe, beverage, ingredients, extra, uuid }
      this.bookmark.push(bookmark)
    },
    deleteBookmark (uuid: string) {
      const index = findIndex(this.bookmark, { uuid })
      pullAt(this.bookmark, index)
    },
    selectBookmark (item: Tbookmark) {
      const { recipe, beverage, ingredients, extra = [] } = item
      const { setCurrentRecipe } = useRecipesStore()
      const { setCurrentBeverage } = useBeveragesStore()
      const { setExtraIngredients } = useIngredientsStore()
      setCurrentRecipe({ name: recipe, ingredients, extra })
      setCurrentBeverage(beverage)
      setExtraIngredients(ingredients.length, extra)
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