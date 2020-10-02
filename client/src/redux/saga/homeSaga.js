import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_LIKE_FROM_HOME, REQUEST_POSTS_FROM_ALL_USERS } from '../types';
import axios from 'axios';
import {
  hideHomePageLoading,
  setHomePageInfo,
  showHomePageLoading,
  updateHomePost
} from '../actions/homePageActions';

function* workerSetHomePagePosts({ payload: page }) {
  try {
    yield put(showHomePageLoading());
    const response = yield call(axios.get, '/api/home/all-users', {
      params: { page }
    });

    yield put(setHomePageInfo(response.data));
    console.log(response.data);

    yield put(hideHomePageLoading());
  } catch (e) {
    console.log(e.message);
    yield put(hideHomePageLoading());
  }
}

function* workerLikePost({ payload: { postId, userId } }) {
  try {
    yield put(updateHomePost(postId, userId));

    yield call(axios.put, `/api/post/${postId}/like`);
  } catch (e) {
    yield put(updateHomePost(postId, userId));
  }
}

export function* homeSaga() {
  yield takeEvery(REQUEST_POSTS_FROM_ALL_USERS, workerSetHomePagePosts);
  yield takeEvery(REQUEST_LIKE_FROM_HOME, workerLikePost);
}
