import { ISchedulesInfo } from './ISchedulesState';

export interface IRequestCreateSchedules {
  email: string;
  password: string;
  birthday: string;
  authorization: number;
  cpf: string;
  number: number;
  name: string;
  district: string;
  complement: string;
  street: string;
  zipCode: number;
  phone: string;
  city_id: number;
  callback?: (data: ISchedulesInfo | null, error: any) => void
}

export interface IRequestUpdateSchedules {
  id: number;
  email: string;
  // password: string;
  birthday: string;
  authorization: number;
  cpf: string;
  number: number;
  name: string;
  district: string;
  complement: string;
  street: string;
  zipCode: number;
  phone: string;
  city_id: number;
  callback?: (data: ISchedulesInfo | null, error: any) => void
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
