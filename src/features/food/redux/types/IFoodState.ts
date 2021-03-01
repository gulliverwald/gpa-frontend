export interface IFoodState {
  food: IFoodInfo[];
  error?: string;
}

export interface IFoodInfo {
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
  substitutions?: ISubstitutionsInfo[];
}

export interface ISubstitutionsInfo {
  id: number;
  measure: number;
  description?: string;
}
