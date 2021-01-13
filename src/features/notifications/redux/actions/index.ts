import { ReactText } from 'react';
import { ReduxSnackActionTypes } from '../types/NotificationEnums';
import {
  ClearSnackAction,
  EnqueueSnackAction,
  INotification,
  RemoveSnackAction,
} from '../types/INotificationState';

export function enqueueSnackbar(
  notification: INotification,
): EnqueueSnackAction {
  return {
    type: ReduxSnackActionTypes.enqueueSnackbar,
    payload: {
      notification,
    },
  };
}

export function closeSnackbar(key: ReactText): ClearSnackAction {
  return {
    type: ReduxSnackActionTypes.closeSnackbar,
    payload: {
      dismissAll: !key,
      key,
    },
  };
}

export function removeSnackbar(key: ReactText): RemoveSnackAction {
  return {
    type: ReduxSnackActionTypes.removeSnackbar,
    payload: {
      key,
    },
  };
}
