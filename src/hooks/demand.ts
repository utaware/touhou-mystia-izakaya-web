import { storeToRefs } from 'pinia'

import { useCustomerRareStore, useBeveragesStore, useRecipesStore } from '@/pinia'

import { isSpecialRecipeDemand } from '@/utils/customer'

export function useDemandSelect () {

  const customerStore = useCustomerRareStore()
  const recipesStore = useRecipesStore()
  const beveragesStore = useBeveragesStore()

  const { setFilterForm: setRecipesFilter } = recipesStore
  const { setFilterForm: setBeveragesFilter } = beveragesStore

  const { setDemandRecipeTag, setDemandBeverageTag } = customerStore

  const { demandSyncFilter } = storeToRefs(customerStore)

  const handleChangePositiveTag = (value: string | null) => {
    if (demandSyncFilter.value) {
      if (!value || isSpecialRecipeDemand(value)) {
        setRecipesFilter('positiveTags', [])
      } else {
        setRecipesFilter('positiveTags', [value])
      }
    }
    setDemandRecipeTag(value)
  }

  const handleChangeBeverageTag = (value: string | null) => {
    if (demandSyncFilter.value) {
      const val = value ? [value] : []
      setBeveragesFilter('beverageTags', val)
    }
    setDemandBeverageTag(value)
  }

  return { handleChangePositiveTag, handleChangeBeverageTag }
}