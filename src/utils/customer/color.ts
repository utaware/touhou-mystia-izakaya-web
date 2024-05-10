import Color from 'color'

export const evaluateColors = [
  {
    color: 'black',
    alpha: 0.2,
  },
  {
    color: 'purple',
    alpha: 0.35,
  },
  {
    color: 'green',
    alpha: 0.35,
  },
  {
    color: 'orange',
    alpha: 0.5,
  },
  {
    color: 'deeppink',
    alpha: 0.35,
  },
]

export function getRangeIndex(index: number, length: number) {
  if (index < 0) {
    return 0
  } else if (index >= length) {
    return length - 1
  } else {
    return index
  }
}

export function getEvaluateColor (total: number, max: number) {

  const limit = Math.min(total, max)

  const len = evaluateColors.length

  const index = getRangeIndex(limit, len)

  const { color, alpha } = evaluateColors[index]

  return Color(color).alpha(alpha).toString()

}
