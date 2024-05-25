import type { TIngredientsItem } from '@/material'

import { isEmpty } from 'lodash'

import { getKeys, hasAllItem, hasRepeatItem } from '@/utils/object'

type TFilterFunc = (item: TIngredientsItem) => boolean

interface TIngredientsFilterForm {
  dlc ?: string[];
  ingredientsTags ?: string[];
  noIngredientTags ?: string[];
  name ?: string;
  levels ?: number[];
}

export function getFilterMethod (form: TIngredientsFilterForm): TFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'dlc':
          return ({ dlc }: TIngredientsItem) => {
            return form[key]!.includes(dlc)
          }
        case 'ingredientsTags':
          return ({ ingredient_tags }: TIngredientsItem) => {
            return hasAllItem(ingredient_tags, form[key]!)
          }
        case 'noIngredientTags':
          return ({ ingredient_tags }: TIngredientsItem) => {
            return !hasRepeatItem(form[key]!, ingredient_tags)
          }
        case 'name':
          return ({ name }: TIngredientsItem) => {
            return name.includes(form[key]!)
          }
        case 'levels':
          return ({ level }: TIngredientsItem) => {
            return form[key]!.includes(level)
          }
        default:
          throw new Error('undefined filter method name')
      }
    })
}

export function filterIngredientsWithForm <T extends TIngredientsItem>(beverages: T[], form: TIngredientsFilterForm): T[] {
  return getFilterMethod(form).reduce((total, method) => total.filter(method), beverages)
}