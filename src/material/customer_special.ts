import customer_special from '@/json/customer_special.json'

import { getAssetsUrl, word2PY } from '@/utils'

const customerSpecial = customer_special.map((item) => {
  const { name } = item
  return {
    ...item,
    src: getAssetsUrl(`character-rare/${word2PY(name)}.png`)
  }
})

export type TCustomerSpecial = typeof customerSpecial[number]

export { customerSpecial }