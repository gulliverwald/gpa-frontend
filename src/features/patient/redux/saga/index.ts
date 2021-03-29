import { fork } from 'redux-saga/effects';
import { watchRequestPatients } from './patientsSaga';

export default function* receiptSaga() {
  yield fork(watchRequestPatients);
}
