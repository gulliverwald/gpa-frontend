import { fork } from 'redux-saga/effects';
import { watchRequestCreateNews } from './newsSaga';

export default function* receiptSaga() {
  yield fork(watchRequestCreateNews);
}
