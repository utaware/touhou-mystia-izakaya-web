import type { TCustomerRare } from '@/material'

export function getAssetsUrl (url: string): string {
  return new URL(`../assets/${url}`, import.meta.url).href
}

export function getCustomerRareSrc ({ namePY }: TCustomerRare) {
  return getAssetsUrl(`character-rare/${namePY}.png`)
}