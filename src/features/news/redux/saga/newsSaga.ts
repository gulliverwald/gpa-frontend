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

function* workerRequestListNews() {
  try {
    const response: AxiosResponse<IRequestListNewsSucess> = yield call(
      api.get,
      'News',
    );
    yield put(requestListNewsSuccess({ ...response.data }));
  } catch (err) {
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
    const response: AxiosResponse<IRequestDeleteNewsSucess> = yield call(
      api.post,
      'News',
      { id },
    );
    yield put(requestDeleteNewsSuccess({ id: response.data.id }));
  } catch (err) {
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
