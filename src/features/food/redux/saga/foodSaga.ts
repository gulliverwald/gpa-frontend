import {
  actionChannel, call, put, takeLeading,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  requestCreateFoodSuccess,
  requestCreateFood,
  requestDeleteFoodSuccess,
  requestDeleteFood,
  requestUpdateFood,
  requestUpdateFoodSuccess,
  requestListFood,
  requestListFoodSuccess,
  requestFoodError,
} from '../reducers/foodReducer';
import {
  IRequestCreateFoodSuccess,
  IRequestDeleteFoodSuccess,
  IRequestUpdateFoodSuccess,
  IRequestListFoodSuccess,
} from '../types/IFoodPayloadTypes';
import api from '../../../../services/api';
import { IFoodInfo } from '../types/IFoodState';

function* workerRequestCreateFood(action: any) {
  try {
    const {
      id,
      name,
      unity,
      calories,
      measure,
      substitutions,
    } = action.payload;
    const response: AxiosResponse<IRequestCreateFoodSuccess> = yield call(
      api.post,
      'Food',
      {
        id,
        name,
        unity,
        calories,
        measure,
        substitutions,
      },
    );
    yield put(requestCreateFoodSuccess({ ...response.data }));
  } catch (err) {
    yield put(
      requestFoodError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

function* workerRequestListFood(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      api.get,
      'Food',
    );
    if (response.data.status !== 'error') {
      yield put(requestListFoodSuccess({ food: response.data }));
      if (action.payload.callback) {
        action.payload.callback(response.data, null);
      }
    } else if (action.payload.callback) {
      action.payload.callback(null, 'Ocorreu um erro ao listar...');
    }
  } catch (err) {
    if (action.payload.callback) {
      action.payload.callback(null, 'Ocorreu um erro ao listar...');
    }
    yield put(
      requestFoodError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

function* workerRequestUpdateFood(action: any) {
  try {
    const {
      id,
      name,
      unity,
      calories,
      measure,
      substitutions,
    } = action.payload;
    const response: AxiosResponse<IRequestUpdateFoodSuccess> = yield call(
      api.put,
      'Food',
      {
        id,
        name,
        unity,
        calories,
        measure,
        substitutions,
      },
    );
    yield put(requestUpdateFoodSuccess({ ...response.data }));
  } catch (err) {
    yield put(
      requestFoodError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

function* workerRequestDeleteFood(action: any) {
  try {
    const { id } = action.payload;
    const response: AxiosResponse<IRequestDeleteFoodSuccess> = yield call(
      api.post,
      'Food',
      { id },
    );
    yield put(requestDeleteFoodSuccess({ id: response.data.id }));
  } catch (err) {
    yield put(
      requestFoodError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

export function* watchRequestFood() {
  yield takeLeading(requestCreateFood.type, workerRequestCreateFood);
  yield takeLeading(requestDeleteFood.type, workerRequestDeleteFood);
  yield takeLeading(requestUpdateFood.type, workerRequestUpdateFood);
  yield takeLeading(requestListFood.type, workerRequestListFood);
}
