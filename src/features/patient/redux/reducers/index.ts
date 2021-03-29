import { combineReducers } from '@reduxjs/toolkit';
import PatientsReducer from './patientsReducer';

export default combineReducers({
  state: PatientsReducer,
});
