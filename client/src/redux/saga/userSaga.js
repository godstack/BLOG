import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_FOLLOW,
  REQUEST_GET_PROFILE_INFO,
  REQUEST_GET_USER_POSTS
} from '../types';
import axios from 'axios';
import {
  setProfileInfo,
  showProfileLoading,
  hideProfileLoading,
  setFollowers,
  setUserPosts,
  showPostsLoading,
  hidePostsLoading
} from '../actions/profileActions';

function* workerGetProfileInfo({ payload: { username, currentPage } }) {
  try {
    yield put(showProfileLoading());
    const [userInfo, postsInfo] = yield all([
      call(axios.get, `/api/user/${username}/info`),
      call(axios.get, `/api/user/${username}/posts`, {
        params: { page: currentPage }
      })
    ]);
    console.log(userInfo, postsInfo);
    yield put(setProfileInfo({ ...postsInfo.data, ...userInfo.data }));
    yield put(hideProfileLoading());
  } catch (e) {
    yield put(hideProfileLoading());
  }
}

function* workerFollow({ payload: { aimUsername, authUserId } }) {
  try {
    yield put(setFollowers(authUserId));

    const response = yield call(axios.put, `/api/user/${aimUsername}/follow`);
  } catch (e) {
    console.log(e.message);
    yield put(setFollowers(authUserId));
  }
}

function* workerGetUserPosts({ payload: { username, currentPage } }) {
  yield put(showPostsLoading());

  const response = yield call(axios.get, `/api/user/${username}/posts`, {
    params: { page: currentPage }
  });

  yield put(setUserPosts(response.data.posts));

  yield put(hidePostsLoading());
}

export function* userSaga() {
  yield takeEvery(REQUEST_GET_PROFILE_INFO, workerGetProfileInfo);
  yield takeEvery(REQUEST_GET_USER_POSTS, workerGetUserPosts);
  yield takeEvery(REQUEST_FOLLOW, workerFollow);
}
