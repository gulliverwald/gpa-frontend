import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from './store/RootReducer';
import { Notification } from './hooks';
import Routes from './routes';
import { store, persister } from './store/Store';
import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConnectedRouter history={history}>
          <SnackbarProvider maxSnack={3}>
            <Notification />
            <Routes />
          </SnackbarProvider>
          <GlobalStyles />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
