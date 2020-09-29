import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_FOLLOW, REQUEST_GET_PROFILE_INFO } from '../types';
import axios from 'axios';
import {
  setProfileInfo,
  showProfileLoading,
  hideProfileLoading,
  setFollowers,
  showFollowLoading,
  hideFollowLoading
} from '../actions';

function* workerGetProfileInfo({ payload: { username, currentPage } }) {
  try {
    yield put(showProfileLoading());
    const response = yield call(axios.get, `/api/user/profile/${username}`, {
      params: { page: currentPage }
    });

    yield put(setProfileInfo(response.data));
    yield put(hideProfileLoading());
  } catch (e) {
    yield put(hideProfileLoading());
  }
}

function* workerFollow({ payload }) {
  console.log(payload);
  yield put(showFollowLoading());
  const response = yield call(axios.put, `/api/user/${payload}/follow`);
  yield put(setFollowers(response.data.followers));
  yield put(hideFollowLoading());
  // console.log();
}

export function* userSaga() {
  yield takeEvery(REQUEST_GET_PROFILE_INFO, workerGetProfileInfo);
  yield takeEvery(REQUEST_FOLLOW, workerFollow);
}
