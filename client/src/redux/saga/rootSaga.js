import { all } from 'redux-saga/effects';
import { homeSaga } from './homeSaga';
import { postSaga } from './postSaga';
import { sessionSaga } from './sessionSaga';
import { profileSaga } from './profileSaga';
import { usersSaga } from './usersSaga';
import { settingsSaga } from './settingsSaga';
import { freshJobsSaga } from './sockets';

export default function* rootSaga() {
  yield all([
    sessionSaga(),
    postSaga(),
    profileSaga(),
    usersSaga(),
    homeSaga(),
    settingsSaga(),
    freshJobsSaga()
  ]);
}
