/* eslint-disable import/no-extraneous-dependencies */
// import { connectRouter } from "connected-react-router";
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from '../features/user/redux/reducers';
import notificationReducer from '../features/notifications/redux/reducers';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  notification: notificationReducer,
});

// const rootReducer = (history: any): any => combineReducers({
//   router: connectRouter(history),
//   user: userReducer,
//   notifications,
// });

export type WebStore = ReturnType<typeof rootReducer>;

export default rootReducer;
