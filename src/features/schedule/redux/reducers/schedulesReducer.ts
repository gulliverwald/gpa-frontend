import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISchedulesState } from '../types/ISchedulesState';
import {
  IRequestCreateSchedulesSuccess,
  IRequestUpdateSchedulesSuccess,
  IRequestDeleteSchedulesSuccess,
  IRequestListSchedulesSuccess,
  IRequestListSchedules,
  IRequestCreateSchedules,
  IRequestDeleteSchedules,
  IRequestUpdateSchedules,
  ISchedulesError,
} from '../types/ISchedulesPayloadTypes';

const INITIAL_STATE: ISchedulesState = {
  schedules: [],
  patientId: null,
  error: '',
};

const SchedulesReducerSlice = createSlice({
  name: '@schedules',
  initialState: INITIAL_STATE,
  reducers: {
    requestCreateSchedulesSuccess(
      state,
      action: PayloadAction<IRequestCreateSchedulesSuccess>,
    ) {
      const { payload } = action;

      state.schedules.unshift(payload.schedule);
    },
    requestListSchedulesSuccess(
      state,
      action: PayloadAction<IRequestListSchedulesSuccess>,
    ) {
      const { payload } = action;

      state.schedules = payload.schedules;
      state.patientId = payload.patientId;
    },
    requestUpdateSchedulesSuccess(
      state,
      action: PayloadAction<IRequestUpdateSchedulesSuccess>,
    ) {
      const { payload } = action;
      const index = state.schedules.findIndex(
        (schedules) => schedules.id === payload.schedule.id,
      );
      state.schedules[index] = { ...state.schedules[index], ...payload };
    },
    requestDeleteSchedulesSuccess(
      state,
      action: PayloadAction<IRequestDeleteSchedulesSuccess>,
    ) {
      const index = state.schedules.findIndex(
        (schedules) => schedules.id === action.payload.id,
      );
      state.schedules.splice(index, 1);
    },
    requestSchedulesError(state, action: PayloadAction<ISchedulesError>) {
      const {
        payload: { message },
      } = action;

      state.error = message;
    },
    SchedulesClearError(state) {
      state.error = undefined;
    },
  },
});

export const requestCreateSchedules = createAction<
  IRequestCreateSchedules,
  '@schedules/requestCreateSchedules'
>('@schedules/requestCreateSchedules');

export const requestListSchedules = createAction<
  IRequestListSchedules,
  '@schedules/requestListSchedules'
>('@schedules/requestListSchedules');

export const requestDeleteSchedules = createAction<
  IRequestDeleteSchedules,
  '@schedules/requestDeleteSchedules'
>('@schedules/requestDeleteSchedules');

export const requestUpdateSchedules = createAction<
  IRequestUpdateSchedules,
  '@schedules/requestUpdateSchedules'
>('@schedules/requestUpdateSchedules');

export const {
  SchedulesClearError,
  requestCreateSchedulesSuccess,
  requestDeleteSchedulesSuccess,
  requestSchedulesError,
  requestUpdateSchedulesSuccess,
  requestListSchedulesSuccess,
} = SchedulesReducerSlice.actions;

export default SchedulesReducerSlice.reducer;
