import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFoodState } from '../types/IFoodState';
import {
  IRequestCreateFoodSuccess,
  IRequestUpdateFoodSuccess,
  IRequestDeleteFoodSuccess,
  IRequestListFoodSuccess,
  IRequestListFood,
  IRequestCreateFood,
  IRequestDeleteFood,
  IRequestUpdateFood,
  IFoodError,
} from '../types/IFoodPayloadTypes';

const INITIAL_STATE: IFoodState = {
  food: [],
  error: '',
};

const foodReducerSlice = createSlice({
  name: '@food',
  initialState: INITIAL_STATE,
  reducers: {
    requestCreateFoodSuccess(state, action: PayloadAction<IRequestCreateFoodSuccess>) {
      const { payload } = action;

      state.food.push(payload);
    },
    requestListFoodSuccess(state, action: PayloadAction<IRequestListFoodSuccess>) {
      const { payload } = action;

      Object.assign(state.food, payload.food);
    },
    requestUpdateFoodSuccess(state, action: PayloadAction<IRequestUpdateFoodSuccess>) {
      const index = state.food.findIndex((food) => food.id === action.payload.id);
      const { payload } = action;
      const aux = state.food;
      aux[index] = { ...aux[index], ...payload };
      Object.assign(state.food, aux);
    },
    requestDeleteFoodSuccess(state, action: PayloadAction<IRequestDeleteFoodSuccess>) {
      const index = state.food.findIndex((food) => food.id === action.payload.id);
      state.food.splice(index, 1);
    },
    requestFoodError(state, action: PayloadAction<IFoodError>) {
      const {
        payload: {
          message,
        },
      } = action;

      state.error = message;
    },
    foodClearError(state) {
      state.error = undefined;
    },
  },
});

export const requestCreateFood = createAction<IRequestCreateFood, '@food/requestCreateFood'>(
  '@food/requestCreateFood',
);

export const requestListFood = createAction<IRequestListFood, '@food/requestListFood'>(
  '@food/requestListFood',
);

export const requestDeleteFood = createAction<IRequestDeleteFood, '@food/requestDeleteFood'>(
  '@food/requestDeleteFood',
);

export const requestUpdateFood = createAction<IRequestUpdateFood, '@food/requestUpdateFood'>(
  '@food/requestUpdateFood',
);

export const {
  foodClearError,
  requestCreateFoodSuccess,
  requestDeleteFoodSuccess,
  requestFoodError,
  requestUpdateFoodSuccess,
  requestListFoodSuccess,
} = foodReducerSlice.actions;

export default foodReducerSlice.reducer;
