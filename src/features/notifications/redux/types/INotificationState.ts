import { OptionsObject } from 'notistack';
import { ReactText } from 'react';

export interface INotification {
  // title: string;
  message: string;
  options: OptionsObject;
  dismissed?: boolean;
  // type: string;
  key: number;
}

export interface EnqueueSnackAction {
  type: string;
  payload: {
    notification: INotification;
  };
}

export interface ClearSnackAction {
  type: string;
  payload: {
    dismissAll: boolean;
    key: ReactText;
  };
}

export interface RemoveSnackAction {
  type: string;
  payload: {
    key: ReactText;
  };
}

export type INotificationReduxActionTypes =
  | RemoveSnackAction
  | EnqueueSnackAction
  | ClearSnackAction;

export interface INotificationState {
  notifications: INotification[];
}
