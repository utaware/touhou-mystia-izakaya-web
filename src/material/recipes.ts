import recipesJSON from '@/json/recipes.json'

import { getUnionTags } from '@/utils'

const recipes = recipesJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const recipesPositiveTags = getUnionTags(recipes, 'positive_tags')
const recipesNegativeTags = getUnionTags(recipes, 'negative_tags')

export type TRecipeItem = typeof recipes[number]

export { recipes, recipesPositiveTags, recipesNegativeTags }