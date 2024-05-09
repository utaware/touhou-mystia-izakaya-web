import { useCustomerRareStore } from '@/pinia'

export function useDemandSelect () {

  const customerStore = useCustomerRareStore()

  const { setDemandRecipeTag, setDemandBeverageTag } = customerStore

  const handleChangePositiveTag = (value: string | null) => {
    setDemandRecipeTag(value)
  }

  const handleChangeBeverageTag = (value: string | null) => {
    setDemandBeverageTag(value)
  }

  return { handleChangePositiveTag, handleChangeBeverageTag }
}