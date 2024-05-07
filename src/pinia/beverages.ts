import type { SelectOption } from 'naive-ui'

import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import { beverages, beverageTags, beverageNames } from '@/material'
import type { TBeverageItem } from '@/material'

import { matchBeveragesWithCustomer, type TBeverageMatchItem } from '@/utils/beverages'

import { mapSelectOptions } from '@/utils/options'
interface State {
  beverages: TBeverageItem[],
  beverageNames: string[],
  beverageTags: string[],
  currentBeverage: TBeverageMatchItem | null,
}

export const useBeveragesStore = defineStore('beverages', {
  state: (): State => ({
    beverages,
    beverageNames,
    beverageTags,
    currentBeverage: null,
  }),
  getters: {
    // 酒水标签选项
    beverageTagOptions (): SelectOption[] {
      return mapSelectOptions(this.beverageTags)
    },
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