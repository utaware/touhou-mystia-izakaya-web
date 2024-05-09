import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import { beverages, beverageTags, beverageNames, beveragesLevel } from '@/material'
import type { TBeverageItem } from '@/material'

import { matchBeveragesWithCustomer, type TBeverageMatchItem } from '@/utils/beverages'

interface State {
  beverages: TBeverageItem[],
  beverageNames: string[],
  beveragesLevel: number[],
  beverageTags: string[],
  currentBeverage: TBeverageMatchItem | null,
}

export const useBeveragesStore = defineStore('beverages', {
  state: (): State => ({
    beverages,
    beverageNames,
    beveragesLevel,
    beverageTags,
    currentBeverage: null,
  }),
  getters: {
    // 标签匹配 - page
    getBeverageWithCurrentCustomer (): TBeverageMatchItem[] {
      const { currentCustomer } = useCustomerRareStore()
      return matchBeveragesWithCustomer(this.beverages, currentCustomer)
    },
    // 当前酒水的所有tag
    currentBeverageAllTags (): string[] {
      return this.currentBeverage ? this.currentBeverage.beverage_tags : []
    },
    currentBeverageMatchTags (): string[] {
      return this.currentBeverage ? this.currentBeverage.match_beverage_tags : []
    },
    // 当前酒水匹配得分
    currentBeveragePoint (): number {
      const { currentBeverageAllTags, currentBeverageMatchTags } = this
      const { demandBeverageTag } = useCustomerRareStore()
      const match_point = currentBeverageMatchTags.length
      const demand_point = currentBeverageAllTags.includes(demandBeverageTag) ? 1 : 0
      const repeat_point = currentBeverageMatchTags.includes(demandBeverageTag) ? -1 : 0
      return demand_point + match_point + repeat_point
    }
  },
  actions: {
    setCurrentBeverage (item: TBeverageMatchItem) {
      this.currentBeverage = item
    }
  },
})

export type { TBeverageItem, TBeverageMatchItem }