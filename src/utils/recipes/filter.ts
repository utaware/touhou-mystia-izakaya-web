import type { TRecipeItem, TRecipeFilterForm } from '@/material'

import { isEmpty } from 'lodash'

import { getKeys, hasRepeatItem, hasAllItem } from '@/utils/object'

type TRecpieFilterFunc = (item: TRecipeItem) => boolean

export function getRecipeFilterMethod (form: TRecipeFilterForm): TRecpieFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'dlc':
          return ({ dlc }: TRecipeItem) => {
            return form[key]!.includes(dlc)
          }
        case 'positiveTags':
          return ({ positive_tags }: TRecipeItem) => {
            return hasAllItem(positive_tags, form[key]!)
          }
        case 'noPositiveTags':
          return ({ positive_tags }: TRecipeItem) => {
            return !hasRepeatItem(form[key]!, positive_tags)
          }
        case 'negativeTags':
          return ({ negative_tags }: TRecipeItem) => {
            return hasAllItem(negative_tags, form[key]!)
          }
        case 'noNegativeTags':
          return ({ negative_tags }: TRecipeItem) => {
            return !hasRepeatItem(form[key]!, negative_tags)
          }
        case 'ingredients':
          return ({ ingredients }: TRecipeItem) => {
            return hasAllItem(ingredients, form[key]!)
          }
        case 'noIngredients':
          return ({ ingredients }: TRecipeItem) => {
            return !hasRepeatItem(form[key]!, ingredients)
          }
        case 'levels':
          return ({ level }: TRecipeItem) => {
            return form[key]!.includes(level)
          }
        case 'tools':
          return ({ tool }: TRecipeItem) => {
            return form[key]!.includes(tool)
          }
        case 'name':
          return ({ name }: TRecipeItem) => {
            return name.includes(form[key]!)
          }
        default:
          throw new Error('undefined filter method name')
      }
    })
}

export function filterRecipesWithForm <T extends TRecipeItem>(recipes: T[], form: TRecipeFilterForm): T[] {
  return getRecipeFilterMethod(form).reduce((total, method) => total.filter(method), recipes)
}