import { defineStore } from 'pinia'

import { recipes, recipesLikeTags, recipesHateTags, type TRecipeItem } from '@/material'

export { type TRecipeItem }

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    recipes,
    recipesLikeTags,
    recipesHateTags
  }),
  getters: {
    
  }
})