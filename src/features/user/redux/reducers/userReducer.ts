// import { Reducer } from 'react';
// import { AnyAction } from 'redux';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../types/IUserState';
import {
  IRequestLogin,
  IResponseLoginApi,
  IRequestLoginSuccess,
  IRequestUserError,
} from '../types/IUserPayloadTypes';

const INITIAL_STATE: IUserState = {
  user: {
    userId: -1,
    token: '',
    role: '',
  },
  error: '',
};

// type IUserActions =
// | IRequestLoginSuccess
// | IRequestUserError;

const userReducerSlice = createSlice({
  name: '@user',
  initialState: INITIAL_STATE,
  reducers: {
    requestLoginSuccess(state, action: PayloadAction<IRequestLoginSuccess>) {
      const {
        payload: {
          role,
          token,
          userId,
        },
      } = action;

      Object.assign(state.user.userId, userId);
      Object.assign(state.user.token, token);
      Object.assign(state.user.role, role);
      // state.user.userId = userId;
      // state.user.token = token;
      // state.user.role = role;
    },
    requestUserError(state, action: PayloadAction<IRequestUserError>) {
      const {
        payload: {
          message,
        },
      } = action;

      Object.assign(state.error, message);
      // state.error = message;
    },
  },
});

export const requestLogin = createAction<IRequestLogin, '@user/requestLogin'>(
  '@user/requestLogin',
);

export const responseLoginApi = createAction<IResponseLoginApi, '@user/responseLoginApi'>(
  '@user/responseLoginApi',
);

export const {
  requestLoginSuccess,
  requestUserError,
} = userReducerSlice.actions;

//   state = INITIAL_STATE,
//   action,
// ) => {
//   switch (action.type) {
//     case UserActionsTypes.requestLoginSuccess:
//       return {
//         ...state,
//         user: {
//           userId: action.payload.userId,
//           token: action.payload.token,
//           role: action.payload.role,
//         },
//       };
//     case UserActionsTypes.requestUserError:
//       return {
//         ...state,
//         error: action.payload.message,
//       };
//     default:
//       return state;
//   }
// };

export default userReducerSlice.reducer;
