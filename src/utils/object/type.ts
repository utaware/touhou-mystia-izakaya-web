export function isArray <T = any>(target: unknown): target is Array<T> {
  return Array.isArray(target)
}
