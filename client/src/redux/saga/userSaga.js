import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REQUEST_GET_PROFILE_INFO } from '../types';
import axios from 'axios';
import { setProfileInfo } from '../actions';

function* workerGetProfileInfo({ payload: { username, currentPage } }) {
  console.log('saga', username, currentPage);
  //query params
  const response = yield call(axios.get, `/api/user/profile/${username}`, {
    params: { page: currentPage }
  });
  yield put(setProfileInfo(response.data));
}

export function* userSaga() {
  yield takeEvery(REQUEST_GET_PROFILE_INFO, workerGetProfileInfo);
}
