import { ingredientsIndexMaps, ingredients } from '@/material'

import { hasRepeatItem } from '@/utils/object'

import type { TIngredientsItem, TRecipeItem } from '@/material'

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

export function getValidIngredients(
  ingredients: TIngredientsItem[],
  recipe: TRecipeItem,
): TIngredientResult {
  const { negative_tags } = recipe
  const normal: TIngredientsItem[] = []
  const danger: TIngredientsItem[] = []
  ingredients.forEach((item) => {
    const { ingredient_tags } = item
    const isDarkCuisine = hasRepeatItem(ingredient_tags, negative_tags)
    const target = isDarkCuisine ? danger : normal
    target.push(item)
  })
  return { normal, danger }
}