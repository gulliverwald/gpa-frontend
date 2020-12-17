import { call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { requestLoginSuccess, requestUserError } from '../actions/userActions';
import { IRequestLogin, IResponseLoginApi } from '../types/IUserPayloadTypes';
import api from '../../../../services/api';

function* requestLogin({ payload }: IRequestLogin): unknown {
  try {
    const { email, password } = payload;
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

export default { requestLogin };
