import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import Storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { createBrowserHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { IUserState } from '../features/user/redux/types/IUserState';
import { INewsState } from '../features/news/redux/types/INewsState';
import { INotificationState } from '../features/notifications/redux/types/NotificationStateTypes';
import rootReducer, { history } from './RootReducer';
import rootSaga from './RootSaga';

export interface IStore {
  user: IUserState;
  news: INewsState;
  notification: INotificationState;
}

const persistConfig = {
  key: 'GPA',
  storage: Storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware]; // routerMiddleware(history)];

const store = configureStore(
  // rootReducer(history),
  // applyMiddleware(...middlewares),
  {
    middleware: [sagaMiddleware, routerMiddleware(history)],
    reducer: persistedReducer,
  },
);

const persister = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persister, store };
