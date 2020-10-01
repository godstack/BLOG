import {
  REQUEST_FOLLOW_FROM_PROFILE,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  HIDE_PROFILE_LOADING,
  SHOW_PROFILE_LOADING,
  REQUEST_GET_USER_POSTS,
  REQUEST_GET_PROFILE_INFO,
  SET_USER_POSTS,
  SHOW_POSTS_LOADING,
  HIDE_POSTS_LOADING
} from '../types';

export const requestGetProfileInfo = (username, currentPage) => ({
  type: REQUEST_GET_PROFILE_INFO,
  payload: { username, currentPage }
});

export const requestGetUserPosts = (username, currentPage) => ({
  type: REQUEST_GET_USER_POSTS,
  payload: { username, currentPage }
});

export const setUserPosts = posts => ({
  type: SET_USER_POSTS,
  payload: posts
});

export const setProfileInfo = profileInfo => ({
  type: SET_PROFILE_INFO,
  payload: profileInfo
});

export const showProfileLoading = () => ({
  type: SHOW_PROFILE_LOADING
});

export const hideProfileLoading = () => ({
  type: HIDE_PROFILE_LOADING
});

export const requestFollowFromProfile = (aimUsername, authUserId) => ({
  type: REQUEST_FOLLOW_FROM_PROFILE,
  payload: { aimUsername, authUserId }
});

export const setFollowers = authUserId => ({
  type: SET_FOLLOWERS,
  payload: authUserId
});

export const showPostsLoading = () => ({
  type: SHOW_POSTS_LOADING
});

export const hidePostsLoading = () => ({
  type: HIDE_POSTS_LOADING
});
