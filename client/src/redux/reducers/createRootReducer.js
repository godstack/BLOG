import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { connectRouter } from 'connected-react-router';
import { postReducer } from './postReducer';
import { profileReducer } from './profileReducer';
import { usersReducer } from './usersReducer';
import { homePageReducer } from './homePageReducer';
import { settingsReducer } from './settingsReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    post: postReducer,
    profile: profileReducer,
    users: usersReducer,
    home: homePageReducer,
    settings: settingsReducer,
    toastr: toastrReducer
  });
