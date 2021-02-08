import { all, fork } from 'redux-saga/effects';

import userSaga from '../features/user/redux/saga';

export default function* rootSaga(): any {
  yield all([fork(userSaga)]);
}
