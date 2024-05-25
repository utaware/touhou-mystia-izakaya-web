import { defineStore } from 'pinia'
import { useCustomerRareStore } from '@/pinia'

import {
  beverages,
  beverageTags,
  beverageNames,
  beveragesLevel,
  getIndexWithName,
} from '@/material'
import type {
  TBeverageState,
  TBeverageMatchItem,
  TBeverageFilterForm
} from '@/material'

import {
  matchBeveragesWithCustomer,
  filterBeveragesWithForm,
  getBeveragePoint,
} from '@/utils/beverages'

import { cloneDeep } from 'lodash'

export const useBeveragesStore = defineStore('beverages', {
  state: (): TBeverageState => ({
    beverages,
    beverageNames,
    beveragesLevel,
    beverageTags,
    currentBeverage: null,
    currentBeverageName: '',
    filterForm: {
      beverageTags: [],
      name: ''
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
      return getBeveragePoint({
        match_beverage_tags: currentBeverageMatchTags,
        beverageAllTags: currentBeverageAllTags,
        demandBeverageTag,
      })
    }
  },
  actions: {
    setCurrentBeverage (name: string) {
      const index = getIndexWithName('beverages', name)
      const item = this.getBeverageWithCurrentCustomer[index]
      const clone = cloneDeep(item)
      this.currentBeverage = clone
      this.currentBeverageName = name
    },
    clearCurrentBeverage () {
      this.currentBeverage = null
      this.currentBeverageName = ''
    },
    setFilterForm <T extends TBeverageFilterForm, U extends keyof TBeverageFilterForm>(key: U, value: T[U]) {
      this.filterForm[key] = value
    },
  },
})