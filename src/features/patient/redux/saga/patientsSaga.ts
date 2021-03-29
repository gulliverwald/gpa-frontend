import { call, put, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  requestCreatePatientsSuccess,
  requestCreatePatients,
  requestDeletePatientsSuccess,
  requestDeletePatients,
  requestUpdatePatients,
  requestUpdatePatientsSuccess,
  requestListPatients,
  requestListPatientsSuccess,
  requestPatientsError,
} from '../reducers/patientsReducer';
import {
  IRequestCreatePatientsSuccess,
  IRequestDeletePatientsSuccess,
  IRequestUpdatePatientsSuccess,
  IRequestListPatientsSuccess,
  IRequestUpdatePatients,
  IRequestCreatePatients,
  IRequestListPatients,
  IRequestDeletePatients,
} from '../types/IPatientsPayloadTypes';
import api from '../../../../services/api';
import { IPatientsInfo } from '../types/IPatientsState';

function* workerRequestCreatePatients(action: {
  payload: IRequestCreatePatients;
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
    const response: AxiosResponse<IPatientsInfo> = yield call(
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
    yield put(requestCreatePatientsSuccess({ patient: response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    yield put(
      requestPatientsError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, 'Ocorreu um erro ao cadastrar o paciente');
    }
    console.log(err);
  }
}

function* workerRequestListPatients(action: {
  payload: IRequestListPatients,
  type: string,
}) {
  try {
    const response: AxiosResponse<IPatientsInfo[]> = yield call(
      api.get,
      'Users',
    );
    yield put(requestListPatientsSuccess({ patients: response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    yield put(
      requestPatientsError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
    console.log(err);
  }
}

function* workerRequestUpdatePatients(action: {
  type: string;
  payload: IRequestUpdatePatients;
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

    const response: AxiosResponse<IPatientsInfo> = yield call(
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
    yield put(requestUpdatePatientsSuccess({ patient: response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    console.log('saga', err);
    if (action.payload.callback) {
      action.payload.callback(null, err.response.data.message);
    }
    yield put(
      requestPatientsError({
        message: 'Error',
      }),
    );
  }
}

function* workerRequestDeletePatients(action: {
  payload: IRequestDeletePatients,
  type: string,
}) {
  try {
    const { id } = action.payload;
    const response: AxiosResponse<IPatientsInfo> = yield call(
      api.delete,
      `Users/${id}`,
    );
    yield put(requestDeletePatientsSuccess({ id: response.data.id }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    yield put(
      requestPatientsError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
    console.log(err);
  }
}

export function* watchRequestPatients() {
  yield takeLeading(requestCreatePatients.type, workerRequestCreatePatients);
  yield takeLeading(requestDeletePatients.type, workerRequestDeletePatients);
  yield takeLeading(requestUpdatePatients.type, workerRequestUpdatePatients);
  yield takeLeading(requestListPatients.type, workerRequestListPatients);
}
