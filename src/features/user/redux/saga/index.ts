import { all, takeLatest } from 'redux-saga/effects';
import { UserActionsTypes } from '../types/UserEnums';
import userSaga from './userSaga';

export default all([
  takeLatest(UserActionsTypes.requestLogin, userSaga.requestLogin),
]);
