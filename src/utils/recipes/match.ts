import { TRecipeItem, TCustomerRare } from '@/material'

import { getMatchResult } from '@/utils/tag'
interface TRecipeMatchItem extends TRecipeItem {
  like_match_tags: string[],
  hate_match_tags: string[],
  badge_text: string,
  match_recipe_point: number,
}

export type { TRecipeMatchItem }

export function matchRecipesWithCustomer (recipes: TRecipeItem[], customer: TCustomerRare): TRecipeMatchItem[] {
  const { like_tags, hate_tags } = customer
  return recipes.map((item: TRecipeItem) => {
    const { positive_tags } = item
    const { isMatch: like_match_tags } = getMatchResult(like_tags, positive_tags)
    const { isMatch: hate_match_tags } = getMatchResult(hate_tags, positive_tags)
    const match_recipe_point = like_match_tags.length - hate_match_tags.length
    const badge_text = String(match_recipe_point)
    return {
      ...item,
      like_match_tags,
      hate_match_tags,
      match_recipe_point,
      badge_text
    }
  })
}