import { without } from 'lodash'

export function getRecipePoint ({
  match_like_tags,
  match_hate_tags,
  recipeAllTags,
  demandRecipeTag,
} : {
  match_like_tags: string[],
  match_hate_tags: string[],
  recipeAllTags: string[],
  demandRecipeTag: string | null,
}): number {
  const tag = demandRecipeTag || ''
  const demandPoint = recipeAllTags.includes(tag) ? 1 : 0
  const [ likePoint, hatePoint ] = [ match_like_tags, match_hate_tags ]
    .map(v => demandPoint ? without(v, tag) : v)
    .map(v => v.length)
  return demandPoint + likePoint - hatePoint
}