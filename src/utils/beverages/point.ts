import { without } from 'lodash'

export function getBeveragePoint ({
  match_beverage_tags,
  beverageAllTags,
  demandBeverageTag,
} : {
  match_beverage_tags: string[],
  beverageAllTags: string[],
  demandBeverageTag: string | null,
}): number {
  const tag = demandBeverageTag || ''
  const demandPoint = beverageAllTags.includes(tag) ? 1 : 0
  const matchPoint = without(match_beverage_tags, tag).length
  return demandPoint + matchPoint
}