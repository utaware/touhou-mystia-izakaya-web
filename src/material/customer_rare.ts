import customer_rare from '@/json/customer_rare.json'

import { getAssetsUrl } from '@/utils'

const customerRare = customer_rare.map((item) => {
  const { namePY } = item
  return {
    ...item,
    disabled: false,
    src: getAssetsUrl(`character-rare/${namePY}.png`),
  }
})

export type TCustomerRare = typeof customerRare[number]

export { customerRare }