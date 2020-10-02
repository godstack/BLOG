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

function* workerSetUsersList({ payload: { url, page } }) {
  try {
    yield put(showUsersListLoading());

    const response = yield call(axios.get, `/api/user${url}`, {
      params: { page }
    });

    console.log(response.data);

    yield put(setUsersList(response.data));

    yield put(hideUsersListLoading());
  } catch (e) {
    console.log(e.message);
    yield put(hideUsersListLoading());
  }
}

function* workerFollow({ payload: { aimUsername, authUserId } }) {
  try {
    console.log(aimUsername, authUserId);
    yield put(setFollowersUsersList(aimUsername, authUserId));

    yield call(axios.put, `/api/user/${aimUsername}/follow`);
  } catch (e) {
    console.log(e.message);
    yield put(setFollowersUsersList(aimUsername, authUserId));
  }
}

export function* usersSaga() {
  yield takeEvery(REQUEST_GET_USERS_LIST, workerSetUsersList);
  yield takeEvery(REQUEST_FOLLOW_FROM_USERS_LIST, workerFollow);
}
