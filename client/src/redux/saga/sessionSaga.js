import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  hideSessionLoading,
  logoutAuthUser,
  setAuthUser,
  showSessionLoading
} from '../actions/authActions';
import axios from 'axios';

import {
  REQUEST_CHECK_AUTH,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTER
} from '../types';
import { notifySuccess, notifyError } from '../actions/toastrActions';
import { customizeOwnRoom } from '../helperFunctions/emittingMessages';
import { socket } from '../../index';

function* workerLoginSaga({ payload: formData }) {
  yield put(showSessionLoading());
  try {
    const response = yield call(axios.post, '/api/auth/login', {
      ...formData
    });

    yield put(setAuthUser(response.data.user));

    yield put(hideSessionLoading());

    yield put(notifySuccess('Login', 'Successful login!'));
  } catch (e) {
    yield put(
      notifyError('Login', e?.response?.data?.message || 'Login failed')
    );
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
    yield put(notifySuccess('Registration', 'Successful registration!'));
  } catch (e) {
    yield put(
      notifyError(
        'Registration',
        e?.response?.data?.message || 'Registration failed'
      )
    );
    yield put(hideSessionLoading());
  }
}

function* workerLogoutSaga() {
  yield put(showSessionLoading());
  try {
    yield call(axios.delete, '/api/auth/logout');
    yield put(logoutAuthUser());
    yield put(hideSessionLoading());
    yield put(notifySuccess('Logout', 'Logout successfully'));
  } catch (e) {
    yield put(
      notifyError('Logout', e?.response?.data?.message || 'Logout failed')
    );
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
    // console.log(response.data.user);
    yield put(hideSessionLoading());

    yield fork(customizeOwnRoom, socket, response.data.user.username);
  } catch (e) {
    yield put(
      notifyError(
        'Check Authorization',
        e?.response?.data?.message || 'Check Authorization failed'
      )
    );
    yield put(hideSessionLoading());
  }
}

export function* sessionSaga() {
  yield takeLatest(REQUEST_LOGIN, workerLoginSaga);
  yield takeLatest(REQUEST_REGISTER, workerRegisterSaga);
  yield takeLatest(REQUEST_LOGOUT, workerLogoutSaga);
  yield takeEvery(REQUEST_CHECK_AUTH, workerCheckAuthSaga);
}
