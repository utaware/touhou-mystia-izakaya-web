import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import { beverages, beverageTags, beverageNames, beveragesLevel } from '@/material'
import type { TBeverageItem } from '@/material'

import { matchBeveragesWithCustomer, filterBeveragesWithForm,  } from '@/utils/beverages'
import type { TBeverageMatchItem, TFilterForm } from '@/utils/beverages'

interface State {
  beverages: TBeverageItem[];
  beverageNames: string[];
  beveragesLevel: number[];
  beverageTags: string[];
  currentBeverage: TBeverageMatchItem | null;
  filterForm: TFilterForm;
}

export const useBeveragesStore = defineStore('beverages', {
  state: (): State => ({
    beverages,
    beverageNames,
    beveragesLevel,
    beverageTags,
    currentBeverage: null,
    filterForm: {
      selectBeverageTags: [],
      searchName: ''
    }
  }),
  getters: {
    // 标签匹配 - page
    getBeverageWithCurrentCustomer (): TBeverageMatchItem[] {
      const { currentCustomer } = useCustomerRareStore()
      return matchBeveragesWithCustomer(this.beverages, currentCustomer)
    },
    // 表单内容 - table
    getBeverageTableData (): TBeverageMatchItem[] {
      return filterBeveragesWithForm(this.getBeverageWithCurrentCustomer, this.filterForm)
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