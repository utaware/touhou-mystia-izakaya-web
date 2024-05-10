import Color from 'color'

const colors = ['black', 'purple', 'green', 'coral', 'deeppink']

const alphas = [0.2, 0.35, 0.35, 0.35, 0.35]

const len = colors.length

export function getRangeIndex(limit: number, length: number) {
  if (limit < 0) {
    return 0
  } else if (limit >= len) {
    return length - 1
  } else {
    return limit
  }
}

export function getEvaluateColor (total: number, max: number) {

  const limit = Math.min(total, max)

  const index = getRangeIndex(limit, len)

  const color = colors[index]

  const alpha = alphas[index]

  return Color(color).alpha(alpha).toString()

}
