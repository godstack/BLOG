import {
  HIDE_USER_LIST_LOADING,
  REQUEST_FOLLOW_FROM_USERS_LIST,
  REQUEST_GET_USERS_LIST,
  SET_FOLLOWERS_USERS_LIST,
  SET_USERS_LIST,
  SHOW_USER_LIST_LOADING
} from '../types';

export const requestGetUsersList = (url, page) => ({
  type: REQUEST_GET_USERS_LIST,
  payload: { url, page }
});

export const setUsersList = usersList => ({
  type: SET_USERS_LIST,
  payload: usersList
});

export const showUsersListLoading = () => ({
  type: SHOW_USER_LIST_LOADING
});

export const hideUsersListLoading = () => ({
  type: HIDE_USER_LIST_LOADING
});

export const requestFollowFromUsersList = (aimUsername, authUserId) => ({
  type: REQUEST_FOLLOW_FROM_USERS_LIST,
  payload: { aimUsername, authUserId }
});

export const setFollowersUsersList = (aimUsername, authUserId) => ({
  type: SET_FOLLOWERS_USERS_LIST,
  payload: { aimUsername, authUserId }
});
