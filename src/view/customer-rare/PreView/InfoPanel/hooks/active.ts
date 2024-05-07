import { computed } from 'vue'

import { useCustomerRareStore, useBeveragesStore } from '@/pinia'

import { storeToRefs } from 'pinia'

export function useActiveCustomerInfo () {

  const customerRareStore = useCustomerRareStore()
  const beveragesStore = useBeveragesStore()

  const { getRecipeMatchTags } = storeToRefs(customerRareStore)
  const { currentBeverage } = storeToRefs(beveragesStore)

  const match_like_tags = computed(() => getRecipeMatchTags.value?.match_like_tags || [])
  const match_hate_tags = computed(() => getRecipeMatchTags.value?.match_hate_tags || [])
  const match_beverage_tags = computed(() => currentBeverage.value?.match_beverage_tags || [])

  const total_point = computed(() => {
    return [match_like_tags, match_hate_tags, match_beverage_tags]
      .map(v => v.value)
      .filter(v => v.length)
      .reduce((t, c) => t += c.length, 0)
  })

  const isActiveTags = (item: string, target: string[]) => {
    return target.includes(item)
  }

  return {
    isActiveTags,
    match_like_tags,
    match_hate_tags,
    match_beverage_tags,
    total_point,
  }
}