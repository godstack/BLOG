import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './createRootReducer';
import rootSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(),
    //     createRootReducer(history),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
      //   routerMiddleware(history)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
