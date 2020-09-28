import {
  HIDE_CREATE_POST_LOADING,
  SET_POST_PAGE,
  SHOW_CREATE_POST_LOADING
} from '../types';

const initialState = {
  postPage: { post: null, author: null },
  loading: false
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_POST_LOADING:
      return { ...state, loading: true };
    case HIDE_CREATE_POST_LOADING:
      return { ...state, loading: false };
    case SET_POST_PAGE:
      return { ...state, postPage: { ...action.payload } };
    default:
      return state;
  }
};
