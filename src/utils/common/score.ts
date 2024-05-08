export function getMaxLevel ({
  is_demand_recipe,
  is_demand_beverage,
}: {
  is_demand_recipe: boolean,
  is_demand_beverage: boolean,
}) {
  if (is_demand_recipe && is_demand_beverage) {
    // 两条需求全部满足，评分最高4分粉色评价（完美）或以上（超出4分也是粉色评价）
    return 4
  } else if (is_demand_recipe || is_demand_beverage) {
    // 只满足1条需求，评分最高3分橙色评价（满意）
    return 3
  } else {
    return 1
  }
}