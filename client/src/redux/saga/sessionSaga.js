import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  hideSessionLoading,
  logoutAuthUser,
  setAuthUser,
  showSessionLoading
} from '../actions';
import axios from 'axios';

import {
  REQUEST_CHECK_AUTH,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTER
} from '../types';

function* workerLoginSaga({ payload: formData }) {
  yield put(showSessionLoading());
  try {
    const response = yield call(axios.post, '/api/auth/login', {
      ...formData
    });

    yield put(setAuthUser(response.data.user));

    yield put(hideSessionLoading());
  } catch (e) {
    console.log('error', e);
    yield put(hideSessionLoading());
  }
}

function* workerRegisterSaga({ payload: formData }) {
  yield put(showSessionLoading());
  try {
    const response = yield call(axios.post, '/api/auth/register', {
      ...formData
    });

    yield put(setAuthUser(response.data.user));

    yield put(hideSessionLoading());
  } catch (e) {
    console.log('error', e);
    yield put(hideSessionLoading());
  }
}

function* workerLogoutSaga() {
  yield put(showSessionLoading());
  try {
    yield call(axios.delete, 'api/auth/logout');
    yield put(logoutAuthUser());
    yield put(hideSessionLoading());
  } catch (e) {
    console.log('error', e);
    yield put(hideSessionLoading());
  }
}

function* workerCheckAuthSaga() {
  yield put(showSessionLoading());
  try {
    const response = yield call(axios.get, '/api/auth/authchecker');
    if (response.data.user) {
      yield put(setAuthUser(response.data.user));
    }

    yield put(hideSessionLoading());
  } catch (e) {
    console.log('error', e);
    yield put(hideSessionLoading());
  }
}

export function* sessionSaga() {
  yield takeLatest(REQUEST_LOGIN, workerLoginSaga);
  yield takeLatest(REQUEST_REGISTER, workerRegisterSaga);
  yield takeLatest(REQUEST_LOGOUT, workerLogoutSaga);
  yield takeEvery(REQUEST_CHECK_AUTH, workerCheckAuthSaga);
}
