import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import {
  beverages,
  beverageTags,
  beverageNames,
  beveragesLevel,
  getIndexWithName,
} from '@/material'
import type { TBeverageItem } from '@/material'

import { matchBeveragesWithCustomer, filterBeveragesWithForm,  } from '@/utils/beverages'
import type { TBeverageMatchItem, TFilterForm } from '@/utils/beverages'

import { without } from 'lodash'

interface State {
  beverages: TBeverageItem[];
  beverageNames: string[];
  beveragesLevel: number[];
  beverageTags: string[];
  currentBeverage: null | TBeverageMatchItem,
  currentBeverageName: string;
  filterForm: TFilterForm;
}

export const useBeveragesStore = defineStore('beverages', {
  state: (): State => ({
    beverages,
    beverageNames,
    beveragesLevel,
    beverageTags,
    currentBeverage: null,
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
    // 当前酒水的所有tag
    currentBeverageAllTags (): string[] {
      return this.currentBeverage ? this.currentBeverage.beverage_tags : []
    },
    currentBeverageMatchTags (): string[] {
      return this.currentBeverage ? this.currentBeverage.match_beverage_tags : []
    },
    // 当前酒水匹配得分
    currentBeveragePoint (): number {
      const { demandBeverageTag } = useCustomerRareStore()
      const { currentBeverageAllTags, currentBeverageMatchTags } = this
      const tag = demandBeverageTag || ''
      const demand_point = currentBeverageAllTags.includes(tag) ? 1 : 0
      const match_point = without(currentBeverageMatchTags, tag).length
      // 需求分 + 匹配分
      return demand_point + match_point
    }
  },
  actions: {
    setCurrentBeverage (name: string) {
      const index = getIndexWithName('beverages', name)
      const item = this.getBeverageWithCurrentCustomer[index]
      this.currentBeverage = item
      this.currentBeverageName = name
    },
    setFilterForm <T extends TFilterForm, U extends keyof TFilterForm>(key: U, value: T[U]) {
      this.filterForm[key] = value
    },
  },
})

export type { TBeverageItem, TBeverageMatchItem }