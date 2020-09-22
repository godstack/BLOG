const { combineReducers } = require('redux');
const { sessionReducer } = require('./sessionReducer');

export const rootReducer = combineReducers({
  session: sessionReducer
});
