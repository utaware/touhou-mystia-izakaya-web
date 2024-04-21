export function getAssetsUrl (url: string): string {
  return new URL(`../assets/${url}`, import.meta.url).href
}