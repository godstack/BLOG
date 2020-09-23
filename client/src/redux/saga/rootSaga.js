import { all } from 'redux-saga/effects';
import { sessionSaga } from './sessionSaga';

export default function* rootSaga() {
  yield all([sessionSaga()]);
}
