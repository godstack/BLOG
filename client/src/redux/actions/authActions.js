import {
  HIDE_SESSION_LOADING,
  LOGOUT_AUTH_USER,
  REQUEST_CHECK_AUTH,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTER,
  SET_AUTH_USER,
  SHOW_SESSION_LOADING
} from '../types';

export const requestLogin = formData => ({
  type: REQUEST_LOGIN,
  payload: formData
});

export const requestRegister = formData => ({
  type: REQUEST_REGISTER,
  payload: formData
});

export const requestLogout = () => ({
  type: REQUEST_LOGOUT
});

export const logoutAuthUser = () => ({
  type: LOGOUT_AUTH_USER
});

export const requestCheckAuth = () => ({
  type: REQUEST_CHECK_AUTH
});

export const setAuthUser = user => ({
  type: SET_AUTH_USER,
  payload: user
});

export const showSessionLoading = () => ({
  type: SHOW_SESSION_LOADING
});

export const hideSessionLoading = () => ({
  type: HIDE_SESSION_LOADING
});
