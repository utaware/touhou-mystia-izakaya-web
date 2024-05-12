import type { TBeverageItem } from './base'

export interface TBeverageFilterForm {
  selectBeverageTags: string[],
  searchName: string,
}

export interface TBeverageMatchItem extends TBeverageItem {
  match_beverage_tags: string[],
  match_beverage_point: number,
  badge_text: string,
}

export interface TBeverageState {
  beverages: TBeverageItem[];
  beverageNames: string[];
  beveragesLevel: number[];
  beverageTags: string[];
  currentBeverage: null | TBeverageMatchItem,
  currentBeverageName: string;
  filterForm: TBeverageFilterForm;
}