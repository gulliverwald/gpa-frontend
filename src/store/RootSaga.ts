import { all, fork } from 'redux-saga/effects';
import newsSaga from '../features/news/redux/saga';
import userSaga from '../features/user/redux/saga';
import foodSaga from '../features/food/redux/saga';
import patientSaga from '../features/patient/redux/saga';
import scheduleSaga from '../features/schedule/redux/saga';

export default function* rootSaga(): any {
  yield all([
    fork(userSaga),
    fork(newsSaga),
    fork(foodSaga),
    fork(patientSaga),
    fork(scheduleSaga),
  ]);
}
