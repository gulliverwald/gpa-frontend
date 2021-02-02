import { Intent, IToastProps } from '@blueprintjs/core';

export interface IAddNotification extends Omit<IToastProps, 'onDismiss'> {
  message: string;
  key?: number;
  dismissed?: boolean;
  intent: Intent;
}

export interface IRemoveNotification {
  key: number;
}

export interface ICloseNotification {
  dismissAll: boolean;
  key: number;
}
