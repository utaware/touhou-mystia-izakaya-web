import { defineStore } from 'pinia'

import { customerPlace, customerRare, type TCustomerRare } from '@/material'

export const useCustomerRareStore = defineStore('customerRare', {
  state: () => ({
    place: customerPlace,
    customer: customerRare,
    acvitePlace: customerPlace,
    activeCustomerNames: new Array(),
  }),
  getters: {
    filterCustomerWithName (state): TCustomerRare[] {
      const { customer, activeCustomerNames } = state
      return customer.filter(({ name }) => activeCustomerNames.includes(name))
    }
  },
  actions: {
    setActiveCustomer (value: string[]) {
      this.activeCustomerNames = value
    }
  },
  persist: true,
})