import { ingredientsIndexMaps, ingredients } from '@/material'
import type { TIngredientsItem, TRecipeItem } from '@/material'

import { hasRepeatItem } from '@/utils/object'
import { composeRecipeTags } from '@/utils/recipes'
import { getMatchResult } from '@/utils/customer'

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

export interface TIngredientResult {
  normal: TIngredientsItem[];
  danger: TIngredientsItem[];
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

export interface TMatchIngredientsItem extends TIngredientsItem {
  remove_tags: string[];
  add_tags: string[];
  fix_tags: string[];
}

export interface TMatchIngredientsResult {
  normal: TMatchIngredientsItem[];
  danger: TIngredientsItem[];
}

export function getIngredientsStatus ({
  normal,
  recipe,
  extra,
  originAllTags,
}: {
  normal: TIngredientsItem[],
  recipe: TRecipeItem | null,
  extra: string[],
  originAllTags: string[]
}) {
  if (!recipe) {
    return normal.map(item => ({ ...item, remove_tags: [], add_tags: [], fix_tags: [] }))
  }
  const {
    positive_tags: recipePositiveTags,
    ingredients: recipeIngredientsNames,
  } = recipe
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
    return { ...item, remove_tags, add_tags, fix_tags }
  })
}