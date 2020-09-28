import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { connectRouter } from 'connected-react-router';
import { postReducer } from './postReducer';
import { profileReducer } from './profileReducer';

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    post: postReducer,
    profile: profileReducer
  });