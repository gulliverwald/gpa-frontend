import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './store/Store';
import Notifier from './features/notifications';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Notifier />
        <div className="App" />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
