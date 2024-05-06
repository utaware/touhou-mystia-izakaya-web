import { defineStore } from 'pinia'

import { ingredients, ingredientNames,  } from '@/material'
import type { TIngredientsItem } from '@/material'

export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    ingredients,
    ingredientNames,
  }),
  getters: {
    
  }
})

export { type TIngredientsItem }