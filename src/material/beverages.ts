import beveragesJSON from '@/json/beverages.json'

import { word2PY } from '@/utils'

const beverages = beveragesJSON.map((item) => {
  const { name } = item
  return {
    ...item,
    disabled: false,
    namePY: word2PY(name),
  }
})

const beverageTags = new Set(beverages.map(v => v.beverage_tags).flat())

export type TBeverages = typeof beverages[number]

export { beverages, beverageTags }