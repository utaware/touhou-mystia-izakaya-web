import { storeToRefs } from 'pinia'

import { useCustomerRareStore } from '@/pinia'

export function useCustomerActiveTab () {

  const customerStore = useCustomerRareStore()

  const { activeTabName } = storeToRefs(customerStore)

  const { setActiveTabName } = customerStore

  return { activeTabName, setActiveTabName }

}