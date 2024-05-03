import beveragesJSON from '@/json/beverages.json'

import { getUnionTags } from '@/utils'

const beverages = beveragesJSON.map((item, index) => {
  return {
    ...item,
    index,
    disabled: false,
  }
})

const beverageTags = getUnionTags(beverages, 'beverage_tags')

export type TBeverageItem = typeof beverages[number]

export { beverages, beverageTags }