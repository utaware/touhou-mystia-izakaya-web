interface TCalcMatchTagsResult {
  match_tags: string[],
  match_count: number
}

export function calcMatchTags (target: string[], matches: string[]): TCalcMatchTagsResult {
  const match_tags = matches.reduce((total: string[], current: string) => {
    if (target.includes(current)) {
      total.push(current)
    }
    return total
  }, [])
  const match_count = match_tags.length
  return { match_tags, match_count }
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
