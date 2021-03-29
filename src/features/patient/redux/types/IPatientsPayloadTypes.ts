import { IPatientsInfo } from './IPatientsState';

export interface IRequestCreatePatients {
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
  callback?: (data: IPatientsInfo | null, error: any) => void
}

export interface IRequestUpdatePatients {
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
  callback?: (data: IPatientsInfo | null, error: any) => void
}

export interface IRequestDeletePatients {
  id: number;
  callback?: (data: IPatientsInfo | null, error: any) => void;
}

export type IRequestListPatients = {
  callback?: (data: IPatientsInfo[] | null, error: any) => void;
};

export interface IRequestListPatientsSuccess {
  patients: IPatientsInfo[];
}

export interface IRequestCreatePatientsSuccess {
  patient: IPatientsInfo;
}

export interface IRequestUpdatePatientsSuccess {
  patient: IPatientsInfo;
}

export interface IRequestDeletePatientsSuccess {
  id: number;
}

export interface IPatientsError {
  message: string;
}
