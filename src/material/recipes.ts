import recipesJSON from '@/json/recipes.json'

import { getUnionTags } from '@/utils'

const recipes = recipesJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const recipesLikeTags = getUnionTags(recipes, 'positive_tags')
const recipesHateTags = getUnionTags(recipes, 'negative_tags')

export type TRecipeItem = typeof recipes[number]

export { recipes, recipesLikeTags, recipesHateTags }