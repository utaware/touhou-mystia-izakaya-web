import customer_rare from '@/json/customer_rare.json'

import { getAssetsUrl } from '@/utils'

function pickUnionSet<T, U extends keyof T>(target: Array<T>, key: U) {
  const pickSet = target.map(v => v[key])
  const unionSet = new Set(pickSet)
  return Array.from(unionSet)
}

const customerDLC = pickUnionSet(customer_rare, 'dlc')

const customerPlace = pickUnionSet(customer_rare, 'place')

const customerRare = customer_rare.map((item) => {
  const { namePY } = item
  return {
    ...item,
    disabled: false,
    src: getAssetsUrl(`character-rare/${namePY}.png`),
  }
})

export type TCustomerTagType = 'like' | 'hate' | 'beverage'

export type TCustomerRare = typeof customerRare[number]

export {
  customerRare,
  customerDLC,
  customerPlace,
}