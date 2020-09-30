import {
  HIDE_FOLLOW_LOADING,
  HIDE_PROFILE_LOADING,
  REQUEST_FOLLOW,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  SHOW_FOLLOW_LOADING,
  SHOW_PROFILE_LOADING,
  REQUEST_GET_USER_POSTS,
  REQUEST_GET_PROFILE_INFO,
  SET_USER_POSTS,
  SHOW_POSTS_LOADING,
  HIDE_POSTS_LOADING
} from '../types';

export const requestGetProfileInfo = (username, currentPage) => {
  return {
    type: REQUEST_GET_PROFILE_INFO,
    payload: { username, currentPage }
  };
};

export const requestGetUserPosts = (username, currentPage) => {
  return {
    type: REQUEST_GET_USER_POSTS,
    payload: { username, currentPage }
  };
};

export const setUserPosts = posts => {
  return {
    type: SET_USER_POSTS,
    payload: posts
  };
};

export const setProfileInfo = profileInfo => {
  return {
    type: SET_PROFILE_INFO,
    payload: profileInfo
  };
};

export const showProfileLoading = () => {
  return {
    type: SHOW_PROFILE_LOADING
  };
};

export const hideProfileLoading = () => {
  return {
    type: HIDE_PROFILE_LOADING
  };
};

export const requestFollow = username => {
  return {
    type: REQUEST_FOLLOW,
    payload: username
  };
};

export const setFollowers = followers => {
  return {
    type: SET_FOLLOWERS,
    payload: followers
  };
};

export const showFollowLoading = () => {
  return {
    type: SHOW_FOLLOW_LOADING
  };
};

export const hideFollowLoading = () => {
  return {
    type: HIDE_FOLLOW_LOADING
  };
};

export const showPostsLoading = () => {
  return {
    type: SHOW_POSTS_LOADING
  };
};

export const hidePostsLoading = () => {
  return {
    type: HIDE_POSTS_LOADING
  };
};
