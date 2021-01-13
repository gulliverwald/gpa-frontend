import React, {
  ReactText, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Alert, AlertTitle } from '@material-ui/lab';
import { removeSnackbar as removeSnackbarAction } from './redux/actions';
import { IStore } from '../../store/Store';
import { INotification } from './redux/types/INotificationState';

const Notifier = (): any => {
  const dispatch = useDispatch();
  const notifications = useSelector<IStore, INotification[]>(
    (store) => store.notifications.notifications || [],
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [displayed, setDisplayed] = useState<number[]>([]);

  const storeDisplayed = useCallback(
    (id: number) => {
      setDisplayed([...displayed, id]);
    },
    [displayed],
  );

  const removeDisplayed = useCallback(
    (id: ReactText) => {
      setDisplayed([...displayed.filter((key) => id !== key)]);
    },
    [displayed],
  );

  useEffect(() => {
    notifications.forEach(
      ({
        key, message, options = {}, dismissed = false,
      }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }
        if (displayed.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...options,
          content: options.title ? (
            <Alert
              key={key}
              variant="filled"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(options.variant !== 'default'
                ? { severity: options.variant }
                : null)}
            >
              <AlertTitle>{options.title}</AlertTitle>
              {message}
            </Alert>
          ) : null,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            dispatch(removeSnackbarAction(myKey));
            removeDisplayed(myKey);
          },
        });

        storeDisplayed(key);
      },
    );
  }, [
    notifications,
    enqueueSnackbar,
    dispatch,
    removeDisplayed,
    storeDisplayed,
    displayed,
    closeSnackbar,
  ]);

  return null;
};

export default Notifier;
