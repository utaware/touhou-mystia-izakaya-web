import { defineStore } from 'pinia'

import { recipes, recipesLikeTags, recipesHateTags } from '@/material'

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    recipes,
    recipesLikeTags,
    recipesHateTags
  })
})