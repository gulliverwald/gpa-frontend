import { ISchedulesInfo } from './ISchedulesState';

export interface IRequestCreateSchedules {
  value: number;
  date: string;
  anthropometric_data_id?: number;
  observations?: string;
  patient_id: number;
  anamnesis: Array<{type: string, descriptions: string}>;
  callback?: (data: ISchedulesInfo | null, error: any) => void;
}

export interface IRequestUpdateSchedules {
  value: number;
  date: string;
  anthropometric_data_id?: number;
  observations?: string;
  patient_id: number;
  callback?: (data: ISchedulesInfo | null, error: any) => void;
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
