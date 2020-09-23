import {
  HIDE_SESSION_LOADING,
  LOGOUT_AUTH_USER,
  SET_AUTH_USER,
  SHOW_SESSION_LOADING
} from './types';

const initialState = {
  userId: null,
  loading: false
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SESSION_LOADING:
      return { ...state, loading: true };
    case HIDE_SESSION_LOADING:
      return { ...state, loading: false };
    case SET_AUTH_USER:
      return { ...state, userId: action.payload.userId };
    case LOGOUT_AUTH_USER:
      return { ...state, userId: null };
    default:
      return state;
  }
};
