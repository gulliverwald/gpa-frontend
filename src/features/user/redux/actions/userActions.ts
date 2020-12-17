/* eslint-disable import/prefer-default-export */
import { IRequestLogin, IRequestLoginSuccess, IRequestUserError } from '../types/IUserPayloadTypes';
import { UserActionsTypes } from '../types/UserEnums';

export function requestLogin({ email, password }:
  {email: string, password: string}): IRequestLogin {
  return {
    type: UserActionsTypes.requestLogin,
    payload: {
      email,
      password,
    },
  };
}

export function requestLoginSuccess({
  role, token, userId,
} : {
  userId: number;
  token: string;
  role: string;
}): IRequestLoginSuccess {
  return {
    type: UserActionsTypes.requestLoginSuccess,
    payload: {
      role,
      token,
      userId,
    },
  };
}

export function requestUserError({ message }: {message: string}): IRequestUserError {
  return {
    type: UserActionsTypes.requestUserError,
    payload: {
      message,
    },
  };
}
