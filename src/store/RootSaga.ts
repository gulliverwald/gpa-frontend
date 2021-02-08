import { all, fork } from 'redux-saga/effects';
import newsSaga from '../features/news/redux/saga';
import userSaga from '../features/user/redux/saga';

export default function* rootSaga(): any {
  yield all([fork(userSaga), fork(newsSaga)]);
}
