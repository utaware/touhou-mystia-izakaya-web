import type { TCustomerRare, TBeverageItem } from '@/material'

import { getMatchResult } from '@/utils/tag'

interface TBeverageMatchItem extends TBeverageItem {
  match_beverage_tags: string[],
  match_beverage_point: number,
  badge_text: string,
}

export function matchBeveragesWithCustomer (beverages: TBeverageItem[], customer: TCustomerRare): TBeverageMatchItem[] {
  const { beverage_tags: customer_tags } = customer
  return beverages.map((item: TBeverageItem) => {
    const { beverage_tags } = item
    const { isMatch: match_beverage_tags } = getMatchResult(customer_tags, beverage_tags)
    const match_beverage_point = match_beverage_tags.length
    const badge_text = String(match_beverage_point)
    return { ...item, match_beverage_tags, match_beverage_point, badge_text}
  })
}

export type { TBeverageMatchItem }