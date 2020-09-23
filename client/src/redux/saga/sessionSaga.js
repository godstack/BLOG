import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  hideSessionLoading,
  logoutAuthUser,
  setAuthUser,
  showSessionLoading
} from '../actions';
import { request } from '../request';

import {
  REQUEST_CHECK_AUTH,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTER
} from '../types';

function* workerLoginSaga({ payload: formData }) {
  yield put(showSessionLoading());
  try {
    const data = yield call(request, '/api/auth/login', 'POST', {
      ...formData
    });
    yield put(setAuthUser(data.user));

    yield put(hideSessionLoading());
  } catch (e) {
    yield put(hideSessionLoading());
  }
}

function* workerRegisterSaga({ payload: formData }) {
  yield put(showSessionLoading());
  try {
    const data = yield call(request, '/api/auth/register', 'POST', {
      ...formData
    });
    yield put(setAuthUser(data.user));

    yield put(hideSessionLoading());
  } catch (e) {
    yield put(hideSessionLoading());
  }
}

function* workerLogoutSaga() {
  yield put(showSessionLoading());
  try {
    yield call(request, 'api/auth/logout', 'DELETE');
    yield put(logoutAuthUser());
    yield put(hideSessionLoading());
  } catch (e) {
    yield put(hideSessionLoading());
  }
}

function* workerCheckAuthSaga() {
  yield put(showSessionLoading());
  try {
    const data = yield call(request, '/api/auth/authchecker', 'GET');
    if (data.user) {
      yield put(setAuthUser(data.user));
    }

    yield put(hideSessionLoading());
  } catch (e) {
    yield put(hideSessionLoading());
  }
}

export function* sessionSaga() {
  yield takeLatest(REQUEST_LOGIN, workerLoginSaga);
  yield takeLatest(REQUEST_REGISTER, workerRegisterSaga);
  yield takeLatest(REQUEST_LOGOUT, workerLogoutSaga);
  yield takeEvery(REQUEST_CHECK_AUTH, workerCheckAuthSaga);
}
