import { ingredientsNames, ingredients } from '@/material'

import type { TIngredientsItem } from '@/material'

export const getIngredientIndex = (name: string): number => {
  return ingredientsNames.indexOf(name)
}

export const getIngredientItems = (names: string[]): TIngredientsItem[] => {
  return names.map((name) => {
    const index = getIngredientIndex(name)
    return ingredients[index]
  })
}