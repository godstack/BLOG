import {
  HIDE_SESSION_LOADING,
  LOGOUT_AUTH_USER,
  SET_AUTH_USER,
  SHOW_SESSION_LOADING
} from '../types';

const initialState = {
  user: { userId: null, username: null },
  loading: true
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SESSION_LOADING:
      return { ...state, loading: true };
    case HIDE_SESSION_LOADING:
      return { ...state, loading: false };
    case SET_AUTH_USER:
      return { ...state, user: action.payload };
    case LOGOUT_AUTH_USER:
      return { ...state, user: { userId: null, username: null } };
    default:
      return state;
  }
};
