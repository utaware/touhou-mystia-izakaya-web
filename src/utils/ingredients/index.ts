import { ingredientNames } from '@/material'

export const getIngredientIndex = (name: string): number => {
  return ingredientNames.indexOf(name)
}