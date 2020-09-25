import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { connectRouter } from 'connected-react-router';
import { postReducer } from './postReducer';

// export const createRootReducer = history =>
//   combineReducers({
//     session: sessionReducer,
//     router: connectRouter(history)
//   });

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    post: postReducer
  });
