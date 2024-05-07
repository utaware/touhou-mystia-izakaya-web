import { SelectOption } from 'naive-ui'

import { defineStore } from 'pinia'

import { useRecipesStore, useIngredientsStore } from '@/pinia'

import { customerPlace, customerRare, type TCustomerRare } from '@/material'

import { mapSelectOptions } from '@/utils/options'

import { matchRecipeAndIngredients, type TRecipeMatchResult } from '@/utils/recipes'

interface State {
  allPlace: string[],
  allCustomer: TCustomerRare[],
  currentCustomer: TCustomerRare;
  acvitePlace: string[],
  activeCustomerNames: string[],
  // 需求
  demandRecipeTag: string,
  demandBeverageTag: string,
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
  }),
  getters: {
    filterCustomerWithName (state): TCustomerRare[] {
      const { allCustomer, activeCustomerNames } = state
      return allCustomer.filter(({ name }) => activeCustomerNames.includes(name))
    },
    selectPlaceOptions (state): SelectOption[] {
      return mapSelectOptions(state.allPlace)
    },
    getRecipeMatchTags (): TRecipeMatchResult | null {
      const { currentRecipe } = useRecipesStore()
      const { currentCustomer } = useCustomerRareStore()
      const { selectRecipeIngredients } = useIngredientsStore()
      return currentRecipe
        ? matchRecipeAndIngredients(currentCustomer, currentRecipe, selectRecipeIngredients)
        : null
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
  },
  persist: {
    // 仅存储稀客相关选择
    paths: [
      'allPlace',
      'allCustomer',
      'currentCustomer',
      'acvitePlace',
      'activeCustomerNames',
    ]
  },
})

export { type TCustomerRare }