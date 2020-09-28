import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './reducers/createRootReducer';
import rootSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
