import { useBeveragesStore, useRecipesStore, useCustomerRareStore } from '@/pinia'

export function useDemandSelect () {

  const recipesStore = useRecipesStore()
  const beveragesStore = useBeveragesStore()
  const customerStore = useCustomerRareStore()

  const { setFilterForm } = recipesStore

  const { setDemandRecipeTag, setDemandBeverageTag } = customerStore

  const handleChangePositiveTag = (value: string) => {
    setDemandRecipeTag(value)
    setFilterForm('selectedPositiveTags', [value])
  }

  const handleChangeBeverageTag = (value: string) => {
    setDemandBeverageTag(value)
  }

  return { handleChangePositiveTag, handleChangeBeverageTag }
}