export function getAssetsUrl (url: string): string {
  return new URL(`../../assets/${url}`, import.meta.url).href
}

export function getCustomerRareSrc ({ namePY }: { namePY: string }) {
  return getAssetsUrl(`character-rare/${namePY}.png`)
}