import {
  HIDE_CREATE_POST_LOADING,
  REQUEST_CREATE_POST,
  REQUEST_EDIT_POST,
  REQUEST_GET_POST,
  SET_POST,
  SHOW_CREATE_POST_LOADING
} from '../types';

export const requestCreatePost = formData => ({
  type: REQUEST_CREATE_POST,
  payload: formData
});

export const requestEditPost = (formData, postId) => ({
  type: REQUEST_EDIT_POST,
  payload: { formData, postId }
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

export const setPost = post => ({
  type: SET_POST,
  payload: post
});
