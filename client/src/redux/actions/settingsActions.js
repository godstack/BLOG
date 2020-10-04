import {
  REQUEST_UPDATE_USER_INFO_FROM_SETTINGS,
  REQUEST_USER_INFO_FOR_PROFILE_SETTINGS,
  SET_USER_INFO_FOR_PROFILE_SETTINGS
} from '../types';

export const requestUserInfoForSettings = () => ({
  type: REQUEST_USER_INFO_FOR_PROFILE_SETTINGS
});

export const setUserInfoForProfileSettings = user => ({
  type: SET_USER_INFO_FOR_PROFILE_SETTINGS,
  payload: user
});

export const requestCreatePost = formData => ({
  type: REQUEST_UPDATE_USER_INFO_FROM_SETTINGS,
  payload: formData
});
