import { getIndexWithName, ingredients } from '@/material'

import type { TIngredientsItem } from '@/material'

import { union } from 'lodash'

export function getTagsWithNames (list: string[]): string[][] {
  return list.map((name) => {
    const index = getIndexWithName('ingredients', name)
    const item: TIngredientsItem = ingredients[index]
    const tags = item.ingredient_tags
    return tags
  })
}

export function getUnionTagsWithNames (list: string[]): string[] {
  return union(getTagsWithNames(list).flat())
}