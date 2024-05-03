import { defineStore } from 'pinia'

import { ingredients, type TIngredientsItem } from '@/material'

export { type TIngredientsItem }

export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    ingredients
  }),
})