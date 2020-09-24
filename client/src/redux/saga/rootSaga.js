import { all } from 'redux-saga/effects';
import { postSaga } from './postSaga';
import { sessionSaga } from './sessionSaga';

export default function* rootSaga() {
  yield all([sessionSaga(), postSaga()]);
}
