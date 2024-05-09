import {
  tools,
  recipes,
  beverages,
  ingredients,
  toolsIndexMaps,
  recipesIndexMaps,
  beveragesIndexMaps,
  ingredientsIndexMaps,

} from '@/material/base'

export const allStoreMap = {
  recipes: recipesIndexMaps,
  beverages: beveragesIndexMaps,
  ingredients: ingredientsIndexMaps,
  tools: toolsIndexMaps,
}

export type TSpriteType = keyof typeof allStoreMap

export const allStoreItems = {
  recipes,
  beverages,
  ingredients,
  tools
}

export const spriteCountOptions = Object
  .entries(allStoreItems)
  .reduce((t: { [key: string]: number }, [k, v]) => (t[k] = v.length, t), {})

export const getIndexWithName = (type: TSpriteType, name: string): number => allStoreMap[type][name]