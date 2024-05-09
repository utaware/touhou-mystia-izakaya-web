interface TSelectOptions {
  label: string;
  value: string | number;
  class?: string;
  disabled?: boolean;
}

type TOptionsValue = string | number

type TCallBackFn = (value: TOptionsValue) => TSelectOptions

export type { TSelectOptions, TOptionsValue }

export function mapSelectOptions (options: TOptionsValue[], extra?: TCallBackFn | object): TSelectOptions[] {
  return options.map((v) => {
    const base = { label: String(v), value: v }
    if (!extra) {
      return base
    }
    if (typeof(extra) === 'function') {
      return extra(v)
    }
    return { ...extra, ...base }
  })
}