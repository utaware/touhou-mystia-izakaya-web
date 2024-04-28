import { defineStore } from 'pinia'

import { beverages, type TBeverages } from '@/material'

interface TBeveragesMaps {
  [key: string]: TBeverages[]
}

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
    beverageMaps (): TBeveragesMaps {
      return this.enableBeverages.reduce((total: TBeveragesMaps, current: TBeverages) => {
        const { beverage_tags } = current
        beverage_tags.forEach((tag) => {
          total[tag] ??= []
          total[tag].push(current)
        })
        return total
      }, {})
    },
    getBeveragesWithTag(): (tags: string[]) => TBeverages[] {
      return (tags: string[]) => {
        const target = tags.map(t => this.beverageMaps[t]).flat()
        return Array.from(new Set<TBeverages>(target))
      }
    }
  }
})