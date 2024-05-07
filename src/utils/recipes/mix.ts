import { getUnionTagsWithNames } from '@/utils/ingredients'

import { matchRecipeTagsWithCustomer } from '@/utils/recipes'
import type { TRecipeMatchItem, TRecipeMatchResult } from '@/utils/recipes'

import type { TCustomerRare } from '@/material'

import { pick } from 'lodash'

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

    return pick(recipe, ['match_like_tags', 'match_hate_tags'])

  }
  // 正特性(喜好匹配 √) + 负特性(黑暗料理 x)
  const { positive_tags } = recipe

  const extra_tags = getUnionTagsWithNames(extra_ingredients)

  const set_tags = new Set([...positive_tags, ...extra_tags])

  handleAddTags(set_tags, recipe, extra_ingredients)

  handleCoverTags(set_tags, coverTagsOption)

  const union_tags = Array.from(set_tags)

  return pick(matchRecipeTagsWithCustomer(union_tags, customer))

}

// 食材数量 = 5, 添加大份
export function handleAddTags (
  set_tags: Set<string>,
  recipe: TRecipeMatchItem,
  extra_ingredients: string[],
) {
  const { ingredients } = recipe
  const all_ingredients = [...ingredients, ...extra_ingredients]
  if (all_ingredients.length === 5) {
    set_tags.add('大份')
  }
}

 // tag 覆盖
export function handleCoverTags (set_tags: Set<string>, options: string[][]) {
  options.forEach(([prefix, suffix]) => {
    if (set_tags.has(prefix)) {
      set_tags.delete(suffix)
    }
  })
}