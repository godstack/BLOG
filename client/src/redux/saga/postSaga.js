import { call, put, takeEvery, fork, select } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import {
  REQUEST_CREATE_POST,
  REQUEST_EDIT_POST,
  REQUEST_GET_POST
} from '../types';
import {
  hideCreatePostLoading,
  setPost,
  showCreatePostLoading
} from '../actions/postActions';
import { notifyError, notifySuccess } from '../actions/toastrActions';
import { addPost, editPost } from '../helperFunctions/emittingMessages';
import { socket } from '../../index';

function* workerPostCreateSaga({ payload: formData }) {
  try {
    yield put(showCreatePostLoading());
    const response = yield call(axios.post, '/api/post/create', formData);

    yield put(hideCreatePostLoading());
    yield put(push(`/${response.data.authorUsername}/profile`));
    yield put(notifySuccess('Post creation', 'Post was created'));

    yield fork(addPost, socket, response.data.post);
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

function* workerGetPostText({ payload: postId }) {
  try {
    const response = yield call(axios.get, `/api/post/${postId}`);

    yield put(setPost(response.data));
  } catch (e) {
    yield put(
      notifyError(
        'Post',
        e?.response?.data?.message || 'Post text fetching was failed'
      )
    );
  }
}

function* workerPostEdit({ payload: { formData, postId } }) {
  try {
    const authorUsername = yield select(state => state.session.user.username);
    yield put(showCreatePostLoading());
    const response = yield call(axios.put, `/api/post/${postId}`, formData);

    yield put(push(`/${authorUsername}/profile`));

    yield put(hideCreatePostLoading());
    yield fork(editPost, socket, response.data.post);
    yield put(notifySuccess('Post edit', 'Post was edited'));
  } catch (e) {
    yield put(
      notifyError(
        'Post edit',
        e?.response?.data?.message || 'Post editing was failed'
      )
    );
    yield put(hideCreatePostLoading());
  }
}

export function* postSaga() {
  yield takeEvery(REQUEST_CREATE_POST, workerPostCreateSaga);
  yield takeEvery(REQUEST_EDIT_POST, workerPostEdit);
  yield takeEvery(REQUEST_GET_POST, workerGetPostText);
}
