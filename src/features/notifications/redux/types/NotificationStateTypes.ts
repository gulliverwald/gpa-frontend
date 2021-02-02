import { Intent, IToastProps } from '@blueprintjs/core';

export interface INotificationState {
  items: INotification[];
}

export interface INotification extends Omit<IToastProps, 'onDismiss'> {
  message: string;
  key: number;
  intent: Intent;
  className?: string;
  dismissed?: boolean;
}
