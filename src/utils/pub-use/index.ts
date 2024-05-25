export function getAssetsUrl (url: string): string {
  return new URL(`../../assets/${url}`, import.meta.url).href
}

export function getCustomerRareSrc ({ namePY }: { namePY: string }) {
  return getAssetsUrl(`character-rare/${namePY}.png`)
}


export type TPublicDirName = 'beverages' | 'ingredients' | 'recipes' | 'tools' | 'customer'

export function getPublicAssets (type: TPublicDirName, name: string, ext: string = '.png') {
  return ['', type, name + ext].join('/')
}