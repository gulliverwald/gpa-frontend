// import { connectRouter } from "connected-react-router";
import { combineReducers } from 'redux';
import userReducer from '../features/user/redux/reducers';
import notifications from '../features/notifications/redux/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  notifications,
});
// const rootReducer = (history: any): any => combineReducers({
//   router: connectRouter(history),
//   user: userReducer,
//   notifications,
// });

export default rootReducer;
