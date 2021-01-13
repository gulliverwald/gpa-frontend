import produce from 'immer';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { ReduxSnackActionTypes } from '../types/NotificationEnums';
import { INotificationState } from '../types/INotificationState';

const INITIAL_STATE: INotificationState = {
  notifications: [],
};

const snackbar: Reducer<INotificationState, AnyAction> = (
  state = INITIAL_STATE,
  action,
) =>
  // eslint-disable-next-line consistent-return
  // eslint-disable-next-line implicit-arrow-linebreak
  produce(state, (draft) => {
    switch (action.type) {
      case ReduxSnackActionTypes.closeSnackbar: {
        draft.notifications.forEach((notification, index) => {
          if (action.dismissAll || notification.key === action.key) {
            Object.assign(draft.notifications[index], {
              ...notification,
              dismissed: true,
            });
          }
        });
        break;
      }
      case ReduxSnackActionTypes.enqueueSnackbar: {
        const { notification } = action.payload;
        draft.notifications.push(notification);
        break;
      }
      case ReduxSnackActionTypes.removeSnackbar: {
        const { key }: { key: number | undefined } = action.payload;
        const index = draft.notifications.findIndex(
          (notification) => notification.key === key,
        );
        if (index >= 0) {
          draft.notifications.splice(index, 1);
        }
        break;
      }
      default: {
        return draft;
      }
    }
    return undefined;
  });

export default snackbar;
