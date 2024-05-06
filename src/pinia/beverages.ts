import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import { beverages, beverageTags } from '@/material'
import type { TBeverageItem } from '@/material'

import { matchBeveragesWithCustomer, type TBeverageMatchItem } from '@/utils/beverages'

interface State {
  beverages: TBeverageItem[],
  beverageTags: string[],
  currentBeverage: TBeverageMatchItem | null,
}

export const useBeveragesStore = defineStore('beverages', {
  state: (): State => ({
    beverages,
    beverageTags,
    currentBeverage: null,
  }),
  getters: {
    // 标签匹配 - page
    getBeverageWithCurrentCustomer (): TBeverageMatchItem[] {
      const { currentCustomer } = useCustomerRareStore()
      return matchBeveragesWithCustomer(this.beverages, currentCustomer)
    },
  },
  actions: {
    setCurrentBeverage (item: TBeverageMatchItem) {
      this.currentBeverage = item
    }
  },
})

export type { TBeverageItem, TBeverageMatchItem }