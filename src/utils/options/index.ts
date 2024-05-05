import { SelectOption } from 'naive-ui'

export function mapSelectOptions (options: (string| number)[]): SelectOption[] {
  return options.map((v) => ({ label: String(v), value: v }))
}