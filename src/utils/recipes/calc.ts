export const maxIngredientsCount = 5

export function getExtraIngredientsCount (ingredientsCount: number) {
  return maxIngredientsCount - ingredientsCount
}

export function getEmptyIngredientsCountWithArray (ingredients: string[], extra: string[]) {
  return [ingredients, extra].reduce((t, c) => t -= c.length, maxIngredientsCount)
}

export function getEmptyIngredientsCount (ingredientsCount: number, extraCount: number): number {
  return maxIngredientsCount - ingredientsCount - extraCount
}