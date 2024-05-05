export function getKeys <T extends object>(target: T): Extract<keyof T, string>[]{
  let result = []
  for (let k in target) {
    result.push(k)
  }
  return result
}
