import { isEmpty } from 'lodash'

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