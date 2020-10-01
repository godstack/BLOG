import { all, call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_GET_USERS_LIST } from '../types';
import axios from 'axios';
import { setUsersList } from '../actions/usersActions';

function* workerSetUsersList({ payload: url }) {
  try {
    const response = yield call(axios.get, `/api/user${url}`);
    console.log(response.data);

    yield put(setUsersList(response.data));
  } catch (e) {
    console.log(e.message);
  }
}

export function* usersSaga() {
  yield takeEvery(REQUEST_GET_USERS_LIST, workerSetUsersList);
}
