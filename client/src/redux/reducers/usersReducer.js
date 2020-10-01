import { SET_USERS_LIST } from '../types';

const initialState = {
  users: null,
  type: null,
  loading: false
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
