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
}

export const useCustomerRareStore = defineStore('customerRare', {
  state: (): State => ({
    allPlace: customerPlace,
    allCustomer: customerRare,
    currentCustomer: customerRare[0],
    acvitePlace: customerPlace,
    activeCustomerNames: new Array(),
  }),
  getters: {
    filterCustomerWithName (state): TCustomerRare[] {
      const { allCustomer, activeCustomerNames } = state
      return allCustomer.filter(({ name }) => activeCustomerNames.includes(name))
    },
    selectPlaceOptions (state): SelectOption[] {
      return mapSelectOptions(state.allPlace)
    },
    getCurrentMatchTags (): TRecipeMatchResult {
      const { currentRecipe } = useRecipesStore()
      const { currentCustomer } = useCustomerRareStore()
      const { selectRecipeIngredients } = useIngredientsStore()
      return currentRecipe
        ? matchRecipeAndIngredients(currentCustomer, currentRecipe, selectRecipeIngredients)
        : { like: [], hate: [] }
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
    }
  },
  persist: true,
})

export { type TCustomerRare }