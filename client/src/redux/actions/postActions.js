import {
  HIDE_CREATE_POST_LOADING,
  HIDE_POST_UPDATE_LOADING,
  REQUEST_CREATE_POST,
  REQUEST_GET_POST,
  REQUEST_LIKE_POST,
  SET_POST_PAGE,
  SHOW_CREATE_POST_LOADING,
  SHOW_POST_UPDATE_LOADING,
  UPDATE_PROFILE_POST
} from '../types';

export const requestCreatePost = formData => {
  return {
    type: REQUEST_CREATE_POST,
    payload: formData
  };
};

export const showCreatePostLoading = () => {
  return {
    type: SHOW_CREATE_POST_LOADING
  };
};

export const hideCreatePostLoading = () => {
  return {
    type: HIDE_CREATE_POST_LOADING
  };
};

export const requestGetPost = postId => {
  return {
    type: REQUEST_GET_POST,
    payload: postId
  };
};

export const setPostPage = post => {
  return {
    type: SET_POST_PAGE,
    payload: post
  };
};

export const requestLikePost = postId => {
  return {
    type: REQUEST_LIKE_POST,
    payload: postId
  };
};

export const updateProfilePost = post => {
  return {
    type: UPDATE_PROFILE_POST,
    payload: post
  };
};

export const showPostUpdateLoading = () => {
  return {
    type: SHOW_POST_UPDATE_LOADING
  };
};

export const hidePostUpdateLoading = () => {
  return {
    type: HIDE_POST_UPDATE_LOADING
  };
};
