import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { IUserState } from '../features/user/redux/types/IUserState';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { createBrowserHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router';
import { INotificationState } from '../features/notifications/redux/types/INotificationState';
import rootReducer from './RootReducer';
import rootSaga from './RootSaga';

export interface IStore {
  user: IUserState;
  notifications: INotificationState;
}

// export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]; // routerMiddleware(history)];

const store = createStore(
  rootReducer, // rootReducer(history),
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

export default store;
