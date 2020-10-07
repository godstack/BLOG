import {
  HIDE_CREATE_POST_LOADING,
  SET_POST,
  SHOW_CREATE_POST_LOADING
} from '../types';

const initialState = {
  loading: false,
  post: null
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_POST_LOADING:
      return { ...state, loading: true };
    case HIDE_CREATE_POST_LOADING:
      return { ...state, loading: false };
    case SET_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
