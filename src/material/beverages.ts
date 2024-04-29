import beveragesJSON from '@/json/beverages.json'

const beverages = beveragesJSON.map((item) => {
  return {
    ...item,
    disabled: false,
  }
})

const beverageTags = new Set(beverages.map(v => v.beverage_tags).flat())

export type TBeverages = typeof beverages[number]

export { beverages, beverageTags }