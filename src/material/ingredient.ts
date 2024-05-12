import type { TIngredientsItem } from './base'

export interface TIngredientState {
  ingredients: TIngredientsItem[],
  ingredientsNames: string[],
  extraMaxCount: number,
  extraIngredientsNames: string[],
}

export interface TIngredientResult {
  normal: TIngredientsItem[];
  danger: TIngredientsItem[];
}

export interface TMatchIngredientsItem extends TIngredientsItem {
  remove_tags: string[];
  add_tags: string[];
  fix_tags: string[];
}

export interface TMatchIngredientsResult {
  normal: TMatchIngredientsItem[];
  danger: TIngredientsItem[];
}