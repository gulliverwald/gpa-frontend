/* eslint-disable import/no-extraneous-dependencies */
// import { connectRouter } from "connected-react-router";
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from '../features/user/redux/reducers';
import newsReducer from '../features/news/redux/reducers/newsReducer';
import foodReducer from '../features/food/redux/reducers/foodReducer';
import patientReducer from '../features/patient/redux/reducers/patientsReducer';
import notificationReducer from '../hooks/toast/redux/reducers/index';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  news: newsReducer,
  food: foodReducer,
  patient: patientReducer,
  notification: notificationReducer,
});

// const rootReducer = (history: any): any => combineReducers({
//   router: connectRouter(history),
//   user: userReducer,
//   notifications,
// });

export type WebStore = ReturnType<typeof rootReducer>;

export default rootReducer;
