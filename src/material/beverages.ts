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

export type TBeverages = typeof beverages[number]

export { beverages }