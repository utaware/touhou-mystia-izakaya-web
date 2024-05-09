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
export const positiveTagOptions = mapSelectOptions(recipesPositiveTags)
export const negativeTagOptions = mapSelectOptions(recipesNegativeTags)
export const recipesToolOptions = mapSelectOptions(toolNames)
// 酒水
export const beverageTagOptions = mapSelectOptions(beverageTags)
export const beverageLevelOptions = mapSelectOptions(beveragesLevel, (v) => ({ label: `Lv.${v}`, value: v }))