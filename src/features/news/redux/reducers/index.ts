import { combineReducers } from '@reduxjs/toolkit';
import NewsReducer from './newsReducer';

export default combineReducers({
  state: NewsReducer,
});
