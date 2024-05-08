import { matchRecipeTagsWithCustomer } from '@/utils/recipes'

import type { TRecipeMatchItem, TRecipeMatchResult } from '@/utils/recipes'

import type { TCustomerRare } from '@/material'

import { pick, isEmpty } from 'lodash'

const coverOptionsMap = {
  '饱腹': '下酒',
  '重油': '清淡',
  '肉': '素',
  '大份': '小巧'
}
 // tag 覆盖
export function handleCoverTags (set_tags: Set<string>, options: Record<string, string>): string[] {

  Object.entries(options).forEach(([pre, suf]) => {

    set_tags.has(pre) && set_tags.delete(suf)

  })

  return Array.from(set_tags)
}

export function composeRecipeTags ({
    recipe_positive_tags,
    recipe_ingredients_names,
    extra_ingredients_tags,
    extra_ingredients_names,
  } : {
    recipe_positive_tags: string[],
    recipe_ingredients_names: string[],
    extra_ingredients_tags: string[],
    extra_ingredients_names: string[],
  }) {
    // recipe - null
    if (isEmpty(recipe_positive_tags)) {
      return []
    }

    // ingredients - []
    if (isEmpty(extra_ingredients_names)) {
      return recipe_positive_tags
    }

    const unionTags = new Set<string>([...recipe_positive_tags, ...extra_ingredients_tags])

    const totalIngredientsCount = recipe_ingredients_names.length + extra_ingredients_names.length
    // 食材数量 = 5, 添加大份
    if (totalIngredientsCount >= 5) {
      unionTags.add('大份')
    }
    // 覆盖
    const resultTags = handleCoverTags(unionTags, coverOptionsMap)

    return resultTags

}

/**
 * @param customer 顾客
 * @param recipe 菜谱
 * @param ingredients_tags 额外食材标签
 * @param extra_ingredients 额外食材名单
 * @returns 菜谱匹配喜好结果
 */
export function matchRecipeAndIngredients ({
  customer,
  recipe,
  extra_ingredients_names,
  extra_ingredients_tags,
}: {
  customer: TCustomerRare,
  recipe: TRecipeMatchItem,
  extra_ingredients_tags: string[],
  extra_ingredients_names: string[]
}): TRecipeMatchResult {

  if (!extra_ingredients_names.length) {

    return pick(recipe, ['match_like_tags', 'match_hate_tags'])

  }
  // 正特性(喜好匹配 √) + 负特性(黑暗料理 x)
  const { positive_tags: recipe_positive_tags, ingredients: recipe_ingredients_names } = recipe

  const union_tags = composeRecipeTags({
    recipe_positive_tags,
    recipe_ingredients_names,
    extra_ingredients_tags,
    extra_ingredients_names,
  })

  return pick(matchRecipeTagsWithCustomer(union_tags, customer))

}
