import beveragesJSON from '@/json/beverages.json'

import { getUnionTags, getNames, getIndexMaps } from '@/utils'

const beverages = beveragesJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const beverageTags = getUnionTags(beverages, 'beverage_tags')

const beverageNames = getNames(beverages)

const beveragesIndexMaps = getIndexMaps(beverages)

export type TBeverageItem = typeof beverages[number]

export {
  beverages,
  beverageTags,
  beverageNames,
  beveragesIndexMaps,
}