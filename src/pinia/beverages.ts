import { defineStore } from 'pinia'

import { beverages, type TBeverages } from '@/material'

import { generatorMapWithTags, type TGeneratorMap } from '@/utils'

export const useBeveragesStore = defineStore('beverages', {
  state: () => ({
    beverages,
  }),
  getters: {
    enableBeverages (state): TBeverages[] {
      return state.beverages.filter(v => !v.disabled)
    },
    allBeverageTags (): string[] {
      const flatTags = this.enableBeverages.map(v => v.beverage_tags).flat()
      return Array.from(new Set(flatTags))
    },
    beverageMaps (): TGeneratorMap<TBeverages[]> {
      return generatorMapWithTags(this.enableBeverages, 'beverage_tags')
    },
    getBeveragesWithTag(): (tags: string[]) => TBeverages[] {
      return (tags: string[]) => {
        const target = tags.map(t => this.beverageMaps[t]).flat()
        return Array.from(new Set<TBeverages>(target))
      }
    }
  }
})