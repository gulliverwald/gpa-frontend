import { ISubstitutionsInfo, IFoodInfo } from './IFoodState';

export interface IRequestCreateFood {
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
  substitutions?: ISubstitutionsInfo[];
}

export interface IRequestUpdateFood {
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
  substitutions?: ISubstitutionsInfo[];
  callback?: (data: any, error: any) => void;
}

export interface IRequestDeleteFood {
  id: number;
  callback?: (data: any, error: any) => void;
}

export type IRequestListFood = {
  callback?: (data: any, error: any) => void;
};

export interface IRequestListFoodSuccess {
  food: IFoodInfo[];
}

export interface IRequestCreateFoodSuccess {
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
  substitutions?: ISubstitutionsInfo[];
}

export interface IRequestUpdateFoodSuccess {
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
  substitutions?: ISubstitutionsInfo[];
}

export interface IRequestDeleteFoodSuccess {
  id: number;
}

export interface IFoodError {
  message: string;
}
