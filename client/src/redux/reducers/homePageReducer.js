import {
  HIDE_HOME_PAGE_LOADING,
  SET_HOME_PAGE_INFO,
  SHOW_HOME_PAGE_LOADING,
  UPDATE_HOME_POST
} from '../types';
import { likePostFn } from '../helperFunctions/likePostFn';

const initialState = {
  posts: null,
  pagesCount: null,
  loading: false
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_HOME_POST:
      return { ...state, posts: likePostFn(state.posts, action) };
    case SET_HOME_PAGE_INFO:
      return { ...state, ...action.payload };
    case SHOW_HOME_PAGE_LOADING:
      return { ...state, loading: true };
    case HIDE_HOME_PAGE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
