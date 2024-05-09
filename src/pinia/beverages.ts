import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import { beverages, beverageTags, beverageNames, beveragesLevel, beveragesIndexMaps } from '@/material'
import type { TBeverageItem } from '@/material'

import { matchBeveragesWithCustomer, filterBeveragesWithForm,  } from '@/utils/beverages'
import type { TBeverageMatchItem, TFilterForm } from '@/utils/beverages'

interface State {
  beverages: TBeverageItem[];
  beverageNames: string[];
  beveragesLevel: number[];
  beverageTags: string[];
  currentBeverageName: string;
  filterForm: TFilterForm;
}

export const useBeveragesStore = defineStore('beverages', {
  state: (): State => ({
    beverages,
    beverageNames,
    beveragesLevel,
    beverageTags,
    currentBeverageName: '',
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
    currentBeverage (): TBeverageMatchItem | null {
      const index = beveragesIndexMaps[this.currentBeverageName]
      return index ? this.getBeverageWithCurrentCustomer[index] : null
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
    setCurrentBeverage ({ name }: TBeverageMatchItem) {
      this.currentBeverageName = name
    },
  },
})

export type { TBeverageItem, TBeverageMatchItem }