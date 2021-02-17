import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAddNotification,
  ICloseNotification,
  IRemoveNotification,
} from '../types/NotificationPayloadTypes';
import {
  INotification,
  INotificationState,
} from '../types/NotificationStateTypes';

const initialState: INotificationState = {
  items: [] as INotification[],
};

const notificationReducerSlice = createSlice({
  name: '@notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<IAddNotification>) {
      Object.assign(state.items, [...state.items, { ...action.payload } as INotification]);
    },
    closeNotification(state, action: PayloadAction<ICloseNotification>) {
      state.items.forEach((notification, index) => {
        if (
          action.payload.dismissAll
          || notification.key === action.payload.key
        ) {
          Object.assign(state.items[index], {
            ...notification,
            dismissed: true,
          });
        }
      });
    },
    removeNotification(state, action: PayloadAction<IRemoveNotification>) {
      console.log(action);
      const { key } = action.payload;
      const index = state.items.findIndex(
        (notification) => notification.key === key,
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const {
  addNotification,
  removeNotification,
} = notificationReducerSlice.actions;

export default notificationReducerSlice.reducer;
