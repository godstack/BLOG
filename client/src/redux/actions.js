import {
  HIDE_CREATE_POST_LOADING,
  HIDE_SESSION_LOADING,
  LOGOUT_AUTH_USER,
  REQUEST_CHECK_AUTH,
  REQUEST_CREATE_POST,
  REQUEST_GET_POST,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTER,
  SET_AUTH_USER,
  SET_POST_PAGE,
  SHOW_CREATE_POST_LOADING,
  SHOW_SESSION_LOADING
} from './types';

export const requestLogin = formData => {
  return {
    type: REQUEST_LOGIN,
    payload: formData
  };
};

export const requestRegister = formData => {
  return {
    type: REQUEST_REGISTER,
    payload: formData
  };
};

export const requestLogout = () => {
  return {
    type: REQUEST_LOGOUT
  };
};

export const logoutAuthUser = () => {
  return {
    type: LOGOUT_AUTH_USER
  };
};

export const requestCheckAuth = () => {
  return {
    type: REQUEST_CHECK_AUTH
  };
};

export const setAuthUser = user => {
  return {
    type: SET_AUTH_USER,
    payload: user
  };
};

export const showSessionLoading = () => {
  return {
    type: SHOW_SESSION_LOADING
  };
};

export const hideSessionLoading = () => {
  return {
    type: HIDE_SESSION_LOADING
  };
};

// posts

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
