import { HIDE_CREATE_POST_LOADING, SHOW_CREATE_POST_LOADING } from './types';

const initialState = {
  loading: false
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_POST_LOADING:
      return { ...state, loading: true };
    case HIDE_CREATE_POST_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
