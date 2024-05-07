import { getUnionTagsWithNames } from '@/utils/ingredients'

import { matchTagsWithCustomer } from '@/utils/recipes'
import type { TRecipeMatchItem, TRecipeMatchResult } from '@/utils/recipes'

import type { TCustomerRare } from '@/material'

const coverTagsOption = [
  ['饱腹', '下酒'],
  ['重油', '清淡'],
  ['肉', '素'],
  ['大份', '小巧'],
]

export function matchRecipeAndIngredients (
  customer: TCustomerRare,
  recipe: TRecipeMatchItem,
  extra_ingredients: string[]
): TRecipeMatchResult {

  if (!extra_ingredients.length) {

    const { match_like_tags, match_hate_tags } = recipe

    return { like: match_like_tags, hate: match_hate_tags }

  }
  // 正特性(喜好匹配 √) + 负特性(黑暗料理 x)
  const { positive_tags, ingredients } = recipe

  const all_ingredients = [...ingredients, ...extra_ingredients]

  const extra_tags = getUnionTagsWithNames(extra_ingredients)

  const base_tags = positive_tags

  const set_tags = new Set([...base_tags, ...extra_tags])
  // 流行喜欢&厌恶
  if (all_ingredients.length === 5) {
    set_tags.add('大份')
  }
  // tag 覆盖
  coverTagsOption.forEach(([prefix, suffix]) => {
    if (set_tags.has(prefix)) {
      set_tags.delete(suffix)
    }
  })

  const union_tags = Array.from(set_tags)

  const { match_like_tags, match_hate_tags } = matchTagsWithCustomer(union_tags, customer)

  return { like: match_like_tags, hate: match_hate_tags }

}