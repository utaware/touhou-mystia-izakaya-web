import customer_rare from '@/json/customer_rare.json'

import { getAssetsUrl, word2PY } from '@/utils'

const customerRare = customer_rare.map((item) => {
  const { name } = item
  const [ dlc, place ] = item.place.split(' ')
  return {
    ...item,
    disabled: false,
    src: getAssetsUrl(`character-rare/${word2PY(name)}.png`),
    dlc,
    place
  }
})

export type TCustomerRare = typeof customerRare[number]

export { customerRare }