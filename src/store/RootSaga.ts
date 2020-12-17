import { all } from 'redux-saga/effects';

import userSaga from './features/user/redux/saga';

export default function* rootSaga(): any {
  return yield all([userSaga]);
}
