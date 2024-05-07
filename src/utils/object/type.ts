export function isArray <T = any>(target: unknown): target is Array<T> {
  return Array.isArray(target)
}

export type ValueOf<T> = T[keyof T]