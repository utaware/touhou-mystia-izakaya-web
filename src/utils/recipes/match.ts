import type { TRecipeItem, TCustomerRare } from '@/material'

import { getMatchResult } from '@/utils/customer'
interface TRecipeMatchItem extends TRecipeItem {
  match_like_tags: string[],
  match_hate_tags: string[],
  match_recipe_point: number,
  badge_text: string,
}

interface TRecipeMatchResult {
  match_like_tags: string[],
  match_hate_tags: string[]
}

export type { TRecipeMatchItem, TRecipeMatchResult }

export function matchRecipeTagsWithCustomer (positive_tags: string[], customer: TCustomerRare): TRecipeMatchResult {
  const { like_tags, hate_tags } = customer
  const { isMatch: match_like_tags } = getMatchResult(like_tags, positive_tags)
  const { isMatch: match_hate_tags } = getMatchResult(hate_tags, positive_tags)
  return { match_like_tags, match_hate_tags }
}

export function getRowDataWithCustomer (recipe: TRecipeItem, customer: TCustomerRare): TRecipeMatchItem {
  const { positive_tags } = recipe
  const { match_like_tags, match_hate_tags } = matchRecipeTagsWithCustomer(positive_tags, customer)
  const like_point = match_like_tags.length
  const hate_point = match_hate_tags.length
  const match_recipe_point = like_point - hate_point
  const badge_text = String(match_recipe_point)
  return { ...recipe, match_like_tags, match_hate_tags, match_recipe_point, badge_text }
}

export function getTableDataWithCustomer (recipes: TRecipeItem[], customer: TCustomerRare): TRecipeMatchItem[] {
  return recipes.map((item: TRecipeItem) => getRowDataWithCustomer(item, customer))
}