import {
  HIDE_CREATE_POST_LOADING,
  SET_POST_TEXT,
  SHOW_CREATE_POST_LOADING
} from '../types';

const initialState = {
  loading: false,
  postText: ''
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_POST_LOADING:
      return { ...state, loading: true };
    case HIDE_CREATE_POST_LOADING:
      return { ...state, loading: false };
    case SET_POST_TEXT:
      return { ...state, postText: action.payload };
    default:
      return state;
  }
};
