import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_GET_USERS_LIST,
  REQUEST_FOLLOW_FROM_USERS_LIST
} from '../types';
import axios from 'axios';
import {
  hideUsersListLoading,
  setFollowersUsersList,
  setUsersList,
  showUsersListLoading
} from '../actions/usersActions';
import { notifyError } from '../actions/toastrActions';

function* workerSetUsersList({ payload: { url, page } }) {
  try {
    yield put(showUsersListLoading());

    const response = yield call(axios.get, `/api/user${url}`, {
      params: { page }
    });

    yield put(setUsersList(response.data));

    yield put(hideUsersListLoading());
  } catch (e) {
    yield put(
      notifyError(
        'User list',
        e?.response?.data?.message || 'Fetching User list was failed'
      )
    );
    yield put(hideUsersListLoading());
  }
}

function* workerFollow({ payload: { aimUsername, authUserId } }) {
  try {
    yield put(setFollowersUsersList(aimUsername, authUserId));

    yield call(axios.put, `/api/user/${aimUsername}/follow`);
  } catch (e) {
    yield put(
      notifyError(
        'Follow',
        e?.response?.data?.message || 'Follow request was failed'
      )
    );
    yield put(setFollowersUsersList(aimUsername, authUserId));
  }
}

export function* usersSaga() {
  yield takeEvery(REQUEST_GET_USERS_LIST, workerSetUsersList);
  yield takeEvery(REQUEST_FOLLOW_FROM_USERS_LIST, workerFollow);
}
