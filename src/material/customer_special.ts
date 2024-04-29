import customer_special from '@/json/customer_special.json'

import { getAssetsUrl } from '@/utils'

const customerSpecial = customer_special.map((item) => {
  const { namePY } = item
  return {
    ...item,
    src: getAssetsUrl(`character-rare/${namePY}.png`)
  }
})

export type TCustomerSpecial = typeof customerSpecial[number]

export { customerSpecial }