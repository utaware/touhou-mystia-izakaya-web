export function hasRepeatItem (...args: (string | number)[][]): boolean {
  const total = args.reduce((t, c) => t += c.length, 0)
  const size = new Set(args.flat()).size
  return total !== size
}