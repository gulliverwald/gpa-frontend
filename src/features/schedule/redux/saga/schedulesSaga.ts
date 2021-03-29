import { call, put, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  requestCreateSchedulesSuccess,
  requestCreateSchedules,
  requestDeleteSchedulesSuccess,
  requestDeleteSchedules,
  requestUpdateSchedules,
  requestUpdateSchedulesSuccess,
  requestListSchedules,
  requestListSchedulesSuccess,
  requestSchedulesError,
} from '../reducers/schedulesReducer';
import {
  IRequestCreateSchedulesSuccess,
  IRequestDeleteSchedulesSuccess,
  IRequestUpdateSchedulesSuccess,
  IRequestListSchedulesSuccess,
  IRequestUpdateSchedules,
  IRequestCreateSchedules,
  IRequestListSchedules,
  IRequestDeleteSchedules,
} from '../types/ISchedulesPayloadTypes';
import api from '../../../../services/api';
import { ISchedulesInfo } from '../types/ISchedulesState';

function* workerRequestCreateSchedules(action: {
  payload: IRequestCreateSchedules;
  type: string;
}) {
  try {
    const {
      name,
      cpf,
      birthday,
      password,
      email,
      zipCode,
      street,
      number,
      phone,
      authorization,
      city_id,
      complement,
      district,
    } = action.payload;
    const response: AxiosResponse<ISchedulesInfo> = yield call(
      api.post,
      'Users',
      {
        name,
        cpf,
        birthday,
        password,
        email,
        zipCode,
        street,
        number,
        phone,
        authorization,
        city_id,
        complement,
        district,
      },
    );
    yield put(requestCreateSchedulesSuccess({ schedule: response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    yield put(
      requestSchedulesError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, 'Ocorreu um erro ao cadastrar o paciente');
    }
    console.log(err);
  }
}

function* workerRequestListSchedules(action: {
  payload: IRequestListSchedules,
  type: string,
}) {
  try {
    const { patientId } = action.payload;
    const response: AxiosResponse<any> = yield call(
      api.get,
      `Schedule/patient/${patientId}`,
    );
    yield put(requestListSchedulesSuccess({ schedules: response.data, patientId }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    console.log(err);
    yield put(
      requestSchedulesError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
  }
}

function* workerRequestUpdateSchedules(action: {
  type: string;
  payload: IRequestUpdateSchedules;
}) {
  try {
    const {
      id,
      name,
      cpf,
      birthday,
      email,
      zipCode,
      street,
      number,
      phone,
      authorization,
      city_id,
      complement,
      district,
    } = action.payload;

    const response: AxiosResponse<ISchedulesInfo> = yield call(
      api.put,
      'Users',
      {
        id,
        authorization,
        birthday,
        city_id,
        complement,
        cpf,
        district,
        email,
        name,
        number,
        phone,
        street,
        zipCode,
      },
    );
    yield put(requestUpdateSchedulesSuccess({ schedule: response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    console.log('saga', err);
    if (action.payload.callback) {
      action.payload.callback(null, err.response.data.message);
    }
    yield put(
      requestSchedulesError({
        message: 'Error',
      }),
    );
  }
}

function* workerRequestDeleteSchedules(action: {
  payload: IRequestDeleteSchedules,
  type: string,
}) {
  try {
    const { id } = action.payload;
    const response: AxiosResponse<ISchedulesInfo> = yield call(
      api.delete,
      `Users/${id}`,
    );
    yield put(requestDeleteSchedulesSuccess({ id: response.data.id }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    yield put(
      requestSchedulesError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
    console.log(err);
  }
}

export function* watchRequestSchedules() {
  yield takeLeading(requestCreateSchedules.type, workerRequestCreateSchedules);
  yield takeLeading(requestDeleteSchedules.type, workerRequestDeleteSchedules);
  yield takeLeading(requestUpdateSchedules.type, workerRequestUpdateSchedules);
  yield takeLeading(requestListSchedules.type, workerRequestListSchedules);
}
