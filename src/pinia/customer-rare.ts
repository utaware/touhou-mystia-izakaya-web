import { defineStore } from 'pinia'

import { useRecipesStore, useIngredientsStore, useBeveragesStore } from '@/pinia'

import { customerPlace, customerRare } from '@/material'
import type { TCustomerRare } from '@/material'

import { matchRecipeAndIngredients, type TRecipeMatchResult } from '@/utils/recipes'

import { getEvaluateColor, getMaxLevel, generatorUid } from '@/utils/customer'

import { findIndex, pullAt } from 'lodash'

interface Tbookmark {
  customer: string;
  recipe: string;
  tool: string;
  beverage: string;
  uuid: string;
  // 自身的食材
  ingredients: string[];
  // 额外的食材
  extra: string[];
  // 需求
  demandRecipeTag: string;
  demandBeverageTag: string;
  // 颜色
  color: string;
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
  // 评分
}

export const useCustomerRareStore = defineStore('customerRare', {
  state: (): State => ({
    customer: customerRare,
    currentCustomer: customerRare[0],
    currentCustomerName: '莉格露',
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
      return getMaxLevel({ demandRecipeTag, demandBeverageTag, currentRecipeAllTags, currentBeverageAllTags })
    },
    // 预计评价颜色
    getPreviewColor (): string {
      return getEvaluateColor(this.currentDemandPoint, this.currentDemandMaxLevel)
    },
    // bookmark - 保存按钮是否禁用
    getSaveButtonIsDisabled (): boolean {
      const { demandRecipeTag, demandBeverageTag } = this
      const { currentRecipeName } = useRecipesStore()
      const { currentBeverageName } = useBeveragesStore()
      return !(currentBeverageName && currentRecipeName && demandRecipeTag && demandBeverageTag)
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
      this.demandRecipeTag = tag
    },
    setDemandBeverageTag (tag: string | null) {
      this.demandBeverageTag = tag
    },
    saveBookmark () {
      const { demandBeverageTag, demandRecipeTag, getPreviewColor: color } = this
      const { currentRecipe } = useRecipesStore()
      const { currentBeverage } = useBeveragesStore()
      const { extraIngredientsNames } = useIngredientsStore()
      const isEveryExist = currentRecipe && currentBeverage && demandRecipeTag && demandBeverageTag
      if (!isEveryExist) {
        return false
      }
      const { name: recipe, ingredients, tool } = currentRecipe
      const { name: beverage } = currentBeverage
      const extra = extraIngredientsNames
      const customer = this.currentCustomerName
      const uuid = generatorUid()
      const bookmark: Tbookmark = {
        customer,
        recipe,
        tool,
        beverage,
        ingredients,
        extra,
        uuid,
        demandBeverageTag,
        demandRecipeTag,
        color,
      }
      this.bookmark.push(bookmark)
    },
    deleteBookmark (uuid: string) {
      const index = findIndex(this.bookmark, { uuid })
      pullAt(this.bookmark, index)
    },
    restoreBookmark (item: Tbookmark) {
      const { recipe, beverage, ingredients, extra = [], demandRecipeTag, demandBeverageTag } = item
      const { setCurrentRecipe } = useRecipesStore()
      const { setCurrentBeverage } = useBeveragesStore()
      setCurrentRecipe({ name: recipe, ingredients, extra })
      setCurrentBeverage(beverage)
      this.demandRecipeTag = demandRecipeTag
      this.demandBeverageTag = demandBeverageTag
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