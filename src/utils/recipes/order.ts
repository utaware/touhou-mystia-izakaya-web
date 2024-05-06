import type { TRecipeMatchItem } from '@/pinia'

import type { TSortOrderValue } from '@/utils/order'

import { orderBy } from 'lodash'

export function sortOrderRecipes (recipes: TRecipeMatchItem[], order: TSortOrderValue): TRecipeMatchItem[] {
  return orderBy(recipes, ['match_recipe_point'], order)
}