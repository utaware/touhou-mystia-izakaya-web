export function get2DigitNumber (num: number): string {
  return num < 10 ? '0' + num: '' + num
}

export function getComputedDuration (duration: number): string {
  const minus = Math.floor(Math.round(duration) / 60)
  const second = Math.floor(Math.round(duration) % 60)
  return [minus, second].map(get2DigitNumber).join(':')
}

export function getFixedNum (value: number, digit: number = 2) {
  return Number(value.toFixed(digit))
}