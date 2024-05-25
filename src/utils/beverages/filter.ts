import type { TBeverageItem, TBeverageFilterForm } from '@/material'

import { isEmpty } from 'lodash'

import { getKeys, hasAllItem, hasRepeatItem } from '@/utils/object'

type TFilterFunc = (item: TBeverageItem) => boolean

export function getFilterMethod (form: TBeverageFilterForm): TFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'dlc':
          return ({ dlc }: TBeverageItem) => {
            return form[key]!.includes(dlc)
          }
        case 'beverageTags':
          return ({ beverage_tags }: TBeverageItem) => {
            return hasAllItem(beverage_tags, form[key]!)
          }
        case 'noBeverageTags':
          return ({ beverage_tags }: TBeverageItem) => {
            return !hasRepeatItem(form[key]!, beverage_tags)
          }
        case 'name':
          return ({ name }: TBeverageItem) => {
            return name.includes(form[key]!)
          }
        case 'levels':
          return ({ level }: TBeverageItem) => {
            return form[key]!.includes(level)
          }
        default:
          throw new Error('undefined filter method name')
      }
    })
}

export function filterBeveragesWithForm <T extends TBeverageItem>(beverages: T[], form: TBeverageFilterForm): T[] {
  return getFilterMethod(form).reduce((total, method) => total.filter(method), beverages)
}