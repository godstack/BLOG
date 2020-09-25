import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { connectRouter } from 'connected-react-router';

// export const createRootReducer = history =>
//   combineReducers({
//     session: sessionReducer,
//     router: connectRouter(history)
//   });

export const createRootReducer = () =>
  combineReducers({
    session: sessionReducer
    // router: connectRouter(history)
  });
