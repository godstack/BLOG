import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import { REQUEST_CREATE_POST, REQUEST_GET_POST } from '../types';
import {
  hideCreatePostLoading,
  setPostPage,
  showCreatePostLoading
} from '../actions/postActions';
import { notifyError } from '../actions/toastrActions';

function* workerPostCreateSaga({ payload: formData }) {
  try {
    yield put(showCreatePostLoading());
    const response = yield call(axios.post, '/api/post/create', formData);

    yield put(push(`/${response.data.authorUsername}/profile`));

    yield put(hideCreatePostLoading());
  } catch (e) {
    yield put(
      notifyError(
        'Post creation',
        e?.response?.data?.message || 'Post creation was failed'
      )
    );
    yield put(hideCreatePostLoading());
  }
}

function* workerPostGet({ payload: postId }) {
  try {
    const response = yield call(axios.get, `/api/post/${postId}`);

    yield put(setPostPage(response.data));
  } catch (e) {
    yield put(
      notifyError(
        'Post',
        e?.response?.data?.message || 'Post fetching was failed'
      )
    );
  }
}

export function* postSaga() {
  yield takeLatest(REQUEST_CREATE_POST, workerPostCreateSaga);
  yield takeEvery(REQUEST_GET_POST, workerPostGet);
}
