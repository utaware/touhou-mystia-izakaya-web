import type { TRecipeMatchItem, TRecipeFilterForm } from '@/material'

import { isEmpty } from 'lodash'

import { getKeys, hasRepeatItem, hasAllItem } from '@/utils/object'

type TRecpieFilterFunc = (item: TRecipeMatchItem) => boolean

export function getRecipeFilterMethod (form: TRecipeFilterForm): TRecpieFilterFunc[] {
  return getKeys(form)
    .filter((key) => !isEmpty(form[key]))
    .map((key) => {
      switch (key) {
        case 'selectedPositiveTags':
          return ({ positive_tags }: TRecipeMatchItem) => {
            return hasAllItem(positive_tags, form[key])
          }
        case 'selectedNoPositiveTags':
          return ({ positive_tags }: TRecipeMatchItem) => {
            return !hasRepeatItem(form[key], positive_tags)
          }
        case 'selectedNegativeTags':
          return ({ negative_tags }: TRecipeMatchItem) => {
            return hasAllItem(negative_tags, form[key])
          }
        case 'selectedNoNegativeTags':
          return ({ negative_tags }: TRecipeMatchItem) => {
            return !hasRepeatItem(form[key], negative_tags)
          }
        case 'selectedIngredients':
          return ({ ingredients }: TRecipeMatchItem) => {
            return hasAllItem(ingredients, form[key])
          }
        case 'selectedNoIngredients':
          return ({ ingredients }: TRecipeMatchItem) => {
            return !hasRepeatItem(form[key], ingredients)
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

export function filterRecipesWithForm (recipes: TRecipeMatchItem[], form: TRecipeFilterForm): TRecipeMatchItem[] {
  return getRecipeFilterMethod(form).reduce((total, method) => total.filter(method), recipes)
}