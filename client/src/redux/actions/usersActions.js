import { REQUEST_GET_USERS_LIST, SET_USERS_LIST } from '../types';

export const requestGetUsersList = url => ({
  type: REQUEST_GET_USERS_LIST,
  payload: url
});

export const setUsersList = usersList => ({
  type: SET_USERS_LIST,
  payload: usersList
});
