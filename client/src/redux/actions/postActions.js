import {
  HIDE_CREATE_POST_LOADING,
  REQUEST_CREATE_POST,
  REQUEST_EDIT_POST,
  REQUEST_GET_POST_TEXT,
  SET_POST_TEXT,
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

export const requestGetPostText = postId => ({
  type: REQUEST_GET_POST_TEXT,
  payload: postId
});

export const setPostText = postText => ({
  type: SET_POST_TEXT,
  payload: postText
});
