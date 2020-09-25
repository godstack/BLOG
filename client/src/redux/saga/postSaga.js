import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import { REQUEST_CREATE_POST } from '../types';

function* workerPostCreateSaga({ payload: formData }) {
  console.log(formData);

  const response = yield call(axios.post, '/api/post/create', formData);

  console.log(response);

  yield put(push(`/post/${response.data.postId}`));
}

export function* postSaga() {
  yield takeLatest(REQUEST_CREATE_POST, workerPostCreateSaga);
}
