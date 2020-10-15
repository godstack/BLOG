import {
  HIDE_POSTS_LOADING,
  HIDE_PROFILE_LOADING,
  REMOVE_PROFILE_POST,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  SET_USER_POSTS,
  SHOW_POSTS_LOADING,
  SHOW_PROFILE_LOADING,
  UPDATE_PROFILE_POST
} from '../types';
import { likePostFn } from '../helperFunctions/likePostFn';

const initialState = {
  user: null,
  posts: null,
  postsLoading: false,
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
      const authUserId = action.payload;

      let { followers } = state.user;

      const isFollowed = !!followers.find(id => id === authUserId);

      if (isFollowed) {
        followers = followers.filter(id => id !== authUserId);
      } else {
        followers = [...followers, authUserId];
      }

      return { ...state, user: { ...state.user, followers } };

    case UPDATE_PROFILE_POST:
      return { ...state, posts: likePostFn(state.posts, action) };
    case REMOVE_PROFILE_POST:
      const { postId, pagesCount } = action.payload;

      const posts = state.posts.filter(post => post._id !== postId);
      let { user } = state;
      user.posts--;

      return { ...state, posts, user, pagesCount };

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
