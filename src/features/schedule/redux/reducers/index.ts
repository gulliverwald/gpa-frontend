import { combineReducers } from '@reduxjs/toolkit';
import SchedulesReducer from './schedulesReducer';

export default combineReducers({
  state: SchedulesReducer,
});
