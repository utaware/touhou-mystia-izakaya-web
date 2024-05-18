import { TCustomerRare } from './base'

export interface TBookmark {
  customer: string;
  recipe: string;
  tool: string;
  beverage: string;
  uuid: string;
  // 自身的食材
  ingredients: string[];
  // 额外的食材
  extra: string[];
  // 需求
  demandRecipeTag: string;
  demandBeverageTag: string;
  // 颜色
  color: string;
}

export type TCustomerTabNames = 'customer' | 'recipes' | 'beverages' | 'ingredients'

export interface TCustomerRareState {
  customer: TCustomerRare[];
  activeTabName: TCustomerTabNames;
  currentCustomer: TCustomerRare;
  currentCustomerName: string;
  acvitePlace: string[];
  activeCustomerNames: string[];
  // 需求
  demandRecipeTag: string | null;
  demandBeverageTag: string | null;
  demandSyncFilter: boolean;
  // 组合
  bookmark: TBookmark[];
}