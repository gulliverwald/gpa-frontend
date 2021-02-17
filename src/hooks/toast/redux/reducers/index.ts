import { combineReducers } from '@reduxjs/toolkit';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
  state: NotificationReducer,
});
