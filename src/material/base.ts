import customerRareJSON from '@/json/customer_rare.json'
import recipesJSON from '@/json/recipes.json'
import beveragesJSON from '@/json/beverages.json'
import ingredientsJSON from '@/json/ingredients.json'
import toolsJSON from '@/json/tools.json'

import { getUnionTags, getUnionKeys, getNames, getIndexMaps, extendItemIndex } from '@/utils'

export const customerRare = extendItemIndex(customerRareJSON)
export const recipes = extendItemIndex(recipesJSON)
export const beverages = extendItemIndex(beveragesJSON)
export const ingredients = extendItemIndex(ingredientsJSON)
export const tools = extendItemIndex(toolsJSON)

export const customerDLC = getUnionKeys(customerRare, 'dlc')
export const customerPlace = getUnionKeys(customerRare, 'place')
export const toolNames = getUnionKeys(tools, 'name')
export const beveragesLevel = getUnionKeys(beverages, 'level')

export const recipesPositiveTags = getUnionTags(recipes, 'positive_tags')
export const recipesNegativeTags = getUnionTags(recipes, 'negative_tags')
export const beverageTags = getUnionTags(beverages, 'beverage_tags')
export const ingredientsTags = getUnionTags(ingredients, 'ingredient_tags')

export const recipesNames = getNames(recipes)
export const beverageNames = getNames(beverages)
export const ingredientsNames = getNames(ingredients)
export const toolsNames = getNames(tools)

export const customerRareIndexMap = getIndexMaps(customerRare)
export const recipesIndexMaps = getIndexMaps(recipes)
export const beveragesIndexMaps = getIndexMaps(beverages)
export const ingredientsIndexMaps = getIndexMaps(ingredients)
export const toolsIndexMaps = getIndexMaps(tools)

export type TCustomerTagType = 'like' | 'hate' | 'beverage'

export type TRecipeItem = typeof recipes[number]
export type TBeverageItem = typeof beverages[number]
export type TIngredientsItem = typeof ingredients[number]
export type TCustomerRare = typeof customerRare[number]