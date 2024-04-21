import { pinyin } from 'pinyin-pro'

export function isChinese (character: string): boolean {
  return (/[\u4e00-\u9fa5]/).test(character)
}

export function str2PY (str: string): string {
  return pinyin(str, { toneType: 'none', type: 'string', v: true })
}

export function word2PY (word: string): string {
  return word.trim().split('').map((v) => {
    return isChinese(v) ? str2PY(v) : v.trim()
  }).join('')
}
