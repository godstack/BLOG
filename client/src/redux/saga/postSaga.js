import { call, takeLatest } from 'redux-saga/effects';
import { request } from '../request';
import { REQUEST_CREATE_POST } from '../types';

function* workerPostCreateSaga({ payload: formData }) {
  console.log(formData);
  yield call(request, '/api/post/create', 'POST', formData);

  // console.log(formData);
}

export function* postSaga() {
  yield takeLatest(REQUEST_CREATE_POST, workerPostCreateSaga);
}
