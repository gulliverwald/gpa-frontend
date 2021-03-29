import { fork } from 'redux-saga/effects';
import { watchRequestSchedules } from './schedulesSaga';

export default function* receiptSaga() {
  yield fork(watchRequestSchedules);
}
