interface TNamesItem {
  name: string;
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