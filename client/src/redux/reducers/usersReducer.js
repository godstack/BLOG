import {
  HIDE_USER_LIST_LOADING,
  SET_FOLLOWERS_USERS_LIST,
  SET_USERS_LIST,
  SHOW_USER_LIST_LOADING
} from '../types';

const initialState = {
  users: null,
  loading: false
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWERS_USERS_LIST:
      let { users } = state;

      const { aimUsername, authUserId } = action.payload;

      users = users.map(item => {
        if (item.username === aimUsername) {
          debugger;
          const isFollowed = !!item.followers.find(el => el === authUserId);

          if (isFollowed) {
            item.followers = item.followers.filter(el => el !== authUserId);
          } else {
            item.followers = [...item.followers, authUserId];
          }
        }

        return item;
      });

      return { ...state, users };

    case SET_USERS_LIST:
      return { ...state, ...action.payload };
    case SHOW_USER_LIST_LOADING:
      return { ...state, loading: true };
    case HIDE_USER_LIST_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
