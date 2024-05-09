import { mapSelectOptions } from '@/utils/options'

import {
  customerPlace,
  recipesPositiveTags,
  recipesNegativeTags,
  toolNames,
  beverageTags,
  beveragesLevel,
} from '@/material'

// 顾客
export const customerPlaceOptions = mapSelectOptions(customerPlace)
// 食谱
export const positiveTagOptions = mapSelectOptions(recipesPositiveTags, { class: 'bold' })
export const negativeTagOptions = mapSelectOptions(recipesNegativeTags, { class: 'bold' })
export const recipesToolOptions = mapSelectOptions(toolNames, { class: 'bold' })
// 酒水
export const beverageTagOptions = mapSelectOptions(beverageTags, { class: 'bold' })
export const beverageLevelOptions = mapSelectOptions(beveragesLevel, (v) => ({ label: `Lv.${v}`, value: v }))