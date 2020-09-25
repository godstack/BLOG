import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import { REQUEST_CREATE_POST } from '../types';
import { hideCreatePostLoading, showCreatePostLoading } from '../actions';

function* workerPostCreateSaga({ payload: formData }) {
  console.log(formData);
  yield put(showCreatePostLoading());
  const response = yield call(axios.post, '/api/post/create', formData);

  console.log(response);

  yield put(push(`/post/${response.data.postId}`));

  yield put(hideCreatePostLoading());
}

export function* postSaga() {
  yield takeLatest(REQUEST_CREATE_POST, workerPostCreateSaga);
}
