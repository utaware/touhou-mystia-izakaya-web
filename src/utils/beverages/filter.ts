import type { TBeverageMatchItem } from '@/pinia'

import { isEmpty } from 'lodash'

import { getKeys, hasAllItem } from '@/utils/object'

interface TFilterForm {
  selectBeverageTags: string[],
  searchName: string,
}

type TRecpieFilterFunc = (item: TBeverageMatchItem) => boolean

export type { TFilterForm }

export function filterBeveragesWithForm (beverages: TBeverageMatchItem[], form: TFilterForm) {
  return getRecipeFilterMethod(form).reduce((total, method) => total.filter(method), beverages)
}

export function getRecipeFilterMethod (form: TFilterForm): TRecpieFilterFunc[] {
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