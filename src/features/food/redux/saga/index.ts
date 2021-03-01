import { fork } from 'redux-saga/effects';
import { watchRequestFood } from './foodSaga';

export default function* receiptSaga() {
  yield fork(watchRequestFood);
}
