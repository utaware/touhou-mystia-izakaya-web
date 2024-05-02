import { defineStore } from 'pinia'

import { beverages, type TBeverageItem } from '@/material'

import { generatorMapWithTags, type TGeneratorMap } from '@/utils'

export const useBeveragesStore = defineStore('beverages', {
  state: () => ({
    beverages,
  }),
  getters: {
    enableBeverages (state): TBeverageItem[] {
      return state.beverages.filter(v => !v.disabled)
    },
    allBeverageTags (): string[] {
      const flatTags = this.enableBeverages.map(v => v.beverage_tags).flat()
      return Array.from(new Set(flatTags))
    },
    beverageMaps (): TGeneratorMap<TBeverageItem[]> {
      return generatorMapWithTags(this.enableBeverages, 'beverage_tags')
    },
    getBeveragesWithTag(): (tags: string[]) => TBeverageItem[] {
      return (tags: string[]) => {
        const target = tags.map(t => this.beverageMaps[t]).flat()
        return Array.from(new Set<TBeverageItem>(target))
      }
    }
  }
})