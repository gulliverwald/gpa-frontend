// import { Reducer } from 'react';
// import { AnyAction } from 'redux';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../types/IUserState';
import {
  IRequestLogin,
  IRequestLoginSuccess,
  IRequestUserError,
} from '../types/IUserPayloadTypes';

const INITIAL_STATE: IUserState = {
  userInfo: {
    user: {
      id: -1,
      email: '',
      name: '',
      crn: undefined,
      access_authorization: undefined,
      cpf: undefined,
      phone: undefined,
      birthday: undefined,
      city_id: undefined,
      district: undefined,
      street: undefined,
      zip: undefined,
      number: undefined,
      adjunct: undefined,
    },
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
          user: {
            id,
            email,
            name,
            crn,
            access_authorization,
            cpf,
            phone,
            birthday,
            city_id,
            district,
            street,
            zip,
            number,
            adjunct,
          },
        },
      } = action;

      // Object.assign(state.user.userId, userId);
      // Object.assign(state.user.token, token);
      // Object.assign(state.user.role, role);
      state.userInfo.user.id = id;
      state.userInfo.user.email = email;
      state.userInfo.user.name = name;
      state.userInfo.user.crn = crn;
      state.userInfo.user.access_authorization = access_authorization;
      state.userInfo.user.cpf = cpf;
      state.userInfo.user.phone = phone;
      state.userInfo.user.birthday = birthday;
      state.userInfo.user.city_id = city_id;
      state.userInfo.user.district = district;
      state.userInfo.user.street = street;
      state.userInfo.user.zip = zip;
      state.userInfo.user.number = number;
      state.userInfo.user.adjunct = adjunct;
      state.userInfo.token = token;
      state.userInfo.role = role;
    },
    requestLogoutSuccess(state) {
      state.userInfo.token = '';
      state.userInfo.user.id = -1;
    },
    requestUserError(state, action: PayloadAction<IRequestUserError>) {
      const {
        payload: { message },
      } = action;

      // Object.assign(state.error, message);
      state.error = message;
    },
  },
});

export const requestLogin = createAction<IRequestLogin, '@user/requestLogin'>(
  '@user/requestLogin',
);

export const requestLogout = createAction<void, '@user/requestLogout'>(
  '@user/requestLogout',
);

// export const responseLoginApi = createAction<IResponseLoginApi, '@user/responseLoginApi'>(
//   '@user/responseLoginApi',
// );

export const {
  requestLoginSuccess,
  requestLogoutSuccess,
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
