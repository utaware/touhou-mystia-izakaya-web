import ingredientsJSON from '@/json/ingredients.json'

import { getUnionTags } from '@/utils'

const ingredients = ingredientsJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const ingredientTags = getUnionTags(ingredients, 'ingredient_tags')

const ingredientNames = ingredients.map(({name}) => name)

export type TIngredientsItem = typeof ingredients[number]

export { ingredients, ingredientTags, ingredientNames }