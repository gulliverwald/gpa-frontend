import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { IToastOptions, Position, Toaster } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { WebStore } from '../../store/RootReducer';
import { removeNotification } from './redux/reducers/NotificationReducer';

interface ToastContextData {
  getToasts(): IToastOptions[] | undefined;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  let toaster: Toaster | null = null;

  const notifications = useSelector(
    (state: WebStore) => state.notification.state.items,
  );

  const getToasts = useCallback(() => toaster?.getToasts(), [toaster]);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.dismissed) {
        dispatch(removeNotification);
      }
      if (
        toaster
          ?.getToasts()
          .find((toast) => toast.key === notification.key.toString())
      ) { return; }

      toaster?.show(
        {
          ...notification,
          onDismiss: () => {
            dispatch(removeNotification({ key: notification.key }));
          },
        },
        notification.key.toString(),
      );
    });
  }, [notifications, dispatch, toaster]);

  return (
    <ToastContext.Provider value={{ getToasts }}>
      {children}
      <Toaster
        maxToasts={3}
        ref={(ref_) => {
          toaster = ref_;
        }}
        position={Position.BOTTOM_LEFT}
      />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
