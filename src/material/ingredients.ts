import ingredientsJSON from '@/json/ingredients.json'

import { getUnionTags, getNames, getIndexMaps } from '@/utils'

const ingredients = ingredientsJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const ingredientsTags = getUnionTags(ingredients, 'ingredient_tags')

const ingredientsNames = getNames(ingredients)

const ingredientsIndexMaps = getIndexMaps(ingredients)

export type TIngredientsItem = typeof ingredients[number]

export {
  ingredients,
  ingredientsNames,
  ingredientsTags,
  ingredientsIndexMaps,
}