import { call, put, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { requestLogin, requestLoginSuccess, requestUserError } from '../reducers/userReducer';
import { IResponseLoginApi } from '../types/IUserPayloadTypes';
import api from '../../../../services/api';

function* workerRequestLogin(action: any) {
  try {
    const { email, password } = action.payload;
    const response: AxiosResponse<IResponseLoginApi> = yield call(
      api.post,
      'sessions',
      {
        email, password,
      },
    );
    yield put(requestLoginSuccess({ ...response.data }));
  } catch (err) {
    yield put(
      requestUserError({
        message: 'Error',
      }),
    );
  }
}

export function* watchRequestLogin() {
  yield takeLeading(requestLogin.type, workerRequestLogin);
}
