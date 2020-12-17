import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { IUserState } from '../types/IUserState';
import { UserActionsTypes } from '../types/UserEnums';
import { IRequestLoginSuccess, IRequestUserError } from '../types/IUserPayloadTypes';

const INITIAL_STATE: IUserState = {
  user: {
    userId: -1,
    token: '',
    role: '',
  },
  error: '',
};

type IUserActions =
| IRequestLoginSuccess
| IRequestUserError;

const userReducer: Reducer<IUserState, AnyAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case UserActionsTypes.requestLoginSuccess:
      return {
        ...state,
        user: {
          userId: action.payload.userId,
          token: action.payload.token,
          role: action.payload.role,
        },
      };
    case UserActionsTypes.requestUserError:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default userReducer;
