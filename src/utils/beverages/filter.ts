import type { TBeverageMatchItem } from '@/pinia'

import { isEmpty, difference } from 'lodash'

import { getKeys } from '@/utils/object'

interface TFilterForm {
  selectBeverageTags: string[],
  searchName: string,
}

type TRecpieFilterFunc = (item: TBeverageMatchItem) => boolean

export type { TFilterForm }

export function filterBeveragesWithForm (beverages: TBeverageMatchItem[], form: TFilterForm) {
  const filterMethods = getRecipeFilterMethod(form)
  return beverages.filter((item) => filterMethods.every((fn) => fn(item)))
}

export function getRecipeFilterMethod (form: TFilterForm): TRecpieFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'selectBeverageTags':
          return ({ beverage_tags }: TBeverageMatchItem) => {
            return difference(form[key], beverage_tags).length === 0
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