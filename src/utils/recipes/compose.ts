import { matchRecipeTagsWithCustomer } from '@/utils/recipes'

import type { TCustomerRare, TRecipeMatchItem, TRecipeMatchResult } from '@/material'

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
    recipePositiveTags,
    recipeIngredientsNames,
    extraIngredientsNames,
    extraIngredientsTags,
  } : {
    recipePositiveTags: string[],
    recipeIngredientsNames: string[],
    extraIngredientsNames: string[],
    extraIngredientsTags: string[],
  }) {
    // recipe - null
    if (isEmpty(recipePositiveTags)) {
      return []
    }

    // ingredients - []
    if (isEmpty(extraIngredientsNames)) {
      return recipePositiveTags
    }

    const unionTags = new Set<string>([...recipePositiveTags, ...extraIngredientsTags])

    const totalIngredientsCount = recipeIngredientsNames.length + extraIngredientsNames.length
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
  extraIngredientsNames,
  extraIngredientsTags,
}: {
  customer: TCustomerRare,
  recipe: TRecipeMatchItem,
  extraIngredientsNames: string[],
  extraIngredientsTags: string[],
}): TRecipeMatchResult {

  if (!extraIngredientsNames.length) {

    return pick(recipe, ['match_like_tags', 'match_hate_tags'])

  }
  // 正特性(喜好匹配 √) + 负特性(黑暗料理 x)
  const { positive_tags: recipePositiveTags, ingredients: recipeIngredientsNames } = recipe

  const union_tags = composeRecipeTags({
    recipePositiveTags,
    recipeIngredientsNames,
    extraIngredientsNames,
    extraIngredientsTags,
  })

  return matchRecipeTagsWithCustomer(union_tags, customer)

}
