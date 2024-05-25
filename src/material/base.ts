import customerRareJSON from '@/json/customer_rare.json'
import recipesJSON from '@/json/recipes.json'
import beveragesJSON from '@/json/beverages.json'
import ingredientsJSON from '@/json/ingredients.json'
import toolsJSON from '@/json/tools.json'

import { getUnionTags, getUnionKeys, getNames, getIndexMaps, setItemIndex } from '@/utils/material'

export const customerRare = setItemIndex(customerRareJSON)
export const recipes = setItemIndex(recipesJSON)
export const beverages = setItemIndex(beveragesJSON)
export const ingredients = setItemIndex(ingredientsJSON)
export const tools = setItemIndex(toolsJSON)

export const customerDLC = getUnionKeys(customerRare, 'dlc')
export const customerPlace = getUnionKeys(customerRare, 'place')

export const recipesPositiveTags = getUnionTags(recipes, 'positive_tags')
export const recipesNegativeTags = getUnionTags(recipes, 'negative_tags')
export const beverageTags = getUnionTags(beverages, 'beverage_tags')
export const ingredientsTags = getUnionTags(ingredients, 'ingredient_tags')

export const recipeslevel = getUnionKeys(recipes, 'level').sort()
export const beveragesLevel = getUnionKeys(beverages, 'level').sort()
export const ingredientsLevel = getUnionKeys(ingredients, 'level').sort()
export const toolNames = getUnionKeys(tools, 'name')

export const recipesNames = getNames(recipes)
export const beverageNames = getNames(beverages)
export const ingredientsNames = getNames(ingredients)
export const toolsNames = getNames(tools)

export const customerRareIndexMap = getIndexMaps(customerRare)
export const recipesIndexMaps = getIndexMaps(recipes)
export const beveragesIndexMaps = getIndexMaps(beverages)
export const ingredientsIndexMaps = getIndexMaps(ingredients)
export const toolsIndexMaps = getIndexMaps(tools)

export type TSortOrderValue = 'desc' | 'asc' | false

export type TCustomerTags = Pick<TCustomerRare, 'like_tags' | 'hate_tags' | 'beverage_tags'>
export type TCustomerTagType = 'like' | 'hate' | 'beverage' | 'default'
export type TCustomerTagsTypeFn = (tag: string, customer: TCustomerTags) => TCustomerTagType

export type TRecipeItem = typeof recipes[number]
export type TBeverageItem = typeof beverages[number]
export type TIngredientsItem = typeof ingredients[number]
export type TCustomerRare = typeof customerRare[number]