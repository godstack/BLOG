import {
  HIDE_POSTS_LOADING,
  HIDE_PROFILE_LOADING,
  SET_FOLLOWERS,
  SET_PROFILE_INFO,
  SET_USER_POSTS,
  SHOW_POSTS_LOADING,
  SHOW_PROFILE_LOADING,
  UPDATE_PROFILE_POST
} from '../types';

const initialState = {
  user: null,
  posts: null,
  postsLoading: false,
  pagesCount: null,
  loading: false
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...state, ...action.payload };
    case SHOW_PROFILE_LOADING:
      return { ...state, loading: true };
    case HIDE_PROFILE_LOADING:
      return { ...state, loading: false };

    case SET_FOLLOWERS:
      const authUserId = action.payload;

      let { followers } = state.user;

      const isFollowed = !!followers.find(id => id === authUserId);

      if (isFollowed) {
        followers = followers.filter(id => id !== authUserId);
      } else {
        followers = [...followers, authUserId];
      }

      return { ...state, user: { ...state.user, followers } };

    case UPDATE_PROFILE_POST:
      let { posts } = state;

      posts = posts.map(post => {
        if (post._id === action.payload.postId) {
          const isLikedByUser = post.likes.find(
            el => el === action.payload.userId
          );

          if (isLikedByUser) {
            post.likes = post.likes.filter(el => el !== action.payload.userId);
          } else {
            post.likes.push(action.payload.userId);
          }
        }

        return post;
      });

      return { ...state, posts };

    case SET_USER_POSTS:
      return { ...state, posts: action.payload };
    case SHOW_POSTS_LOADING:
      return { ...state, postsLoading: true };
    case HIDE_POSTS_LOADING:
      return { ...state, postsLoading: false };
    default:
      return state;
  }
};
