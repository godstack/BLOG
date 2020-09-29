import {
  HIDE_PROFILE_LOADING,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  SHOW_PROFILE_LOADING
} from '../types';

const initialState = {
  user: null,
  posts: null,
  postsCount: null,
  pagesCount: null,
  loading: false
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...state, ...action.payload };
    case SHOW_PROFILE_LOADING:
      return { ...state, loading: true };
    case HIDE_PROFILE_LOADING:
      return { ...state, loading: false };
    case SET_FOLLOWERS:
      return { ...state, followers: action.payload };
    default:
      return state;
  }
};
