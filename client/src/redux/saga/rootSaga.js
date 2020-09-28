import { all } from 'redux-saga/effects';
import { postSaga } from './postSaga';
import { sessionSaga } from './sessionSaga';
import { userSaga } from './userSaga';

export default function* rootSaga() {
  yield all([sessionSaga(), postSaga(), userSaga()]);
}
