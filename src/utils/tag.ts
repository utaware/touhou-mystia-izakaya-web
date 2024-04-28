interface TCalcMatchTagsResult {
  match_tags: string[],
  match_count: number
}

export function calcMatchTags (target: string[], matches: string[]): TCalcMatchTagsResult {
  const match_tags = matches.reduce((total: string[], current: string) => {
    if (target.includes(current)) {
      total.push(current)
    }
    return total
  }, [])
  const match_count = match_tags.length
  return { match_tags, match_count }
}