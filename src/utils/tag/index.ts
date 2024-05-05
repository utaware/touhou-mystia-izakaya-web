export function getMatchResult (target: string[], match: string[]) {
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
    noMatch: options.filter(([, count]) => count = 0).map(([key]) => key),
    unMatch: options.filter(([, count]) => count < 0).map(([key]) => key),
  }
}

export interface TGeneratorMap<T> {
  [key: string]: T
}

export function generatorMapWithTags<T, U extends keyof T> (target: Array<T>, tagKey: U): TGeneratorMap<Array<T>> {
  return target.reduce((total: TGeneratorMap<T[]>, current) => {
    const tags = current[tagKey] as string[]
    tags.forEach((t) => {
      total[t] ??= []
      total[t].push(current)
    })
    return total
  }, {})
}

type RecordWithKey<T, K extends keyof T, U> = {
  [P in K]: U;
}

export function getUnionTags<T extends RecordWithKey<T, K, string[]>, K extends keyof T>(target: T[], key: K): string[] {
  return Array.from(new Set(target.map(item => item[key]).flat()))
}