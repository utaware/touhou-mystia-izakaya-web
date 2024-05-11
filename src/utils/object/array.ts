type TValidArray = Array<number | string>

export function hasRepeatItem (...args: TValidArray[]): boolean {
  const total = args.reduce((t, c) => {
    const { size } = new Set(c)
    return t += size
  }, 0)
  const size = new Set(args.flat()).size
  return total !== size
}

export function hasAllItem (prefix: TValidArray, suffix: TValidArray): boolean {
  return isExtend(prefix, suffix)
}

export function isExtend (prefix: TValidArray, suffix: TValidArray): boolean {
  const pre = new Set(prefix)
  const total = new Set([...prefix, ...suffix])
  return pre.size === total.size
}