import { SET_USER_INFO_FOR_PROFILE_SETTINGS } from '../types';

const initialState = {
  user: null,
  loading: false
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO_FOR_PROFILE_SETTINGS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
