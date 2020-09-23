import {
  HIDE_SESSION_LOADING,
  REQUEST_LOGIN,
  REQUEST_REGISTER,
  SET_AUTH_USER,
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
