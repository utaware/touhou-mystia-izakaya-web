interface TSelectOptions {
  label: string;
  value: string | number;
}

type TOptionsValue = string | number

export function mapSelectOptions (
  options: TOptionsValue[],
  fn?: (value: TOptionsValue) => TSelectOptions,
): TSelectOptions[] {
  return options.map((v) => (fn ? fn(v) : { label: String(v), value: v }))
}