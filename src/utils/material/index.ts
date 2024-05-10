interface TNamesItem {
  name: string;
}

type RecordWithKey<T, K extends keyof T, U> = {
  [P in K]: U;
}

export function getUnionTags<T extends RecordWithKey<T, K, string[]>, K extends keyof T>(target: T[], key: K): string[] {
  return Array.from(new Set(target.map(item => item[key]).flat()))
}

export function getUnionKeys<T, U extends keyof T>(target: Array<T>, key: U) {
  return Array.from(new Set(target.map(item => item[key])))
}

export function getNames <T extends TNamesItem>(target: T[]): string[] {
  return target.map(({ name }) => name)
}

export function getIndexMaps <T extends TNamesItem>(target: T[]) {
  return target.reduce((total: { [key: string]: number }, current: T, index: number) => {
    const { name } = current
    total[name] = index
    return total
  }, {})
}

export function setItemIndex <T>(target: T[]): (T & { index: number })[] {
  return target.map((item, index) => {
    return { ...item, index }
  })
}