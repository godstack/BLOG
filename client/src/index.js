import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { history } from './redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from './redux/configureStore';
import './index.scss';

const store = configureStore();

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

render(app, document.getElementById('root'));
