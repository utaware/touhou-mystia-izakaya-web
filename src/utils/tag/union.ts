type RecordWithKey<T, K extends keyof T, U> = {
  [P in K]: U;
}

export function getUnionTags<T extends RecordWithKey<T, K, string[]>, K extends keyof T>(target: T[], key: K): string[] {
  return Array.from(new Set(target.map(item => item[key]).flat()))
}