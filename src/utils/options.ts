type TOptionItem = {
  label: string,
  value: string,
  disabled?: boolean,
}

export type { TOptionItem }

export function mapSelectOptions (options: string[]): TOptionItem[] {
  return options.map((v) => ({ label: v, value: v }))
}