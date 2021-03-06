import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_DELETE_POST_FROM_HOME,
  REQUEST_LIKE_FROM_HOME,
  REQUEST_POSTS_FROM_ALL_USERS
} from '../types';
import axios from 'axios';
import {
  hideHomePageLoading,
  removeHomePost,
  setHomePageInfo,
  showHomePageLoading,
  likeHomePost
} from '../actions/homePageActions';
import { notifyError, notifySuccess } from '../actions/toastrActions';
import { socket } from '../..';
import { deletePost } from '../helperFunctions/emittingMessages';

function* workerSetHomePagePosts({ payload: { page, hashtags } }) {
  try {
    yield put(showHomePageLoading());
    const response = yield call(axios.get, '/api/home/all-users', {
      params: { page, hashtags }
    });

    yield put(setHomePageInfo(response.data));

    yield put(hideHomePageLoading());
  } catch (e) {
    yield put(
      notifyError(
        'Home page',
        e?.response?.data?.message || 'Fetching home page info failed'
      )
    );

    yield put(hideHomePageLoading());
  }
}

function* workerLikePost({ payload: { postId, userId } }) {
  try {
    yield put(likeHomePost(postId, userId));

    yield call(axios.put, `/api/post/${postId}/like`);
  } catch (e) {
    yield put(
      notifyError(
        'Like post',
        e?.response?.data?.message || 'Like post action was failed'
      )
    );
    yield put(likeHomePost(postId, userId));
  }
}

function* workerDeletePost({ payload: postId }) {
  try {
    yield put(showHomePageLoading());
    const response = yield call(axios.delete, `/api/post/${postId}`);
    yield put(removeHomePost(response.data.postId));

    yield fork(deletePost, socket, response.data.postId);
    yield put(hideHomePageLoading());
    yield put(notifySuccess('Post', 'Deleted successfully'));
  } catch (e) {
    yield put(hideHomePageLoading());
    yield put(
      notifyError('Post', e?.response?.data?.message || 'Failed to delete post')
    );
  }
}

export function* homeSaga() {
  yield takeLatest(REQUEST_POSTS_FROM_ALL_USERS, workerSetHomePagePosts);
  yield takeEvery(REQUEST_LIKE_FROM_HOME, workerLikePost);
  yield takeEvery(REQUEST_DELETE_POST_FROM_HOME, workerDeletePost);
}
