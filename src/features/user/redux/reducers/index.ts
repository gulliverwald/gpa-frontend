import { combineReducers } from '@reduxjs/toolkit';
import UserReducer from './userReducer';

export default combineReducers({
  state: UserReducer,
});
