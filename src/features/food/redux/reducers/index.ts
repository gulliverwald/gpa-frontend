import { combineReducers } from '@reduxjs/toolkit';
import FoodReducer from './foodReducer';

export default combineReducers({
  state: FoodReducer,
});
