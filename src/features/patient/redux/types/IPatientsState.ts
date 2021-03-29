export interface IPatientsState {
  patients: IPatientsInfo[];
  error?: string;
}

export interface IPatientsInfo {
  appointment: [];
  access_authorization: number;
  district: string;
  zip: number;
  city: {
    id: number;
    name: string;
    uf: string;
  };
  adjunct: string;
  schedule: [];
  cpf: string;
  birthday: string;
  email: string;
  id: number;
  street: string;
  name: string;
  number: number;
  phone: string;
}
