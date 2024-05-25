import {
  customerPlace,
  customerDLC,
  recipesPositiveTags,
  recipesNegativeTags,
  toolNames,
  beverageTags,
  beveragesLevel,
  recipeslevel,
  ingredientsNames,
  ingredientsTags,
  ingredientsLevel,
} from '@/material/base'

interface TSelectOptions {
  label: string;
  value: string | number;
  class?: string;
  disabled?: boolean;
}

type TOptionsValue = string | number

type TCallBackFn = (value: TOptionsValue) => TSelectOptions

export type { TSelectOptions, TOptionsValue }

export function mapSelectOptions (options: TOptionsValue[], extra?: TCallBackFn | object): TSelectOptions[] {
  return options.map((v) => {
    const base = { label: String(v), value: v }
    if (!extra) {
      return base
    }
    if (typeof(extra) === 'function') {
      return extra(v)
    }
    return { ...extra, ...base }
  })
}
// 顾客
export const customerPlaceOptions = mapSelectOptions(customerPlace)
export const dlcOptions = mapSelectOptions(customerDLC, { class: 'bold' })
// 食谱
export const positiveTagOptions = mapSelectOptions(recipesPositiveTags, { class: 'bold' })
export const negativeTagOptions = mapSelectOptions(recipesNegativeTags, { class: 'bold' })
export const recipesToolOptions = mapSelectOptions(toolNames, { class: 'bold' })
export const recipesLevelOptions = mapSelectOptions(recipeslevel, (v) => ({ label: `Lv.${v}`, value: v }))
// 酒水
export const beverageTagOptions = mapSelectOptions(beverageTags, { class: 'bold' })
export const beverageLevelOptions = mapSelectOptions(beveragesLevel, (v) => ({ label: `Lv.${v}`, value: v }))
// 食材
export const ingredientsOptions = mapSelectOptions(ingredientsNames, { class: 'bold' })
export const ingredientsTagOptions = mapSelectOptions(ingredientsTags, { class: 'bold' })
export const ingredientsLevelOptions = mapSelectOptions(ingredientsLevel, (v) => ({ label: `Lv.${v}`, value: v }))