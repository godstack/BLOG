import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_USER_INFO_FOR_PROFILE_SETTINGS } from '../types';
import axios from 'axios';
import { setUserInfoForProfileSettings } from '../actions/settingsActions';

function* workerSetUserInfoForSettings() {
  try {
    const response = yield call(axios.get, '/api/settings/profile');

    yield put(setUserInfoForProfileSettings(response.data.user));
  } catch (e) {
    console.log(e.message);
  }
}

export function* settingsSaga() {
  yield takeEvery(
    REQUEST_USER_INFO_FOR_PROFILE_SETTINGS,
    workerSetUserInfoForSettings
  );
}
