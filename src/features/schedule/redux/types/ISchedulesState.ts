export interface ISchedulesState {
  schedules: ISchedulesInfo[];
  patientId: number | null;
  error?: string;
}

export interface ISchedulesInfo {
  id:number;
  value: number;
  date: Date;
  patient_id: number;
  appointment_id: number | null;
  eating_plan_id: number | null;
  anthropometric_data_id: number;
  observation: number | null;
}
