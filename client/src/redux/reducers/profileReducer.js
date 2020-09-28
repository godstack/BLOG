import { SET_PROFILE_INFO } from '../types';

const initialState = {
  user: null,
  posts: null,
  postsCount: null,
  pagesCount: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...action.payload };
    default:
      return state;
  }
};
