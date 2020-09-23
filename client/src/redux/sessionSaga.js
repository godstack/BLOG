import { call, put, takeLatest } from 'redux-saga/effects';
import { hideSessionLoading, setAuthUser, showSessionLoading } from './actions';
import { request } from './request';

import { REQUEST_LOGIN, REQUEST_REGISTER } from './types';

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

export function* loginSaga() {
  yield takeLatest(REQUEST_LOGIN, workerLoginSaga);
  yield takeLatest(REQUEST_REGISTER, workerRegisterSaga);
}
