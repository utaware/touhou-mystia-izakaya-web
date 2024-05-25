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
  dlc?: string[],
  name?: string,
  positiveTags?: string[],
  noPositiveTags?: string[],
  negativeTags?: string[],
  noNegativeTags?: string[],
  tools?: string[],
  levels?: number[],
  ingredients?: string[],
  noIngredients?: string[],
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