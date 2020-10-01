import { all } from 'redux-saga/effects';
import { postSaga } from './postSaga';
import { sessionSaga } from './sessionSaga';
import { userSaga } from './userSaga';
import { usersSaga } from './usersSaga';

export default function* rootSaga() {
  yield all([sessionSaga(), postSaga(), userSaga(), usersSaga()]);
}
