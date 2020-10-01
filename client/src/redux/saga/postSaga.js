import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import {
  REQUEST_CREATE_POST,
  REQUEST_GET_POST,
  REQUEST_LIKE_POST
} from '../types';
import {
  hideCreatePostLoading,
  setPostPage,
  showCreatePostLoading,
  updateProfilePost
} from '../actions/postActions';

function* workerPostCreateSaga({ payload: formData }) {
  yield put(showCreatePostLoading());
  const response = yield call(axios.post, '/api/post/create', formData);

  yield put(push(`/post/${response.data.postId}`));

  yield put(hideCreatePostLoading());
}

function* workerPostGet({ payload: postId }) {
  const response = yield call(axios.get, `/api/post/${postId}`);

  yield put(setPostPage(response.data));
}

function* workerLikePost({ payload: { postId, userId } }) {
  try {
    yield put(updateProfilePost(postId, userId));

    yield call(axios.put, `/api/post/${postId}/like`);
  } catch (e) {
    yield put(updateProfilePost(postId, userId));
  }
}

export function* postSaga() {
  yield takeLatest(REQUEST_CREATE_POST, workerPostCreateSaga);
  yield takeEvery(REQUEST_GET_POST, workerPostGet);
  yield takeEvery(REQUEST_LIKE_POST, workerLikePost);
}
