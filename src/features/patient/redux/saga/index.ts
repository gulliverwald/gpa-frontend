import { fork } from 'redux-saga/effects';
import { watchRequestNews } from './newsSaga';

export default function* receiptSaga() {
  yield fork(watchRequestNews);
}
