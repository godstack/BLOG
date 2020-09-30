import {
  HIDE_FOLLOW_LOADING,
  HIDE_PROFILE_LOADING,
  REQUEST_FOLLOW,
  REQUEST_GET_PROFILE_INFO,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  SHOW_FOLLOW_LOADING,
  SHOW_PROFILE_LOADING
} from '../types';

export const requestGetProfileInfo = (username, currentPage) => {
  return {
    type: REQUEST_GET_PROFILE_INFO,
    payload: { username, currentPage }
  };
};

export const setProfileInfo = profileInfo => {
  return {
    type: SET_PROFILE_INFO,
    payload: profileInfo
  };
};

export const showProfileLoading = () => {
  return {
    type: SHOW_PROFILE_LOADING
  };
};

export const hideProfileLoading = () => {
  return {
    type: HIDE_PROFILE_LOADING
  };
};

export const requestFollow = username => {
  return {
    type: REQUEST_FOLLOW,
    payload: username
  };
};

export const setFollowers = followers => {
  return {
    type: SET_FOLLOWERS,
    payload: followers
  };
};

export const showFollowLoading = () => {
  return {
    type: SHOW_FOLLOW_LOADING
  };
};

export const hideFollowLoading = () => {
  return {
    type: HIDE_FOLLOW_LOADING
  };
};
