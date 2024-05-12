import type { TCustomerTagType, TCustomerTagsTypeFn } from '@/material'

import { isEmpty } from 'lodash'

import { getKeys } from '@/utils/object'

export interface TGeneratorMap<T> {
  [key: string]: T
}

export function getMatchResult (target: string[], match: string[]) {

  const hasEmpty = [target, match].some(v => isEmpty(v))

  if (hasEmpty) {
    return {
      isMatch: [],
      noMatch: [...target],
      unMatch: [...match],
    }
  }

  const pre = target.reduce((total: TGeneratorMap<number>, current) => {
    total[current] ??= 0
    return total
  }, {})
  const next = match.reduce((total: TGeneratorMap<number>, current) => {
    if (Reflect.has(total, current)) {
      total[current]++
    } else {
      total[current] ??= 0
      total[current]--
    }
    return total
  }, pre)
  const options = Object.entries(next)
  return {
    isMatch: options.filter(([, count]) => count > 0).map(([key]) => key),
    noMatch: options.filter(([, count]) => count === 0).map(([key]) => key),
    unMatch: options.filter(([, count]) => count < 0).map(([key]) => key),
  }
}

export const getCustomerTagType: TCustomerTagsTypeFn = (tag, customer) => {
  const { like_tags = [], hate_tags = [], beverage_tags = [] } = customer
  const options = {
    like: like_tags,
    hate: hate_tags,
    beverage: beverage_tags,
  }
  const keys = getKeys(options)
  let result: TCustomerTagType = 'default'
  keys.some((catogory) => {
    const tags = options[catogory]
    return tags.includes(tag) && (result = catogory)
  })
  return result
}

export function calcPointChange ({
  like_tags, hate_tags, add_tags, remove_tags,
}: {
  like_tags: string[],
  hate_tags: string[],
  add_tags: string[],
  remove_tags: string[],
}): number {
  const options: [string[], string[], number][] = [
    [add_tags, like_tags, 1],
    [add_tags, hate_tags, -1],
    [remove_tags, like_tags, -1],
    [remove_tags, hate_tags, 1],
  ]
  return options.reduce((t, c) => {
    const [item, target, score] = c
    const inner = item.reduce((total, tag) => total += (target.includes(tag) ? score : 0), 0)
    return t += inner
  }, 0)
}