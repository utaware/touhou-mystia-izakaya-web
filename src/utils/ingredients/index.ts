import { ingredientsIndexMaps, ingredients } from '@/material'
import type { TIngredientsItem, TRecipeItem, TIngredientResult, TCustomerRare } from '@/material'

import { hasRepeatItem } from '@/utils/object'
import { composeRecipeTags, getEmptyIngredientsCountWithArray } from '@/utils/recipes'
import { getMatchResult, calcPointChange } from '@/utils/customer'

import { union } from 'lodash'

export function getTagsWithNames (list: string[]): string[][] {
  return list.map((name) => {
    const index = ingredientsIndexMaps[name]
    const item: TIngredientsItem = ingredients[index]
    const tags = item.ingredient_tags
    return tags
  })
}

export function getUnionTagsWithNames (list: string[]): string[] {
  return union(getTagsWithNames(list).flat())
}

export function getValidIngredients (
  recipe: TRecipeItem | null,
  ingredients: TIngredientsItem[],
): TIngredientResult {
  const defaultResult: TIngredientResult  = { normal: [], danger: [] }
  if (!recipe) {
    return { ...defaultResult, normal: ingredients }
  }
  const { negative_tags } = recipe
  const { normal, danger } = defaultResult
  ingredients.forEach((item) => {
    const { ingredient_tags } = item
    const isDarkCuisine = hasRepeatItem(ingredient_tags, negative_tags)
    const target = isDarkCuisine ? danger : normal
    target.push(item)
  })
  return { normal, danger }
}

export function getIngredientsStatus ({
  customer,
  recipe,
  normal,
  extra,
  originAllTags,
}: {
  customer: TCustomerRare,
  recipe: TRecipeItem | null,
  normal: TIngredientsItem[],
  extra: string[],
  originAllTags: string[]
}) {
  if (!recipe || !getEmptyIngredientsCountWithArray(recipe.ingredients, extra)) {
    return normal.map(item => ({
      ...item,
      remove_tags: [],
      add_tags: [],
      fix_tags: [],
      badge_text: '',
    }))
  }
  const {
    positive_tags: recipePositiveTags,
    ingredients: recipeIngredientsNames,
  } = recipe
  const { like_tags, hate_tags } = customer
  return normal.map((item) => {
    const { name } = item
    const extraIngredientsNames = [ ...extra, name ]
    const extraIngredientsTags = getUnionTagsWithNames(extraIngredientsNames)
    const currentAllTags = composeRecipeTags({
      recipePositiveTags,
      recipeIngredientsNames,
      extraIngredientsNames,
      extraIngredientsTags,
    })
    const {
      isMatch: fix_tags,
      noMatch: remove_tags,
      unMatch: add_tags,
    } = getMatchResult(originAllTags, currentAllTags)
    const point = calcPointChange({ like_tags, hate_tags, add_tags, remove_tags })
    const mark = point > 0 ? '+' : ''
    const badge_text = mark + point
    return { ...item, remove_tags, add_tags, fix_tags, badge_text }
  })
}