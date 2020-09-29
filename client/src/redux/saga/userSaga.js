import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REQUEST_FOLLOW, REQUEST_GET_PROFILE_INFO } from '../types';
import axios from 'axios';
import {
  setProfileInfo,
  showProfileLoading,
  hideProfileLoading
} from '../actions';

function* workerGetProfileInfo({ payload: { username, currentPage } }) {
  //query params
  yield put(showProfileLoading());
  const response = yield call(axios.get, `/api/user/profile/${username}`, {
    params: { page: currentPage }
  });

  yield put(setProfileInfo(response.data));
  yield put(hideProfileLoading());
}

function* workerFollow({ payload }) {
  console.log(payload);
  const response = yield call(axios.post, `/api/user/${payload}/follow`);
  console.log(response.data);
}

export function* userSaga() {
  yield takeEvery(REQUEST_GET_PROFILE_INFO, workerGetProfileInfo);
  yield takeEvery(REQUEST_FOLLOW, workerFollow);
}
