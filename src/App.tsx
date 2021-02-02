import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/RootReducer';
import Routes from './routes';
import store from './store/Store';
import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
        <GlobalStyles />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
