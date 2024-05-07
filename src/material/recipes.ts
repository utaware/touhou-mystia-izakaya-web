import recipesJSON from '@/json/recipes.json'

import { getUnionTags, getNames, getIndexMaps } from '@/utils'

const recipes = recipesJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const tools = ['烤架', '料理台', '油锅', '蒸锅', '煮锅']

const toolsIndexMaps = tools.reduce((t: { [key: string]: number }, c, i) => (t[c] = i, t), {})

const recipesPositiveTags = getUnionTags(recipes, 'positive_tags')

const recipesNegativeTags = getUnionTags(recipes, 'negative_tags')

const recipesNames = getNames(recipes)

const recipesIndexMaps = getIndexMaps(recipes)

export type TRecipeItem = typeof recipes[number]

export {
  tools,
  toolsIndexMaps,
  recipes,
  recipesNames,
  recipesIndexMaps,
  recipesPositiveTags,
  recipesNegativeTags,
}