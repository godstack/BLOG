import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { history } from './redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './redux/configureStore';
import io from 'socket.io-client';
import ReduxToastr from 'react-redux-toastr';
import './index.scss';

export const socket = io.connect('/');

export const store = configureStore();

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position='top-right'
        getState={state => state.toastr} // This is the default
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
        closeOnToastrClick
      />
      <App />
    </ConnectedRouter>
  </Provider>
);

render(app, document.getElementById('root'));
