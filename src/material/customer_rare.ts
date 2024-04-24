import customer_rare from '@/json/customer_rare.json'

import { getAssetsUrl, word2PY } from '@/utils'

const customerRare = customer_rare.map((item) => {
  const { name } = item
  return {
    ...item,
    disabled: false,
    src: getAssetsUrl(`character-rare/${word2PY(name)}.png`)
  }
})

export type TCustomerRare = typeof customerRare[number]

export { customerRare }