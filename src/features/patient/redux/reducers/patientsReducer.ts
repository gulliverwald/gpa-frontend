import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPatientsState } from '../types/IPatientsState';
import {
  IRequestCreatePatientsSuccess,
  IRequestUpdatePatientsSuccess,
  IRequestDeletePatientsSuccess,
  IRequestListPatientsSuccess,
  IRequestListPatients,
  IRequestCreatePatients,
  IRequestDeletePatients,
  IRequestUpdatePatients,
  IPatientsError,
} from '../types/IPatientsPayloadTypes';

const INITIAL_STATE: IPatientsState = {
  patients: [],
  error: '',
};

const PatientsReducerSlice = createSlice({
  name: '@patients',
  initialState: INITIAL_STATE,
  reducers: {
    requestCreatePatientsSuccess(
      state,
      action: PayloadAction<IRequestCreatePatientsSuccess>,
    ) {
      const { payload } = action;

      state.patients.unshift(payload.patient);
    },
    requestListPatientsSuccess(
      state,
      action: PayloadAction<IRequestListPatientsSuccess>,
    ) {
      const { payload } = action;

      Object.assign(state.patients, payload.patients);
    },
    requestUpdatePatientsSuccess(
      state,
      action: PayloadAction<IRequestUpdatePatientsSuccess>,
    ) {
      const index = state.patients.findIndex(
        (patients) => patients.id === action.payload.patient.id,
      );
      const { payload } = action;
      state.patients[index] = { ...state.patients[index], ...payload };
    },
    requestDeletePatientsSuccess(
      state,
      action: PayloadAction<IRequestDeletePatientsSuccess>,
    ) {
      const index = state.patients.findIndex(
        (patients) => patients.id === action.payload.id,
      );
      state.patients.splice(index, 1);
    },
    requestPatientsError(state, action: PayloadAction<IPatientsError>) {
      const {
        payload: { message },
      } = action;

      state.error = message;
    },
    PatientsClearError(state) {
      state.error = undefined;
    },
  },
});

export const requestCreatePatients = createAction<
  IRequestCreatePatients,
  '@patients/requestCreatePatients'
>('@patients/requestCreatePatients');

export const requestListPatients = createAction<
  IRequestListPatients,
  '@patients/requestListPatients'
>('@patients/requestListPatients');

export const requestDeletePatients = createAction<
  IRequestDeletePatients,
  '@patients/requestDeletePatients'
>('@patients/requestDeletePatients');

export const requestUpdatePatients = createAction<
  IRequestUpdatePatients,
  '@patients/requestUpdatePatients'
>('@patients/requestUpdatePatients');

export const {
  PatientsClearError,
  requestCreatePatientsSuccess,
  requestDeletePatientsSuccess,
  requestPatientsError,
  requestUpdatePatientsSuccess,
  requestListPatientsSuccess,
} = PatientsReducerSlice.actions;

export default PatientsReducerSlice.reducer;
