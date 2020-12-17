import React from 'react';
import { Provider } from 'react-redux';
import store from './store/Store';

function App() {
  return (
    <Provider store={store}>
      <div className="App" />
    </Provider>
  );
}

export default App;
