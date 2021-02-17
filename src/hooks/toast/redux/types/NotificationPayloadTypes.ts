import { OptionsObject } from 'notistack';
import { ReactText } from 'react';
import { INotification } from './NotificationStateTypes';

export interface IAddNotification {
  message: string;
  options: OptionsObject;
  dismissed?: boolean;
  key: number;
}

export interface IRemoveNotification {
  key: number;
}

export interface ICloseNotification {
  dismissAll: boolean;
  key: number;
}
export interface EnqueueSnackAction {
  notification: INotification;
}

export interface ClearSnackAction {
  dismissAll: boolean;
  key: ReactText;
}

export interface RemoveSnackAction {
  key: ReactText;
}
