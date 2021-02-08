import { call, put, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { requestLogin, requestLoginSuccess, requestUserError } from '../reducers/userReducer';
// import addNotificationSucess from '../../../notifications/redux/reducers';
import { IResponseLoginApi } from '../types/IUserPayloadTypes';
import api from '../../../../services/api';

function* workerRequestLogin(action: any) {
  try {
    const { email, password } = action.payload;
    const response: AxiosResponse<IResponseLoginApi> = yield call(
      api.post,
      'Sessions/nutritionist',
      {
        email, password,
      },
    );
    console.log(response);
    yield put(requestLoginSuccess({ ...response.data }));
    // yield put(addNotificationSucess({ message: 'Sucesso', Intent: 'default' }));
  } catch (err) {
    yield put(
      requestUserError({
        message: 'Error',
      }),
    );
    console.log(err);
  }
}

export function* watchRequestLogin() {
  yield takeLeading(requestLogin.type, workerRequestLogin);
}
