import { ISchedulesInfo } from './ISchedulesState';

export interface IRequestCreateSchedules {
  schedule: ISchedulesInfo;
  anthropometricData: {
    id: number;
    tricipital_skin_fold: number;
    bicipital_skin_fold: number;
    percentage_of_muscle_mass: number;
    waist_circumference: number;
    arm_circumference: number;
    height: number;
    weight: number;
    supra_iliac: number;
    visceral_fat: number;
    suprascapular: number;
    metabolic_age: number;
    bioimpedance: number;
    sum_of_pleats: number;
  };
  anamnesis: Array<{ type: string; descriptions: string }>;
  callback?: (data: any | null, error: any) => void;
}

export interface IRequestUpdateSchedules {
  schedule: ISchedulesInfo;
  anthropometricData: {
    id: number;
    tricipital_skin_fold: number;
    bicipital_skin_fold: number;
    percentage_of_muscle_mass: number;
    waist_circumference: number;
    arm_circumference: number;
    height: number;
    weight: number;
    supra_iliac: number;
    visceral_fat: number;
    suprascapular: number;
    metabolic_age: number;
    bioimpedance: number;
    sum_of_pleats: number;
  };
  anamnesis: Array<{ type: string; descriptions: string }>;
  callback?: (data: any | null, error: any) => void;
}

export interface IRequestDeleteSchedules {
  id: number;
  callback?: (data: ISchedulesInfo | null, error: any) => void;
}

export type IRequestListSchedules = {
  patientId: number;
  callback?: (data: ISchedulesInfo[] | null, error: any) => void;
};

export interface IRequestListSchedulesSuccess {
  schedules: ISchedulesInfo[];
  patientId: number;
}

export interface IRequestCreateSchedulesSuccess {
  schedule: ISchedulesInfo;
}

export interface IRequestUpdateSchedulesSuccess {
  schedule: ISchedulesInfo;
}

export interface IRequestDeleteSchedulesSuccess {
  id: number;
}

export interface ISchedulesError {
  message: string;
}
