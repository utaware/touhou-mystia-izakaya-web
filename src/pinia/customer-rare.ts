import { defineStore } from 'pinia'

import { customerPlace, customerRare, type TCustomerRare } from '@/material'

import { mapSelectOptions, type TOptionItem } from '@/utils'

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
    selectPlaceOptions (state): TOptionItem[] {
      return mapSelectOptions(state.allPlace)
    },
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