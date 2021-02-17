import { OptionsObject } from 'notistack';

export interface INotificationState {
  items: INotification[];
}

export interface INotification {
  message: string;
  options: OptionsObject;
  dismissed?: boolean;
  key: number;
}
