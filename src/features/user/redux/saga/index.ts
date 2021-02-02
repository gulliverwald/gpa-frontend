import { fork } from 'redux-saga/effects';
import { watchRequestLogin } from './userSaga';

export default function* receiptSaga() {
  yield fork(watchRequestLogin);
}
