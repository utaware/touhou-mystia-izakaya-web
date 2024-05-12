import type { TRecipeItem, TSortOrderValue } from './base'

export interface TRecipeMatchResult {
  match_like_tags: string[],
  match_hate_tags: string[]
}

export interface TRecipeMatchItem extends TRecipeItem, TRecipeMatchResult {
  match_recipe_point: number,
  badge_text: string,
}

export interface TRecipeFilterForm {
  selectedPositiveTags: string[],
  selectedNoPositiveTags: string[],
  selectedNegativeTags: string[],
  selectedNoNegativeTags: string[],
  selectedIngredients: string[],
  selectedNoIngredients: string[],
  selectedTools: string[],
  selectedMatchPoints: number[],
  searchName: string,
}

export interface TRecipeState {
  recipes: TRecipeItem[];
  recipesPositiveTags: string[];
  recipesNegativeTags: string[];
  currentRecipe: null | TRecipeMatchItem;
  currentRecipeName: string;
  filterForm: TRecipeFilterForm;
  sortOrder: TSortOrderValue;
}