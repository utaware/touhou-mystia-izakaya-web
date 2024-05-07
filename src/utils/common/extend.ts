export function extendItemIndex <T>(target: T[]): (T & { index: number }) [] {
  return target.map((item, index) => {
    return { ...item, index }
  })
}