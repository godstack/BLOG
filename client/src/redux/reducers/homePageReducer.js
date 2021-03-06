import {
  ADD_HOME_POST,
  HIDE_HOME_PAGE_LOADING,
  REMOVE_HOME_POST,
  SET_HOME_PAGE_INFO,
  SHOW_HOME_PAGE_LOADING,
  LIKE_HOME_POST,
  UPDATE_EDITED_HOME_POST
} from '../types';
import { likePostFn } from '../helperFunctions/likePostFn';

const initialState = {
  posts: [],
  pagesCount: 0,
  loading: false
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_HOME_POST:
      return { ...state, posts: likePostFn(state.posts, action) };
    case SET_HOME_PAGE_INFO:
      return { ...state, ...action.payload };
    case SHOW_HOME_PAGE_LOADING:
      return { ...state, loading: true };
    case HIDE_HOME_PAGE_LOADING:
      return { ...state, loading: false };
    case REMOVE_HOME_POST: {
      const posts = state.posts.filter(post => post._id !== action.payload);
      return { ...state, posts };
    }
    case ADD_HOME_POST: {
      let posts = [action.payload, ...state.posts];

      return { ...state, posts };
    }
    case UPDATE_EDITED_HOME_POST: {
      const updatedPost = action.payload;

      const posts = state.posts.map(post =>
        post._id === updatedPost._id ? updatedPost : post
      );
      return { ...state, posts };
    }
    default:
      return state;
  }
};
