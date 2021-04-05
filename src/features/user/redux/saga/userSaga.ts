import { call, put, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  requestLogin,
  requestLoginSuccess,
  requestLogout,
  requestLogoutSuccess,
  requestUserError,
  requestForgotPassword,
  requestResetPassword,
} from '../reducers/userReducer';
// import addNotificationSucess from '../../../notifications/redux/reducers';
import { IResponseLoginApi } from '../types/IUserPayloadTypes';
import api from '../../../../services/api';

function* workerRequestLogin(action: any) {
  try {
    const { email, password } = action.payload;
    const response: AxiosResponse<IResponseLoginApi> = yield call(
      api.post,
      'sessions',
      {
        email,
        password,
      },
    );
    yield put(requestLoginSuccess({ ...response.data }));
    if (action.payload.callback) {
      action.payload.callback(response.data, null);
    }
    // yield put(addNotificationSucess({ message: 'Sucesso', Intent: 'default' }));
  } catch (err) {
    yield put(
      requestUserError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
  }
}

function* workerRequestForgotPassword(action: any) {
  try {
    const { email } = action.payload;
    const response: AxiosResponse<any> = yield call(
      api.post,
      'sessions/forgot',
      {
        email,
      },
    );
    if (!response.data.status) {
      if (action.payload.callback) {
        action.payload.callback(
          `Email enviado para ${email}`,
          null,
        );
      }
    } else {
      yield put(
        requestUserError({
          message: 'Error',
        }),
      );
      if (action.payload.callback) {
        action.payload.callback(null, response.data.message);
      }
    }
  } catch (err) {
    yield put(
      requestUserError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
  }
}

function* workerRequestResetPassword(action: any) {
  try {
    const { password, confirmPassword, token } = action.payload;
    const response: AxiosResponse<any> = yield call(
      api.post,
      'sessions/reset',
      {
        password, confirmPassword, token,
      },
    );
    if (!response.data.status) {
      if (action.payload.callback) {
        action.payload.callback(
          'Senha atualizada com sucesso',
          null,
        );
      }
    } else {
      yield put(
        requestUserError({
          message: 'Error',
        }),
      );
      if (action.payload.callback) {
        action.payload.callback(null, response.data.message);
      }
    }
  } catch (err) {
    yield put(
      requestUserError({
        message: 'Error',
      }),
    );
    if (action.payload.callback) {
      action.payload.callback(null, err);
    }
  }
}

function* workerLogoutRequest() {
  try {
    yield put(requestLogoutSuccess());
  } catch (erro) {
    console.log(erro);
  }
}

export function* watchRequestLogin() {
  yield takeLeading(requestLogin.type, workerRequestLogin);
  yield takeLeading(requestLogout.type, workerLogoutRequest);
  yield takeLeading(requestForgotPassword.type, workerRequestForgotPassword);
  yield takeLeading(requestResetPassword.type, workerRequestResetPassword);
}
