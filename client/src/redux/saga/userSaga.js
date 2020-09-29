import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REQUEST_GET_PROFILE_INFO } from '../types';
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

export function* userSaga() {
  yield takeEvery(REQUEST_GET_PROFILE_INFO, workerGetProfileInfo);
}
