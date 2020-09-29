import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import { REQUEST_CREATE_POST, REQUEST_GET_POST } from '../types';
import {
  hideCreatePostLoading,
  setPostPage,
  showCreatePostLoading
} from '../actions';

function* workerPostCreateSaga({ payload: formData }) {
  yield put(showCreatePostLoading());
  const response = yield call(axios.post, '/api/post/create', formData);

  yield put(push(`/post/${response.data.postId}`));

  yield put(hideCreatePostLoading());
}

function* workerPostGet({ payload }) {
  const response = yield call(axios.get, `/api/post/${payload}`);

  yield put(setPostPage(response.data));
}

export function* postSaga() {
  yield takeLatest(REQUEST_CREATE_POST, workerPostCreateSaga);
  yield takeEvery(REQUEST_GET_POST, workerPostGet);
}
