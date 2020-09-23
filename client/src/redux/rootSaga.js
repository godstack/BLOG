import { all } from 'redux-saga/effects';
import { loginSaga } from './sessionSaga';

export default function* rootSaga() {
  yield all([loginSaga()]);
}
