import { call, put, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  requestCreateNewsSuccess,
  requestCreateNews,
  requestDeleteNewsSuccess,
  requestDeleteNews,
  requestUpdateNews,
  requestUpdateNewsSuccess,
  requestListNews,
  requestListNewsSuccess,
  requestNewsError,
} from '../reducers/newsReducer';
import {
  IRequestCreateNewsSucess,
  IRequestDeleteNewsSucess,
  IRequestUpdateNewsSucess,
  IRequestListNewsSucess,
} from '../types/INewsPayloadTypes';
import api from '../../../../services/api';

function* workerRequestCreateNews(action: any) {
  try {
    const {
      id,
      title,
      link,
      description,
      date,
      nutritionist_id,
      image_link,
      subtitle,
    } = action.payload;
    const response: AxiosResponse<IRequestCreateNewsSucess> = yield call(
      api.post,
      'News',
      {
        id,
        title,
        link,
        description,
        date,
        nutritionist_id,
        image_link,
        subtitle,
      },
    );
    yield put(requestCreateNewsSuccess({ ...response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
  } catch (err) {
    yield put(
      requestNewsError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
    console.log(err);
  }
}

function* workerRequestListNews(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      api.get,
      'News',
    );
    if (response.data.status !== 'error') {
      yield put(requestListNewsSuccess({ ...response.data }));
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
      requestNewsError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

function* workerRequestUpdateNews(action: any) {
  try {
    const {
      id,
      title,
      link,
      description,
      date,
      nutritionist_id,
      image_link,
      subtitle,
    } = action.payload;
    const response: AxiosResponse<IRequestUpdateNewsSucess> = yield call(
      api.put,
      'News',
      {
        id,
        title,
        link,
        description,
        date,
        nutritionist_id,
        image_link,
        subtitle,
      },
    );
    yield put(requestUpdateNewsSuccess({ ...response.data }));
  } catch (err) {
    yield put(
      requestNewsError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

function* workerRequestDeleteNews(action: any) {
  try {
    const { id } = action.payload;
    const response: AxiosResponse<any> = yield call(
      api.delete,
      `News/${id}`,
    );
    if (response.data.status !== 'error') {
      yield put(requestDeleteNewsSuccess({ id }));
      if (action.payload.callback) {
        action.payload.callback(response.data, null);
      }
    } else if (action.payload.callback) {
      action.payload.callback(null, response.data.message);
    }
  } catch (err) {
    if (action.payload.callback) {
      action.payload.callback(null, err.response.data.message);
    }
    yield put(
      requestNewsError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

export function* watchRequestNews() {
  yield takeLeading(requestCreateNews.type, workerRequestCreateNews);
  yield takeLeading(requestDeleteNews.type, workerRequestDeleteNews);
  yield takeLeading(requestUpdateNews.type, workerRequestUpdateNews);
  yield takeLeading(requestListNews.type, workerRequestListNews);
}
