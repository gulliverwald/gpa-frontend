import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewsState } from '../types/INewsState';
import {
  IRequestCreateNewsSucess,
  IRequestUpdateNewsSucess,
  IRequestDeleteNewsSucess,
  IRequestListNewsSucess,
  IRequestListNews,
  IRequestCreateNews,
  IRequestDeleteNews,
  IRequestUpdateNews,
  INewsError,
} from '../types/INewsPayloadTypes';

const INITIAL_STATE: INewsState = {
  news: [],
  error: '',
};

const newsReducerSlice = createSlice({
  name: '@news',
  initialState: INITIAL_STATE,
  reducers: {
    requestCreateNewsSuccess(state, action: PayloadAction<IRequestCreateNewsSucess>) {
      const { payload } = action;

      state.news.push(payload);
    },
    requestListNewsSuccess(state, action: PayloadAction<IRequestListNewsSucess>) {
      const { payload } = action;

      Object.assign(state.news, payload);
    },
    requestUpdateNewsSuccess(state, action: PayloadAction<IRequestUpdateNewsSucess>) {
      const index = state.news.findIndex((news) => news.id === action.payload.id);
      const { payload } = action;
      state.news[index] = { ...state.news[index], ...payload };
    },
    requestDeleteNewsSuccess(state, action: PayloadAction<IRequestDeleteNewsSucess>) {
      const index = state.news.findIndex((news) => news.id === action.payload.id);
      state.news.splice(index, 1);
    },
    requestNewsError(state, action: PayloadAction<INewsError>) {
      const {
        payload: {
          message,
        },
      } = action;

      state.error = message;
    },
    newsClearError(state) {
      state.error = undefined;
    },
  },
});

export const requestCreateNews = createAction<IRequestCreateNews, '@news/requestCreateNews'>(
  '@news/requestCreateNews',
);

export const requestListNews = createAction<IRequestListNews, '@news/requestListNews'>(
  '@news/requestListNews',
);

export const requestDeleteNews = createAction<IRequestDeleteNews, '@news/requestDeleteNews'>(
  '@news/requestDeleteNews',
);

export const requestUpdateNews = createAction<IRequestUpdateNews, '@news/requestUpdateNews'>(
  '@news/requestUpdateNews',
);

export const {
  newsClearError,
  requestCreateNewsSuccess,
  requestDeleteNewsSuccess,
  requestNewsError,
  requestUpdateNewsSuccess,
  requestListNewsSuccess,
} = newsReducerSlice.actions;

export default newsReducerSlice.reducer;
