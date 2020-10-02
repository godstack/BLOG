import {
  HIDE_CREATE_POST_LOADING,
  REQUEST_CREATE_POST,
  REQUEST_GET_POST,
  REQUEST_LIKE_POST,
  SET_POST_PAGE,
  SHOW_CREATE_POST_LOADING,
  UPDATE_PROFILE_POST
} from '../types';

export const requestCreatePost = formData => ({
  type: REQUEST_CREATE_POST,
  payload: formData
});

export const showCreatePostLoading = () => ({
  type: SHOW_CREATE_POST_LOADING
});

export const hideCreatePostLoading = () => ({
  type: HIDE_CREATE_POST_LOADING
});

export const requestGetPost = postId => ({
  type: REQUEST_GET_POST,
  payload: postId
});

export const setPostPage = post => ({
  type: SET_POST_PAGE,
  payload: post
});
