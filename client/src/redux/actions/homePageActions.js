import {
  HIDE_HOME_PAGE_LOADING,
  REQUEST_POSTS_FROM_ALL_USERS,
  SET_HOME_PAGE_INFO,
  SHOW_HOME_PAGE_LOADING,
  REQUEST_LIKE_FROM_HOME,
  UPDATE_HOME_POST,
  REQUEST_DELETE_POST_FROM_HOME,
  REMOVE_HOME_POST,
  ADD_HOME_POST
} from '../types';

export const requestPostsFromAllUsers = (page, hashtags) => ({
  type: REQUEST_POSTS_FROM_ALL_USERS,
  payload: { page, hashtags }
});

export const setHomePageInfo = data => ({
  type: SET_HOME_PAGE_INFO,
  payload: data
});

export const showHomePageLoading = () => ({
  type: SHOW_HOME_PAGE_LOADING
});

export const hideHomePageLoading = () => ({
  type: HIDE_HOME_PAGE_LOADING
});

export const requestLikeFromHome = (postId, userId) => ({
  type: REQUEST_LIKE_FROM_HOME,
  payload: { postId, userId }
});

export const updateHomePost = (postId, userId) => ({
  type: UPDATE_HOME_POST,
  payload: { postId, userId }
});

export const requestDeletePostFromHome = postId => ({
  type: REQUEST_DELETE_POST_FROM_HOME,
  payload: postId
});

export const removeHomePost = postId => ({
  type: REMOVE_HOME_POST,
  payload: postId
});

export const addHomePost = post => ({
  type: ADD_HOME_POST,
  payload: post
});
