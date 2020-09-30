import {
  HIDE_FOLLOW_LOADING,
  HIDE_POSTS_LOADING,
  HIDE_POST_UPDATE_LOADING,
  HIDE_PROFILE_LOADING,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  SET_USER_POSTS,
  SHOW_FOLLOW_LOADING,
  SHOW_POSTS_LOADING,
  SHOW_POST_UPDATE_LOADING,
  SHOW_PROFILE_LOADING,
  UPDATE_PROFILE_POST
} from '../types';

const initialState = {
  user: null,
  posts: null,
  postsLoading: true,
  pagesCount: null,
  loading: false,
  followLoading: false,
  postUpdateLoading: false
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...state, ...action.payload };
    case SHOW_PROFILE_LOADING:
      return { ...state, loading: true };
    case HIDE_PROFILE_LOADING:
      return { ...state, loading: false };
    case SHOW_FOLLOW_LOADING:
      return { ...state, followLoading: true };
    case HIDE_FOLLOW_LOADING:
      return { ...state, followLoading: false };
    case SET_FOLLOWERS:
      return { ...state, user: { ...state.user, followers: action.payload } };
    case SHOW_POST_UPDATE_LOADING:
      return { ...state, postUpdateLoading: true };
    case HIDE_POST_UPDATE_LOADING:
      return { ...state, postUpdateLoading: false };
    case UPDATE_PROFILE_POST:
      let { posts } = state;

      for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === action.payload._id) {
          posts[i] = action.payload;
          break;
        }
      }

      return { ...state, posts };

    case SET_USER_POSTS:
      return { ...state, posts: action.payload };
    case SHOW_POSTS_LOADING:
      return { ...state, postsLoading: true };
    case HIDE_POSTS_LOADING:
      return { ...state, postsLoading: false };
    default:
      return state;
  }
};
