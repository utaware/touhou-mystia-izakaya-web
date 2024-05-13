const specialRecipeDemand = ['厨具『夜雀』']

export function isSpecialRecipeDemand (item: string) {
  return specialRecipeDemand.includes(item)
}

export function getMaxLevel ({
  demandRecipeTag,
  demandBeverageTag,
  currentRecipeAllTags,
  currentBeverageAllTags,
}: {
  demandRecipeTag: string | null,
  demandBeverageTag: string | null,
  currentRecipeAllTags: string[],
  currentBeverageAllTags: string[]
}) {
  if (!demandRecipeTag && !demandBeverageTag ) {
    // 两条需求都不满足，最高1分
    return 1
  }
  const recipeLv = typeof(demandRecipeTag) === 'string'
    ? Number(currentRecipeAllTags.includes(demandRecipeTag) || isSpecialRecipeDemand(demandRecipeTag))
    : 0
  const beverageLv = demandBeverageTag ? Number(currentBeverageAllTags.includes(demandBeverageTag)) : 0
  // 两条需求全部满足，评分最高4分粉色评价（完美）或以上（超出4分也是粉色评价）
  // 只满足1条需求，评分最高3分橙色评价（满意）
  return 2 + recipeLv + beverageLv
}