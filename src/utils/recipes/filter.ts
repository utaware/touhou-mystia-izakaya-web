import type { TRecipeMatchItem } from '@/pinia'

import { isEmpty, difference } from 'lodash'

import { getKeys } from '@/utils/object'

interface TFilterForm {
  selectedPositiveTags: string[],
  selectedNegativeTags: string[],
  selectedTools: string[],
  selectedMatchPoints: number[],
  searchName: string,
}

type TRecpieFilterFunc = (item: TRecipeMatchItem) => boolean

export type { TFilterForm }

export function getRecipeFilterMethod (form: TFilterForm): TRecpieFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'selectedPositiveTags':
          return ({ positive_tags }: TRecipeMatchItem) => {
            return difference(form[key], positive_tags).length === 0
          }
        case 'selectedNegativeTags':
          return ({ negative_tags }: TRecipeMatchItem) => {
            return difference(form[key], negative_tags).length === 0
          }
        case 'selectedTools':
          return ({ tool }: TRecipeMatchItem) => {
            return form[key].includes(tool)
          }
        case 'selectedMatchPoints':
          return ({ match_recipe_point }: TRecipeMatchItem) => {
            return form[key].includes(match_recipe_point)
          }
        case 'searchName':
          return ({ name }: TRecipeMatchItem) => {
            return name.includes(form[key])
          }
        default:
          throw new Error('undefined filter method name')
      }
    })
}

export function filterRecipesWithForm (recipes: TRecipeMatchItem[], form: TFilterForm): TRecipeMatchItem[] {
  const filterMethods = getRecipeFilterMethod(form)
  return recipes.filter((item) => filterMethods.every((fn) => fn(item)))
}