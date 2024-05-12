import type { TBeverageMatchItem, TBeverageFilterForm } from '@/material'

import { isEmpty } from 'lodash'

import { getKeys, hasAllItem } from '@/utils/object'

type TRecpieFilterFunc = (item: TBeverageMatchItem) => boolean

export function filterBeveragesWithForm (beverages: TBeverageMatchItem[], form: TBeverageFilterForm) {
  return getRecipeFilterMethod(form).reduce((total, method) => total.filter(method), beverages)
}

export function getRecipeFilterMethod (form: TBeverageFilterForm): TRecpieFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'selectBeverageTags':
          return ({ beverage_tags }: TBeverageMatchItem) => {
            return hasAllItem(beverage_tags, form[key])
          }
        case 'searchName':
          return ({ name }: TBeverageMatchItem) => {
            return name.includes(form[key])
          }
        default:
          throw new Error('undefined filter method name')
      }
    })
}