export const maxIngredientsCount = 5

export function getExtraIngredientsCount (ingredientsCount: number) {
  return maxIngredientsCount - ingredientsCount
}

export function getEmptyIngredientsCount (ingredientsCount: number, extraCount: number): number {
  return maxIngredientsCount - ingredientsCount - extraCount
}