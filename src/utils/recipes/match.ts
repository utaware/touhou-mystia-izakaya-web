import type { TRecipeItem, TCustomerRare } from '@/material'

import { getMatchResult } from '@/utils/tag'
interface TRecipeMatchItem extends TRecipeItem {
  match_like_tags: string[],
  match_hate_tags: string[],
  match_recipe_point: number,
  badge_text: string,
}

export type { TRecipeMatchItem }

export function matchRecipesWithCustomer (recipes: TRecipeItem[], customer: TCustomerRare): TRecipeMatchItem[] {
  const { like_tags, hate_tags } = customer
  return recipes.map((item: TRecipeItem) => {
    const { positive_tags } = item
    const { isMatch: match_like_tags } = getMatchResult(like_tags, positive_tags)
    const { isMatch: match_hate_tags } = getMatchResult(hate_tags, positive_tags)
    const match_recipe_point = match_like_tags.length - match_hate_tags.length
    const badge_text = String(match_recipe_point)
    return {
      ...item,
      match_like_tags,
      match_hate_tags,
      match_recipe_point,
      badge_text
    }
  })
}