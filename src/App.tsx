import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from './store/RootReducer';
import Routes from './routes';
import { store, persister } from './store/Store';
import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConnectedRouter history={history}>
          <Routes />
          <GlobalStyles />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
