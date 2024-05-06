import type { TCustomerRare, TBeverageItem } from '@/material'

import { getMatchResult } from '@/utils/tag'

interface TBeverageMatchItem extends TBeverageItem {
  match_tags: string[],
  match_point: number,
  badge_text: string,
}

export function matchBeveragesWithCustomer (beverages: TBeverageItem[], customer: TCustomerRare): TBeverageMatchItem[] {
  const { beverage_tags: customer_tags } = customer
  return beverages.map((item: TBeverageItem) => {
    const { beverage_tags } = item
    const { isMatch: match_tags } = getMatchResult(customer_tags, beverage_tags)
    const match_point = match_tags.length
    const badge_text = String(match_point)
    return { ...item, match_tags, match_point, badge_text}
  })
}

export type { TBeverageMatchItem }