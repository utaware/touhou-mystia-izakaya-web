export function getAssetsUrl (url: string): string {
  return new URL(`../../assets/${url}`, import.meta.url).href
}

export function getCustomerRareSrc ({ namePY }: { namePY: string }) {
  return getAssetsUrl(`character-rare/${namePY}.png`)
}


type TPublicDirName = 'beverages' | 'ingredients' | 'recipes' | 'tools'

export function getPublicAssets (type: TPublicDirName, name: string, ext: string = '.png') {
  return ['/public', type, name + ext].join('/')
}